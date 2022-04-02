rds = {
  prod = {
    name = "weather-js-app_prod"
    publicly_accessible = true
    identifier = "weather-js-app-prod"
    port = 5432
    engine               = "postgres"
    engine_version       = "13.3"
    family               = "postgres13"
    major_engine_version = "13"
    instance_class       = "db.t3.small"
    allocated_storage     = 20
    max_allocated_storage = 100
    storage_encrypted     = false
    multi_az              = true
    performance_insights_enabled = true
    backup_retention_period = 7

    monitoring_interval = 15
    monitoring_role_name = "weather-js-app-prod-enhance-monitoring"
    create_monitoring_role = true

    parameters = [
        {
          name  = "autovacuum"
          value = 1
        },
        {
          name  = "client_encoding"
          value = "utf8"
        },
        {
          name = "timezone"
          value = "Europe/Prague"
        }
      ]
    tags = {
      "Environment" = "weather-js-app-prod"
    }
  }
  staging = {
    name = "weather-js-app_staging"
    publicly_accessible = true
    identifier = "weather-js-app-staging"
    port = 5432
    engine               = "postgres"
    engine_version       = "13.3"
    family               = "postgres13"
    major_engine_version = "13"
    instance_class       = "db.t3.small"
    allocated_storage     = 20
    max_allocated_storage = 100
    storage_encrypted     = false
    multi_az               = true
    performance_insights_enabled = true
    backup_retention_period = 7

    monitoring_interval = 15
    monitoring_role_name = "weather-js-app-staging-enhance-monitoring"
    create_monitoring_role = true

    parameters = [
        {
          name  = "autovacuum"
          value = 1
        },
        {
          name  = "client_encoding"
          value = "utf8"
        },
        {
          name = "timezone"
          value = "Europe/Prague"
        }
      ]
    tags = {
      "Environment" = "weather-js-app-staging"
    }
  }
}
