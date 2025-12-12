# Guía de Configuración del Dominio cercasp.org

Esta guía te ayudará a conectar tu dominio `cercasp.org` (gestionado por Squarespace, originalmente comprado en Google Workspace) con tu aplicación desplegada en Vercel.

## Información General

- **Dominio:** cercasp.org
- **Proveedor DNS actual:** Squarespace (migrado desde Google Domains)
- **Plataforma de hosting web:** Vercel
- **Plataforma de hosting API:** Google Cloud Run

---

## Paso 1: Agregar el Dominio en Vercel

### 1.1 Accede a tu proyecto en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `cercasp-web`
3. Ve a **Settings** → **Domains**

### 1.2 Agregar el dominio

1. Haz clic en **Add Domain**
2. Escribe: `cercasp.org`
3. Haz clic en **Add**

### 1.3 Agregar subdominios (recomendado)

Repite el proceso para agregar:
- `www.cercasp.org` (redirigirá a cercasp.org)

Vercel te mostrará los registros DNS que necesitas configurar.

---

## Paso 2: Configurar DNS en Squarespace

### 2.1 Accede al panel de DNS de Squarespace

1. Inicia sesión en [Squarespace Domains](https://account.squarespace.com/domains)
2. Haz clic en tu dominio `cercasp.org`
3. Ve a **DNS Settings** o **Configuración de DNS**

### 2.2 Registros DNS a configurar

Necesitas agregar/modificar los siguientes registros:

#### Para el dominio raíz (cercasp.org):

| Tipo | Host | Valor | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |

> **Nota:** `76.76.21.21` es la IP de Vercel. Vercel puede mostrar una IP diferente en su dashboard, usa la que te indiquen.

#### Para el subdominio www:

| Tipo | Host | Valor | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com | 3600 |

### 2.3 Eliminar registros conflictivos

En Squarespace, elimina cualquier registro existente que apunte a otro servicio:
- Registros A con otras IPs
- Registros CNAME en @ o www que apunten a otro lugar
- Registros de Squarespace para hosting web (si existen)

---

## Paso 3: Verificar en Vercel

1. Vuelve a **Vercel Dashboard** → **Settings** → **Domains**
2. Espera unos minutos (puede tardar hasta 48 horas, pero usualmente son minutos)
3. Vercel mostrará un ícono verde ✓ cuando el dominio esté verificado

---

## Paso 4: Configurar SSL/HTTPS

Vercel configura automáticamente certificados SSL gratuitos a través de Let's Encrypt. Una vez que el dominio esté verificado:

1. El certificado SSL se genera automáticamente
2. HTTPS estará habilitado
3. HTTP redirigirá automáticamente a HTTPS

---

## Paso 5: Configurar Subdominio para la API (Opcional)

Si deseas que la API esté en `api.cercasp.org`:

### 5.1 En Squarespace DNS, agregar:

| Tipo | Host | Valor | TTL |
|------|------|-------|-----|
| CNAME | api | [tu-url].run.app | 3600 |

> Reemplaza `[tu-url].run.app` con la URL real de tu Cloud Run (ejemplo: `cercasp-api-abc123.run.app`).

### 5.2 En Google Cloud Run:

```bash
# Mapear dominio personalizado
gcloud run domain-mappings create \
  --service cercasp-api \
  --domain api.cercasp.org \
  --region us-central1
```

---

## Registros DNS Completos (Resumen)

Aquí está la configuración completa de DNS en Squarespace:

| Tipo | Host | Valor | Propósito |
|------|------|-------|-----------|
| A | @ | 76.76.21.21 | Dominio raíz a Vercel |
| CNAME | www | cname.vercel-dns.com | www a Vercel |
| CNAME | api | [tu-url].run.app | API en Cloud Run (opcional) |

---

## Solución de Problemas

### El dominio no se verifica

1. Espera al menos 1 hora para propagación DNS
2. Verifica que no hay registros conflictivos
3. Usa [DNS Checker](https://dnschecker.org/) para verificar propagación

### Error de SSL

1. Espera a que Vercel termine de verificar el dominio
2. Verifica que el registro A apunta a la IP correcta de Vercel
3. El SSL puede tardar hasta 24 horas en activarse

### La página no carga

1. Limpia el caché del navegador
2. Prueba en modo incógnito
3. Verifica los registros DNS en Squarespace

---

## Variables de Entorno a Actualizar

Una vez configurado el dominio, actualiza las variables de entorno:

### En Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL=https://cercasp.org
```

Para la API, usa una de estas opciones:
```
# Si configuraste el subdominio api.cercasp.org:
NEXT_PUBLIC_API_URL=https://api.cercasp.org

# O usa directamente la URL de Cloud Run:
NEXT_PUBLIC_API_URL=https://cercasp-api-[tu-id].run.app
```

### En Cloud Run (si usas api.cercasp.org):

```bash
gcloud run services update cercasp-api \
  --set-env-vars FRONTEND_URL="https://cercasp.org" \
  --region us-central1
```

---

## Contacto de Soporte

- **Squarespace Domains:** [support.squarespace.com](https://support.squarespace.com)
- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Google Cloud:** [cloud.google.com/support](https://cloud.google.com/support)

---

## Notas Adicionales

### Sobre la migración de Google Domains a Squarespace

Cuando Google vendió Google Domains a Squarespace, todos los dominios fueron migrados automáticamente. El panel de administración DNS ahora está en Squarespace, pero la configuración funciona de manera similar.

### Tiempos de propagación DNS

- **Cambios menores:** 5-30 minutos
- **Nuevos registros:** 1-4 horas
- **Cambios mayores:** Hasta 48 horas

### Recomendaciones

1. Haz los cambios DNS en horarios de bajo tráfico
2. No elimines los registros antiguos hasta verificar que los nuevos funcionan
3. Mantén una copia de la configuración DNS actual antes de modificar
