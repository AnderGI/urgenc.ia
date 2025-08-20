#!/bin/sh
set -e

SRC="./src/apps/backoffice/backend/dependency-injection/node-dependency-injection"
DEST="./dist/apps/backoffice/backend/dependency-injection/node-dependency-injection"

find "$SRC" -name '*.yaml' | while read -r file; do
  echo "$file"
  echo "${file#$SRC/}"
  relative_path="${file#$SRC/}"
  
  mkdir -p "$DEST/$(dirname "$relative_path")"
  
  cp "$file" "$DEST/$relative_path"
  
done
