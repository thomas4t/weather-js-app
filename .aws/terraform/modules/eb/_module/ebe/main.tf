resource "aws_iam_role_policy_attachment" "enhanced_health" {
  count      = var.enhanced_reporting_enabled ? 1 : 0
  role       = var.iam_role_service_name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth"
}

resource "aws_iam_role_policy_attachment" "service" {
  role       = var.iam_role_service_name
  policy_arn = var.prefer_legacy_service_policy ? "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkService" : "arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy"
}

resource "aws_iam_role_policy_attachment" "elastic_beanstalk_multi_container_docker" {
  role       = var.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker"
}

resource "aws_iam_policy" "default" {
  name   = "${var.name}-eb-default"
  path   = "/"
  description = "Default EB policy"
  policy = data.aws_iam_policy_document.extended.json
}

resource "aws_iam_role_policy_attachment" "default" {
  role       = var.iam_role_name
  policy_arn = aws_iam_policy.default.arn
}

resource "aws_iam_role_policy_attachment" "web_tier" {
  role       = var.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_role_policy_attachment" "worker_tier" {
  role       = var.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier"
}

resource "aws_iam_role_policy_attachment" "ssm_ec2" {
  role       = var.iam_role_name
  policy_arn = var.prefer_legacy_ssm_policy ? "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM" : "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "ssm_automation" {
  role       = var.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonSSMAutomationRole"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "ecr_readonly" {
  role       = var.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_ssm_activation" "ec2" {
  name               = var.elastic_beanstalk_application_name
  iam_role           = var.iam_role_name
  registration_limit = var.autoscale_max
  tags               = var.tags
}

data "aws_iam_policy_document" "default" {
  statement {
    actions = [
      "elasticloadbalancing:DescribeInstanceHealth",
      "elasticloadbalancing:DescribeLoadBalancers",
      "elasticloadbalancing:DescribeTargetHealth",
      "ec2:DescribeInstances",
      "ec2:DescribeInstanceStatus",
      "ec2:GetConsoleOutput",
      "ec2:AssociateAddress",
      "ec2:DescribeAddresses",
      "ec2:DescribeSecurityGroups",
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "autoscaling:DescribeAutoScalingGroups",
      "autoscaling:DescribeAutoScalingInstances",
      "autoscaling:DescribeScalingActivities",
      "autoscaling:DescribeNotificationConfigurations",
    ]

    resources = ["*"]

    effect = "Allow"
  }

  statement {
    sid = "AllowOperations"

    actions = [
      "autoscaling:AttachInstances",
      "autoscaling:CreateAutoScalingGroup",
      "autoscaling:CreateLaunchConfiguration",
      "autoscaling:DeleteLaunchConfiguration",
      "autoscaling:DeleteAutoScalingGroup",
      "autoscaling:DeleteScheduledAction",
      "autoscaling:DescribeAccountLimits",
      "autoscaling:DescribeAutoScalingGroups",
      "autoscaling:DescribeAutoScalingInstances",
      "autoscaling:DescribeLaunchConfigurations",
      "autoscaling:DescribeLoadBalancers",
      "autoscaling:DescribeNotificationConfigurations",
      "autoscaling:DescribeScalingActivities",
      "autoscaling:DescribeScheduledActions",
      "autoscaling:DetachInstances",
      "autoscaling:PutScheduledUpdateGroupAction",
      "autoscaling:ResumeProcesses",
      "autoscaling:SetDesiredCapacity",
      "autoscaling:SuspendProcesses",
      "autoscaling:TerminateInstanceInAutoScalingGroup",
      "autoscaling:UpdateAutoScalingGroup",
      "cloudwatch:PutMetricAlarm",
      "ec2:AssociateAddress",
      "ec2:AllocateAddress",
      "ec2:AuthorizeSecurityGroupEgress",
      "ec2:AuthorizeSecurityGroupIngress",
      "ec2:CreateSecurityGroup",
      "ec2:DeleteSecurityGroup",
      "ec2:DescribeAccountAttributes",
      "ec2:DescribeAddresses",
      "ec2:DescribeImages",
      "ec2:DescribeInstances",
      "ec2:DescribeKeyPairs",
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeSnapshots",
      "ec2:DescribeSubnets",
      "ec2:DescribeVpcs",
      "ec2:DisassociateAddress",
      "ec2:ReleaseAddress",
      "ec2:RevokeSecurityGroupEgress",
      "ec2:RevokeSecurityGroupIngress",
      "ec2:TerminateInstances",
      "ecs:CreateCluster",
      "ecs:DeleteCluster",
      "ecs:DescribeClusters",
      "ecs:RegisterTaskDefinition",
      "elasticbeanstalk:*",
      "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
      "elasticloadbalancing:ConfigureHealthCheck",
      "elasticloadbalancing:CreateLoadBalancer",
      "elasticloadbalancing:DeleteLoadBalancer",
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:DescribeInstanceHealth",
      "elasticloadbalancing:DescribeLoadBalancers",
      "elasticloadbalancing:DescribeTargetHealth",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:DescribeTargetGroups",
      "elasticloadbalancing:RegisterTargets",
      "elasticloadbalancing:DeregisterTargets",
      "iam:ListRoles",
      "iam:PassRole",
      "logs:CreateLogGroup",
      "logs:PutRetentionPolicy",
      "rds:DescribeDBEngineVersions",
      "rds:DescribeDBInstances",
      "rds:DescribeOrderableDBInstanceOptions",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:ListBucket",
      "sns:CreateTopic",
      "sns:GetTopicAttributes",
      "sns:ListSubscriptionsByTopic",
      "sns:Subscribe",
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "codebuild:CreateProject",
      "codebuild:DeleteProject",
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
    ]

    resources = ["*"]

    effect = "Allow"
  }

  statement {
    sid = "AllowS3OperationsOnElasticBeanstalkBuckets"

    actions = [
      "s3:*"
    ]

    resources = [
      "arn:aws:s3:::*"
    ]

    effect = "Allow"
  }

  statement {
    sid = "AllowDeleteCloudwatchLogGroups"

    actions = [
      "logs:DeleteLogGroup"
    ]

    resources = [
      "arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk*"
    ]

    effect = "Allow"
  }

  statement {
    sid = "AllowCloudformationOperationsOnElasticBeanstalkStacks"

    actions = [
      "cloudformation:*"
    ]

    resources = [
      "arn:aws:cloudformation:*:*:stack/awseb-*",
      "arn:aws:cloudformation:*:*:stack/eb-*"
    ]

    effect = "Allow"
  }
}

