# ──────────────────────────────────────────────
# Read manually created secrets from SSM
# These were created manually in AWS console/CLI
# Terraform never writes or overwrites these values
# ──────────────────────────────────────────────
data "aws_ssm_parameter" "db_username" {
  name            = "/${var.project_name}/db_username"
  with_decryption = true
}

data "aws_ssm_parameter" "db_password" {
  name            = "/${var.project_name}/db_password"
  with_decryption = true
}

data "aws_ssm_parameter" "jwt_secret" {
  name            = "/${var.project_name}/jwt_secret"
  with_decryption = true
}

# ──────────────────────────────────────────────
# Terraform manages these parameters
# db_host comes from RDS module output
# db_name and db_ssl are non-sensitive
# ──────────────────────────────────────────────
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

resource "aws_ssm_parameter" "db_ssl" {
  name        = "/${var.project_name}/db_ssl"
  description = "Enable SSL for RDS connection"
  type        = "String"
  value       = "true"

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}