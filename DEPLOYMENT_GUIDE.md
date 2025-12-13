# Guía de Despliegue CERCASP

## Estado Actual ✅
- ✅ Base de datos PostgreSQL en Cloud SQL configurada
- ✅ Schema Prisma sincronizado
- ✅ Variables de entorno creadas
- ✅ Dockerfile para API configurado
- ✅ GitHub Actions configurado

## Próximos Pasos

### 1. Crear Repositorio en GitHub

```bash
# En GitHub.com (https://github.com/new):
# - Nombre: cercasp-web
# - Privado
# - No agregar README/LICENSE/.gitignore

# Luego ejecuta:
cd /home/ibrahim/projectos/CERCASP/paginaweb
git remote add origin https://github.com/TU-USUARIO/cercasp-web.git
git branch -M main
git push -u origin main
```

### 2. Configurar Service Account en Google Cloud

```bash
# Crear service account para GitHub Actions
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions Deployer"

# Dar permisos necesarios
gcloud projects add-iam-policy-binding cercasp-web-host-1 \
    --member="serviceAccount:github-actions@cercasp-web-host-1.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding cercasp-web-host-1 \
    --member="serviceAccount:github-actions@cercasp-web-host-1.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding cercasp-web-host-1 \
    --member="serviceAccount:github-actions@cercasp-web-host-1.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding cercasp-web-host-1 \
    --member="serviceAccount:github-actions@cercasp-web-host-1.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"

# Crear y descargar la clave
gcloud iam service-accounts keys create ~/gcp-key.json \
    --iam-account=github-actions@cercasp-web-host-1.iam.gserviceaccount.com
```

### 3. Configurar Secrets en GitHub

Ve a tu repositorio en GitHub → Settings → Secrets and variables → Actions → New repository secret

Agrega estos secrets:

1. **GCP_SA_KEY**: Contenido completo del archivo `~/gcp-key.json`
2. **DATABASE_URL**: `postgresql://postgres:Cercasp2025!@/cercasp_db?host=/cloudsql/cercasp-web-host-1:us-central1:cercasp-db`
3. **JWT_SECRET**: `cercasp-jwt-secret-2025-production-key`

### 4. Desplegar API manualmente (primera vez)

```bash
# Build y push de imagen Docker
cd /home/ibrahim/projectos/CERCASP/paginaweb
gcloud builds submit --tag gcr.io/cercasp-web-host-1/cercasp-api

# Deploy a Cloud Run
gcloud run deploy cercasp-api \
  --image gcr.io/cercasp-web-host-1/cercasp-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars JWT_SECRET="cercasp-jwt-secret-2025-production-key" \
  --set-env-vars NODE_ENV="production" \
  --set-env-vars PORT="8080" \
  --set-cloudsql-instances cercasp-web-host-1:us-central1:cercasp-db \
  --set-env-vars DATABASE_URL="postgresql://postgres:Cercasp2025!@/cercasp_db?host=/cloudsql/cercasp-web-host-1:us-central1:cercasp-db"
```

### 5. Desplegar Web en Vercel

```bash
# Opción A: CLI
cd /home/ibrahim/projectos/CERCASP/paginaweb
vercel --prod

# Cuando te pregunte:
# - Set up and deploy? → Yes
# - Which scope? → Tu cuenta
# - Link to existing project? → No
# - Project name? → cercasp-web
# - In which directory is your code? → apps/web
# - Override settings? → Yes
# - Build Command? → yarn turbo run build --filter=@cercasp/web
# - Output Directory? → apps/web/.next
# - Install Command? → yarn install --ignore-engines

# Opción B: Vercel Dashboard (Recomendado)
# 1. Ve a https://vercel.com/new
# 2. Import tu repo de GitHub
# 3. Framework Preset: Next.js
# 4. Root Directory: apps/web
# 5. Build Command: cd ../.. && yarn install --ignore-engines && yarn turbo run build --filter=@cercasp/web
# 6. Install Command: yarn install --ignore-engines
# 7. Output Directory: .next
# 8. Environment Variables:
#    - NEXT_PUBLIC_API_URL: [URL de Cloud Run, ej: https://cercasp-api-xxx.run.app]
```

### 6. Verificar Despliegue

```bash
# Obtener URL de la API
gcloud run services describe cercasp-api --region us-central1 --format='value(status.url)'

# Probar API
curl https://cercasp-api-xxx.run.app/health

# La web estará en:
# https://cercasp-web.vercel.app
```

## Credenciales Importantes

**Base de Datos:**
- Host: 136.112.242.64 (IP pública)
- Connection Name: cercasp-web-host-1:us-central1:cercasp-db
- Database: cercasp_db
- User: postgres
- Password: Cercasp2025!

**Servicios:**
- Google Cloud Project: cercasp-web-host-1
- Cloud SQL Instance: cercasp-db
- Cloud Run Service: cercasp-api
- Región: us-central1

## Comandos Útiles

```bash
# Ver logs de Cloud Run
gcloud run services logs read cercasp-api --region us-central1

# Conectar a Cloud SQL directamente
gcloud sql connect cercasp-db --user=postgres

# Ver status de servicios
gcloud run services list
gcloud sql instances list

# Redeployar después de cambios
git push origin main  # Activa GitHub Actions automáticamente
```

## Próximos pasos después del despliegue

1. ✅ Configurar dominio personalizado en Vercel - Ver [DOMAIN_SETUP_GUIDE.md](./docs/DOMAIN_SETUP_GUIDE.md)
2. ✅ Configurar SSL/HTTPS - Automático con Vercel
3. Agregar monitoreo y alertas
4. Configurar backups automáticos de base de datos
5. Implementar autenticación en el frontend

---

## Configuración del Dominio cercasp.org

Para conectar tu dominio `cercasp.org` (gestionado por Squarespace) con tu aplicación:

📖 **Consulta la guía completa:** [docs/DOMAIN_SETUP_GUIDE.md](./docs/DOMAIN_SETUP_GUIDE.md)

### Resumen rápido:

1. **En Vercel:** Settings → Domains → Add `cercasp.org`
2. **En Squarespace DNS:**
   - Registro A: `@` → `76.76.21.21`
   - Registro CNAME: `www` → `cname.vercel-dns.com`
3. **Esperar propagación DNS** (5 min - 48 horas)
4. **SSL se configura automáticamente** por Vercel
