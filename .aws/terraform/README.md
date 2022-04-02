# Terraform config for production load-balanced server in AWS

You'll need setted up access to AWS CLI from your local machine.
You'll need permissions in AWS (https://console.aws.amazon.com/iam/home#/roles/OrganizationAccountAccessRole?section=trust).
If you're in trouble, contact devops.

You can change your AWS account in `.aws/terraform/config/global.auto.tfvars`


1. cd .aws/terraform

2. source ./asume_role.sh config

3. cd config

4. terraform init

5. terraform plan

6. terraform apply
