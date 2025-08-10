#!/bin/bash

echo -e "\tchecking status code..."
echo -e "\texpected to be 422"

data='{"name":"foo"}'
status=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
        http://localhost:5000/app/products/hvhvgcgc \
        -H "Content-Type: application/json" \
        --data "$data")


if [ "$status" -eq 422 ]; then
  echo -e "\t✅ Status UNPROCESSABLE ENTITY ($status)"
else
  echo -e "\t❌ Unexpected status: $status"
  exit 1
fi
