#!/bin/bash
echo  -e "Setting up docker compose and configuring all services\n"
docker compose up -d
echo -e "Termina el comando docker compose up -d\n\n"
echo -e "1. Checking if all services are healthy\n"
## get all ids and for each
for id in $(docker compose ps -q)
do
  service_name=$(docker ps -f id=${id} --format '{{.Names}}')
  echo -e "\tTesting health status for ${service_name}:${id}"
  health_status=$(docker inspect -f '{{.State.Health.Status}}' ${service_name} 2>/dev/null)  
  if [[ -z ${health_status} ]]
  then
    echo -e "\t\t- El contenedor ${service_name} NO tiene un healthcheck. Buscamos por su running status y esta $(docker inspect -f '{{.State.Status}}' ${service_name})\n"
  else
    echo -e "\t\t- El contenedor ${service_name} tiene un healthcheck y esta en healthy\n"
  fi
done;
## configure and setup rabbit mq in app
docker exec -it urgencia-app-1 sh -c "node dist/scripts/rabbitmq/configure-rabbitmq.js && node dist/scripts/rabbitmq/consume-rabbitmq.js"