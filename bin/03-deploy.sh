#!/bin/bash

source "$(dirname "$0")"/helpers/env-variables.sh
has_env_vars_set "STACK_NAME"

set -eo pipefail

function deploy_application {
  ARTIFACT_BUCKET=$(cat bucket-name.txt)
  aws cloudformation package --template-file template.yaml --s3-bucket "$ARTIFACT_BUCKET" --output-template-file out.yml
  aws cloudformation deploy --template-file out.yml --stack-name "$STACK_NAME" --capabilities CAPABILITY_NAMED_IAM
}

function set_environment_variables {
  FUNCTION=$(aws cloudformation describe-stack-resource --stack-name "$STACK_NAME" --logical-resource-id function --query 'StackResourceDetail.PhysicalResourceId' --output text)

  aws lambda update-function-configuration --function-name "$FUNCTION" --environment Variables="{
    TEMPEST_HOST=$TEMPEST_HOST,
    TEMPEST_TOKEN=$TEMPEST_TOKEN,
    TEMPEST_DEVICE_ID=$TEMPEST_DEVICE_ID,
    TEMPEST_STATION_ID=$TEMPEST_STATION_ID
  }"
}

deploy_application
set_environment_variables
