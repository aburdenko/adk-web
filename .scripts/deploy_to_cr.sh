#!/bin/bash

# Script to deploy the adk-web application to Google Cloud Run

set -e

# Check if PROJECT_ID is already set in the environment
if [ -z "$PROJECT_ID" ]; then
  # Prompt for the Google Cloud Project ID if not set
  read -p "Enter your Google Cloud Project ID: " PROJECT_ID
fi

if [ -z "$PROJECT_ID" ]; then
  echo "Project ID is required."
  exit 1
fi

echo "Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

echo "Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "Building the container image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/adk-web

echo "Deploying to Cloud Run..."
gcloud run deploy adk-web \
  --image gcr.io/$PROJECT_ID/adk-web \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

echo "Deployment complete."

