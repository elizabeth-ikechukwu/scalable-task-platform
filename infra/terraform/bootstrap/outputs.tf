output "state_bucket_name" {
  description = "S3 bucket name for Terraform remote state — copy this into your main backend config"
  value       = aws_s3_bucket.terraform_state.bucket
}

output "state_bucket_arn" {
  description = "ARN of the Terraform state S3 bucket"
  value       = aws_s3_bucket.terraform_state.arn
}
