variable "secrets_prod_initial_setup" {
  default = {
    DATABASE_USERNAME = "adminweather-js-app"
    DATABASE_PASSWORD = "4DM1N_m41lw1s3"
  }
  type = map(string)
}

variable "secrets_staging_initial_setup" {
  default = {
    DATABASE_USERNAME = "adminweather-js-app"
    DATABASE_PASSWORD = "4DM1N_m41lw1s3"
  }
  type = map(string)
}

####################################################################


resource "aws_secretsmanager_secret" "prod" {
  name = "weather-js-app-prod"
  description = "Secret environment for weather-js-app-prod"
  tags = var.global["tags"]
}

resource "aws_secretsmanager_secret" "staging" {
  name = "weather-js-app-staging"
  description = "Secret environment for weather-js-app-staging"
  tags = var.global["tags"]
}

resource "aws_secretsmanager_secret_version" "prod_initial_setup" {
  secret_id = aws_secretsmanager_secret.prod.id
  secret_string = jsonencode(var.secrets_prod_initial_setup)
}

resource "aws_secretsmanager_secret_version" "staging_initial_setup" {
  secret_id = aws_secretsmanager_secret.staging.id
  secret_string = jsonencode(var.secrets_staging_initial_setup)
}

##############################################################


data "aws_secretsmanager_secret_version" "prod" {
  secret_id = aws_secretsmanager_secret.prod.id
}

data "aws_secretsmanager_secret_version" "staging" {
  secret_id = aws_secretsmanager_secret.staging.id
}

