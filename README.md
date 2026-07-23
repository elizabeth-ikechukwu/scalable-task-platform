# TaskFlow -- Scalable Task Platform

A production-grade DevOps project documenting the full lifecycle of a task management application - from a simple backend API to a fully containerized, orchestrated, monitored, cloud-native SaaS platform running on Kubernetes.

Built in public, one week at a time.

**Live:** https://thetaskflowapp.online
**ArgoCD:** https://argocd.thetaskflowapp.online
**Grafana:** https://grafana.thetaskflowapp.online
**Prometheus:** https://prometheus.thetaskflowapp.online
**Repo:** https://github.com/elizabeth-ikechukwu/scalable-task-platform

---

## What This Project Demonstrates

- Backend API development with Node.js and Express
- PostgreSQL database integration with AWS RDS
- JWT-based user authentication and authorization
- Containerization with Docker and multi-stage builds
- CI/CD automation with GitHub Actions, Trivy scanning, and Amazon ECR
- Infrastructure as Code with Terraform across 8 modules
- Secrets management with AWS SSM Parameter Store and IRSA
- Container orchestration with Kubernetes on AWS EKS
- GitOps continuous deployment with ArgoCD
- Auto-scaling with Horizontal Pod Autoscalers
- Zero-downtime deployments with PodDisruptionBudgets
- Network segmentation with Kubernetes Network Policies
- Monitoring and observability with Prometheus and Grafana
- Centralized logging with Fluent Bit and CloudWatch Logs
- Professional React frontend with Tailwind CSS

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL 16 on AWS RDS |
| Authentication | JWT, bcrypt |
| Containerization | Docker (multi-stage builds) |
| Orchestration | Kubernetes on AWS EKS |
| GitOps | ArgoCD |
| Ingress | AWS Load Balancer Controller, ALB |
| Secrets | AWS SSM Parameter Store, External Secrets Operator, IRSA |
| CI/CD | GitHub Actions, OIDC authentication |
| Security Scanning | Trivy |
| Image Registry | Amazon ECR |
| Infrastructure | Terraform (8 modules) |
| Monitoring | Prometheus, Grafana |
| Logging | Fluent Bit, CloudWatch Logs |
| DNS/TLS | Route53, AWS Certificate Manager |
| Cloud | AWS (EKS, RDS, VPC, IAM, ALB, ECR, SSM, ACM, Route53, CloudWatch) |

---

## Roadmap

| Week | Topic | Status |
|---|---|---|
| 1 | Project foundation and backend API | [Done](docs/week-1-update.md) |
| 2 | Dockerize the backend | [Done](docs/week-2-update.md) |
| 3 | React frontend and Docker Compose | [Done](docs/week-3-update.md) |
| 4 | CI/CD pipeline with GitHub Actions and ECR | [Done](docs/week-4-update.md) |
| 5 | Terraform infrastructure and pipeline extension | [Done](docs/week-5-update.md) |
| 6 | Cloud deployment on AWS EC2 | [Done](docs/week-6-update.md) |
| 7 | PostgreSQL on AWS RDS with Terraform | [Done](docs/week-7-update.md) |
| 8 | JWT authentication, SSM Parameter Store, UI overhaul | [Done](docs/week-8-update.md) |
| 9 | Kubernetes migration, ArgoCD GitOps | [Done](docs/week-9-update.md) |
| 10 | Monitoring, logging, observability | [Done](docs/week-10-update.md) |

---

## Architecture Overview

```
                          Route53 DNS
                               |
                    ACM Certificate (TLS)
                               |
                    AWS Application Load Balancer
                          /              \
              /api/*                        /
                 |                          |
      taskflow-backend-svc         taskflow-frontend-svc
                 |                          |
      Backend Pods (2 replicas)    Frontend Pods (2 replicas)
      Node.js + Express            React + Nginx
                 |
      AWS RDS PostgreSQL 16
      (private subnet)

Secrets flow:
AWS SSM Parameter Store -> External Secrets Operator (IRSA) -> Kubernetes Secret -> Backend Pod

GitOps flow:
GitHub (k8s/ folder, main branch) -> ArgoCD -> EKS Cluster (auto-sync, self-heal, prune)

CI/CD flow:
Push to main -> Lint -> Unit Tests -> Trivy Scan -> Integration Tests -> ECR Publish (SHA tagged)

Observability flow:
Pods/Nodes -> Prometheus (metrics) -> Grafana (dashboards)
Pods -> Fluent Bit DaemonSet -> CloudWatch Logs (/taskflow/eks)
```

