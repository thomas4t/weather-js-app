# list of all outputs from terraform usable
output "ebe-prod-endpoint" {
    value = "http://${module.ebe-weather-js-app-prod.endpoint}"
}
output "ebe-staging-endpoint" {
    value = "http://${module.ebe-weather-js-app-staging.endpoint}"
}

output "rds-prod-connection" {
  value = "pgsql://${var.rds["prod"]["username"]}:${var.rds["prod"]["password"]}@${module.rds-prod.db_instance_endpoint}/${var.rds["prod"]["name"]}"
}
output "rds-staging" {
  value = "pgsql://${var.rds["staging"]["username"]}:${var.rds["staging"]["password"]}@${module.rds-staging.db_instance_endpoint}/${var.rds["staging"]["name"]}"
}

output "ecr-fe-url" {
  value = module.ecr-fe.ecr_url
}
output "ecr-be-url" {
  value = module.ecr-be.ecr_url
}

output "s3-prod" {
  value = "s3://${module.s3-prod.id}"
}
output "s3-staging" {
  value = "s3://${module.s3-staging.id}"
}
output "vpc-subnets" {
  value = {
    public_subnets=module.vpc.public_subnets
    private_subnets=module.vpc.private_subnets
    database_subnets = module.vpc.database_subnets
  }
}

#TODO...