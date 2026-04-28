# ──────────────────────────────────────────────
# Data Source — Latest Amazon Linux 2023 AMI
# ──────────────────────────────────────────────
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ──────────────────────────────────────────────
# EC2 Instance
# ──────────────────────────────────────────────
resource "aws_instance" "app" {
  ami                    = data.aws_ami.amazon_linux_2023.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.nginx.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  user_data = <<-EOF
    #!/bin/bash
    set -e

    # Update system
    dnf update -y

    # Install Docker
    dnf install -y docker
    systemctl enable docker
    systemctl start docker

    # Wait for Docker to be fully ready
    sleep 10

    # Add ec2-user to docker group
    usermod -aG docker ec2-user

    # Ensure SSM Agent is running (pre-installed on AL2023)
    systemctl enable amazon-ssm-agent
    systemctl start amazon-ssm-agent

    # Authenticate to ECR
    aws ecr get-login-password --region ${var.aws_region} | \
      docker login --username AWS --password-stdin \
      ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com

    # Pull images from ECR
    docker pull ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/task-backend:latest
    docker pull ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/task-frontend:latest

    # Run backend
    docker run -d \
      --name task-backend \
      --restart unless-stopped \
      -p 3000:3000 \
      ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/task-backend:latest

    # Wait for backend to be ready
    sleep 5

    # Run frontend
    docker run -d \
      --name task-frontend \
      --restart unless-stopped \
      -p 80:80 \
      --link task-backend:backend \
      ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/task-frontend:latest
  EOF

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  metadata_options {
    http_tokens = "required"
  }

  tags = {
    Name        = "${var.project_name}-app-server"
    Project     = var.project_name
    Environment = var.environment
  }
}
