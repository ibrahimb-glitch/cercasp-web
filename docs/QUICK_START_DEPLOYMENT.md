# 🚀 Guía Rápida: Poner cercasp.org en Funcionamiento

**Tiempo estimado:** 15-30 minutos (más tiempo de propagación DNS)

---

## Antes de empezar, necesitas:

- ✅ Cuenta de Vercel (ya la tienes abierta)
- ✅ Acceso a Squarespace Domains (cercasp.org)
- ✅ Este repositorio en GitHub

---

## PASO 1: Crear Proyecto en Vercel

1. Ve a **https://vercel.com/new**
2. Haz clic en **"Import Git Repository"**
3. Si no está conectado, conecta tu cuenta de GitHub
4. Busca y selecciona **`cercasp-web`**
5. Configura así:
   
   | Campo | Valor |
   |-------|-------|
   | Framework Preset | **Next.js** |
   | Root Directory | **apps/web** |

6. Haz clic en **Deploy**
7. Espera unos minutos hasta que diga "Congratulations!"

**Resultado:** Tendrás una URL como `https://cercasp-web-xxxxx.vercel.app`

---

## PASO 2: Agregar Dominio cercasp.org en Vercel

1. En tu proyecto de Vercel, ve a **Settings** (en el menú superior)
2. En el menú lateral, haz clic en **Domains**
3. Escribe `cercasp.org` y haz clic en **Add**
4. Vercel te mostrará los registros DNS que necesitas
5. Repite y agrega también `www.cercasp.org`

**⚠️ IMPORTANTE:** No cierres esta página, necesitas los valores DNS para el siguiente paso.

---

## PASO 3: Configurar DNS en Squarespace

1. En otra pestaña, ve a **https://account.squarespace.com/domains**
2. Haz clic en tu dominio **cercasp.org**
3. Busca y haz clic en **DNS Settings** o **Configuración DNS**

### 3.1 Agregar Registro A (para cercasp.org)

| Campo | Valor |
|-------|-------|
| Tipo | **A** |
| Host | **@** |
| Datos/Valor | **76.76.21.21** (IP de Vercel*) |
| TTL | 3600 (o por defecto) |

Haz clic en **Agregar** o **Save**

### 3.2 Agregar Registro CNAME (para www.cercasp.org)

| Campo | Valor |
|-------|-------|
| Tipo | **CNAME** |
| Host | **www** |
| Datos/Valor | **cname.vercel-dns.com** |
| TTL | 3600 (o por defecto) |

Haz clic en **Agregar** o **Save**

### 3.3 Eliminar registros conflictivos (si existen)

Si ves otros registros A o CNAME apuntando a otros lugares, elimínalos.

> **\* Nota sobre la IP:** La IP `76.76.21.21` es la IP estándar de Vercel. Si Vercel te muestra una IP diferente en el Paso 2, usa la que te indique Vercel.

---

## PASO 4: Verificar en Vercel

1. Regresa a **Vercel → Settings → Domains**
2. Espera unos minutos
3. Cuando veas un **✓ verde** junto a cercasp.org, ¡está listo!

**Nota:** La propagación DNS puede tardar desde 5 minutos hasta 48 horas, pero normalmente es rápido.

---

## PASO 5: ¡Listo!

Una vez verificado:
- 🔒 HTTPS se configura automáticamente
- 🌐 Tu sitio estará en **https://cercasp.org**
- ↪️ www.cercasp.org redirigirá a cercasp.org

---

## ¿Problemas?

### El dominio no verifica después de mucho tiempo

1. Verifica que los registros DNS estén correctos en Squarespace
2. Usa https://dnschecker.org/ para verificar que `cercasp.org` apunta a `76.76.21.21`
3. Elimina registros conflictivos
4. Espera más tiempo (hasta 48 horas en casos raros)

### La página muestra error

1. Verifica que el deploy en Vercel fue exitoso
2. Revisa los logs en Vercel → Deployments
3. Verifica que `apps/web` tiene un `next.config.js` válido

---

## Próximos pasos (opcionales)

1. **Configurar API:** Ver `DEPLOYMENT_GUIDE.md` para configurar Cloud Run
2. **Agregar api.cercasp.org:** Ver `docs/DOMAIN_SETUP_GUIDE.md`
3. **Variables de entorno:** Agregar `NEXT_PUBLIC_API_URL` en Vercel

---

*¿Necesitas ayuda? Revisa la documentación completa en `docs/DOMAIN_SETUP_GUIDE.md`*
