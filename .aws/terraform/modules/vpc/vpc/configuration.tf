locals {
  defaults = {
    tags = {}
    create_vpc = true
    # name = 
    cidr = "0.0.0.0/0"
    enable_ipv6 = false
    private_subnet_ipv6_prefixes = []
    public_subnet_ipv6_prefixes = []
    outpost_subnet_ipv6_prefixes = []
    database_subnet_ipv6_prefixes = []
    redshift_subnet_ipv6_prefixes = []
    elasticache_subnet_ipv6_prefixes = []
    intra_subnet_ipv6_prefixes = []
    assign_ipv6_address_on_creation = false
    private_subnet_assign_ipv6_address_on_creation = null
    public_subnet_assign_ipv6_address_on_creation = null
    outpost_subnet_assign_ipv6_address_on_creation = null
    database_subnet_assign_ipv6_address_on_creation = null
    redshift_subnet_assign_ipv6_address_on_creation = null
    elasticache_subnet_assign_ipv6_address_on_creation = null
    intra_subnet_assign_ipv6_address_on_creation = null
    secondary_cidr_blocks = []
    instance_tenancy = "default"
    public_subnet_suffix = "public"
    private_subnet_suffix = "private"
    outpost_subnet_suffix = "outpost"
    intra_subnet_suffix = "intra"
    database_subnet_suffix = "db"
    redshift_subnet_suffix = "redshift"
    elasticache_subnet_suffix = "elasticache"
    public_subnets = []
    private_subnets = []
    outpost_subnets = []
    database_subnets = []
    redshift_subnets = []
    elasticache_subnets = []
    intra_subnets = []
    create_database_subnet_route_table = false
    create_redshift_subnet_route_table = false
    enable_public_redshift = false
    create_elasticache_subnet_route_table = false
    create_database_subnet_group = true
    create_elasticache_subnet_group = true
    create_redshift_subnet_group = true
    create_database_internet_gateway_route = false
    create_database_nat_gateway_route = false
    azs = []
    enable_dns_hostnames = false
    enable_dns_support = true
    enable_classiclink = null
    enable_classiclink_dns_support = null
    enable_nat_gateway = false
    single_nat_gateway = false
    one_nat_gateway_per_az = false
    reuse_nat_ips = false
    external_nat_ip_ids = []
    external_nat_ips = []
    map_public_ip_on_launch = true
    customer_gateways = {}
    enable_vpn_gateway = false
    vpn_gateway_id = ""
    amazon_side_asn = "64512"
    vpn_gateway_az = null
    propagate_intra_route_tables_vgw = false
    propagate_private_route_tables_vgw = false
    propagate_public_route_tables_vgw = false
    manage_default_route_table = true
    default_route_table_propagating_vgws = []
    default_route_table_routes = []
    default_route_table_tags = {}
    tags = {}
    vpc_tags = {}
    igw_tags = {}
    public_subnet_tags = {}
    private_subnet_tags = {}
    outpost_subnet_tags = {}
    public_route_table_tags = {}
    private_route_table_tags = {}
    database_route_table_tags = {}
    redshift_route_table_tags = {}
    elasticache_route_table_tags = {}
    intra_route_table_tags = {}
    database_subnet_tags = {}
    database_subnet_group_tags = {}
    redshift_subnet_tags = {}
    redshift_subnet_group_tags = {}
    elasticache_subnet_tags = {}
    intra_subnet_tags = {}
    public_acl_tags = {}
    private_acl_tags = {}
    outpost_acl_tags = {}
    intra_acl_tags = {}
    database_acl_tags = {}
    redshift_acl_tags = {}
    elasticache_acl_tags = {}
    dhcp_options_tags = {}
    nat_gateway_tags = {}
    nat_eip_tags = {}
    customer_gateway_tags = {}
    vpn_gateway_tags = {}
    vpc_flow_log_tags = {}
    vpc_flow_log_permissions_boundary = null
    enable_dhcp_options = false
    dhcp_options_domain_name = ""
    dhcp_options_domain_name_servers = ["AmazonProvidedDNS"]
    dhcp_options_ntp_servers = []
    dhcp_options_netbios_name_servers = []
    dhcp_options_netbios_node_type = ""
    manage_default_vpc = false
    default_vpc_name = ""
    default_vpc_enable_dns_support = true
    default_vpc_enable_dns_hostnames = false
    default_vpc_enable_classiclink = false
    default_vpc_tags = {}
    manage_default_network_acl = false
    default_network_acl_name = ""
    default_network_acl_tags = {}
    public_dedicated_network_acl = false
    private_dedicated_network_acl = false
    outpost_dedicated_network_acl = false
    intra_dedicated_network_acl = false
    database_dedicated_network_acl = false
    redshift_dedicated_network_acl = false
    elasticache_dedicated_network_acl = false
    default_network_acl_ingress = [
      {
        rule_no    = 100
        action     = "allow"
        from_port  = 0
        to_port    = 0
        protocol   = "-1"
        cidr_block = "0.0.0.0/0"
      },
      {
        rule_no         = 101
        action          = "allow"
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        ipv6_cidr_block = "::/0"
      },
    ]
    default_network_acl_egress = [
      {
        rule_no    = 100
        action     = "allow"
        from_port  = 0
        to_port    = 0
        protocol   = "-1"
        cidr_block = "0.0.0.0/0"
      },
      {
        rule_no         = 101
        action          = "allow"
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        ipv6_cidr_block = "::/0"
      },
    ]
    public_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    public_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    private_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    private_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    outpost_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    outpost_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    intra_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    intra_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    database_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    database_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    redshift_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    redshift_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    elasticache_inbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    elasticache_outbound_acl_rules = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
    manage_default_security_group = false
    default_security_group_name = "default"
    default_security_group_ingress = []
    enable_flow_log = false
    default_security_group_egress = []
    default_security_group_tags = {}
    create_flow_log_cloudwatch_log_group = false
    create_flow_log_cloudwatch_iam_role = false
    flow_log_traffic_type = "ALL"
    flow_log_destination_type = "cloud-watch-logs"
    flow_log_log_format = null
    flow_log_destination_arn = ""
    flow_log_cloudwatch_iam_role_arn = "" 
    flow_log_cloudwatch_log_group_name_prefix = "/aws/vpc-flow-log/"
    flow_log_cloudwatch_log_group_retention_in_days = null
    flow_log_cloudwatch_log_group_kms_key_id = null
    flow_log_max_aggregation_interval = 600
    create_igw = true
    create_egress_only_igw = true
    outpost_arn = null
    outpost_az = null
  }
  cfg = merge(local.defaults, var.configuration)
}