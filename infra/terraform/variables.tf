variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID — set in terraform.tfvars, never hardcoded"
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

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet"
  type        = string
  default     = "10.0.2.0/24"
}