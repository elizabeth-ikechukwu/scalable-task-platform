# Scalable Task Platform

A production-grade DevOps project documenting the full lifecycle of a task management application, from a simple backend service to a containerized, automated, cloud-deployed, and observable platform.

Built in public, one week at a time.

## What This Project Demonstrates
- Backend API development with Node.js and Express
- Containerization with Docker
- CI/CD automation with GitHub Actions
- Infrastructure as Code with Terraform
- Cloud deployment on AWS
- Container orchestration with Kubernetes
- Monitoring and observability with Prometheus and Grafana

## Stack
| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Infrastructure | Terraform |
| Cloud | AWS EC2 |
| Orchestration | Kubernetes |
| Monitoring | Prometheus, Grafana |

## Roadmap
| Week | Topic | Status |
|------|-------|--------|
| 1 | Project foundation and backend setup | Done |
| 2 | Dockerize the backend | In Progress |
| 3 | Add frontend and Docker Compose | Upcoming |
| 4 | CI with GitHub Actions | Upcoming |
| 5 | CD workflow and image registry | Upcoming |
| 6 | Terraform infrastructure setup | Upcoming |
| 7 | Cloud deployment on AWS | Upcoming |
| 8 | Kubernetes deployment | Upcoming |
| 9 | Monitoring with Prometheus and Grafana | Upcoming |
| 10 | Hardening and project polish | Upcoming |

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | / | API health check |
| GET | /health | Returns status and uptime |
| GET | /tasks | Returns all tasks |
| POST | /tasks | Creates a new task |
| PATCH | /tasks/:id | Toggles task complete or incomplete |
| DELETE | /tasks/:id | Deletes a task |

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm

### Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/scalable-task-platform.git
cd scalable-task-platform/app/backend
cp .env.example .env
npm install
npm start
```

Server runs on http://localhost:3000

## Weekly Updates
Detailed documentation for each week is in the [docs](docs/) folder.

## Author

Ikechukwu Elizabeth Nkwo

DevOps and Cloud Engineer

[LinkedIn](https://www.linkedin.com/in/ikechukwu-elizabeth)