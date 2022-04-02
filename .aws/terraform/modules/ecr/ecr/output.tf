output "ecr_url" {
  description = "The connection endpoint"
  value       = module.ecr.repository_url
}