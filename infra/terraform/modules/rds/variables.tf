variable "project_name" {
  description = "Project name for resource naming and tagging"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID from VPC module"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs from VPC module"
  type        = list(string)
}

variable "eks_node_security_group_id" {
  description = "EKS node security group ID - allows pods to reach RDS"
  type        = string
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
}