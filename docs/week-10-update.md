# Week 10: Monitoring, Logging, and Observability

## What We Built

This week added a full observability stack to the EKS cluster -- Prometheus for metrics collection, Grafana for dashboards, and Fluent Bit for centralized logging to CloudWatch. All three are provisioned entirely through Terraform using managed Helm releases, so the observability layer is as reproducible as every other part of the platform.

With this in place, TaskFlow is now a complete, self-contained production platform: infrastructure, application, CI/CD, GitOps, secrets management, and observability are all defined as code and deployed automatically.

## Why This Matters

Up to this point, if something went wrong in the cluster, the only way to find out was to run `kubectl` commands by hand and guess where to look. That does not scale, and it is not how real teams operate.

Observability means:

- **Metrics** -- numeric time-series data: CPU, memory, request rates, error rates
- **Logs** -- what actually happened, in detail, per container
- **Dashboards** -- a visual, at-a-glance answer to "is everything okay right now"

Without this, a memory leak or a spike in errors is invisible until a user complains. With it, the problem shows up on a dashboard before anyone notices anything is wrong.

## Architecture

```
Pods, Nodes, Kubernetes API
        |
Prometheus (scrapes metrics every 15s)
        |
Grafana (visualizes as dashboards)

Pods (stdout/stderr logs)
        |
Fluent Bit DaemonSet (one pod per node)
        |
CloudWatch Logs -- /taskflow/eks log group

ECR (new image pushed)
        |
ArgoCD Image Updater (IRSA, least-privilege ECR read policy)
        |
ArgoCD Application (auto-deploys new image tag)
```

## Prometheus and Grafana

### Deployment

Both are installed via the `kube-prometheus-stack` Helm chart -- the same chart used by most production Kubernetes teams -- as a Terraform `helm_release` resource inside a dedicated `monitoring` module. This means `terraform apply` alone brings up the entire monitoring stack with no manual Helm commands.

The chart bundles:

- **Prometheus** -- the metrics database and scrape engine
- **Grafana** -- the dashboarding UI, with Kubernetes dashboards pre-loaded
- **kube-state-metrics** -- exposes the state of Kubernetes objects (deployments, pods, etc.) as metrics
- **node-exporter** -- exposes hardware and OS metrics from every node
- **Prometheus Operator** -- manages Prometheus configuration declaratively via CRDs

### Resource Sizing

Every component has explicit `requests` and `limits` tuned to fit alongside the rest of the cluster's workloads (ArgoCD, External Secrets Operator, AWS Load Balancer Controller, and the TaskFlow application itself) without starving any of them:

| Component | Requests | Limits |
|---|---|---|
| Prometheus | 256Mi / 100m | 512Mi / 300m |
| Grafana | 64Mi / 50m | 128Mi / 100m |
| Prometheus Operator | 64Mi / 50m | 128Mi / 100m |
| kube-state-metrics | 32Mi / 10m | 64Mi / 50m |
| node-exporter | 32Mi / 10m | 64Mi / 50m |

### External Access

Both Grafana and Prometheus are exposed through dedicated ALB Ingress resources with ACM-issued TLS certificates, the same pattern used for the main application:

- Grafana: `https://grafana.thetaskflowapp.online`
- Prometheus: `https://prometheus.thetaskflowapp.online`

### Dashboards in Use

The chart ships with a full set of pre-built Kubernetes dashboards, including:

- **Kubernetes / Compute Resources / Cluster** -- CPU and memory across the whole cluster
- **Kubernetes / Compute Resources / Namespace (Pods)** -- per-namespace breakdown
- **Kubernetes / Compute Resources / Node (Pods)** -- per-node breakdown, per-pod CPU quota
- **CoreDNS**, **Kubernetes / API server**, **etcd** -- core control-plane health

### Verifying Scrape Targets

Prometheus's own UI (`Status -> Targets`) confirms every component -- kubelets, kube-state-metrics, node-exporters, the API server -- is being scraped successfully and reporting `UP`.

## Fluent Bit and Centralized Logging

### Why a DaemonSet

Fluent Bit runs as a DaemonSet, meaning exactly one pod is scheduled on every node automatically, including new nodes added by autoscaling. Each Fluent Bit pod reads the container logs written to disk on its own node and forwards them onward -- no log is missed regardless of which node a pod lands on.

