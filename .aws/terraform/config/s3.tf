locals {
  cfg_s3_prod_no_tags = merge(var.global, var.s3["prod"])
  cfg_s3_staging_no_tags = merge(var.global, var.s3["staging"])

  cfg_s3_prod_tags = merge(var.global["tags"], var.s3["prod"]["tags"])
  cfg_s3_staging_tags = merge(var.global["tags"], var.s3["staging"]["tags"])

  cfg_s3_prod = merge(local.cfg_s3_prod_no_tags, { "tags" = local.cfg_s3_prod_tags })
  cfg_s3_stag = merge(local.cfg_s3_staging_no_tags, { "tags" = local.cfg_s3_staging_tags })

}

module "s3-prod" {
  source        = "../modules/s3/s3"
  configuration = local.cfg_s3_prod
}
module "s3-staging" {
  source        = "../modules/s3/s3"
  configuration = local.cfg_s3_stag
}