data "aws_iam_policy_document" "extended" {
  source_json   = data.aws_iam_policy_document.default.json
  override_json = var.extended_ec2_policy_document
}

locals {
  # Remove `Name` tag from the map of tags because Elastic Beanstalk generates the `Name` tag automatically
  # and if it is provided, terraform tries to recreate the application on each `plan/apply`
  # `Namespace` should be removed as well since any string that contains `Name` forces recreation
  # https://github.com/terraform-providers/terraform-provider-aws/issues/3963
  tags = { for t in keys(var.tags) : t => var.tags[t] if t != "Name" && t != "Namespace" }

  classic_elb_settings = [
    {
      namespace = "aws:elb:loadbalancer"
      name      = "CrossZone"
      value     = var.loadbalancer_crosszone
    },
    {
      namespace = "aws:elb:loadbalancer"
      name      = "SecurityGroups"
      value     = join(",", sort(var.loadbalancer_security_groups))
    },
    {
      namespace = "aws:elb:loadbalancer"
      name      = "ManagedSecurityGroup"
      value     = var.loadbalancer_managed_security_group
    },

    {
      namespace = "aws:elb:listener"
      name      = "ListenerProtocol"
      value     = "HTTP"
    },
    {
      namespace = "aws:elb:listener"
      name      = "InstancePort"
      value     = var.application_port
    },
    {
      namespace = "aws:elb:listener"
      name      = "ListenerEnabled"
      value     = var.http_listener_enabled || var.loadbalancer_certificate_arn == null ? "true" : "false"
    },
    {
      namespace = "aws:elb:listener:443"
      name      = "ListenerProtocol"
      value     = "HTTPS"
    },
    {
      namespace = "aws:elb:listener:443"
      name      = "InstancePort"
      value     = var.application_port
    },
    {
      namespace = "aws:elb:listener:443"
      name      = "SSLCertificateId"
      value     = var.loadbalancer_certificate_arn == null ? "false" : var.loadbalancer_certificate_arn
    },
    {
      namespace = "aws:elb:listener:443"
      name      = "ListenerEnabled"
      value     = var.loadbalancer_certificate_arn == null ? "false" : "true"
    },
    {
      namespace = "aws:elb:policies"
      name      = "ConnectionDrainingEnabled"
      value     = var.loadbalancer_connection_draining_enabled
    },
  ]
  alb_settings = [
    {
      namespace = "aws:elbv2:loadbalancer"
      name      = "AccessLogsS3Bucket"
      value     = var.aws_s3_bucket_elb_logs
    },
    {
      namespace = "aws:elbv2:loadbalancer"
      name      = "AccessLogsS3Enabled"
      value     = var.loadbalancer_access_logs_enabled
    },
    {
      namespace = "aws:elbv2:loadbalancer"
      name      = "SecurityGroups"
      value     = join(",", sort(var.loadbalancer_security_groups))
    },
    {
      namespace = "aws:elbv2:loadbalancer"
      name      = "ManagedSecurityGroup"
      value     = var.loadbalancer_managed_security_group
    },
    {
      namespace = "aws:elbv2:listener:default"
      name      = "ListenerEnabled"
      value     = var.http_listener_enabled || var.loadbalancer_certificate_arn == null ? "true" : "false"
    },
    {
      namespace = "aws:elbv2:listener:443"
      name      = "ListenerEnabled"
      value     = var.loadbalancer_certificate_arn == null ? "false" : "true"
    },
    {
      namespace = "aws:elbv2:listener:443"
      name      = "Protocol"
      value     = "HTTPS"
    },
    {
      namespace = "aws:elbv2:listener:443"
      name      = "SSLCertificateArns"
      value     = var.loadbalancer_certificate_arn == null ? "" : var.loadbalancer_certificate_arn
    },
    {
      namespace = "aws:elbv2:listener:443"
      name      = "SSLPolicy"
      value     = var.loadbalancer_type == "application" ? var.loadbalancer_ssl_policy : ""
    }
  ]

  generic_elb_settings = [
    {
      namespace = "aws:ec2:vpc"
      name      = "ELBScheme"
      value     = var.environment_type == "LoadBalanced" ? var.elb_scheme : ""
    },
    {
      namespace = "aws:ec2:vpc"
      name      = "AssociatePublicIpAddress"
      value     = var.environment_type == "LoadBalanced" ? var.associate_public_ip_address : ""
    },
    {
    namespace = "aws:ec2:vpc"
    name = "Subnets"
    value = join(",", sort(var.vpc_subnets))
    },
    {
      namespace = "aws:ec2:vpc"
      name = "ELBSubnets"
      value = join(",", sort(var.vpc_elb_subnets))
    },
    {
      namespace = "aws:elasticbeanstalk:environment"
      name      = "LoadBalancerType"
      value     = var.loadbalancer_type
    },
    {
      namespace = "aws:elasticbeanstalk:environment:process:default"
      name      = "HealthCheckPath"
      value     = var.healthcheck_url
    },
    {
      namespace = "aws:elasticbeanstalk:environment:process:default"
      name      = "Port"
      value     = var.application_port
    },
    {
      namespace = "aws:elasticbeanstalk:environment:process:default"
      name      = "Protocol"
      value     = "HTTP"
    }
  ]

  # If the tier is "WebServer" add the elb_settings, otherwise exclude them
  elb_settings_final = var.tier == "WebServer" ? var.loadbalancer_type == "application" ? concat(local.alb_settings, local.generic_elb_settings) : concat(local.classic_elb_settings, local.generic_elb_settings) : []
}

