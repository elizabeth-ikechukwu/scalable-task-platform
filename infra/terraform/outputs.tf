output "nameservers" {
  description = "Route53 nameservers - paste these into Hostinger DNS settings"
  value       = aws_route53_zone.main.name_servers
}

output "app_url" {
  description = "TaskFlow app URL"
  value       = "http://taskflow.${var.domain_name}"
}