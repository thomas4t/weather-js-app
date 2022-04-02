output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = module.rds.db_instance_endpoint
}
output "db_instance_address" {
  description = "The RDS address"
  value       = module.rds.db_instance_address
}
output "db_instance_port" {
  description = "The RDS port"
  value       = module.rds.db_instance_port
}
output "db_instance_name" {
  description = "The RDS instance name"
  value       = module.rds.db_instance_name
}
output "db_instance_username" {
  description = "The RDS username"
  value       = module.rds.db_instance_username
}
output "db_master_password" {
  description = "The RDS password"
  value       = module.rds.db_master_password
}
output "db_instance_status" {
  description = "The RDS status"
  value       = module.rds.db_instance_status
}