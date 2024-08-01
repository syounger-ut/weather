#!/bin/bash
set -eo pipefail
ARTIFACT_BUCKET=$(cat bucket-name.txt)
aws cloudformation package --template-file template.yaml --s3-bucket "$ARTIFACT_BUCKET" --output-template-file out.yml
aws cloudformation deploy --template-file out.yml --stack-name tempest-weather-app --capabilities CAPABILITY_NAMED_IAM
