resource "azurerm_resource_group" "this" {
  name     = "convert-to-lexical"
  location = "UK South"
}

resource "azurerm_container_app_environment" "this" {
  name                = "convert-to-lexical-cont-env"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}

resource "azurerm_container_app" "this" {
  name                         = "conv-to-lex-expressapi"
  container_app_environment_id = azurerm_container_app_environment.this.id
  resource_group_name          = azurerm_resource_group.this.name
  revision_mode                = "Single"

  secret {
    name  = "acrpassword"
    value = var.acrpassword
  }
  template {
    container {
      name   = "azurermcontainer"
      image  = "contdevreg.azurecr.io/convert-to-lexical-expressapi:${var.imageTag}"
      cpu    = 0.25
      memory = "0.5Gi"
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "CONVERT_KEY"
        value = var.convertKey
      }
    }
    min_replicas = 1
    max_replicas = 1
  }

  registry {
    server               = "contdevreg.azurecr.io"
    username             = "contdevreg"
    password_secret_name = "acrpassword"
  }

  ingress {
    external_enabled = true
    target_port      = 3000

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

variable "imageTag" {
  type      = string
  sensitive = true
}

variable "acrpassword" {
  type      = string
  sensitive = true
}

variable "convertKey" {
  type      = string
  sensitive = true
}
