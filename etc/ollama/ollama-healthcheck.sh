#!/bin/sh

echo "Starting Ollama healthcheck"
AVAILABLE_MODELS="qwen3:8b nomic-embed-text:v1.5"
NOT_FOUND="not found"
YES=1
NO=0
ALL_MODELS_FOUND=1

for model in ${AVAILABLE_MODELS}
do
  if ollama list | grep -q "$model"; then
    echo "model found"
  else
    echo "model not found"
    ALL_MODELS_FOUND=0
    break
  fi
done

if  [ $ALL_MODELS_FOUND -eq $NO ]; then
  exit 1
fi

echo "All models are available. Ollamas healthcheck passed"
