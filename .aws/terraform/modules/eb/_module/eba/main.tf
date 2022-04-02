locals {
    # ignore max_age if max_count is set
    appversion_lifecycle_max_age_in_days = var.appversion_lifecycle_max_count != null ? null : var.appversion_lifecycle_max_age_in_days
}

# elastic_beanstalk_application
resource "aws_elastic_beanstalk_application" "this" {
  name        = var.name
  description = var.description
  tags        = var.tags

  dynamic "appversion_lifecycle" {
    for_each = var.appversion_lifecycle_service_role_arn != null ? ["true"] : []
    content {
      service_role          = var.appversion_lifecycle_service_role_arn
      max_count             = var.appversion_lifecycle_max_count
      delete_source_from_s3 = var.appversion_lifecycle_delete_source_from_s3
      max_age_in_days       = local.appversion_lifecycle_max_age_in_days
    }
  }
}