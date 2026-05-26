# ─────────────────────────────────────────────
# RDS — PostgreSQL for Scalable Task Platform
# Week 7 | infra/terraform/rds.tf
# ─────────────────────────────────────────────

# ── DB Subnet Group ──────────────────────────
resource "aws_db_subnet_group" "tasks" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name    = "${var.project_name}-db-subnet-group"
    Project = var.project_name
  }
}

# ── Security Group: RDS ──────────────────────
# Only the EC2 instance (nginx sg) may reach
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
    security_groups = [aws_security_group.nginx.id]
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
  instance_class = "db.t3.micro"

  # Storage
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true

  # Credentials
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Network
  db_subnet_group_name   = aws_db_subnet_group.tasks.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false

  # Maintenance
  parameter_group_name    = aws_db_parameter_group.tasks.name
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"
  deletion_protection     = false

  lifecycle {
    ignore_changes = [password]
  }

  skip_final_snapshot = true

  tags = {
    Name    = "${var.project_name}-db"
    Project = var.project_name
  }
}

# ── Outputs ───────────────────────────────────
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
