#!/bin/bash

source $(dirname "$0")/helpers/env-variables.sh
has_env_vars_set "STACK_NAME"

set -eo pipefail

function deploy_application {
  ARTIFACT_BUCKET=$(cat bucket-name.txt)
  aws cloudformation package --template-file template.yaml --s3-bucket "$ARTIFACT_BUCKET" --output-template-file out.yml
  aws cloudformation deploy --template-file out.yml --stack-name "$STACK_NAME" --capabilities CAPABILITY_NAMED_IAM
}

deploy_application

