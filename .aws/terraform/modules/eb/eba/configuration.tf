locals {
  defaults = {
    #name  = var.name
    #description = var.description
    tags  = {}
    appversion_lifecycle_service_role_arn = null
    appversion_lifecycle_max_count = 1000
    appversion_lifecycle_delete_source_from_s3 = true
    appversion_lifecycle_max_age_in_days = 0
  }
  cfg = merge(local.defaults, var.configuration)
}