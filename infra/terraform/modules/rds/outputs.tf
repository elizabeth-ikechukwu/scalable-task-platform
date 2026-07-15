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