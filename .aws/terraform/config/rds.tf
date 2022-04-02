locals {
  db_subnet_group_name = module.vpc.database_subnet_group_name
  subnet_ids = module.vpc.database_subnets
  vpc_security_group_ids = tolist([module.sg-rds.security_group_id, module.vpc.default_security_group_id])

  cfg_rds_prod_no_tags = merge(var.global, var.rds["prod"])
  cfg_rds_staging_no_tags = merge(var.global, var.rds["staging"])

  cfg_rds_staging_tags = merge(var.global["tags"], var.rds["staging"]["tags"])
  cfg_rds_prod_tags = merge(var.global["tags"], var.rds["prod"]["tags"])

  cfg_rds_prod = merge(local.cfg_rds_prod_no_tags,
    {
      "tags" = local.cfg_rds_prod_tags,
      "db_subnet_group_name" = local.db_subnet_group_name,
      "subnet_ids" = local.subnet_ids,
      "vpc_security_group_ids" = local.vpc_security_group_ids,
      "username" = jsondecode(data.aws_secretsmanager_secret_version.prod.secret_string)["DATABASE_USERNAME"],
      "password" = jsondecode(data.aws_secretsmanager_secret_version.prod.secret_string)["DATABASE_PASSWORD"]
    }
  )
  cfg_rds_staging = merge(local.cfg_rds_staging_no_tags,
    { "tags" = local.cfg_rds_staging_tags,
      "db_subnet_group_name" = local.db_subnet_group_name,
      "subnet_ids" = local.subnet_ids,
      "vpc_security_group_ids" = local.vpc_security_group_ids,
      "username" = jsondecode(data.aws_secretsmanager_secret_version.staging.secret_string)["DATABASE_USERNAME"],
      "password" = jsondecode(data.aws_secretsmanager_secret_version.staging.secret_string)["DATABASE_PASSWORD"]
    }
  )
 }

module "rds-staging" {
  source        = "../modules/rds/rds"
  configuration = local.cfg_rds_staging
}

module "rds-prod" {
  source        = "../modules/rds/rds"
  configuration = local.cfg_rds_prod
}
