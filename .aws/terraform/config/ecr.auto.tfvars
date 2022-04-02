ecr = {
    app_fe = {
        name = "weather-js-app/app-fe"
        tags = {
            "Environment" = "weather-js-app"
        }
    }
    app_be = {
        name = "weather-js-app/app-be"
        tags = {
            "Environment" = "weather-js-app"
        }
    }
    traefik = {
        name = "weather-js-app/traefik"
        tags = {
            "Environment" = "weather-js-app"
        }
    }
}
