#!/bin/bash

# Build and push Docker images to Docker Hub
# Usage: ./build-and-push.sh

set -e

echo "================================================"
echo "Building SustainSutra Docker Images"
echo "================================================"

# Login to Docker Hub (you'll be prompted for credentials)
echo "Please login to Docker Hub first:"
echo "  docker login"
echo ""
read -p "Press Enter after logging in..."

# Build Frontend
echo ""
echo "Building frontend image..."
docker build -t amitkr64/sustainsutra-frontend:latest -f Dockerfile .

if [ $? -eq 0 ]; then
    echo "✓ Frontend built successfully"
else
    echo "✗ Frontend build failed"
    exit 1
fi

# Push Frontend
echo ""
echo "Pushing frontend to Docker Hub..."
docker push amitkr64/sustainsutra-frontend:latest

if [ $? -eq 0 ]; then
    echo "✓ Frontend pushed successfully"
else
    echo "✗ Frontend push failed"
    exit 1
fi

# Build Backend
echo ""
echo "Building backend image..."
cd backend
docker build -t amitkr64/sustainsutra-backend:latest -f Dockerfile .

if [ $? -eq 0 ]; then
    echo "✓ Backend built successfully"
else
    echo "✗ Backend build failed"
    exit 1
fi
cd ..

# Push Backend
echo ""
echo "Pushing backend to Docker Hub..."
docker push amitkr64/sustainsutra-backend:latest

if [ $? -eq 0 ]; then
    echo "✓ Backend pushed successfully"
else
    echo "✗ Backend push failed"
    exit 1
fi

echo ""
echo "================================================"
echo "All images built and pushed!"
echo "Now use docker-compose-hub.yml in Portainer"
echo "================================================"
