# Scalable Task Platform

A production-grade DevOps project documenting the full lifecycle of a task management application, from a simple backend service to a containerized, automated, cloud-deployed, and observable platform.

Built in public, one week at a time.

---

## What This Project Demonstrates

- Backend API development with Node.js and Express
- Containerization with Docker
- CI/CD automation with GitHub Actions, Amazon ECR, and Docker Hub
- Infrastructure as Code with Terraform
- Cloud deployment on AWS EC2
- Container orchestration with Kubernetes
- Monitoring and observability with Prometheus and Grafana

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Image Registry | Amazon ECR, Docker Hub |
| Infrastructure | Terraform |
| Cloud | AWS EC2 |
| Orchestration | Kubernetes |
| Monitoring | Prometheus, Grafana |

---

## Roadmap

| Week | Topic | Status |
|---|---|---|
| 1 | Project foundation and backend API | [Done](docs/week-1-update.md) |
| 2 | Dockerize the backend | [Done](docs/week-2-update.md) |
| 3 | React frontend and Docker Compose | [Done](docs/week-3-update.md) |
| 4 | CI/CD pipeline with GitHub Actions, ECR and Docker Hub | [Done](docs/week-4-update.md) |
| 5 | Terraform infrastructure and CI/CD pipeline extension | [Done](docs/week-5-update.md) |
| 6 | Cloud deployment on AWS EC2 | [Done](docs/week-6-update.md) |
| 7 | Database integration | Upcoming |
| 8 | Kubernetes deployment | Upcoming |
| 9 | Monitoring with Prometheus and Grafana | Upcoming |
| 10 | Hardening and project polish | Upcoming |

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api | API status |
| GET | /api/health | Returns status and uptime |
| GET | /api/tasks | Returns all tasks |
| POST | /api/tasks | Creates a new task |
| PATCH | /api/tasks/:id | Toggles task complete or incomplete |
| DELETE | /api/tasks/:id | Deletes a task |

---

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm
- Docker and Docker Compose

### Run Locally Without Docker

```bash
git clone https://github.com/elizabeth-ikechukwu/scalable-task-platform.git
cd scalable-task-platform/app/backend
cp .env.example .env
npm install
npm start
```

Server runs on http://localhost:3000

### Run With Docker Compose

```bash
git clone https://github.com/elizabeth-ikechukwu/scalable-task-platform.git
cd scalable-task-platform
docker compose up -d
```

Frontend runs on http://localhost:80

---

## CI/CD Pipeline

Every pull request and push to `main` triggers a five-stage pipeline:

```
lint -> unit-test -> build-and-integration-test -> publish -> terraform-apply
```

- `terraform-plan` runs on every pull request — shows exactly what infrastructure will change before merging
- `terraform-apply` runs on merge to `main` — infrastructure is provisioned by the pipeline, never from a local machine
- The `publish` stage pushes images to both Amazon ECR and Docker Hub, tagged with `latest` and the short Git SHA

AWS authentication uses OIDC — no static credentials stored in GitHub secrets.

---

## Infrastructure

All infrastructure is provisioned with Terraform and lives in `infra/terraform/`.

| Resource | Details |
|---|---|
| VPC | Custom VPC with public subnet |
| Networking | Internet gateway, route tables |
| Security | Security groups with least-privilege rules |
| Compute | EC2 t3.micro running Amazon Linux 2023 |
| IAM | Instance profile with SSM and ECR permissions |
| State | S3 remote backend with native state locking |

EC2 instances configure themselves on first boot via a user data script — Docker is installed, images are pulled from ECR, and containers start automatically. No SSH required. All access via AWS SSM Session Manager.

---

## Weekly Updates

Detailed documentation for each week is in the [docs](docs/) folder.

---

## Author

Ikechukwu Elizabeth Nkwo

DevOps and Cloud Engineer

[LinkedIn](https://www.linkedin.com/in/ikechukwu-elizabeth)
