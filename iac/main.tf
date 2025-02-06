terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.16"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tf-convert-to-lexical"
    storage_account_name = "converttolexicalsto"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
