output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster API server endpoint"
  value       = module.eks.cluster_endpoint
}

output "ecr_backend_url" {
  description = "ECR backend repository URL"
  value       = module.ecr.backend_repository_url
}

output "ecr_frontend_url" {
  description = "ECR frontend repository URL"
  value       = module.ecr.frontend_repository_url
}

output "rds_hostname" {
  description = "RDS hostname"
  value       = module.rds.rds_hostname
  sensitive   = true
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = module.rds.rds_endpoint
  sensitive   = true
}

output "certificate_arn" {
  description = "ACM certificate ARN"
  value       = module.dns.certificate_arn
}

output "app_url" {
  description = "TaskFlow app URL"
  value       = "https://${var.domain_name}"
}

output "argocd_url" {
  description = "ArgoCD URL"
  value       = "https://argocd.${var.domain_name}"
}

output "nameservers" {
  description = "Route53 nameservers"
  value       = "Hosted zone already configured - nameservers set in Hostinger"
}