global = {
    region              =   "eu-west-1"
    admin_asume_role    =   "arn:aws:iam::795726301725:role/OrganizationAccountAccessRole"
    # zone_name         =   "mailship.eu" # TODO ... zone has to exists
    tags = {
      "Environment" = "weather-js-app"
      "Terraform"   = "true"
      "Maintainers" = "devops@inventi.cz"
    }
    operator_ips = []
}