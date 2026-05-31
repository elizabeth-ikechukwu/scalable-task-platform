# --------------------------------------------------
# Route53 Hosted Zone
# --------------------------------------------------
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name        = "${var.project_name}-hosted-zone"
    Project     = var.project_name
    Environment = var.environment
  }
}

# --------------------------------------------------
# A Record - taskflow subdomain points to Elastic IP
# --------------------------------------------------
resource "aws_route53_record" "taskflow" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "taskflow.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [aws_eip.app.public_ip]
}

# --------------------------------------------------
# A Record - root domain points to Elastic IP
# --------------------------------------------------
resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = 300
  records = [aws_eip.app.public_ip]
}