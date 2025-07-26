#!/bin/bash

echo -e "\tchecking status code..."
echo -e "\texpected to be 202"

status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/app/products/a47494eb-7baa-4895-a4e4-27ed96921f23)

if [ "$status" -eq 202 ]; then
  echo -e "\t✅ Status ACCEPTED ($status)"
else
  echo -e "\t❌ Unexpected status: $status"
  exit 1
fi
