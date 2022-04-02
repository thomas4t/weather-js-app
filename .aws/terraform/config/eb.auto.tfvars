eba = {
    weather-js-app = {
        name = "weather-js-app"
        appversion_lifecycle_service_role_arn = "arn:aws:elasticbeanstalk:eu-west-1:795726301725:application/weather-js-app"
        appversion_lifecycle_max_count = 100
        appversion_lifecycle_delete_source_from_s3 = false
        appversion_lifecycle_max_age_in_days = 0
        tags  = {
            "Environment" = "weather-js-app"
        }
    }
}

ebe = {
    weather-js-app-prod = {
        name = "weather-js-app-prod"
        elastic_beanstalk_application_name = "weather-js-app"
        description = "weather-js-app production - terraform controlled"
        environment_type = "LoadBalanced"
        loadbalancer_type = "application"
        proxy_server = "none"
        associate_public_ip_address = true

        loadbalancer_crosszone = true
        instance_type = "t3.small"
        ami_id = "ami-028ffc87bc63feb2c"
        deployment_batch_size_type = "Percentage"
        deployment_batch_size = 100
        deployment_ignore_health_check = false
        deployment_timeout = 600

        autoscale_min = 1
        autoscale_max = 2
        solution_stack_name = "64bit Amazon Linux 2 v3.4.6 running Docker"
        wait_for_ready_timeout = "15m"
        rolling_update_enabled = true
        healthcheck_url = "/"
        managed_actions_enabled = true
        preferred_start_time = "Thu:06:00"
        update_level = "minor"
        instance_refresh_enabled = false
        autoscale_measure_name = "CPUUtilization"
        autoscale_statistic = "Average"
        autoscale_unit = "Percent"
        autoscale_lower_bound = 20
        autoscale_upper_bound = 80

        tags  = {
            "Environment" = "weather-js-app-prod"
        }
        env_vars = {
        }
    }
    weather-js-app-staging = {
        name = "weather-js-app-staging"
        elastic_beanstalk_application_name = "weather-js-app"
        description = "weather-js-app staging - terraform controlled"
        environment_type = "LoadBalanced"
        loadbalancer_type = "application"
        proxy_server = "none"
        associate_public_ip_address = true

        loadbalancer_crosszone = true
        instance_type = "t3.small"
        ami_id = "ami-028ffc87bc63feb2c"
        keypair="rch-aws"
        deployment_batch_size_type = "Percentage"
        deployment_batch_size = 100
        deployment_ignore_health_check = false
        deployment_timeout = 600

        autoscale_min = 1
        autoscale_max = 1
        solution_stack_name = "64bit Amazon Linux 2 v3.4.6 running Docker"
        wait_for_ready_timeout = "15m"
        rolling_update_enabled = null
        healthcheck_url = "/"
        managed_actions_enabled = true
        preferred_start_time = "Thu:06:00"
        update_level = "minor"
        instance_refresh_enabled = false
        autoscale_measure_name = "CPUUtilization"
        autoscale_statistic = "Average"
        autoscale_unit = "Percent"
        autoscale_lower_bound = 20
        autoscale_upper_bound = 80

        tags  = {
            "Environment" = "weather-js-app-staging"
        }
        env_vars = {
        }
    }
}