output "db_host_parameter_arn" {
  description = "SSM parameter ARN for db_host"
  value       = aws_ssm_parameter.db_host.arn
}

output "parameter_path" {
  description = "SSM parameter path prefix"
  value       = "/${var.project_name}/"
}