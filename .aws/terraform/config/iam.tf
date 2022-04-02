data "aws_caller_identity" "current" {}

locals {
  trusted_role_arns = [data.aws_caller_identity.current.arn]

  cfg_iam_service_prod_no_tags = merge(var.global, var.iam["service-role-prod"])
  cfg_iam_ec2_prod_no_tags = merge(var.global, var.iam["ec2-role-prod"])

  cfg_iam_service_staging_no_tags = merge(var.global, var.iam["service-role-staging"])
  cfg_iam_ec2_staging_no_tags = merge(var.global, var.iam["ec2-role-staging"])

  cfg_iam_ec2_prod_tags = merge(var.global["tags"], var.iam["service-role-prod"]["tags"])
  cfg_iam_service_prod_tags = merge(var.global["tags"], var.iam["ec2-role-prod"]["tags"])

  cfg_iam_ec2_staging_tags = merge(var.global["tags"], var.iam["service-role-staging"]["tags"])
  cfg_iam_service_staging_tags = merge(var.global["tags"], var.iam["ec2-role-staging"]["tags"])

  cfg_iam_service_prod = merge(local.cfg_iam_service_prod_no_tags, {
    "tags" = local.cfg_iam_service_prod_tags,
    "trusted_role_arns" = local.trusted_role_arns
    }
  )
  cfg_iam_ec2_prod = merge(local.cfg_iam_ec2_prod_no_tags, {
    "tags" = local.cfg_iam_ec2_prod_tags,
    "trusted_role_arns" = local.trusted_role_arns
    }
  )
  cfg_iam_service_staging = merge(local.cfg_iam_service_staging_no_tags, {
    "tags" = local.cfg_iam_service_staging_tags,
    "trusted_role_arns" = local.trusted_role_arns
    }
  )
  cfg_iam_ec2_staging = merge(local.cfg_iam_ec2_staging_no_tags, {
    "tags" = local.cfg_iam_ec2_staging_tags,
    "trusted_role_arns" = local.trusted_role_arns
    }
  )
}

module "iam-ec2-role-prod" {
  source        = "../modules/iam/role"
  configuration = local.cfg_iam_ec2_prod
}

module "iam-service-role-prod" {
  source        = "../modules/iam/role"
  configuration = local.cfg_iam_service_prod
}

module "iam-ec2-role-staging" {
  source        = "../modules/iam/role"
  configuration = local.cfg_iam_ec2_staging
}

module "iam-service-role-staging" {
  source        = "../modules/iam/role"
  configuration = local.cfg_iam_service_staging
}
