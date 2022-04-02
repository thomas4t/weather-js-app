module "eba" {
  source = "../_module/eba"
  name = local.cfg["name"]
  description                               =   lookup(local.cfg,"description",null)
  appversion_lifecycle_service_role_arn     =   lookup(local.cfg,"appversion_lifecycle_service_role_arn",null)
  appversion_lifecycle_max_count            =   local.cfg["appversion_lifecycle_max_count"]
  appversion_lifecycle_max_age_in_days      =   local.cfg["appversion_lifecycle_max_age_in_days"]
  appversion_lifecycle_delete_source_from_s3=   local.cfg["appversion_lifecycle_delete_source_from_s3"]
  tags = local.cfg["tags"]
}