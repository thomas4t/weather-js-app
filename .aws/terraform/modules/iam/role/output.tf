output "arn" {
  description = "ARN of IAM role"
  value       = module.role.iam_role_arn
}

output "name" {
  description = "Name of IAM role"
  value       = module.role.iam_role_name
}

output "id" {
  description = "ID of IAM role"
  value       = module.role.iam_role_unique_id
}

output "instance_profile_name" {
  description = "Name of IAM role instance profile"
  value       = module.role.iam_instance_profile_name
}
