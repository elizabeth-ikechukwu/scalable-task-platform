variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
}

variable "state_bucket_name" {
  description = "Name of the S3 bucket that stores Terraform state. Must be globally unique."
  type        = string
  default     = "scalable-task-platform-tfstate"
}