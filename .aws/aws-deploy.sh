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
echo "DOCKER_REGISTRY: ${DOCKER_REGISTRY:?}"
echo "DOCKER_REGISTRY_USERNAME: ${DOCKER_REGISTRY_USERNAME:?}"

EB_APPS_DIR=".ebapp"
S3_DEPLOY_BUCKET_DIR=".ebapps"
ESB_APP_VERSION="app_${APP_ENV}_${APP_VERSION}"
ESB_APP_FILE="${ESB_APP_VERSION}.zip"
AWS_CLI="docker run --rm -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -v $(pwd):/aws amazon/aws-cli:latest --region eu-west-1"

# Login to docker AWS registry
$AWS_CLI ecr get-login-password | docker login ${AWS_ECR_HOST} --username AWS --password-stdin

# Generate application deployment
mkdir -p $EB_APPS_DIR
cp "docker-compose-AWS.yml" "docker-compose.yml"
cat docker-compose.yml
if [ "$APP_ENV" = "staging" ]; then
  # preserve first numeric value separated by pipe
  sed -i -e "s/|[0-9]\{1,\}//g" docker-compose.yml
else
  # preserve second numeric value separated by pipe
  sed -i -e "s/[0-9]\{1,\}|//g" docker-compose.yml
fi
sed -i -e "s/%APP_VERSION%/${APP_VERSION}/" docker-compose.yml
sed -i -e "s/%APP_ENV%/${APP_ENV}/" docker-compose.yml
sed -i -e "s/%AWS_ECR_HOST%/${AWS_ECR_HOST}/" docker-compose.yml
sed -i -e "s/%AWS_ECR_NAMESPACE%/${AWS_ECR_NAMESPACE}/" docker-compose.yml
cat docker-compose.yml
find .aws/ebextensions -type f -exec sed -i -e "s/%AWS_EB_ENVIRONMENT%/${AWS_EB_ENVIRONMENT}/g" {} \;
mkdir -p .ebextensions
cp -R .aws/ebextensions/* .ebextensions
ls -la .ebextensions/

zip -r ${EB_APPS_DIR}/${ESB_APP_FILE} .ebextensions/ docker-compose.yml
rm docker-compose.yml
rm -rf .ebextensions

# Upload app deployment to beanstalk repository
$AWS_CLI s3 cp "${EB_APPS_DIR}/${ESB_APP_FILE}" s3://${S3_DEPLOY_BUCKET}/$S3_DEPLOY_BUCKET_DIR/${ESB_APP_FILE}
$AWS_CLI elasticbeanstalk create-application-version --application-name $AWS_EB_APP_NAME --version-label ${ESB_APP_VERSION} --source-bundle S3Bucket=${S3_DEPLOY_BUCKET},S3Key=${S3_DEPLOY_BUCKET_DIR}/${ESB_APP_FILE}
$AWS_CLI elasticbeanstalk update-environment --application-name $AWS_EB_APP_NAME --environment-name $AWS_EB_ENVIRONMENT --version-label ${ESB_APP_VERSION}
