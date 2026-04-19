# Scalable Task Platform

A production-grade DevOps project documenting the full lifecycle of a task management application, from a simple backend service to a containerized, automated, cloud-deployed, and observable platform.

Built in public, one week at a time.

---

## What This Project Demonstrates

- Backend API development with Node.js and Express
- Containerization with Docker
- CI/CD automation with GitHub Actions, Amazon ECR, and Docker Hub
- Infrastructure as Code with Terraform
- Cloud deployment on AWS
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
| 5 | Terraform infrastructure setup | Upcoming |
| 6 | Cloud deployment on AWS EC2 | Upcoming |
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

Every pull request and push to `main` triggers a four-stage pipeline:

```
lint -> unit-test -> build-and-integration-test -> publish
```

The publish stage runs on merge to `main` only. Images are pushed to both Amazon ECR and Docker Hub, tagged with `latest` and the short Git SHA for traceability.

AWS authentication uses OIDC - no static credentials stored in GitHub secrets.

---

## Weekly Updates

Detailed documentation for each week is in the [docs](docs/) folder.

---

## Author

Ikechukwu Elizabeth Nkwo

DevOps and Cloud Engineer

[LinkedIn](https://www.linkedin.com/in/ikechukwu-elizabeth)
