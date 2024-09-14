#!/bin/bash

source $(dirname "$0")/helpers/env-variables.sh
has_env_vars_set "STACK_NAME"

set -eo pipefail
FUNCTION=$(aws cloudformation describe-stack-resource --stack-name $STACK_NAME --logical-resource-id TempestLambdaFunction --query 'StackResourceDetail.PhysicalResourceId' --output text)

aws lambda invoke --function-name "$FUNCTION" out.json
cat out.json
echo "DONE"
