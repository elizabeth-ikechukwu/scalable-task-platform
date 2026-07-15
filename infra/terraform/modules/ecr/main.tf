# ──────────────────────────────────────────────
# ECR — Backend Repository
# ──────────────────────────────────────────────
resource "aws_ecr_repository" "backend" {
  name                 = "task-backend"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "task-backend"
    Project     = var.project_name
    Environment = var.environment
  }
}

# ──────────────────────────────────────────────
# ECR — Frontend Repository
# ──────────────────────────────────────────────
resource "aws_ecr_repository" "frontend" {
  name                 = "task-frontend"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "task-frontend"
    Project     = var.project_name
    Environment = var.environment
  }
}

# ──────────────────────────────────────────────
# ECR Lifecycle Policy — Backend
# Keep last 10 images, delete older ones
# ──────────────────────────────────────────────
resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# ──────────────────────────────────────────────
# ECR Lifecycle Policy — Frontend
# ──────────────────────────────────────────────
resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}