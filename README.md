# Scalable Task Platform

A production-grade DevOps project documenting the full lifecycle of a task management application -- from a simple backend API to a fully authenticated, containerized, cloud-deployed SaaS platform with a professional frontend.

Built in public, one week at a time.

---

## What This Project Demonstrates

- Backend API development with Node.js and Express
- PostgreSQL database integration with AWS RDS
- JWT-based user authentication and authorization
- Containerization with Docker and Docker Compose
- Multi-stage Docker builds with Nginx reverse proxy
- CI/CD automation with GitHub Actions, Amazon ECR, and Docker Hub
- Infrastructure as Code with Terraform
- Secrets management with AWS SSM Parameter Store
- Cloud deployment on AWS EC2 with SSM-only access
- Professional React frontend with Tailwind CSS
- Container orchestration with Kubernetes (upcoming)
- Monitoring and observability with Prometheus and Grafana (upcoming)

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL on AWS RDS |
| Authentication | JWT, bcryptjs |
| Containerization | Docker, Docker Compose |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |
| Image Registry | Amazon ECR, Docker Hub |
| Infrastructure | Terraform |
| Secrets | AWS SSM Parameter Store |
| Cloud | AWS EC2, RDS, VPC, IAM |
| Orchestration | Kubernetes (upcoming) |
| Monitoring | Prometheus, Grafana (upcoming) |

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
| 7 | PostgreSQL on AWS RDS with Terraform | [Done](docs/week-7-update.md) |
| 8 | JWT authentication, SSM Parameter Store, UI overhaul | [Done](docs/week-8-update.md) |
| 9 | Kubernetes deployment | Upcoming |
| 10 | Hardening and project polish | Upcoming |

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

Tokens are issued on login and registration. They expire after 7 days.

Passwords are hashed with bcrypt at cost factor 12. Plain text passwords are never stored.

---

## Frontend

The frontend is a React + Vite + Tailwind CSS application with 26 pages including:

- Landing page with feature sections
- Authentication pages (login and register)
- Full dashboard with sidebar navigation
- Dashboard pages: Tasks, Projects, Teams, Calendar, Activity, Notifications, Analytics, Settings
- Feature detail pages for all 7 platform features
- Marketing pages: Pricing, About, Contact, Status

---

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm
- Docker and Docker Compose

### Run Backend Locally

```bash
git clone https://github.com/elizabeth-ikechukwu/scalable-task-platform.git
cd scalable-task-platform/app/backend
cp .env.example .env
npm install
npm start
```

Server runs on http://localhost:3000

### Run Frontend Locally

```bash
cd scalable-task-platform/app/frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

### Run Full Stack With Docker Compose

```bash
git clone https://github.com/elizabeth-ikechukwu/scalable-task-platform.git
cd scalable-task-platform
docker compose up -d
```

Full stack runs on http://localhost:80

---

## CI/CD Pipeline

Every pull request and push to `main` triggers a five-stage pipeline:

```
lint -> unit-test -> build-and-integration-test -> publish -> terraform-apply
```

- `terraform-plan` runs on every pull request -- shows exactly what infrastructure will change before merging
- `terraform-apply` runs on merge to `main` -- provisions SSM parameters, infrastructure, and deploys to EC2
- The `publish` stage pushes images to both Amazon ECR and Docker Hub tagged with `latest` and the short Git SHA

AWS authentication uses OIDC -- no static credentials stored in GitHub secrets.

---

## Infrastructure

All infrastructure is provisioned with Terraform and lives in `infra/terraform/`.

| Resource | Details |
|---|---|
| VPC | Custom VPC with public and private subnets |
| Networking | Internet gateway, route tables |
| Security | Security groups with least-privilege rules |
| Compute | EC2 t3.micro running Amazon Linux 2023 |
| Database | RDS PostgreSQL 16 on db.t3.micro in private subnet |
| Secrets | SSM Parameter Store with SecureString encryption |
| IAM | Instance profile scoped to SSM parameters and ECR |
| State | S3 remote backend with native state locking |

EC2 instances configure themselves on first boot via a user data script -- Docker is installed, secrets are fetched from SSM Parameter Store at runtime, images are pulled from ECR, and containers start automatically. No SSH required. All access via AWS SSM Session Manager.

---

## Security

- JWT authentication on all protected API routes
- Passwords hashed with bcrypt (cost factor 12)
- Database credentials stored in AWS SSM Parameter Store -- never in code or environment files
- EC2 has no SSH access -- management via SSM Session Manager only
- RDS in private subnet -- no public internet access
- IMDSv2 enforced on EC2 metadata endpoint
- EBS volumes encrypted at rest

---

## Weekly Updates

Detailed documentation for each week is in the [docs](docs/) folder.

---

## Author

Ikechukwu Elizabeth Nkwo

DevOps and Cloud Engineer

[LinkedIn](https://www.linkedin.com/in/ikechukwu-elizabeth) | [GitHub](https://github.com/elizabeth-ikechukwu)
