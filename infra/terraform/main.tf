terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket       = "taskflow-tfstate-569360421892"
    key          = "prod/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}

provider "aws" {
  region = var.aws_region
}

# ──────────────────────────────────────────────
# VPC
# ──────────────────────────────────────────────
module "vpc" {
  source = "./modules/vpc"

  project_name         = var.project_name
  environment          = var.environment
  aws_region           = var.aws_region
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  cluster_name         = var.cluster_name
}

# ──────────────────────────────────────────────
# EKS
# ──────────────────────────────────────────────
module "eks" {
  source = "./modules/eks"

  project_name         = var.project_name
  environment          = var.environment
  aws_region           = var.aws_region
  cluster_name         = var.cluster_name
  kubernetes_version   = var.kubernetes_version
  vpc_id               = module.vpc.vpc_id
  private_subnet_ids   = module.vpc.private_subnet_ids
  public_subnet_ids    = module.vpc.public_subnet_ids
  eks_cluster_role_arn = module.iam.eks_cluster_role_arn
  eks_node_role_arn    = module.iam.eks_node_role_arn
  node_instance_type   = var.node_instance_type
  node_desired_size    = var.node_desired_size
  node_min_size        = var.node_min_size
  node_max_size        = var.node_max_size
}

# ──────────────────────────────────────────────
# IAM
# ──────────────────────────────────────────────
module "iam" {
  source = "./modules/iam"

  project_name      = var.project_name
  environment       = var.environment
  aws_region        = var.aws_region
  aws_account_id    = var.aws_account_id
  cluster_name      = var.cluster_name
  oidc_provider_arn = module.eks.oidc_provider_arn
  oidc_provider_url = module.eks.oidc_provider_url
}

# ──────────────────────────────────────────────
# ECR
# ──────────────────────────────────────────────
module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}

# ──────────────────────────────────────────────
# RDS
# ──────────────────────────────────────────────
module "rds" {
  source = "./modules/rds"

  project_name               = var.project_name
  environment                = var.environment
  vpc_id                     = module.vpc.vpc_id
  private_subnet_ids         = module.vpc.private_subnet_ids
  eks_node_security_group_id = module.eks.eks_node_security_group_id
  db_name                    = var.db_name
}

# ──────────────────────────────────────────────
# SSM
# ──────────────────────────────────────────────
module "ssm" {
  source = "./modules/ssm"

  project_name = var.project_name
  environment  = var.environment
  db_host      = module.rds.rds_hostname
  db_name      = var.db_name
}

# ──────────────────────────────────────────────
# DNS
# ──────────────────────────────────────────────
module "dns" {
  source = "./modules/dns"

  project_name   = var.project_name
  environment    = var.environment
  domain_name    = var.domain_name
  hosted_zone_id = var.hosted_zone_id
}