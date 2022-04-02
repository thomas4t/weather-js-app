terraform {
  required_version = ">= 0.12.26"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0"
    }
  }
  backend "s3" {
    bucket = "terraform-6a7f78da05e76663560a8d4438d1072e"
    key    = "terraform-state/weather-js-app-tf.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {
  region = var.global["region"]
  assume_role {
    role_arn     = var.global["admin_asume_role"]
    session_name = "terraform"
  }
}

