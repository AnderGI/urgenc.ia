#!/bin/bash

echo -e "\tchecking register products feature. Invalid name"
echo -e "\tgiven I send a PUT request to http://localhost:5000/app/products/a47494eb-7baa-4895-a4e4-27ed96921f23"
echo -e "\tstatus code should be 422 UNPROCESSABLE ENTITY"
echo -e "\tresponse body should be empty"