vpc = {
    name = "vpc-weather-js-app"
    cidr = "10.10.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support   = true
    enable_default_security_group = false
    manage_default_security_group  = true

    assign_generated_ipv6_cidr_block = false

    enable_nat_gateway = false
    single_nat_gateway = false
    one_nat_gateway_per_az = false

    create_database_subnet_group           = false
    create_database_subnet_route_table     = false
    create_database_internet_gateway_route = false

    public_subnets      = ["10.10.1.0/24", "10.10.2.0/24"]
    private_subnets     = []
    database_subnets    = ["10.10.21.0/24", "10.10.22.0/24"]

    manage_default_route_table = true
    manage_default_network_acl = false
    propagate_public_route_tables_vgw = true
    propagate_private_route_tables_vgw = true

    public_dedicated_network_acl = false
    # public_inbound_acl_rules = [
    #   { # HTTP
    #     rule_number = 100
    #     rule_action = "allow"
    #     from_port   = 80
    #     to_port     = 80
    #     protocol    = "tcp"
    #     cidr_block  = "0.0.0.0/0"
    #   },
    #   { # HTTPs
    #     rule_number = 200
    #     rule_action = "allow"
    #     from_port   = 443
    #     to_port     = 443
    #     protocol    = "tcp"
    #     cidr_block  = "0.0.0.0/0"
    #   },{ # SSH
    #     rule_number = 300
    #     rule_action = "allow"
    #     from_port   = 22
    #     to_port     = 22
    #     protocol    = "tcp"
    #     cidr_block  = "0.0.0.0/0"
    #   },{ # local
    #     rule_number = 400
    #     rule_action = "allow"
    #     protocol    = "-1"
    #     cidr_block  = "0.0.0.0/0"
    #   },
    # ]

    private_dedicated_network_acl = false

    database_dedicated_network_acl = true
    database_inbound_acl_rules = [
      { # Postgresql
        rule_number = 100
        rule_action = "allow"
        from_port   = 5432
        to_port     = 5432
        protocol    = "tcp"
        cidr_block  = "10.10.0.0/16"
      },
      { # Postgresql - TODO public access should be restricted
        rule_number = 200
        rule_action = "allow"
        from_port   = 5432
        to_port     = 5432
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      ]
    enable_flow_log                      = true
    create_flow_log_cloudwatch_log_group = true
    create_flow_log_cloudwatch_iam_role  = true
    flow_log_max_aggregation_interval    = 60
}
