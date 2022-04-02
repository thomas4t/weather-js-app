output "elastic_beanstalk_application_name" {
  value       = aws_elastic_beanstalk_application.this.name
  description = "Elastic Beanstalk Application name"
}