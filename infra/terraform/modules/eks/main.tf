resource "aws_eks_access_entry" "github_actions" {
  cluster_name  = aws_eks_cluster.main.name
  principal_arn = "arn:aws:iam::569360421892:role/github-actions-taskflow"
  type          = "STANDARD"
}

resource "aws_eks_access_policy_association" "github_actions" {
  cluster_name  = aws_eks_cluster.main.name
  principal_arn = "arn:aws:iam::569360421892:role/github-actions-taskflow"
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"

  access_scope {
    type = "cluster"
  }

  depends_on = [aws_eks_access_entry.github_actions]
}