---

## Infrastructure (Terraform)

All infrastructure lives in `infra/terraform/` as 8 reusable modules:

| Module | Provisions |
|---|---|
| `vpc` | VPC, public/private subnets across 2 AZs, NAT Gateway, route tables |
| `eks` | EKS cluster, managed node group, OIDC provider, security groups, EKS addons (VPC CNI, CoreDNS, kube-proxy, EBS CSI) |
| `iam` | IAM roles for cluster, nodes, and 6 IRSA roles (backend pod, ALB controller, EBS CSI, Image Updater, Fluent Bit) |
| `ecr` | ECR repositories with immutable tags, scan-on-push, lifecycle policies |
| `rds` | PostgreSQL 16, security groups, subnet groups, parameter groups |
| `ssm` | SSM parameters for non-sensitive config |
| `dns` | ACM certificate, Route53 DNS validation records |
| `monitoring` | kube-prometheus-stack and Fluent Bit via Terraform-managed Helm releases |

The entire platform -- including monitoring -- is reproducible from a single `terraform apply`.

---

## Kubernetes Architecture

14 Kubernetes manifests organized across 5 directories, deployed via ArgoCD GitOps:

```
k8s/
├── namespace.yaml
├── backend/
│   ├── serviceaccount.yaml      -- IRSA-bound service account
│   ├── deployment.yaml          -- 2 replicas, probes, resource limits, non-root
│   ├── service.yaml             -- ClusterIP
│   ├── hpa.yaml                 -- autoscale 2-5 on CPU 70% / memory 80%
│   ├── pdb.yaml                 -- minAvailable: 1
│   ├── cluster-secret-store.yaml -- ESO connection to AWS SSM
│   └── external-secret.yaml     -- syncs SSM parameters into K8s Secret
├── frontend/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── pdb.yaml
├── ingress/
│   └── ingress.yaml              -- ALB, TLS, path-based routing
└── network-policy/
    └── network-policy.yaml       -- backend reachable only from frontend
```

### Why No Kubernetes Secrets With Hardcoded Values

Every credential the backend needs -- database host, username, password, JWT secret -- is fetched at runtime from AWS SSM Parameter Store by the External Secrets Operator, using the pod's IRSA identity. No secret value is ever written to a Kubernetes manifest, a Docker image, or a Git commit.

### GitOps With ArgoCD

ArgoCD is installed via Helm and bootstrapped with a single Application manifest (`bootstrap/taskflow-application.yaml`) watching the `k8s/` directory on `main` with `directory.recurse: true`. Sync policy is fully automated:

```yaml
syncPolicy:
  automated:
    prune: true
    selfHeal: true
```

Any manual change to the cluster that drifts from Git is automatically reverted. No `kubectl apply` is used for application deployments -- only for the one-time ArgoCD bootstrap itself.

---

## CI/CD Pipeline

```
lint -> unit-test -> build-and-integration-test -> publish
```

- **lint** -- ESLint with zero warnings tolerance
- **unit-test** -- Jest test suite
- **build-and-integration-test** -- builds both images, scans with Trivy (blocks on CRITICAL/HIGH CVEs), runs Docker Compose integration tests against live health endpoints
- **publish** -- pushes images to ECR tagged with the commit SHA

GitHub Actions authenticates to AWS via OIDC federation -- no static AWS credentials exist anywhere in the pipeline.

---

## Monitoring and Observability

### Prometheus and Grafana

Deployed via the `kube-prometheus-stack` Helm chart, managed entirely through Terraform. Provides:

