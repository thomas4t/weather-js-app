s3 = {
  prod = {
    bucket = "weather-js-app-prod"
    versioning = {
      enabled = false
    }
    attach_public_policy=false
    attach_elb_log_delivery_policy=true
    server_side_encryption_configuration = {}
    tags = {
      "Environment" = "weather-js-app-prod"
    }
    grant = []
  }

  staging = {
    bucket   = "weather-js-app-stage"
    versioning = {
      enabled = false
    }
    attach_public_policy=false
    attach_elb_log_delivery_policy=true
    server_side_encryption_configuration = {}
    tags = {
      "Environment" = "weather-js-app-staging"
    }
  }
}
