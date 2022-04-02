locals {
    azs = tolist(["${var.global["region"]}a", "${var.global["region"]}b",])

    cfg_user = merge(var.global, var.vpc)
    cfg_no_tags = merge({ "azs" = local.azs }, local.cfg_user)

    cfg_vpc_tags = merge(var.global["tags"], local.cfg_no_tags["tags"])
    cfg_vpc = merge(local.cfg_no_tags, { "tags" = local.cfg_vpc_tags })

}
module "vpc" {
    source     = "../modules/vpc/vpc"
    configuration = local.cfg_vpc
}


# ENDPOINTS
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = module.vpc.vpc_id
  service_name = format("com.amazonaws.%s.s3", var.global.region)
  tags = local.cfg_vpc_tags
}

resource "aws_vpc_endpoint" "beanstalk" {
  vpc_id            = module.vpc.vpc_id
  service_name      = format("com.amazonaws.%s.elasticbeanstalk", var.global.region)
  vpc_endpoint_type = "Interface"
  subnet_ids = module.vpc.public_subnets
  security_group_ids = [
    module.sg-eb.security_group_id,
  ]

  private_dns_enabled = true
  tags = local.cfg_vpc_tags
}

resource "aws_vpc_endpoint" "beanstalk_health" {
  vpc_id            = module.vpc.vpc_id
  service_name      = format("com.amazonaws.%s.elasticbeanstalk-health", var.global.region)
  vpc_endpoint_type = "Interface"
  subnet_ids = module.vpc.public_subnets

  security_group_ids = [
    module.sg-eb.security_group_id,
  ]

  private_dns_enabled = true
  tags = local.cfg_vpc_tags
}
