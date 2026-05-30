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
  default     = "scalable-task-platform"
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

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for the two private subnets across two AZs"
  type        = list(string)
  default     = ["10.0.2.0/24", "10.0.3.0/24"]
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "tasksdb"
}

variable "db_username" {
  description = "PostgreSQL master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "PostgreSQL master password"
  type        = string
  sensitive   = true
}

variable "db_host" {
  description = "RDS instance hostname - output from aws_db_instance.tasks.address"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret for authentication"
  type        = string
  sensitive   = true
}
