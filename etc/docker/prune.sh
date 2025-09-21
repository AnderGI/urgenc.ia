#!/bin/bash

set -e 

docker compose down 

docker system prune -af

if [[ $(docker container ps -aq | wc -l) -gt 0 ]]
then
  docker container rm $(docker container ps -aq)
fi

if [[ $(docker image ls -aq | wc -l) -gt 0 ]]
then
  docker image rm -f $(docker volume ls -q)
fi

if [[ $(docker volume ls -q | wc -l) -gt 0 ]]
then
  docker volume rm $(docker volume ls -q)
fi