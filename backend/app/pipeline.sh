#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Step 1: Pull the latest code
echo "Pulling latest code from the repository..."
git pull origin main

# Step 2: Build the Maven project
echo "Building Maven project..."
mvn clean package

# Step 3: Build the Docker image
echo "Building Docker image..."
docker build -t chillisrestaurant-app:latest .

# Step 4: Deploy using Docker Compose
echo "Deploying using Docker Compose..."
docker-compose up -d

echo "Pipeline completed successfully!"
