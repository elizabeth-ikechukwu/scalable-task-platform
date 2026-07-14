output "certificate_arn" {
  description = "ACM certificate ARN for use in Ingress"
  value       = aws_acm_certificate.main.arn
}

output "hosted_zone_id" {
  description = "Route53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}

output "domain_name" {
  description = "Root domain name"
  value       = var.domain_name
}