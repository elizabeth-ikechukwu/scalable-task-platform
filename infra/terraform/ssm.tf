# --------------------------------------------------
# SSM Parameter Store
# Stores all runtime secrets for the EC2 instance.
# EC2 fetches these at startup - no secrets in user data.
# --------------------------------------------------

resource "aws_ssm_parameter" "db_host" {
  name        = "/${var.project_name}/db_host"
  description = "RDS instance hostname"
  type        = "SecureString"
  value       = var.db_host

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "db_name" {
  name        = "/${var.project_name}/db_name"
  description = "PostgreSQL database name"
  type        = "SecureString"
  value       = var.db_name

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "db_username" {
  name        = "/${var.project_name}/db_username"
  description = "PostgreSQL master username"
  type        = "SecureString"
  value       = var.db_username

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "db_password" {
  name        = "/${var.project_name}/db_password"
  description = "PostgreSQL master password"
  type        = "SecureString"
  value       = var.db_password

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "jwt_secret" {
  name        = "/${var.project_name}/jwt_secret"
  description = "JWT signing secret for authentication"
  type        = "SecureString"
  value       = var.jwt_secret

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}
