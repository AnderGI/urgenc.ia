#!/bin/bash

echo -e "\tchecking response body..."
echo -e "\texpected to be empty"

data='{"name":"foo"}'
body=$(curl -s -X PUT  http://localhost:5000/app/products/hvhvgcgc \
        -H "Content-Type: application/json" \
        --data "$data"
      )

if [ -z "$body" ]; then
  echo -e "\t✅ Body is empty"
else
  echo -e "\t❌ Body is NOT empty: '$body'"
  exit 1
fi
