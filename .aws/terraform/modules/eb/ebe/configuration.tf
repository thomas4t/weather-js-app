locals {
  defaults = {
    # region
    # description
    # name
    # elastic_beanstalk_application_name
    tags = {}
    environment_type = "LoadBalanced"
    proxy_server = "none"
    loadbalancer_type = "application"
    dns_zone_id = null
    dns_subdomain = null
    additional_security_groups = []
    vpc_id = null
    loadbalancer_subnets = []
    # application_subnets
    availability_zone_selector = null
    instance_type = "t2.micro"
    enable_spot_instances = null
    spot_fleet_on_demand_base = null
    spot_fleet_on_demand_above_base_percentage = -1
    spot_max_price = -1
    enhanced_reporting_enabled = true
    managed_actions_enabled = null
    autoscale_min = -1
    autoscale_max = -1
    # solution_stack_name 
    wait_for_ready_timeout = "20m"
    associate_public_ip_address = false
    tier = "WebServer"
    version_label = ""
    deployment_policy = null
    rolling_update_enabled = null
    rolling_update_type = null
    updating_min_in_service = -1
    updating_max_batch = -1
    health_streaming_enabled = false
    health_streaming_delete_on_terminate = false
    health_streaming_retention_in_days = -1
    healthcheck_url = null
    enable_log_publication_control = false
    enable_stream_logs = true
    logs_delete_on_terminate = false
    logs_retention_in_days = -1
    loadbalancer_certificate_arn = null
    loadbalancer_ssl_policy = ""
    loadbalancer_security_groups = []
    loadbalancer_managed_security_group = ""
    loadbalancer_connection_draining_enabled = false
    http_listener_enabled = true
    application_port = 80
    preferred_start_time = "Sun:10:00"
    update_level = "minor"
    instance_refresh_enabled = null
    keypair = null
    root_volume_size = -1
    root_volume_type = null
    autoscale_measure_name = null
    autoscale_statistic = null
    autoscale_unit = null
    autoscale_lower_bound = -1
    autoscale_lower_increment = -1
    autoscale_upper_bound = -1
    autoscale_upper_increment = -1
    elb_scheme = "public"
    vpc_subnets = []
    vpc_elb_subnets = []
    additional_settings = []
    env_vars = {}
    #env_vars = { DB_USER = 'admin' DB_PASS = 'xxxxxx' }
    ami_id = null
    deployment_batch_size_type = null
    deployment_batch_size = -1
    deployment_ignore_health_check = true
    deployment_timeout = -1
    extended_ec2_policy_document = "{}"
    prefer_legacy_ssm_policy = true
    prefer_legacy_service_policy = true
    s3_bucket_versioning_enabled = null
    s3_bucket_encryption_enabled = null
    scheduled_actions = []

    iam_role_name = null
    iam_role_instance_profile_name = null
    iam_role_service_name = null
    aws_s3_bucket_elb_logs = null
    loadbalancer_access_logs_enabled = true
  }
  cfg = merge(local.defaults, var.configuration)
}