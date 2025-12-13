# CERCASP - Documentación de Seguridad

## Resumen Ejecutivo

Este documento describe las medidas de seguridad implementadas en el sistema CERCASP para proteger datos sensibles de salud conforme a la Ley Federal de Protección de Datos Personales (LFPDPPP) y mejores prácticas internacionales.

## Clasificación de Datos

### Datos Públicos
- Información general del centro
- Horarios y ubicación
- Información del tratamiento (sin datos personales)

### Datos Internos
- Estadísticas agregadas
- Reportes operativos
- Capacidad y ocupación

### Datos Confidenciales
- Nombres completos
- Fechas de nacimiento
- Contactos
- Información financiera

### Datos Sensibles (Máxima Protección)
- Diagnósticos médicos
- Historia de adicciones
- Notas clínicas
- Evaluaciones psicológicas
- Tratamientos prescritos

## Medidas de Seguridad Implementadas

### 1. Encriptación

#### Datos en Reposo
- **Algoritmo**: AES-256-GCM (Advanced Encryption Standard, Galois/Counter Mode)
- **Longitud de clave**: 256 bits (máxima seguridad comercial)
- **Derivación de clave**: PBKDF2 con 100,000 iteraciones
- **IV (Vector de Inicialización)**: 12 bytes aleatorios por mensaje
- **Tag de autenticación**: 128 bits

```javascript
// Ejemplo de uso
const encryptedName = await encryptionService.encrypt(patientName);
const decryptedName = await encryptionService.decrypt(encryptedName);
```

#### Datos en Tránsito
- **HTTPS/TLS 1.3**: Todas las comunicaciones encriptadas
- **Firebase**: Conexiones seguras nativas
- **API Keys**: Nunca expuestas en código frontend

### 2. Control de Acceso

#### Roles y Permisos
```javascript
FOUNDER (Fundador):
  - Acceso total
  - Ver logs del sistema
  - Gestionar usuarios
  - Todas las operaciones

COORDINATOR (Coordinador):
  - CRUD pacientes
  - CRUD expedientes médicos/psicológicos
  - CRUD finanzas
  - Sin acceso a logs

STAFF (Personal):
  - Lectura pacientes
  - Escritura notas médicas/psicológicas
  - Sin acceso finanzas/logs

VIEWER (Observador):
  - Solo lectura pacientes (datos básicos)
  - Sin acceso expedientes completos
```

#### Autenticación
- **Firebase Authentication**: Sistema robusto enterprise
- **Validación de IP**: Solo acceso desde IPs permitidas (configurables por ENV)
- **Session Timeout**: 15 minutos de inactividad
- **Forced Logout**: Automático al timeout

### 3. Validación de Entrada

#### Sanitización XSS
```javascript
// Todas las entradas de usuario pasan por sanitización
const safe = Sanitizers.escapeHTML(userInput);
const stripped = Sanitizers.stripHTML(richText);
```

#### Validación de Formatos
- Email: RFC 5322
- Teléfono: 10 dígitos
- CURP: 18 caracteres alfanuméricos
- RFC: 12-13 caracteres
- Fechas: ISO 8601

### 4. Integridad de Datos

#### Logs Inmutables
Todos los logs incluyen checksum SHA-256 para detectar manipulación:

```javascript
{
  id: uuid,
  timestamp: ISO8601,
  userId: string,
  action: string,
  details: object,
  checksum: SHA256(id + timestamp + userId + action + details)
}
```

#### Verificación de Integridad
```javascript
const isValid = await encryptionService.verifyChecksum(logEntry, logEntry.checksum);
```

### 5. Almacenamiento Seguro

#### Firebase Firestore
- **Reglas de seguridad**: Validación en servidor
- **Persistencia offline**: Datos encriptados localmente
- **Sincronización**: Solo con autenticación válida

#### IndexedDB (Offline)
- **Encriptación**: Datos sensibles encriptados antes de guardar
- **Quota**: Limitado a datos esenciales
- **Limpieza**: Al cerrar sesión

### 6. Gestión de Credenciales

#### Variables de Entorno
```bash
# NUNCA en código fuente
FIREBASE_API_KEY=xxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxx
GROK_API_KEY=xxxxx
ENCRYPTION_KEY=xxxxx
```

