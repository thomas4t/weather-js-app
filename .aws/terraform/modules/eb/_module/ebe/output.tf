output "endpoint" {
  description = "Fully qualified DNS name for the environment"
  value       = aws_elastic_beanstalk_environment.this.cname
}