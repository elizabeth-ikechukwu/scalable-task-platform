# ──────────────────────────────────────────────
# Reference existing hosted zone
# Created manually — Terraform manages records only
# ──────────────────────────────────────────────
data "aws_route53_zone" "main" {
  zone_id = var.hosted_zone_id
}

# ──────────────────────────────────────────────
# ACM Certificate
# Covers root domain and all subdomains
# ──────────────────────────────────────────────
resource "aws_acm_certificate" "main" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${var.project_name}-cert"
    Project     = var.project_name
    Environment = var.environment
  }
}

# ──────────────────────────────────────────────
# DNS validation records for ACM certificate
# ──────────────────────────────────────────────
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

# ──────────────────────────────────────────────
# Wait for certificate validation
# ──────────────────────────────────────────────
resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}