#### Carga Segura
```javascript
// Las credenciales se cargan desde ENV, no hardcodeadas
if (window.ENV && window.ENV.FIREBASE_API_KEY) {
  firebaseConfig = {
    apiKey: window.ENV.FIREBASE_API_KEY,
    // ...
  };
}
```

### 7. Protección contra Ataques

#### XSS (Cross-Site Scripting)
- Sanitización de todas las entradas
- Content Security Policy (CSP)
- Escapado de HTML en outputs

#### CSRF (Cross-Site Request Forgery)
- Firebase tokens incluyen protección CSRF
- Validación de origen en requests

#### SQL Injection
- N/A: Firestore no usa SQL
- Validación de queries

#### Man-in-the-Middle
- HTTPS/TLS obligatorio
- Certificate pinning (en producción)

### 8. Monitoreo y Auditoría

#### Logs de Seguridad
Todos estos eventos se registran:
- Inicios de sesión (exitosos y fallidos)
- Cierres de sesión
- Acceso a datos sensibles
- Modificaciones de expedientes
- Cambios de permisos
- Errores de validación

#### Alertas
- Múltiples intentos fallidos de login
- Acceso desde IP no autorizada
- Modificación de logs (checksum inválido)
- Cambios en usuarios/permisos

### 9. Respaldo y Recuperación

#### Backups
- **Frecuencia**: Diaria automática (Firebase)
- **Retención**: 30 días
- **Encriptación**: AES-256 en reposo
- **Ubicación**: Multi-región

#### Recuperación ante Desastres
- RTO (Recovery Time Objective): 4 horas
- RPO (Recovery Point Objective): 24 horas
- Plan de continuidad documentado

### 10. Capacitación

#### Personal Autorizado
- Capacitación inicial en seguridad
- Actualización anual
- Firma de acuerdo de confidencialidad
- Conocimiento de LFPDPPP

#### Políticas
- Cambio de contraseñas cada 90 días
- No compartir credenciales
- Cerrar sesión al terminar
- Reportar incidentes inmediatamente

## Vulnerabilidades Conocidas (Mitigadas)

### ❌ ANTES (Código Monolítico)
1. **Credenciales expuestas**: Firebase keys en código
2. **Sin encriptación**: Datos en texto plano
3. **Validación en cliente**: Fácilmente evadible
4. **Sin CSP**: Vulnerable a XSS
5. **Logs modificables**: Sin integridad

### ✅ AHORA (Código Refactorizado)
1. **Credenciales en ENV**: Nunca en código fuente
2. **AES-256-GCM**: Datos sensibles encriptados
3. **Validación en servidor**: Firebase rules
4. **CSP implementado**: Headers de seguridad
5. **Logs inmutables**: Checksums SHA-256

## Cumplimiento Normativo

### LFPDPPP (México)
- ✅ Encriptación de datos sensibles
- ✅ Control de acceso
- ✅ Auditoría y trazabilidad
- ✅ Derechos ARCO implementados
- ✅ Aviso de privacidad

### HIPAA (Referencia Internacional)
- ✅ Access Control
- ✅ Audit Controls
- ✅ Integrity Controls
- ✅ Transmission Security
- ✅ Person/Entity Authentication

### ISO 27001 (Buenas Prácticas)
- ✅ Política de seguridad documentada
- ✅ Control de acceso
- ✅ Encriptación
- ✅ Gestión de incidentes
- ✅ Continuidad de negocio

## Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, por favor repórtala responsablemente a:

**Email**: seguridad@cercasp.org
**Teléfono**: (872) 108-4263
**Urgente**: Ibrahim Babún Romero

### Proceso
1. No divulgar públicamente hasta que sea resuelta
2. Enviar detalles completos a email de seguridad
3. Esperar confirmación (24-48 horas)
4. Colaborar en resolución
5. Crédito en hall of fame (opcional)

## Actualizaciones de Seguridad

**Última revisión**: 12 de diciembre de 2025
**Próxima auditoría**: Marzo 2026

---

**CERCASP A.C.**
RFC: CRC2302227N7
contacto@cercasp.org