### Destination: CloudWatch Logs

Rather than running a self-hosted logging stack (Elasticsearch, Logstash, Kibana), Fluent Bit ships logs directly to AWS CloudWatch Logs under the `/taskflow/eks` log group. This was a deliberate architectural choice:

| ELK-style stack | CloudWatch (chosen) |
|---|---|
| Requires running Elasticsearch as a StatefulSet with PersistentVolumes | No extra cluster resources to run or maintain |
| More powerful log querying and visualization | Native integration with AWS IAM, alarms, and dashboards |
| Appropriate for multi-cloud or advanced log analytics needs | Appropriate for a single-cloud, cost-conscious production setup |

The underlying collection pattern -- an agent DaemonSet shipping logs to a central store -- is identical either way; only the destination changes.

### Authentication

Fluent Bit authenticates to CloudWatch using IRSA through a dedicated `taskflow-fluent-bit-role`, scoped to only:

```
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
logs:DescribeLogStreams
logs:DescribeLogGroups
```

restricted to the `/taskflow/*` log group prefix. No static AWS credentials exist in any Fluent Bit pod.

### What's Visible in CloudWatch

Under the `/taskflow/eks` log group, each log stream corresponds to a container on a specific node -- backend API request logs, Nginx access logs from the frontend, and Kubernetes system component logs are all searchable in one place.

## ArgoCD Image Updater

ArgoCD Image Updater closes the loop between CI and CD. When the CI pipeline pushes a new image to ECR with a commit-SHA tag, Image Updater detects the new tag and updates the running deployment automatically -- no manual edit to a manifest, no manual `kubectl` command, and critically, no need for CI to have write access to the Git repository.

Image Updater authenticates to ECR using its own dedicated IRSA role, scoped to read-only ECR actions needed to discover and pull image metadata. This keeps the CI pipeline's job strictly limited to build, scan, and publish -- deployment promotion is handled entirely by the GitOps layer, preserving the branch protection on `main` with no bypass required.

## Metrics-Server

Alongside the observability stack, the standard Kubernetes `metrics-server` was deployed to power `kubectl top nodes` / `kubectl top pods` and to feed the Horizontal Pod Autoscalers introduced in Week 9 with live CPU and memory data.

## Real Problems Solved This Week

- `kube-prometheus-stack` initially timed out installing on `t3.small` nodes -- diagnosed as insufficient memory headroom, resolved by upgrading to `t3.medium` and right-sizing every component's resource limits
- Prometheus pod hit `OOMKilled` even after the node upgrade, due to WAL replay on startup consuming more memory than the initial limit allowed -- resolved by raising the Prometheus container memory limit to 512Mi
- Node count increased from 2 to 3, then to 3x `t3.medium`, to accommodate the combined workload of TaskFlow, ArgoCD, External Secrets Operator, AWS Load Balancer Controller, ArgoCD Image Updater, and the full monitoring stack running simultaneously
- ArgoCD Image Updater required its own IRSA-authenticated ECR credential path, separate from the node role, to maintain least-privilege access between the GitOps controller and the container registry

## Live Platform

- App: https://thetaskflowapp.online
- ArgoCD: https://argocd.thetaskflowapp.online
- Grafana: https://grafana.thetaskflowapp.online
- Prometheus: https://prometheus.thetaskflowapp.online

## Project Complete

With this week, TaskFlow reaches full production maturity:

- Infrastructure as Code (Terraform, 8 modules)
- Containerized, orchestrated application (Docker, Kubernetes on EKS)
- Automated CI/CD (GitHub Actions, Trivy, OIDC)
- GitOps continuous deployment (ArgoCD, Image Updater)
- Zero hardcoded secrets (AWS SSM, External Secrets Operator, IRSA throughout)
- Auto-scaling and self-healing (HPA, PodDisruptionBudgets)
- Network segmentation (Kubernetes Network Policies)
- Full observability (Prometheus, Grafana, Fluent Bit, CloudWatch Logs)
- End-to-end HTTPS (ACM, Route53, ALB)

Every layer of this platform -- from the VPC up to the dashboards -- was built, debugged, and documented from scratch.