#!/bin/bash
set -eo pipefail

LIB_NODE_MODULES="$(dirname "$0")"/../lib/nodejs/node_modules
NODE_MODULES="$(dirname "$0")"/../node_modules
LIB_NODEJS="$(dirname "$0")"/../lib/nodejs

mkdir -p "$LIB_NODEJS"
rm -rf "$NODE_MODULES" "$LIB_NODE_MODULES"
npm install --omit=dev --workspace=fetchObservations
cp -r "$NODE_MODULES" "$LIB_NODEJS"
