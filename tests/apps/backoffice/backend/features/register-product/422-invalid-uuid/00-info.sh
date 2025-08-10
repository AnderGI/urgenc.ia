#!/bin/bash

echo -e "\tchecking register products feature. Invalid UUID"
echo -e "\tgiven I send a PUT request to http://localhost:5000/app/products/hvhvgcgc"
echo -e "\tstatus code should be 422 UNPROCESSABLE ENTITY"
echo -e "\tresponse body should be empty"