# Week 6 — Cloud Deployment on AWS EC2

## What I Built

Week 6 took everything built in Week 5 and made it live. TaskFlow — the full-stack Node.js and React application — is now running on AWS EC2, deployed automatically by the CI/CD pipeline with zero manual server setup.

---

## How Deployment Works

When a PR merges to `main`, the pipeline:

1. Runs lint, unit tests, and integration tests
2. Builds Docker images and pushes them to Amazon ECR
3. Runs `terraform apply` — creates or updates infrastructure
4. The EC2 instance boots and runs a user data script automatically

The user data script handles everything on first boot:

```
1. Update the system packages
2. Install Docker and start the service
3. Wait for Docker to be fully ready
4. Add ec2-user to the docker group
5. Install AWS CLI
6. Authenticate to ECR using the IAM instance profile
7. Pull task-backend:latest from ECR
8. Pull task-frontend:latest from ECR
9. Start backend container on port 3000 (restart unless stopped)
10. Wait for backend to be ready
11. Start frontend container on port 80 (restart unless stopped)
```

No SSH. No manual commands. The instance configures itself.

---

## Access Method

All server access is through **AWS SSM Session Manager** — not SSH.

- Port 22 is closed on the security group
- The EC2 IAM role has `AmazonSSMManagedInstanceCore` attached
- Sessions are opened via the AWS console or AWS CLI

This is the production-standard approach. No key pairs to manage, no inbound SSH exposure, full audit trail of every session in AWS CloudTrail.

---

## What Runs on EC2

| Container | Image Source | Port | Restart Policy |
|---|---|---|---|
| task-backend | Amazon ECR | 3000 (internal) | unless-stopped |
| task-frontend | Amazon ECR | 80 (public) | unless-stopped |

The frontend container runs Nginx, which serves the React build and proxies `/api` requests to the backend container.

---

## Architecture After Week 6

```
Internet
    │
    ▼
EC2 Public IP :80
    │
    ▼
task-frontend (Nginx)
    │
    ├── Serves React frontend (/)
    │
    └── Proxies /api requests → task-backend :3000
                                      │
                                      ▼
                               Express API
                             (in-memory store)
```

---

## Key Decisions

**Why no Docker Compose on EC2?**
The containers are run directly with `docker run` in the user data script. Docker Compose adds a dependency that needs to be installed separately on Amazon Linux 2023. Direct `docker run` with `--link` keeps the bootstrap simple and reliable.

**Why `--restart unless-stopped`?**
If the EC2 instance reboots, Docker restarts the containers automatically. The application comes back online without any intervention.

**Why ECR and not Docker Hub?**
ECR is private, in the same AWS region as the EC2 instance, and authenticated via IAM — no credentials to manage. Pulls are fast and free within the same region.

---

## Files Changed

```
infra/terraform/ec2.tf    (user data script updated — sleep added for Docker readiness)
```

---

## Screenshots

See `docs/week-06/` for:
- TaskFlow running live in the browser at the EC2 public IP
- SSM Session Manager connection to the EC2 instance
- Docker containers running on the instance (`docker ps`)
- GitHub Actions pipeline showing full run with terraform-apply
