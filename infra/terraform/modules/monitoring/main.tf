# ──────────────────────────────────────────────
# Monitoring Namespace
# ──────────────────────────────────────────────
resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
    labels = {
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }
}

# ──────────────────────────────────────────────
# kube-prometheus-stack
# Installs Prometheus, Grafana, Alertmanager
# and all default Kubernetes dashboards
# ──────────────────────────────────────────────
resource "helm_release" "kube_prometheus_stack" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  version    = "65.1.1"
  timeout    = 600

  values = [
    yamlencode({
      grafana = {
        adminPassword = "taskflow-grafana-admin"
        persistence = {
          enabled = false
        }
        service = {
          type = "ClusterIP"
        }
        resources = {
          requests = {
            memory = "64Mi"
            cpu    = "50m"
          }
          limits = {
            memory = "128Mi"
            cpu    = "100m"
          }
        }
      }
      prometheus = {
        prometheusSpec = {
          retention = "3d"
          resources = {
            requests = {
              memory = "256Mi"
              cpu    = "100m"
            }
            limits = {
              memory = "512Mi"
              cpu    = "300m"
            }
          }
        }
      }
      alertmanager = {
        enabled = false
      }
      prometheusOperator = {
        resources = {
          requests = {
            memory = "64Mi"
            cpu    = "50m"
          }
          limits = {
            memory = "128Mi"
            cpu    = "100m"
          }
        }
      }
      kubeStateMetrics = {
        resources = {
          requests = {
            memory = "32Mi"
            cpu    = "10m"
          }
          limits = {
            memory = "64Mi"
            cpu    = "50m"
          }
        }
      }
      nodeExporter = {
        resources = {
          requests = {
            memory = "32Mi"
            cpu    = "10m"
          }
          limits = {
            memory = "64Mi"
            cpu    = "50m"
          }
        }
      }
    })
  ]

  depends_on = [kubernetes_namespace.monitoring]
}

# ──────────────────────────────────────────────
# Fluent Bit
# Ships pod logs to CloudWatch Logs
# ──────────────────────────────────────────────
resource "helm_release" "fluent_bit" {
  name       = "fluent-bit"
  repository = "https://fluent.github.io/helm-charts"
  chart      = "fluent-bit"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  version    = "0.47.4"
  timeout    = 300

  values = [
    yamlencode({
      config = {
        outputs = <<-EOT
          [OUTPUT]
              Name cloudwatch_logs
              Match *
              region ${var.aws_region}
              log_group_name /taskflow/eks
              log_stream_prefix fluent-bit-
              auto_create_group true
        EOT
      }
      serviceAccount = {
        annotations = {
          "eks.amazonaws.com/role-arn" = var.fluent_bit_role_arn
        }
      }
      resources = {
        requests = {
          memory = "32Mi"
          cpu    = "10m"
        }
        limits = {
          memory = "64Mi"
          cpu    = "50m"
        }
      }
    })
  ]

  depends_on = [kubernetes_namespace.monitoring]
}