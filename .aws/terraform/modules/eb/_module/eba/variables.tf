variable "name" {
  type        = string
  description = "Elastic Beanstalk Application name"
}

variable "description" {
  type        = string
  default     = ""
  description = "Elastic Beanstalk Application description"
}

variable "appversion_lifecycle_service_role_arn" {
  type        = string
  description = "The service role ARN to use for application version cleanup. If left empty, the `appversion_lifecycle` block will not be created"
  default     = ""
}

variable "appversion_lifecycle_max_count" {
  type        = number
  description = "The max number of application versions to keep"
}

variable "appversion_lifecycle_max_age_in_days" {
  type        = number
  description = "The max number of days to retain application versions"
}

variable "appversion_lifecycle_delete_source_from_s3" {
  type        = bool
  default     = false
  description = "Whether to delete application versions from S3 source"
}
variable "tags" {
  type        = map(string)
  default     = {}
  description = "Resource tags"
}
