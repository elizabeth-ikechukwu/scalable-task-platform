# Week 8: JWT Authentication, SSM Parameter Store, and UI Overhaul

## What We Built

This week was the biggest week of the project. We added real user authentication, moved all secrets into AWS SSM Parameter Store, built a complete 26-page React frontend with Tailwind CSS, set up a permanent domain with HTTPS, and automated the entire deployment pipeline with zero manual steps.

## Authentication

### JWT with bcrypt

Every user registers with a name, email, and password. The password is hashed with bcrypt at cost factor 12 before it touches the database. The plain text password is never stored anywhere.

On login the backend verifies the password against the stored hash. If it matches, it generates a JWT signed with a secret key. That token is returned to the frontend and stored in memory. Every subsequent request to a protected route sends the token in the Authorization header as a Bearer token.

The backend middleware verifies the token signature and extracts the user ID. All data queries are scoped to that user ID. One user cannot access another user's tasks, projects, or teams.

### Auth Routes

```
POST /api/auth/register   -- create account
POST /api/auth/login      -- returns JWT token
GET  /api/auth/me         -- returns current user from token
```

## AWS SSM Parameter Store

### Why SSM Instead of Environment Variables

Before this week, database credentials lived in GitHub Secrets and were passed as environment variables through the pipeline. That works but it means secrets touch the pipeline runner, appear in workflow logs if misconfigured, and are coupled to GitHub.

SSM Parameter Store puts secrets in AWS. They are encrypted with KMS, access-controlled with IAM, and fetched at runtime by the EC2 instance using its instance role. The pipeline never sees the secret values. GitHub never sees them. They exist only in AWS.

### Parameters Stored

All parameters are stored as SecureStrings under the path /scalable-task-platform/:

```
/scalable-task-platform/db_host
/scalable-task-platform/db_name
/scalable-task-platform/db_username
/scalable-task-platform/db_password
/scalable-task-platform/jwt_secret
/scalable-task-platform/db_ssl
```

### How EC2 Fetches Them

The EC2 startup script and the deploy job both fetch secrets from SSM using the AWS CLI with the --with-decryption flag. The values are assigned to shell variables and passed directly to the Docker container as environment variables. They are never written to disk.

```bash
DB_PASSWORD=$(aws ssm get-parameter \
  --name /scalable-task-platform/db_password \
  --with-decryption \
  --query Parameter.Value \
  --output text \
  --region us-east-1)
```

### IAM Permissions

The EC2 instance role has read-only access to SSM parameters scoped to the /scalable-task-platform/ path. It cannot write, delete, or list parameters outside that path. The GitHub Actions role has write access to create and update parameters through Terraform.

## Frontend Overhaul

### 26 Pages Built

The frontend was rebuilt from scratch with React and Tailwind CSS. Pages include:

- Landing, Login, Register
- Dashboard, Tasks, Projects, Teams, Calendar, Activity, Notifications, Analytics, Settings
- Pricing, About, Contact, Status
- Feature pages: Task Management, Team Collaboration, Notifications, Project Workspaces, Analytics, Security, Architecture

### Design Decisions

Dark theme was chosen deliberately. Enterprise tools like Linear, GitHub, Vercel, and the AWS console all use dark themes. The color palette uses a refined dark background at #0d0f14 with surface layers at #13151c and #1a1d26. Base font size is 16px using DM Sans for body text and Syne for display headings.

### Nginx Reverse Proxy

The frontend container runs Nginx which serves the React build and proxies all /api/ requests to the backend container on port 3000. The browser only talks to Nginx. The backend is never directly exposed.

## Infrastructure

### Elastic IP

A static Elastic IP is allocated and associated with the EC2 instance. Regular EC2 public IPs change on every restart which would break domain pointing. The Elastic IP stays permanent regardless of instance state changes.

### Route53 DNS

A Route53 hosted zone was created for lizzycloudlab.online. The default Hostinger nameservers were replaced with the four AWS nameservers. A records were created for:

- taskflow.lizzycloudlab.online pointing to the Elastic IP
- lizzycloudlab.online pointing to the Elastic IP

Both the hosted zone and A records are managed by Terraform in dns.tf.

### HTTPS with Let's Encrypt

A Let's Encrypt certificate was obtained for taskflow.lizzycloudlab.online using Certbot in standalone mode on the EC2 instance. The certificate lives at /etc/letsencrypt/live/taskflow.lizzycloudlab.online/ on the EC2 instance.

The frontend container does not bake the certificate in at build time. Instead the deploy job mounts /etc/letsencrypt into the container as a read-only volume and copies the HTTPS nginx config from /home/ec2-user/nginx-https.conf into the container after it starts. This keeps the CI build clean since the certificate does not exist on the GitHub Actions runner.

The nginx config redirects all HTTP traffic to HTTPS and serves the application on port 443 with TLS 1.2 and 1.3.

## CI/CD Pipeline

### Pipeline Jobs

The pipeline has six jobs that run in sequence:

```
lint -> unit-test -> build-and-integration-test -> publish -> terraform-apply -> deploy
```

On pull requests: lint, unit-test, build-and-integration-test, terraform-plan run.
On merge to main: all six jobs run including publish, terraform-apply, and deploy.

### OIDC Authentication

GitHub Actions authenticates to AWS using OIDC federation. No static AWS access keys exist anywhere. The GitHub Actions role assumes permissions only for the duration of the workflow run.

### Deploy Job

The deploy job uses aws ssm send-command to run a shell script on the EC2 instance. The script:

1. Authenticates to Amazon ECR
2. Pulls the latest backend and frontend images
3. Stops and removes old containers
4. Fetches all secrets from SSM Parameter Store
5. Starts the backend container with secrets as environment variables
6. Starts the frontend container with the Let's Encrypt volume mounted
7. Copies the HTTPS nginx config into the frontend container
8. Reloads nginx

No SSH. No key pairs. No open port 22. All access through AWS SSM.

### Image Tagging

Every build produces two tags for both backend and frontend images:

- :latest for the most recent build
- :sha-{short-commit-hash} for immutable version pinning

Images are pushed to both Amazon ECR and Docker Hub.

## Security Hardening

- IMDSv2 enforced on EC2 with http_tokens = required
- Root volume encrypted with gp3
- No SSH access, port 22 never opened
- All management through AWS SSM Session Manager
- RDS in private subnet, no public IP
- SSL required for all database connections
- JWT tokens signed with a secret stored only in SSM
- bcrypt password hashing at cost factor 12
- HTTPS enforced, HTTP redirects to HTTPS

## Live Platform

The platform is live at https://taskflow.lizzycloudlab.online

Users can register, log in, create tasks, mark tasks complete, create projects, add team members, view notifications, and track progress in the analytics dashboard.

## What is Next

Week 9 migrates TaskFlow to Kubernetes on AWS EKS. The containers are already built and the infrastructure patterns are established. Kubernetes adds self-healing, auto-scaling, rolling deployments, and the foundation for GitOps with ArgoCD.
