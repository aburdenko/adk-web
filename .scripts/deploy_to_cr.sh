#!/bin/bash

# Script to deploy the adk-web application to Google Cloud Run

set -e

# Default to public ingress
ingress_flags="--allow-unauthenticated"

# Check for --private flag
if [ "$1" == "--private" ]; then
  ingress_flags="--no-allow-unauthenticated --ingress=internal"
  shift # remove the --private flag from the arguments
fi

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
BUILD_ID=$(gcloud builds submit --pack image=gcr.io/$PROJECT_ID/adk-web --format="value(id)")
echo "Build ID: $BUILD_ID"

echo "Deploying to Cloud Run..."
gcloud run deploy adk-web \
  --image gcr.io/$PROJECT_ID/adk-web \
  --platform managed \
  --region us-central1 \
  $ingress_flags

# If the service is public, set the IAM policy to allow unauthenticated invocations
if [[ "$ingress_flags" == *"--allow-unauthenticated"* ]]; then
  echo "Setting IAM policy for public access..."
  gcloud beta run services add-iam-policy-binding adk-web \
    --region us-central1 \
    --member="allUsers" \
    --role="roles/run.invoker" \
    --project="$PROJECT_ID"
fi

echo "Deployment complete."

