locals {
  # EB Application configuration
  appversion_lifecycle_service_role_arn = module.iam-service-role-prod.arn
  cfg_eba_no_tags                       = merge(var.global, var.eba["weather-js-app"])

  cfg_eba_tags = merge(var.global["tags"], var.eba["weather-js-app"]["tags"])

  cfg_eba = merge(local.cfg_eba_no_tags,
    {
      "tags"                                  = local.cfg_eba_tags,
      "appversion_lifecycle_service_role_arn" = local.appversion_lifecycle_service_role_arn
    }
  )

  # EB Environment configuraiton
  iam_role_name_prod                     = module.iam-ec2-role-prod.name
  iam_role_name_staging                  = module.iam-ec2-role-staging.name
  iam_role_id_prod                       = module.iam-ec2-role-prod.id
  iam_role_id_staging                    = module.iam-ec2-role-staging.id
  iam_role_instance_profile_name_prod    = module.iam-ec2-role-prod.instance_profile_name
  iam_role_instance_profile_name_staging = module.iam-ec2-role-staging.instance_profile_name
  iam_role_service_name_prod             = module.iam-service-role-prod.name
  iam_role_service_name_staging          = module.iam-service-role-staging.name
  vpc_elb_subnets                        = module.vpc.public_subnets
  vpc_subnets                            = module.vpc.public_subnets

  loadbalancer_managed_security_group = module.sg-eb.security_group_id

  aws_s3_bucket_elb_logs_prod_id    = module.s3-prod.id
  aws_s3_bucket_elb_logs_staging_id = module.s3-staging.id


  cfg_ebe_prod_no_tags    = merge(var.global, var.ebe["weather-js-app-prod"])
  cfg_ebe_staging_no_tags = merge(var.global, var.ebe["weather-js-app-staging"])

  cfg_ebe_prod_tags    = merge(var.global["tags"], var.ebe["weather-js-app-prod"]["tags"])
  cfg_ebe_staging_tags = merge(var.global["tags"], var.ebe["weather-js-app-staging"]["tags"])


  # DB Connection params
  rds_staging_connection = module.rds-staging.db_instance_endpoint
  rds_staging_host       = module.rds-staging.db_instance_address
  rds_staging_db_name    = module.rds-staging.db_instance_name
  rds_staging_username   = module.rds-staging.db_instance_username
  rds_staging_password   = module.rds-staging.db_master_password


  rds_prod_connection = module.rds-prod.db_instance_endpoint
  rds_prod_host       = module.rds-prod.db_instance_address
  rds_prod_db_name    = module.rds-prod.db_instance_name
  rds_prod_username   = module.rds-prod.db_instance_username
  rds_prod_password   = module.rds-prod.db_master_password



  cfg_ebe_prod = merge(local.cfg_ebe_prod_no_tags,
    {
      "tags"                                = local.cfg_ebe_prod_tags,
      "loadbalancer_security_groups"        = [local.loadbalancer_managed_security_group],
      "loadbalancer_managed_security_group" = local.loadbalancer_managed_security_group,
      "vpc_elb_subnets"                     = local.vpc_elb_subnets,
      "vpc_subnets"                         = local.vpc_subnets,
      "iam_role_id"                         = local.iam_role_id_prod,
      "iam_role_name"                       = local.iam_role_name_prod,
      "iam_role_instance_profile_name"      = local.iam_role_instance_profile_name_prod,
      "iam_role_service_name"               = local.iam_role_service_name_prod,
      "aws_s3_bucket_elb_logs"              = local.aws_s3_bucket_elb_logs_prod_id,
      "env_vars" = merge(local.cfg_ebe_prod_no_tags["env_vars"],
        {
          # todo add here computed data
          "DATABASE_HOST"     = local.rds_prod_host,
          "DATABASE_USER"     = local.rds_prod_username,
          "DATABASE_PASSWORD" = local.rds_prod_password,
          "DATABASE_DB"       = local.rds_prod_db_name,
          "APP_ENV"           = "prod"
        }
      )
    }
  )

  cfg_ebe_staging = merge(local.cfg_ebe_staging_no_tags,
    {
      "tags"                                = local.cfg_ebe_staging_tags,
      "loadbalancer_security_groups"        = [local.loadbalancer_managed_security_group],
      "loadbalancer_managed_security_group" = local.loadbalancer_managed_security_group,
      "vpc_elb_subnets"                     = local.vpc_elb_subnets,
      "vpc_subnets"                         = local.vpc_subnets,
      "iam_role_id"                         = local.iam_role_id_staging,
      "iam_role_name"                       = local.iam_role_name_staging,
      "iam_role_instance_profile_name"      = local.iam_role_instance_profile_name_staging,
      "iam_role_service_name"               = local.iam_role_service_name_staging,
      "aws_s3_bucket_elb_logs"              = local.aws_s3_bucket_elb_logs_staging_id,
      "env_vars" = merge(local.cfg_ebe_staging_no_tags["env_vars"],
        {
          "DATABASE_HOST"     = local.rds_staging_host,
          "DATABASE_USER"     = local.rds_staging_username,
          "DATABASE_PASSWORD" = local.rds_staging_password,
          "DATABASE_DB"       = local.rds_staging_db_name,
          "APP_ENV"           = "staging"
          # todo add here computed data
        }
      )
    }
  )

}

module "eba-weather-js-app" {
  source        = "../modules/eb/eba"
  configuration = local.cfg_eba
}


module "ebe-weather-js-app-prod" {
  source        = "../modules/eb/ebe"
  configuration = local.cfg_ebe_prod
}

module "ebe-weather-js-app-staging" {
  source        = "../modules/eb/ebe"
  configuration = local.cfg_ebe_staging
}
