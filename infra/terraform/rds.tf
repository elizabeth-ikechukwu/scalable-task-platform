# ─────────────────────────────────────────────
# RDS — PostgreSQL for Scalable Task Platform
# Week 7 | infra/terraform/rds.tf
# ─────────────────────────────────────────────

# ── DB Subnet Group ──────────────────────────
# RDS needs to know which subnets it can live in.
# We use the private subnets so it is never
# reachable from the public internet.
resource "aws_db_subnet_group" "tasks" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name    = "${var.project_name}-db-subnet-group"
    Project = var.project_name
  }
}

# ── Security Group: RDS ──────────────────────
# Only the EC2 instance security group may reach
# the database on port 5432. No public access.
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Allow PostgreSQL access from EC2 only"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from EC2"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "${var.project_name}-rds-sg"
    Project = var.project_name
  }
}

# ── RDS Parameter Group ──────────────────────
# Explicit parameter group gives you a place to
# tune Postgres settings later without replacing
# the instance.
resource "aws_db_parameter_group" "tasks" {
  name   = "${var.project_name}-pg16"
  family = "postgres16"

  tags = {
    Name    = "${var.project_name}-pg16"
    Project = var.project_name
  }
}

# ── RDS Instance ─────────────────────────────
resource "aws_db_instance" "tasks" {
  identifier = "${var.project_name}-db"

  # Engine
  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.t3.micro" # Free-tier eligible

  # Storage
  allocated_storage     = 20
  max_allocated_storage = 100 # Enable storage autoscaling up to 100 GB
  storage_type          = "gp2"
  storage_encrypted     = true

  # Credentials — sourced from Terraform variables
  # which are populated from GitHub Secrets via the pipeline
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Network
  db_subnet_group_name   = aws_db_subnet_group.tasks.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false # Single-AZ is fine for this stage

  # Maintenance
  parameter_group_name    = aws_db_parameter_group.tasks.name
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"
  deletion_protection     = false # Set to true before production hardening (Week 10)

  # Lifecycle — prevent accidental destroy on credential rotation
  lifecycle {
    ignore_changes = [password]
  }

  skip_final_snapshot = true # Change to false and set final_snapshot_identifier for production

  tags = {
    Name    = "${var.project_name}-db"
    Project = var.project_name
  }
}

# ── Outputs ───────────────────────────────────
# The EC2 user-data script and any future modules
# that need the DB endpoint will read these.
output "rds_endpoint" {
  description = "RDS instance endpoint (host:port)"
  value       = aws_db_instance.tasks.endpoint
}

output "rds_hostname" {
  description = "RDS hostname only (no port)"
  value       = aws_db_instance.tasks.address
}

output "rds_port" {
  description = "RDS port"
  value       = aws_db_instance.tasks.port
}

output "rds_db_name" {
  description = "Database name"
  value       = aws_db_instance.tasks.db_name
}
