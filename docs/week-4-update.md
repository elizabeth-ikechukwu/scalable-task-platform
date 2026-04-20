# Week 4 - GitHub Actions CI/CD Pipeline

## Overview

Week 4 introduces a production-grade CI/CD pipeline to the Scalable Task Platform. Every push and pull request targeting `main` runs a full four-stage pipeline: lint, unit tests, integration test, and image publish. AWS authentication uses OIDC - no static credentials stored anywhere. Images are pushed to both Amazon ECR and Docker Hub on every successful merge to `main`.

---

## Pipeline Architecture

```
Push / PR to main
        |
        v
   [ lint ]
        |
        v
  [ unit-test ]
   needs: lint
        |
        v
[ build-and-integration-test ]
      needs: unit-test
        |
        v
     [ publish ]
  needs: build-and-integration-test
  if: push to main only, skipped on PRs
        |
        +---------------------------+
        |                           |
        v                           v
   Amazon ECR                  Docker Hub
   task-backend:latest         lizzycloudlab/task-backend:latest
   task-backend:sha-<sha>      lizzycloudlab/task-backend:sha-<sha>
   task-frontend:latest        lizzycloudlab/task-frontend:latest
   task-frontend:sha-<sha>     lizzycloudlab/task-frontend:sha-<sha>
```

---

## Files Added / Modified

| File | Change |
|---|---|
| `.github/workflows/ci-cd.yml` | Single workflow replacing two separate files |
| `docker-compose.yml` | Added healthcheck blocks, upgraded depends_on to condition: service_healthy |
| `app/backend/server.js` | Prefixed all routes with /api/, updated health endpoint response |
| `iam/github-actions-trust-policy.json` | OIDC trust policy scoped to this repo only |
| `iam/github-actions-ecr-policy.json` | Least-privilege ECR push permissions |

---

## AWS Authentication: OIDC

This pipeline uses OpenID Connect (OIDC) for AWS authentication. No AWS access keys are stored in GitHub secrets.

Each workflow run, GitHub generates a short-lived signed JWT token. AWS STS verifies the token against the registered GitHub OIDC provider and issues temporary credentials scoped to that job only. Credentials expire the moment the job finishes. Nothing to rotate, nothing to leak.

The IAM role `github-actions-scalable-task-platform` is scoped tightly:

- **Trust policy** - only tokens from `repo:elizabeth-ikechukwu/scalable-task-platform:*` can assume the role
- **Permissions policy** - ECR push to `task-backend` and `task-frontend` only, nothing else in the AWS account

---

## Image Tagging Strategy

| Tag | Purpose |
|---|---|
| `latest` | Always points to the most recent successful build |
| `sha-abc1234` | Immutable reference to the exact commit, used for rollback |

Every running container can be traced back to the exact line of code that produced it using the SHA tag.

---

## ECR Repositories

| Repository | URI |
|---|---|
| task-backend | `424522917561.dkr.ecr.us-east-1.amazonaws.com/task-backend` |
| task-frontend | `424522917561.dkr.ecr.us-east-1.amazonaws.com/task-frontend` |

Both repositories configured with: private visibility, mutable tags, AES-256 encryption, scan on push enabled.

---

## GitHub Secrets

| Secret | Purpose |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub login username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not password) |

No AWS secrets needed. OIDC handles AWS authentication entirely.

---

## Docker Compose Health Checks

Both services now have health checks defined. Docker probes the backend every 10 seconds via `GET /api/health`. The frontend `depends_on` uses `condition: service_healthy` meaning Nginx will not start until the backend passes its health probe. This prevents the frontend from coming up pointing at a backend that is not ready.

---

## Branch Protection

`main` is protected with the following rules enforced:

- No direct pushes - all changes must go through a pull request
- Force pushes blocked
- Branch deletion blocked

All development happens on feature branches and merges to `main` via PR.

---
## Testing and Linting

The backend includes a full test and lint setup before the pipeline was built.

**ESLint** - configured via `eslint.config.js` using the new flat config format
required by ESLint v9+. Lints all `.js` files with a separate config block for
test files that includes Jest globals.

**Jest + Supertest** - four unit and integration tests covering:
- `GET /api/health` returns 200 with status ok
- `GET /api/tasks` returns empty array initially
- `POST /api/tasks` creates a task correctly
- `POST /api/tasks` returns 400 when title is missing

Both pass cleanly locally before the pipeline runs them in CI.

## Troubleshooting Log

### ECR Push 403 Forbidden

**What happened:**
The publish job failed on the first run with a 403 Forbidden error when pushing
to ECR. The OIDC authentication succeeded - AWS accepted the GitHub token and
issued temporary credentials - but the credentials were denied when pushing the
image.

**Root cause:**
The IAM permissions policy was missing two ECR actions required by the Docker
buildx push process:
- `ecr:BatchGetImage` - needed to check if image layers already exist in ECR
- `ecr:GetDownloadUrlForLayer` - needed to verify existing layers before upload

Without these, ECR rejected the push with 403 even though authentication passed.

**Fix:**
Added the two missing actions to the `ECRImagePush` statement in
`iam/github-actions-ecr-policy.json` and updated the inline policy on the IAM
role in AWS console.

**Lesson:**
Authentication (proving who you are) and authorization (what you are allowed to
do) are separate. OIDC handled authentication correctly. The permissions policy
handles authorization. A 403 always means authentication passed but
authorization failed - the identity is recognized but not permitted to perform
that specific action.

## What Week 5 Adds

Week 5 introduces Terraform to provision AWS infrastructure - VPC, subnets, security groups, and EC2 instance. The EC2 instance will pull images directly from ECR at deploy time using the same OIDC authentication pattern established this week.
