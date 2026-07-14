variable "project_name" {
  description = "Project name for resource naming and tagging"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "domain_name" {
  description = "Root domain name"
  type        = string
}

variable "hosted_zone_id" {
  description = "Existing Route53 hosted zone ID created manually"
  type        = string
}