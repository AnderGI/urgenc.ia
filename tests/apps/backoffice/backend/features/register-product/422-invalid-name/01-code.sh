#!/bin/bash

echo -e "\tchecking status code..."
echo -e "\texpected to be 202"

data='{"name":1235}'
status=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
        http://localhost:5000/app/products/a47494eb-7baa-4895-a4e4-27ed96921f23 \
        -H "Content-Type: application/json" \
        --data "$data")


if [ "$status" -eq 422 ]; then
  echo -e "\t✅ Status UNPROCESSABLE ENTITY ($status)"
else
  echo -e "\t❌ Unexpected status: $status"
  exit 1
fi
