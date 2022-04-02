sg = {
  rds = {
    name        = "weather-js-app-rds-sg"
    description = "Security group for RDS with custom ports open within VPC, and PostgreSQL publicly open"

    ingress_rules = ["postgresql-tcp"]
    ingress_cidr_blocks = ["0.0.0.0/0"]
    egress_rules = ["all-all"]
    egress_cidr_blocks = ["0.0.0.0/0"]
    tags = {
      "Environment" = "weather-js-app"
    }
  }
  eb = {
    name        = "weather-js-app-eb-sg"
    description = "Security group for EB open within VPC"

    ingress_rules = ["http-80-tcp", "https-443-tcp", "ssh-tcp"]
    ingress_cidr_blocks = ["0.0.0.0/0"]
    egress_rules = ["all-all"]
    egress_cidr_blocks = ["0.0.0.0/0"]
    tags = {
      "Environment" = "weather-js-app"
    }
  }
}