- Cluster-wide CPU and memory dashboards
- Per-namespace and per-pod resource usage
- Node-level metrics via node-exporter
- Kubernetes API server and CoreDNS dashboards

Access at `https://grafana.thetaskflowapp.online`

### Fluent Bit

Runs as a DaemonSet -- one pod per node -- shipping every container's logs to CloudWatch Logs under the `/taskflow/eks` log group. Authenticates using IRSA -- zero static AWS credentials.

### Prometheus Direct Access

Available at `https://prometheus.thetaskflowapp.online` for querying raw metrics and viewing scrape target health under Status → Targets.

---

## API Endpoints

### Health

| Method | Route | Description |
|---|---|---|
| GET | /api | API status |
| GET | /api/health | Returns status and uptime |

### Authentication

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Create a new user account | Public |
| POST | /api/auth/login | Sign in and receive JWT token | Public |
| GET | /api/auth/me | Returns current authenticated user | Required |

### Tasks

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/tasks | Returns all tasks for the authenticated user | Required |
| POST | /api/tasks | Creates a new task | Required |
| PATCH | /api/tasks/:id | Toggles task complete or incomplete | Required |
| DELETE | /api/tasks/:id | Deletes a task | Required |

### Projects

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/projects | Returns all projects for the authenticated user | Required |
| POST | /api/projects | Creates a new project | Required |
| DELETE | /api/projects/:id | Deletes a project | Required |

### Team

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | /api/team | Returns all team members for the workspace | Required |
| POST | /api/team/invite | Invites a team member by email | Required |
| DELETE | /api/team/:id | Removes a team member | Required |

---

## Authentication

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are issued on login and registration, expire after 7 days. Passwords are hashed with bcrypt at cost factor 12 -- plain text passwords are never stored.

---

## Frontend

React + Vite + Tailwind CSS application with 26 pages: landing, authentication, full dashboard (tasks, projects, teams, calendar, activity, notifications, analytics, settings), feature detail pages, and marketing pages (pricing, about, contact, status).

Served via Nginx inside the frontend pod. Routing to the backend is handled entirely by the ALB Ingress -- the frontend container serves static files only.

---

## Security

- JWT authentication on all protected routes; bcrypt password hashing (cost factor 12)
- All secrets in AWS SSM Parameter Store, never in code, images, or Kubernetes manifests
- External Secrets Operator with IRSA -- no static AWS credentials in any pod
- RDS in private subnets, `publicly_accessible = false`, SSL enforced
- Kubernetes Network Policies -- backend only reachable from frontend pods and ALB health checks
- Non-root containers, `allowPrivilegeEscalation: false`
- IMDSv2 enforced on all EC2/EKS nodes
- EBS volumes encrypted at rest
- HTTPS enforced end to end via ACM certificate and ALB SSL redirect
- Trivy vulnerability scanning blocking CI on CRITICAL/HIGH CVEs
- GitHub Actions OIDC -- zero long-lived AWS credentials in CI/CD

---

## Getting Started

### Prerequisites

- Node.js 22, npm, Docker, kubectl, Helm, Terraform >= 1.10, AWS CLI

### Run Backend Locally

```bash
git clone https://github.com/elizabeth-ikechukwu/scalable-task-platform.git
cd scalable-task-platform/app/backend
cp .env.example .env
npm install
npm start
```

### Run Frontend Locally

```bash
cd scalable-task-platform/app/frontend
npm install
npm run dev
```

### Run Full Stack With Docker Compose

```bash
docker compose up -d
```

### Deploy Infrastructure

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

### Bootstrap ArgoCD (one-time)

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm install argocd argo/argo-cd -n argocd --create-namespace
kubectl apply -f bootstrap/taskflow-application.yaml
```

---

## Weekly Updates

Detailed documentation with screenshots for each week is in the [docs](docs/) folder.

---

## Author

**Elizabeth Ikechukwu**
DevOps and Cloud Engineer

[LinkedIn](https://www.linkedin.com/in/ikechukwu-elizabeth) | [GitHub](https://github.com/elizabeth-ikechukwu)
