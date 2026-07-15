output "eks_cluster_role_arn" {
  description = "EKS cluster IAM role ARN"
  value       = aws_iam_role.eks_cluster.arn
}

output "eks_node_role_arn" {
  description = "EKS node IAM role ARN"
  value       = aws_iam_role.eks_node.arn
}

output "taskflow_pod_role_arn" {
  description = "IRSA role ARN for TaskFlow backend pod"
  value       = aws_iam_role.taskflow_pod.arn
}

output "alb_controller_role_arn" {
  description = "IRSA role ARN for AWS Load Balancer Controller"
  value       = aws_iam_role.alb_controller.arn
}

output "ebs_csi_role_arn" {
  description = "IRSA role ARN for EBS CSI driver"
  value       = aws_iam_role.ebs_csi.arn
}