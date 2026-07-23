# Week 9: Kubernetes Migration and ArgoCD GitOps

## What We Built

This week TaskFlow moved from a single EC2 instance to a full Kubernetes cluster on AWS EKS, with every deployment managed through GitOps using ArgoCD. This is the shift from "an app running on a server" to "a platform that deploys, heals, and scales itself."

## Why This Matters

A single EC2 instance is a single point of failure. If it crashes, the app is down until someone notices and restarts it. There is no auto-scaling, no rolling deployments, no self-healing.

Kubernetes solves this by running multiple replicas of each service across multiple nodes, automatically restarting failed containers, routing traffic away from unhealthy pods, and scaling up or down based on real load. ArgoCD adds GitOps on top -- the cluster state is always a reflection of what is committed to Git, and no one ever runs `kubectl apply` by hand for application changes.

## Infrastructure Changes

### EKS Cluster

A managed EKS cluster was provisioned with Terraform, running 3 worker nodes across 2 availability zones in private subnets. The control plane is fully managed by AWS -- we only manage the data plane (worker nodes).

### IAM Roles for Service Accounts (IRSA)

Instead of giving pods long-lived AWS credentials, every pod that needs AWS access assumes a dedicated IAM role through IRSA:

- `taskflow-pod-role` -- backend pod reads SSM parameters
- `taskflow-alb-controller-role` -- AWS Load Balancer Controller manages ALBs
- `taskflow-ebs-csi-role` -- EBS CSI driver manages persistent volumes
- `taskflow-image-updater-role` -- ArgoCD Image Updater reads ECR
- `taskflow-fluent-bit-role` -- Fluent Bit writes to CloudWatch Logs

Each role's trust policy is scoped to one specific Kubernetes service account in one specific namespace. No pod can assume a role it was not explicitly bound to.

### EKS Access Entries

GitHub Actions authenticates to the cluster through an EKS access entry bound to the `github-actions-taskflow` IAM role, scoped to `AmazonEKSClusterAdminPolicy` at cluster level. This lets CI verify cluster health without SSH or kubeconfig files stored anywhere.

## Kubernetes Manifests

14 manifests across 5 directories:

```
k8s/
├── namespace.yaml
├── backend/
│   ├── serviceaccount.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   ├── pdb.yaml
│   ├── cluster-secret-store.yaml
│   └── external-secret.yaml
├── frontend/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── pdb.yaml
├── ingress/
│   └── ingress.yaml
└── network-policy/
    └── network-policy.yaml
```

### Deployments

Backend and frontend each run 2 replicas by default. Every pod has:

- Liveness and readiness probes hitting `/api/health` (backend) or `/` (frontend)
- CPU and memory resource requests and limits
- Non-root security context (`runAsNonRoot: true`)
- `allowPrivilegeEscalation: false`

### Horizontal Pod Autoscalers

Both services autoscale between 2 and 5 replicas based on 70% CPU utilization or 80% memory utilization, whichever threshold is hit first.

### PodDisruptionBudgets

Each service has a PDB with `minAvailable: 1`. During node upgrades or cluster maintenance, Kubernetes can only evict one pod at a time -- the other replica keeps serving traffic. This is what makes zero-downtime maintenance possible.

### Network Policies

The backend is only reachable from:
- Frontend pods (application traffic)
- The `kube-system` namespace (ALB health checks)

Nothing else in the cluster can reach the backend directly, even if another pod is compromised.

### Ingress

A single ALB Ingress routes traffic based on path:

```
thetaskflowapp.online/api/*  -> taskflow-backend-svc:3000
thetaskflowapp.online/*      -> taskflow-frontend-svc:80
```

TLS is terminated at the ALB using an ACM certificate. HTTP requests are automatically redirected to HTTPS.

## Secrets Management: External Secrets Operator

Kubernetes Secrets by default are only base64 encoded, not encrypted, and someone still has to put the values in manually. Instead, TaskFlow uses:

```
AWS SSM Parameter Store
        |
ClusterSecretStore (authenticates via backend pod's IRSA)
        |
ExternalSecret (maps SSM paths to Secret keys, refreshes hourly)
        |
Kubernetes Secret: taskflow-backend-secret
        |
Backend Pod (env vars via secretKeyRef)
```

No developer ever touches a real credential. The SSM parameter paths are safe to commit to Git -- only the actual values, which live only in AWS, are sensitive.

## GitOps With ArgoCD

### Installation

ArgoCD was installed via Helm (not raw `kubectl apply`) so the install itself is versioned, upgradable, and reproducible.

### Bootstrap

A single Application manifest, `bootstrap/taskflow-application.yaml`, was applied once manually -- this is the one legitimate exception to "no manual kubectl apply." It tells ArgoCD:

- Watch `https://github.com/elizabeth-ikechukwu/scalable-task-platform.git`
- On branch `main`
- Path `k8s`
- Recurse into all subdirectories
- Deploy to the `taskflow` namespace
- Sync automatically, pruning removed resources and self-healing manual drift

After that one command, ArgoCD manages everything in the `k8s/` folder permanently. Every future change is: edit YAML, commit, push, merge -- ArgoCD does the rest.

### Self-Healing in Practice

`selfHeal: true` means if anyone manually edits a live resource in the cluster (say, scaling a deployment by hand), ArgoCD detects the drift within its sync cycle and reverts it back to match Git. Git is always the single source of truth.

## Production Standard vs Learning Shortcuts

Several decisions were deliberately upgraded from "get it working" to "production standard" during this week:

| Learning Shortcut | Production Standard Applied |
|---|---|
| `nginx.conf` proxying `/api/` to backend | ALB Ingress handles all routing; frontend Nginx serves static files only |
| Kubernetes Secrets with plaintext values | External Secrets Operator syncing from AWS SSM via IRSA |
| Broad security group `0.0.0.0/0` on node ingress | Scoped to the EKS control plane security group only |
| `gp2` RDS storage, 0-day backup retention | `gp3` storage; backup retention raised once off free tier |
| ArgoCD installed via raw manifest URL | Installed via Helm for versioning and upgradability |

## Real Problems Solved This Week

This week involved extensive hands-on debugging of real production issues, including:

- Docker layer caching serving a stale `server.js` into the image
- Missing `wget`/`curl` binary in a minimal `node:22-slim` image breaking the container health check
- EKS node security group blocking control-plane-to-node communication after tightening from `0.0.0.0/0`
- ArgoCD not recursing into subdirectories, silently applying only `namespace.yaml`
- External Secrets Operator API version mismatch (`v1beta1` vs `v1`) after a version upgrade
- Pod capacity limits on `t3.small` nodes forcing a resize to `t3.medium`
- EBS CSI driver CrashLoopBackOff traced to a missing dedicated IRSA role (it was incorrectly using the node role)
- RDS connectivity failing because the security group only allowed the node security group, not pod IPs assigned directly by the VPC CNI
- Terraform state drift on the RDS security group after a manual console change, resolved with a Terraform `import` block in the root module

Each of these mirrors a real on-call scenario. Working through them end to end is what distinguishes a deployed, debugged platform from a tutorial that happened to run once.

## Live Platform

- App: https://thetaskflowapp.online
- ArgoCD: https://argocd.thetaskflowapp.online

## What is Next

Week 10 adds full observability -- Prometheus and Grafana for metrics, Fluent Bit for centralized logging to CloudWatch -- so that when something does go wrong, there is a dashboard and a log stream to find out why, instead of guessing.
