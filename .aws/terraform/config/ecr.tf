locals {
  cfg_ecr_be_no_tags = merge(var.global, var.ecr["app_be"])
  cfg_ecr_fe_no_tags = merge(var.global, var.ecr["app_fe"])
  cfg_ecr_traefik_no_tags = merge(var.global, var.ecr["traefik"])

  cfg_ecr_be_tags = merge(var.global["tags"], var.ecr["app_be"]["tags"])
  cfg_ecr_fe_tags = merge(var.global["tags"], var.ecr["app_fe"]["tags"])
  cfg_ecr_traefik_tags = merge(var.global["tags"], var.ecr["traefik"]["tags"])

  cfg_ecr_be = merge(local.cfg_ecr_be_no_tags, {
      "tags" = local.cfg_ecr_be_tags
    }
  )
  cfg_ecr_fe = merge(local.cfg_ecr_fe_no_tags, {
      "tags" = local.cfg_ecr_fe_tags
    }
  )
  cfg_ecr_traefik = merge(local.cfg_ecr_traefik_no_tags, {
      "tags" = local.cfg_ecr_traefik_tags
    }
  )
}

module "ecr-be" {
  source        = "../modules/ecr/ecr"
  configuration = local.cfg_ecr_be
}
module "ecr-fe" {
  source        = "../modules/ecr/ecr"
  configuration = local.cfg_ecr_fe
}
module "ecr-traefik" {
  source        = "../modules/ecr/ecr"
  configuration = local.cfg_ecr_traefik
}