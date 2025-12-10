#!/bin/bash
# Script de despliegue completo para CERCASP

set -e

echo "🚀 Desplegando CERCASP a producción..."

# Variables
PROJECT_ID="cercasp-web-host-1"
REGION="us-central1"
SERVICE_NAME="cercasp-api"
DB_CONNECTION="cercasp-web-host-1:us-central1:cercasp-db"

# 1. Desplegar API a Cloud Run
echo "📦 Desplegando API a Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3 \
  --set-env-vars NODE_ENV=production,PORT=8080,JWT_SECRET="cercasp-jwt-secret-2025" \
  --add-cloudsql-instances $DB_CONNECTION \
  --set-env-vars DATABASE_URL="postgresql://postgres:Cercasp2025!@/cercasp_db?host=/cloudsql/$DB_CONNECTION"

# Obtener URL de la API
API_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')

echo ""
echo "✅ Despliegue completado!"
echo ""
echo "📍 URL de la API: $API_URL"
echo ""
echo "🔥 Próximos pasos:"
echo "1. Configura NEXT_PUBLIC_API_URL=$API_URL en Vercel"
echo "2. Despliega el frontend en Vercel: vercel --prod"
echo ""
