variable "global" {
  description = "Global environment"
  type        = any
}

variable "vpc" {
  description = "VPC Configuration"
  type        = any
}

variable "s3" {
  description = "S3 Configuration"
  type        = any
}

variable "rds" {
  description = "RDS settings"
  type    = any
}

variable "sg" {
  description = "Security groups Configuration"
  type        = any
}

variable "eba" {
  description = "Beanstalk Application Configuration"
  type        = any
}

variable "ebe" {
  description = "Beanstalk Environment Configuration"
  type        = any
}

variable "ecr" {
  description = "ECR settings"
  type    = any
}

variable "iam" {
  description = "IAM role settings"
  type    = any
}
