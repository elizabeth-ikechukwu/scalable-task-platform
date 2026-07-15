variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID - set in terraform.tfvars, never hardcoded"
  type        = string
}

variable "project_name" {
  description = "Project name used for naming and tagging all resources"
  type        = string
  default     = "taskflow"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets across two AZs"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets across two AZs"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "taskflow-prod-cluster"
}

variable "kubernetes_version" {
  description = "Kubernetes version for EKS"
  type        = string
  default     = "1.31"
}

variable "node_instance_type" {
  description = "EC2 instance type for EKS worker nodes"
  type        = string
  default     = "t3.small"
}

variable "node_desired_size" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 2
}

variable "node_min_size" {
  description = "Minimum number of worker nodes"
  type        = number
  default     = 1
}

variable "node_max_size" {
  description = "Maximum number of worker nodes"
  type        = number
  default     = 5
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "tasksdb"
}

variable "domain_name" {
  description = "Root domain name"
  type        = string
  default     = "thetaskflowapp.online"
}

variable "hosted_zone_id" {
  description = "Existing Route53 hosted zone ID created manually"
  type        = string
  default     = "Z098374034PJXH8HEOHWP"
}