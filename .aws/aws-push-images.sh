#!/bin/sh
set -eux

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "Missing env var AWS_ACCESS_KEY_ID. Exiting."
  exit 1
fi
if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "Missing env var AWS_SECRET_ACCESS_KEY. Exiting."
  exit 1
fi

echo "AWS_ECR_HOST: ${AWS_ECR_HOST:?}"
echo "AWS_ECR_NAMESPACE: ${AWS_ECR_NAMESPACE:?}"
echo "AWS_EB_APP_NAME: ${AWS_EB_APP_NAME:?}"
echo "AWS_EB_ENVIRONMENT: ${AWS_EB_ENVIRONMENT:?}"
echo "S3_DEPLOY_BUCKET: ${S3_DEPLOY_BUCKET:?}"
echo "APP_ENV: ${APP_ENV:?}"
echo "APP_VERSION: ${APP_VERSION:?}"
echo "APP_VERSION_SEMANTIC: ${APP_VERSION_SEMANTIC:?}"
echo "DOCKER_REGISTRY: ${DOCKER_REGISTRY:?}"
echo "DOCKER_REGISTRY_USERNAME: ${DOCKER_REGISTRY_USERNAME:?}"
echo "FRONTEND_IMAGE: ${FRONTEND_IMAGE:?}"
echo "BACKEND_IMAGE: ${BACKEND_IMAGE:?}"
echo "TRAEFIK_IMAGE: ${TRAEFIK_IMAGE:?}"

AWS_CLI="docker run --rm -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -v $(pwd):/aws amazon/aws-cli:latest --region eu-west-1"

# Login to docker registry and to AWS registry
docker login -u "$DOCKER_REGISTRY_USERNAME" -p "$DOCKER_REGISTRY_PASSWORD" "$DOCKER_REGISTRY"
$AWS_CLI ecr get-login-password | docker login ${AWS_ECR_HOST} --username AWS --password-stdin

# Pull app docker images from CI
docker pull $FRONTEND_IMAGE
docker pull $BACKEND_IMAGE
docker pull $TRAEFIK_IMAGE

# Tag images
docker tag $FRONTEND_IMAGE ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/app-fe:${APP_VERSION}
docker tag $BACKEND_IMAGE ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/app-be:${APP_VERSION}
docker tag $TRAEFIK_IMAGE ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/traefik:${APP_VERSION}

# Push images to AWS repo
docker push ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/app-fe:${APP_VERSION}
docker push ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/app-be:${APP_VERSION}
docker push ${AWS_ECR_HOST}/${AWS_ECR_NAMESPACE}/traefik:${APP_VERSION}

# Remove images
docker rmi -f $FRONTEND_IMAGE
docker rmi -f $BACKEND_IMAGE
docker rmi -f $TRAEFIK_IMAGE
