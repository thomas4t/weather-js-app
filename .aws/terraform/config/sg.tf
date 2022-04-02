locals {
  vpc_id = module.vpc.vpc_id

  cfg_sg_rds_no_tags = merge(var.global, var.sg["rds"])
  cfg_sg_eb_no_tags = merge(var.global, var.sg["eb"])

  cfg_sg_eb_tags = merge(var.global["tags"], var.sg["eb"]["tags"])
  cfg_sg_rds_tags = merge(var.global["tags"], var.sg["rds"]["tags"])

  cfg_sg_rds = merge(local.cfg_sg_rds_no_tags,
    {
      "tags" = local.cfg_sg_rds_tags,
      "vpc_id" = local.vpc_id,
#      "ingress_cidr_blocks" = concat(var.vpc["private_subnets"],var.vpc["public_subnets"], var.global.operator_ips)
    }
  )
  cfg_sg_eb = merge(local.cfg_sg_eb_no_tags,
    { "tags" = local.cfg_sg_eb_tags,
      "vpc_id" = local.vpc_id
    }
  )
 }

module "sg-rds" {
  source        = "../modules/sg/sg"
  configuration = local.cfg_sg_rds
}

module "sg-eb" {
  source        = "../modules/sg/sg"
  configuration = local.cfg_sg_eb
}
