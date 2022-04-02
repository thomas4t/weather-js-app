#
if [ -d "$1" ]; then 
    PROJECT=$1

    echo "Setup current environemnt to assume role for project $PROJECT"

    [ -n "$AWS_ACCESS_KEY_ID_orig" ] && export AWS_ACCESS_KEY_ID_orig=$AWS_ACCESS_KEY_ID
    [ -n "$AWS_SECRET_ACCESS_KEY_orig" ] && export AWS_SECRET_ACCESS_KEY_orig=$AWS_SECRET_ACCESS_KEY
    [ -n "$AWS_SESSION_TOKEN_orig" ] && export AWS_SESSION_TOKEN_orig=$AWS_SESSION_TOKEN

    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID_orig
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY_orig
    AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN_orig

    admin_asume_role=$(cat $PROJECT/global.auto.tfvars | grep admin_asume_role | sed -e 's/.*=//g' -e 's/\ *//g' -e 's/"//g')
    TF_ASUME=$(aws sts assume-role --role-arn $admin_asume_role --role-session-name terraform)

    echo "Assuming role $admin_asume_role"
    export AWS_ACCESS_KEY_ID=$(echo $TF_ASUME | jq -r '.Credentials.AccessKeyId')
    export AWS_SECRET_ACCESS_KEY=$(echo $TF_ASUME | jq -r '.Credentials.SecretAccessKey')
    export AWS_SESSION_TOKEN=$(echo $TF_ASUME | jq -r '.Credentials.SessionToken')

else
    echo "Project is not set correctly !!"
fi