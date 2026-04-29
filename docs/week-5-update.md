# Week 5 — Terraform Infrastructure and CI/CD Pipeline Extension

## What I Built

Week 5 added two major pieces: full AWS infrastructure provisioned with Terraform, and an extended CI/CD pipeline that owns infrastructure changes end to end.

---

## Terraform Bootstrap

Before the main infrastructure, I created a bootstrap layer in `infra/terraform/bootstrap/` to set up remote state storage.

- S3 bucket with versioning, AES256 encryption, and public access blocked
- Native state locking using `use_lockfile = true` — available from Terraform 1.10 onwards
- No DynamoDB table required — Terraform writes a `.tflock` file directly to S3

This is the modern approach. One less AWS resource to manage, same production-grade protection.

---

## Main Infrastructure

All resources live in `infra/terraform/` and are split across focused files:

**`vpc.tf`**
- Custom VPC (`10.0.0.0/16`)
- Public subnet (`10.0.1.0/24`) in `us-east-1a`
- Internet gateway attached to the VPC
- Route table with a default route to the internet gateway
- Route table association to the public subnet

**`security-group.tf`**
- Security group allowing inbound HTTP (port 80) from anywhere
- All outbound traffic allowed
- Port 22 (SSH) intentionally closed — access via SSM only

**`iam.tf`**
- IAM role for EC2 with two managed policies attached:
  - `AmazonSSMManagedInstanceCore` — enables SSM Session Manager access
  - `AmazonEC2ContainerRegistryReadOnly` — allows pulling images from ECR
- Instance profile wrapping the role

**`ec2.tf`**
- Data source querying AWS at plan time for the latest Amazon Linux 2023 AMI — no hardcoded AMI ID
- EC2 `t3.micro` instance in the public subnet
- 20GB encrypted `gp3` root volume
- User data script that runs on first boot:
  - Installs Docker and starts the service
  - Authenticates to ECR
  - Pulls backend and frontend images
  - Starts both containers with `--restart unless-stopped`

**`outputs.tf`**
- Public IP of the EC2 instance — printed after every apply

---

## CI/CD Pipeline Extension

Added two new jobs to `.github/workflows/ci-cd.yml`:

**`terraform-plan`**
- Triggers on every pull request
- Runs `terraform init` and `terraform plan`
- Shows exactly what will change before any merge
- Depends on `build-and-integration-test` passing first

**`terraform-apply`**
- Triggers on merge to `main` only
- Runs `terraform init` and `terraform apply -auto-approve`
- Infrastructure is created by the pipeline — never from a local machine

Both jobs authenticate to AWS using the existing OIDC role. No static credentials.

---

## Production Discipline

The local machine provisions once to validate everything works. Then `terraform destroy` hands control to the pipeline permanently. From that point forward, infrastructure changes only happen through Git — a PR shows the plan, a merge triggers the apply.

---

## Architecture After Week 5

```
GitHub
  │
  ├── Pull Request  →  terraform-plan (shows what will change)
  │
  └── Merge to main →  lint → unit-test → build → publish → terraform-apply
                                                                    │
                                                              AWS Infrastructure
                                                              VPC / Subnet / SG
                                                              IAM / EC2
```

---

## Files Added

```
infra/terraform/
├── vpc.tf
├── security-group.tf
├── iam.tf
├── ec2.tf
└── outputs.tf

.github/workflows/ci-cd.yml   (terraform-plan and terraform-apply jobs added)
```

---

## Screenshots

See `docs/week-05/` for:
- Terraform plan output
- Terraform apply output showing 13 resources created
- GitHub Actions pipeline with all jobs passing
