#!/bin/bash

# Build Docker image
docker build -t ghcr.io/mengcapstone/jadwalplus-api:latest .

# Log in to GitHub Container Registry
docker login ghcr.io -u mitubaby -p $GH_TOKEN

# Push Docker image to GitHub Container Registry
docker push ghcr.io/mengcapstone/jadwalplus-api:latest