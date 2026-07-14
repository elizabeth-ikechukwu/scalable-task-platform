output "backend_repository_url" {
  description = "ECR backend repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "frontend_repository_url" {
  description = "ECR frontend repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "backend_repository_name" {
  description = "ECR backend repository name"
  value       = aws_ecr_repository.backend.name
}

output "frontend_repository_name" {
  description = "ECR frontend repository name"
  value       = aws_ecr_repository.frontend.name
}