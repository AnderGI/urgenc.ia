#!/bin/sh
set -e
# NOTES:
# $(()) used for arithmetic operations
# [ ] conditional expressions
# & execute x process on the background
# $! get last executed process id
# sleep (unit in seconds) != wait (process id)
# set -e stop script execution if non 0 value is exited

echo "Starting ollama server"
ollama serve &
OLLAMA_SERVER_ID=$!

echo "Waiting for Ollama server to be ready"
sleep 5

ollama help

AVAILABLE_MODELS="qwen3:8b nomic-embed-text:v1.5"
MAX_RETRIES=10


for model in ${AVAILABLE_MODELS} 
do
  RETRY_COUNTER=1
  while [ $RETRY_COUNTER -le $MAX_RETRIES ]; do
    if ollama pull ${model}; then
      echo "${model} pulled correctly"
      ollama show ${model}
      break
    else
      echo "Retry $RETRY_COUNTER failed, retrying..."
      RETRY_COUNTER=$((RETRY_COUNTER++))
      sleep 2
    fi
  done

  if [ $RETRY_COUNTER -gt $MAX_RETRIES ]; then
      echo "${model} pulled incorrectly"
  fi
done

echo "Ollama server up and running"
wait ${OLLAMA_SERVER_ID}
