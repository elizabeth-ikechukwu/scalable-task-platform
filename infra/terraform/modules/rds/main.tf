# ──────────────────────────────────────────────
# Read credentials from SSM
# Created manually — Terraform never writes these
# ──────────────────────────────────────────────
data "aws_ssm_parameter" "db_username" {
  name            = "/${var.project_name}/db_username"
  with_decryption = true
}

data "aws_ssm_parameter" "db_password" {
  name            = "/${var.project_name}/db_password"
  with_decryption = true
}

# ──────────────────────────────────────────────
# RDS Security Group
# # Allow PostgreSQL from EKS nodes and pods via VPC CNI
# ──────────────────────────────────────────────
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Allow PostgreSQL access from EKS nodes and pods"
  vpc_id      = var.vpc_id

  ingress {
    description     = "PostgreSQL from EKS nodes"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.eks_node_security_group_id]
  }

  ingress {
    description = "PostgreSQL from EKS pods via VPC CNI"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    ignore_changes = [ingress]
  }

  tags = {
    Name        = "${var.project_name}-rds-sg"
    Project     = var.project_name
    Environment = var.environment
  }
}

# ──────────────────────────────────────────────
# DB Subnet Group
# ──────────────────────────────────────────────
resource "aws_db_subnet_group" "tasks" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name    = "${var.project_name}-db-subnet-group"
    Project = var.project_name
  }
}

# ──────────────────────────────────────────────
# RDS Parameter Group
# ──────────────────────────────────────────────
resource "aws_db_parameter_group" "tasks" {
  name   = "${var.project_name}-pg16"
  family = "postgres16"

  tags = {
    Name    = "${var.project_name}-pg16"
    Project = var.project_name
  }
}

# ──────────────────────────────────────────────
# RDS Instance — PostgreSQL 16
# ──────────────────────────────────────────────
resource "aws_db_instance" "tasks" {
  identifier = "${var.project_name}-db"

  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true

  db_name  = var.db_name
  username = data.aws_ssm_parameter.db_username.value
  password = data.aws_ssm_parameter.db_password.value

  db_subnet_group_name   = aws_db_subnet_group.tasks.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false

  parameter_group_name    = aws_db_parameter_group.tasks.name
  backup_retention_period = 0
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