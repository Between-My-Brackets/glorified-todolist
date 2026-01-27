#!/bin/bash

# Create a docker volume for mongodb data if it doesn't exist
docker volume create mongo-data > /dev/null

# Run the mongodb container with the volume mounted
sudo docker run -d \
  -p 27017:27017 \
  --name mongodb-container \
  -v mongo-data:/data/db \
  mongo