#
# Full list of options:
# http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-elasticbeanstalkmanagedactionsplatformupdate
#
resource "aws_elastic_beanstalk_environment" "this" {
  name                   = var.name
  application            = var.elastic_beanstalk_application_name
  description            = var.description
  tier                   = var.tier
  solution_stack_name    = var.solution_stack_name
  wait_for_ready_timeout = var.wait_for_ready_timeout
  version_label          = var.version_label
  tags                   = local.tags

  dynamic "setting" {
    for_each = local.elb_settings_final
    content {
      namespace = setting.value["namespace"]
      name      = setting.value["name"]
      value     = setting.value["value"]
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.additional_security_groups
    content {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "SecurityGroups"
      value     = join(",", compact(var.additional_security_groups))
      resource  = ""
    }
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = var.iam_role_instance_profile_name
    resource  = ""
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:proxy"
    name      = "ProxyServer"
    value     = var.proxy_server
    resource  = ""
  }

  dynamic "setting" {
    for_each = var.availability_zone_selector == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:asg"
      name      = "Availability Zones"
      value     = var.availability_zone_selector
      resource  = ""
    }
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = var.environment_type
    resource  = ""
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = var.iam_role_service_name
    resource  = ""
  }

  # setting {
  #   namespace = "aws:elasticbeanstalk:application:environment"
  #   name      = "BASE_HOST"
  #   value     = var.elastic_beanstalk_application_name
  #   resource  = ""
  # }

  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = var.enhanced_reporting_enabled ? "enhanced" : "basic"
    resource  = ""
  }

  dynamic "setting" {
    for_each = var.managed_actions_enabled == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:managedactions"
      name      = "ManagedActionsEnabled"
      value     = var.managed_actions_enabled ? "true" : "false"
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_min == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:asg"
      name      = "MinSize"
      value     = var.autoscale_min
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_max == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:asg"
      name      = "MaxSize"
      value     = var.autoscale_max
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.rolling_update_enabled == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:updatepolicy:rollingupdate"
      name      = "RollingUpdateEnabled"
      value     = var.rolling_update_enabled
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.rolling_update_type == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:updatepolicy:rollingupdate"
      name      = "RollingUpdateType"
      value     = var.rolling_update_type
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.updating_min_in_service == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:updatepolicy:rollingupdate"
      name      = "MinInstancesInService"
      value     = var.updating_min_in_service
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.updating_max_batch == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:updatepolicy:rollingupdate"
      name      = "MaxBatchSize"
      value     = var.updating_max_batch
      resource  = ""
    }
  }

  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = var.instance_type
    resource  = ""

  }

  dynamic "setting" {
    for_each = var.enable_spot_instances == null ? [] : [1]
    content {
      namespace = "aws:ec2:instances"
      name      = "EnableSpot"
      value     = var.enable_spot_instances ? "true" : "false"
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.spot_fleet_on_demand_base == null ? [] : [1]
    content {
      namespace = "aws:ec2:instances"
      name      = "SpotFleetOnDemandBase"
      value     = var.spot_fleet_on_demand_base
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.spot_fleet_on_demand_above_base_percentage == -1 ? [] : [1]
    content {
      namespace = "aws:ec2:instances"
      name      = "SpotFleetOnDemandAboveBasePercentage"
      value     = var.spot_fleet_on_demand_above_base_percentage == -1 ? (var.environment_type == "LoadBalanced" ? 70 : 0) : var.spot_fleet_on_demand_above_base_percentage
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.spot_max_price == -1 ? [] : [1]
    content {
      namespace = "aws:ec2:instances"
      name      = "SpotMaxPrice"
      value     = var.spot_max_price == -1 ? "" : var.spot_max_price
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.keypair == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "EC2KeyName"
      value     = var.keypair
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.root_volume_size == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "RootVolumeSize"
      value     = var.root_volume_size
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.root_volume_type == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "RootVolumeType"
      value     = var.root_volume_type
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.ami_id == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "ImageId"
      value     = var.ami_id
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.deployment_policy == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:command"
      name      = "DeploymentPolicy"
      value     = var.deployment_policy
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.deployment_batch_size_type == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:command"
      name      = "BatchSizeType"
      value     = var.deployment_batch_size_type
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.deployment_batch_size == -1 ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:command"
      name      = "BatchSize"
      value     = var.deployment_batch_size
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.deployment_ignore_health_check == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:command"
      name      = "IgnoreHealthCheck"
      value     = var.deployment_ignore_health_check
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.deployment_timeout == -1 ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:command"
      name      = "Timeout"
      value     = var.deployment_timeout
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.preferred_start_time == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:managedactions"
      name      = "PreferredStartTime"
      value     = var.preferred_start_time
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.update_level == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:managedactions:platformupdate"
      name      = "UpdateLevel"
      value     = var.update_level
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.instance_refresh_enabled == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:managedactions:platformupdate"
      name      = "InstanceRefreshEnabled"
      value     = var.instance_refresh_enabled
      resource  = ""
    }
  }

  ###=========================== Autoscale trigger ========================== ###

  dynamic "setting" {
    for_each = var.autoscale_measure_name == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "MeasureName"
      value     = var.autoscale_measure_name
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_statistic == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "Statistic"
      value     = var.autoscale_statistic
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_unit == null ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "Unit"
      value     = var.autoscale_unit
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_lower_bound == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "LowerThreshold"
      value     = var.autoscale_lower_bound
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_lower_increment == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "LowerBreachScaleIncrement"
      value     = var.autoscale_lower_increment
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.autoscale_upper_bound == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "UpperThreshold"
      value     = var.autoscale_upper_bound
      resource  = ""
    }
  }
  dynamic "setting" {
    for_each = var.autoscale_upper_increment == -1 ? [] : [1]
    content {
      namespace = "aws:autoscaling:trigger"
      name      = "UpperBreachScaleIncrement"
      value     = var.autoscale_upper_increment
      resource  = ""
    }
  }

  ###=========================== Scheduled Actions ========================== ###

  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "MinSize"
      value     = setting.value.minsize
      resource  = setting.value.name
    }
  }
  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "MaxSize"
      value     = setting.value.maxsize
      resource  = setting.value.name
    }
  }
  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "DesiredCapacity"
      value     = setting.value.desiredcapacity
      resource  = setting.value.name
    }
  }
  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "Recurrence"
      value     = setting.value.recurrence
      resource  = setting.value.name
    }
  }
  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "StartTime"
      value     = setting.value.starttime
      resource  = setting.value.name
    }
  }
  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "EndTime"
      value     = setting.value.endtime
      resource  = setting.value.name
    }
  }

  dynamic "setting" {
    for_each = var.scheduled_actions
    content {
      namespace = "aws:autoscaling:scheduledaction"
      name      = "Suspend"
      value     = setting.value.suspend ? "true" : "false"
      resource  = setting.value.name
    }
  }


  ###=========================== Logging ========================== ###

  dynamic "setting" {
    for_each = var.enable_log_publication_control == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:hostmanager"
      name      = "LogPublicationControl"
      value     = var.enable_log_publication_control ? "true" : "false"
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.enable_stream_logs == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs"
      name      = "StreamLogs"
      value     = var.enable_stream_logs ? "true" : "false"
      resource  = ""
    }
  }
  dynamic "setting" {
    for_each = var.logs_delete_on_terminate == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs"
      name      = "DeleteOnTerminate"
      value     = var.logs_delete_on_terminate ? "true" : "false"
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.logs_retention_in_days == -1 ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs"
      name      = "RetentionInDays"
      value     = var.logs_retention_in_days
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.health_streaming_enabled == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
      name      = "HealthStreamingEnabled"
      value     = var.health_streaming_enabled ? "true" : "false"
      resource  = ""
    }
  }

  dynamic "setting" {
    for_each = var.health_streaming_delete_on_terminate == null ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
      name      = "DeleteOnTerminate"
      value     = var.health_streaming_delete_on_terminate ? "true" : "false"
      resource  = ""
    }
  }
  dynamic "setting" {
    for_each = var.health_streaming_retention_in_days == -1 ? [] : [1]
    content {
      namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
      name      = "RetentionInDays"
      value     = var.health_streaming_retention_in_days
      resource  = ""
    }
  }

  # Add additional Elastic Beanstalk settings
  # For full list of options, see https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
  dynamic "setting" {
    for_each = var.additional_settings
    content {
      namespace = setting.value.namespace
      name      = setting.value.name
      value     = setting.value.value
      resource  = ""
    }
  }

  # dynamic needed as "spot max price" should only have a value if it is defined.
  dynamic "setting" {
    for_each = var.spot_max_price == -1 ? [] : [var.spot_max_price]
    content {
      namespace = "aws:ec2:instances"
      name      = "SpotMaxPrice"
      value     = var.spot_max_price
      resource  = ""
    }
  }

  # Add environment variables if provided
  dynamic "setting" {
    for_each = var.env_vars
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
      resource  = ""
    }
  }
}

data "aws_elb_service_account" "main" {
  count = var.tier == "WebServer" && var.environment_type == "LoadBalanced" ? 1 : 0
}

data "aws_iam_policy_document" "elb_logs" {
  count = var.tier == "WebServer" && var.environment_type == "LoadBalanced" ? 1 : 0

  statement {
    sid = ""

    actions = [
      "s3:PutObject",
    ]

    resources = [
      "arn:aws:s3:::${var.aws_s3_bucket_elb_logs}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = [join("", data.aws_elb_service_account.main.*.arn)]
    }

    effect = "Allow"
  }
}
