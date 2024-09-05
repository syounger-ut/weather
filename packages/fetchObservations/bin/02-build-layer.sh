#!/bin/bash
set -eo pipefail

LIB_NODE_MODULES=lib/nodejs/node_modules
NODE_MODULES=node_modules
LIB_NODEJS=lib/nodejs

mkdir -p "$LIB_NODEJS"
rm -rf "$NODE_MODULES" "$LIB_NODE_MODULES"
npm install --omit=dev --workspace=fetchObservations
cp -r "$NODE_MODULES" "$LIB_NODEJS"
