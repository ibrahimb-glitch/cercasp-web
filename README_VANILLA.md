# CERCASP - Sistema de Gestión Integral

> Centro de Restauración Contra las Adicciones San Pedro A.C.

[![RFC](https://img.shields.io/badge/RFC-CRC2302227N7-gold)](https://cercasp.org)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()
[![Compliance](https://img.shields.io/badge/Compliance-NOM--028%20%7C%20NOM--004%20%7C%20LFPDPPP-green)]()

## 📋 Descripción

Sistema web integral para la gestión de un centro de tratamiento de adicciones que cumple con la normativa mexicana vigente.

### Características Principales

- 🏥 **Expedientes Clínicos Electrónicos** (NOM-004-SSA3-2012)
- 🔒 **Encriptación AES-256-GCM** para datos sensibles
- 📊 **Dashboard Administrativo** con estadísticas en tiempo real
- 🧠 **Seguimiento Psicológico** integrado con programa de 12 Pasos
- 💰 **Gestión Financiera** transparente
- 📱 **PWA** con funcionalidad offline
- ♿ **WCAG 2.1 AA** accesibilidad completa
- 🇲🇽 **100% Cumplimiento Normativo** mexicano

## 🏗️ Arquitectura

### Estructura de Archivos

```
cercasp-web/
├── index.html                    # Página pública
├── admin.html                    # Panel administrativo
├── privacy-policy.html           # Aviso de privacidad
├── terms.html                    # Términos y condiciones
│
├── css/
│   ├── variables.css             # Variables CSS
│   ├── base.css                  # Estilos base
│   ├── components.css            # Componentes
│   ├── layout.css                # Layouts
│   └── accessibility.css         # Accesibilidad
│
├── js/
│   ├── config/
│   │   └── app-config.js         # Configuración
│   ├── services/
│   │   ├── firebase-service.js   # Firebase wrapper
│   │   ├── auth-service.js       # Autenticación
│   │   ├── encryption-service.js # Encriptación
│   │   └── storage-service.js    # IndexedDB
│   └── utils/
│       ├── validators.js         # Validaciones
│       ├── sanitizers.js         # Sanitización XSS
│       └── formatters.js         # Formateo
│
├── docs/
│   ├── COMPLIANCE.md             # Cumplimiento normativo
│   └── SECURITY.md               # Documentación seguridad
│
├── manifest.json                 # PWA manifest
└── sw.js                         # Service Worker
```

### Stack Tecnológico

#### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables y glassmorphism
- **JavaScript ES6+** - Lógica de negocio
- **Web Crypto API** - Encriptación cliente

#### Backend/BaaS
- **Firebase Authentication** - Gestión de usuarios
- **Cloud Firestore** - Base de datos NoSQL
- **Firebase Storage** - Archivos (PDFs, imágenes)

#### Integraciones
- **Stripe** - Procesamiento de donaciones
- **Grok API** - IA para notas clínicas
- **Chart.js** - Visualización de datos
- **jsPDF** - Generación de PDFs

## 🚀 Instalación y Configuración

### Requisitos Previos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web (Apache, Nginx, o servidor de desarrollo)
- Cuenta Firebase (para backend)
- Cuenta Stripe (para donaciones)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/ibrahimb-glitch/cercasp-web.git
cd cercasp-web
```

2. **Configurar variables de entorno**

Crear archivo `.env` basado en `.env.example`:

```bash
# Firebase
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_xxxx

# Grok API
GROK_API_KEY=tu_grok_key

# Configuración
APP_ENV=production
ALLOWED_IP_RANGES=187.141.0.0/16,189.254.0.0/16
SESSION_TIMEOUT_MINUTES=15
ENCRYPTION_KEY=tu_clave_256_bits
```

3. **Cargar variables de entorno**

Agregar al HTML antes de cargar scripts:

```html
<script>
  window.ENV = {
    FIREBASE_API_KEY: 'tu_api_key',
    FIREBASE_AUTH_DOMAIN: 'tu_dominio.firebaseapp.com',
    // ... resto de variables
  };
</script>
```

4. **Inicializar Firebase**

En Firebase Console:
- Crear proyecto
- Habilitar Authentication (Email/Password)
- Crear base de datos Firestore
- Configurar reglas de seguridad
- Habilitar Storage

5. **Desplegar**

Opción A - Servidor local:
```bash
python -m http.server 8000
# Visitar http://localhost:8000
```

Opción B - Firebase Hosting:
```bash
firebase login
firebase init hosting
firebase deploy
```

Opción C - Vercel/Netlify:
```bash
vercel --prod
# o
netlify deploy --prod
```

## 🔐 Seguridad

### Encriptación

Todos los datos sensibles se encriptan con **AES-256-GCM**:

```javascript
// Inicializar servicio de encriptación
await encryptionService.init(ENCRYPTION_KEY);

// Encriptar datos
const encrypted = await encryptionService.encrypt('Datos sensibles');

// Desencriptar
const decrypted = await encryptionService.decrypt(encrypted);
```

### Control de Acceso

Sistema de roles con permisos granulares:

```javascript
// Verificar permiso
if (authService.hasPermission('patients:write')) {
  // Permitir escritura
}

// Verificar rol
if (authService.hasRole('FOUNDER')) {
  // Acceso completo
}
```

Ver [SECURITY.md](docs/SECURITY.md) para detalles completos.

## 📜 Cumplimiento Normativo

### NOM-028-SSA2-2009
- ✅ Modelo de tratamiento de 5 meses
- ✅ Fases: Desintoxicación, Consciencia, Reinserción
- ✅ Expediente clínico completo
- ✅ Seguimiento post-egreso (12 meses)

### NOM-004-SSA3-2012
- ✅ Formato SOAP en notas médicas
- ✅ Conservación mínima 5 años
- ✅ Identificación única de registros

### LFPDPPP
- ✅ Aviso de privacidad accesible
- ✅ Consentimiento expreso
- ✅ Derechos ARCO implementados
- ✅ Encriptación de datos sensibles

Ver [COMPLIANCE.md](docs/COMPLIANCE.md) para checklist completo.

## 👥 Roles y Permisos

| Rol | Pacientes | Médico | Psicología | Finanzas | Logs |
|-----|-----------|--------|------------|----------|------|
| Fundador | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ Ver |
| Coordinador | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD | ❌ |
| Personal | ✅ Ver | ✅ CRUD | ✅ CRUD | ❌ | ❌ |
| Observador | ✅ Ver | ❌ | ❌ | ❌ | ❌ |

## 🧪 Testing

### Pruebas Manuales

1. **Autenticación**
   - Login con credenciales válidas
   - Login con credenciales inválidas
   - Timeout de sesión (15 min)
   - Logout

2. **Encriptación**
   - Guardar datos sensibles
   - Recuperar y desencriptar
   - Verificar formato Base64

3. **Offline**
   - Desconectar red
   - Intentar operaciones
   - Reconectar y sincronizar

4. **Accesibilidad**
   - Navegación por teclado (Tab)
   - Lectores de pantalla
   - Contraste de colores
   - Zoom 200%

## 📱 PWA (Progressive Web App)

### Instalación

El sistema puede instalarse como aplicación en dispositivos:

1. Visitar sitio en navegador
2. Buscar opción "Instalar" o "Agregar a pantalla de inicio"
3. Confirmar instalación

### Funcionalidad Offline

- Cache de recursos estáticos
- IndexedDB para datos temporales
- Sincronización automática al reconectar

## 📊 Monitoreo

### Métricas Clave

- Pacientes activos: 32 máximo
- Becas otorgadas: 10 al 100%
- Ocupación: Porcentaje de capacidad
- Ingresos mensuales: Cuotas semanales

### Logs del Sistema

Solo para rol **Fundador**:

```javascript
{
  timestamp: '2025-12-12T22:00:00.000Z',
  userId: 'uid_usuario',
  action: 'patient_created',
  details: { patientId: 'xxx' },
  checksum: 'sha256_hash' // Integridad verificable
}
```

## 🤝 Contribución

Este es un proyecto privado. Para reportar problemas:

**Email**: contacto@cercasp.org
**Teléfono**: (872) 108-4263

## 📄 Licencia

Código propietario © 2025 CERCASP A.C.

**RFC**: CRC2302227N7

Todos los derechos reservados. Este software es propiedad exclusiva de CERCASP A.C. y está protegido por las leyes de derechos de autor de México.

## 📞 Contacto

**CERCASP A.C.**
Centro de Restauración Contra las Adicciones San Pedro

**Dirección**: Calle González Ortega Nº 106, Zona Centro, CP 27800, San Pedro, Coahuila de Zaragoza

**Teléfono**: (872) 108-4263
**Email**: contacto@cercasp.org
**Director General**: Ibrahim Babún Romero

**Horario**: Lunes a Viernes 9:00-18:00 | Sábados 9:00-14:00

---

**Constituido**: 22 de febrero de 2023
**Notaría**: Nº 2, Lic. Sandra Yasmín Serrano Regalado
**RFC**: CRC2302227N7
