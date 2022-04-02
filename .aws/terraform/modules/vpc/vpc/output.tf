output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}
output "database_subnet_group_name" {
  description = "Name of database subnet group"
  value       = module.vpc.database_subnet_group_name
}

output "public_subnets" {
  description = "IDS of public subnet group"
  value       = module.vpc.public_subnets
}

output "database_subnets" {
  description = "IDS of database subnet group"
  value       = module.vpc.database_subnets
}
output "private_subnets" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "default_security_group_id" {
  description = "The ID of the security group created by default on VPC creation"
  value       = module.vpc.default_security_group_id
}
