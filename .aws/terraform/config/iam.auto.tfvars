iam = {
  service-role-prod = {
    role_name = "weather-js-app-prod-beanstalk-service-role"
    role_description = "Beanstalk service role"
    trusted_role_actions = ["sts:AssumeRole"]
    trusted_role_services = ["elasticbeanstalk.amazonaws.com"]
    tags = {
      "Environment" = "weather-js-app-prod"
    }
    grant = []
  }
  ec2-role-prod = {
    role_name = "weather-js-app-prod-beanstalk-ec2-role"
    role_description = "Beanstalk Loadbalancer ec2 role"
    trusted_role_actions = ["sts:AssumeRole"]
    trusted_role_services = ["ec2.amazonaws.com","ssm.amazonaws.com"]
    create_instance_profile = true
    tags = {
      "Environment" = "weather-js-app-prod"
    }
  }

  service-role-staging = {
    role_name = "weather-js-app-staging-beanstalk-service-role"
    role_description = "Beanstalk service role for weather-js-app prod"
    trusted_role_actions = ["sts:AssumeRole"]
    trusted_role_services = ["elasticbeanstalk.amazonaws.com"]
    tags = {
      "Environment" = "weather-js-app-staging"
    }
    grant = []
  }
  ec2-role-staging = {
    role_name = "weather-js-app-staging-beanstalk-ec2-role"
    role_description = "Beanstalk Loadbalancer ec2 role for weather-js-app staging"
    trusted_role_actions = ["sts:AssumeRole"]
    trusted_role_services = ["ec2.amazonaws.com","ssm.amazonaws.com"]
    create_instance_profile = true
    tags = {
      "Environment" = "weather-js-app-staging"
    }
  }
}
