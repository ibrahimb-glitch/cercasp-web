# CERCASP - Documentación de Cumplimiento Normativo

## Normatividad Aplicable

CERCASP A.C. opera en cumplimiento con la siguiente normativa mexicana:

### 1. NOM-028-SSA2-2009
**Para la prevención, tratamiento y control de las adicciones**

#### Requisitos Implementados:
- ✅ Expediente clínico completo
- ✅ Modelo de tratamiento de 5 meses
- ✅ Fases de tratamiento:
  - Desintoxicación
  - Consciencia
  - Reinserción Social
- ✅ Evaluación médica y psicológica inicial
- ✅ Consentimiento informado documentado
- ✅ Seguimiento post-egreso (12 meses)
- ✅ Vinculación familiar
- ✅ Programa de 12 Pasos integrado

#### Estructura de Expediente Clínico:
```javascript
{
  generalData: {
    fullName: encrypted,
    dateOfBirth: encrypted,
    gender: string,
    civilStatus: string,
    occupation: string,
    education: string
  },
  clinicalHistory: {
    chiefComplaint: string,
    substanceUseHistory: {
      primarySubstance: string,
      secondarySubstances: array,
      ageOfOnset: number,
      lastUse: date,
      previousTreatments: array
    }
  },
  progressNotes: [{
    date: timestamp,
    phase: string, // Desintoxicación, Consciencia, Reinserción
    subjective: string,
    objective: string,
    assessment: string,
    plan: string
  }]
}
```

### 2. NOM-004-SSA3-2012
**Del expediente clínico**

#### Requisitos Implementados:
- ✅ Formato SOAP para notas de evolución
  - **S**ubjetivo: Síntomas reportados por el paciente
  - **O**bjetivo: Signos observados por el personal
  - **A**nálisis: Evaluación y diagnóstico
  - **P**lan: Plan de tratamiento
- ✅ Identificación única de cada nota
- ✅ Fecha y hora de cada registro
- ✅ Identificación del autor
- ✅ Conservación por mínimo 5 años
- ✅ Confidencialidad garantizada

### 3. Ley Federal de Protección de Datos Personales (LFPDPPP)

#### Requisitos Implementados:
- ✅ Aviso de privacidad completo y accesible
- ✅ Consentimiento expreso para datos sensibles de salud
- ✅ Implementación de derechos ARCO:
  - **A**cceso: Consulta de datos personales
  - **R**ectificación: Corrección de datos inexactos
  - **C**ancelación: Eliminación de datos
  - **O**posición: Negativa al tratamiento
- ✅ Encriptación AES-256-GCM para datos sensibles:
  - Nombres
  - Fechas de nacimiento
  - Diagnósticos
  - Notas médicas y psicológicas
  - Información de contacto
- ✅ Control de acceso basado en roles
- ✅ Logs inmutables con checksums
- ✅ Transferencia limitada a terceros

#### Categorías de Datos Sensibles:
- Salud física
- Salud mental
- Adicciones
- Historia clínica

### 4. Guías CONASAMA 2025

#### Guía de Operación de Establecimientos Residenciales Privados:
- ✅ Capacidad instalada: 32 internos
- ✅ Personal calificado
- ✅ Instalaciones adecuadas
- ✅ Protocolos de emergencia
- ✅ Reglamento interno
- ✅ Programa de alimentación
- ✅ Actividades terapéuticas

#### Guía de Supervisión 2025-2026:
- ✅ Expedientes clínicos actualizados
- ✅ Bitácoras de actividades
- ✅ Consentimientos informados
- ✅ Protocolos de atención médica
- ✅ Sistema de quejas y sugerencias
- ✅ Reportes para autoridades

#### Plan de Intervención en Caso de Contingencia (PIPC):
- Protocolo de evacuación
- Contactos de emergencia
- Equipo de primeros auxilios
- Rutas de evacuación señalizadas

### 5. Ley General de Salud (Artículo 192)

#### Requisitos Implementados:
- ✅ Registro de actividades terapéuticas
- ✅ Personal capacitado
- ✅ Protocolos de atención médica
- ✅ Vinculación familiar documentada
- ✅ Informe a autoridades sanitarias

## Medidas de Seguridad Técnicas

### Encriptación
- **Algoritmo**: AES-256-GCM
- **Longitud de clave**: 256 bits
- **Longitud de IV**: 12 bytes
- **Tag de autenticación**: 128 bits

### Control de Acceso
```javascript
Roles:
- Fundador: Acceso completo
- Coordinador: Pacientes, médicos, psicológicos, finanzas
- Personal: Lectura pacientes, escritura notas médicas
- Observador: Solo lectura
```

### Logs Inmutables
```javascript
{
  id: uuid,
  timestamp: ISO8601,
  userId: string,
  userRole: string,
  action: string,
  checksum: SHA256 // Verificación de integridad
}
```

### Validación de IP
- Rangos permitidos configurables
- Solo acceso desde Coahuila en producción
- Validación en backend (no solo cliente)

### Sesiones
- Timeout: 15 minutos de inactividad
- Reseteo automático en actividad del usuario
- Cierre forzado al timeout

## Auditorías y Reportes

### Reportes COFEPRIS
- Reporte mensual de actividades
- Censo de pacientes
- Incidentes y eventos adversos
- Cumplimiento de protocolos

### Auditorías Internas
- Revisión trimestral de expedientes
- Verificación de checksums en logs
- Validación de encriptación
- Pruebas de acceso

### Auditorías Externas
- COFEPRIS (cuando sea requerido)
- Secretaría de Salud Coahuila
- CONADIC (Comisión Nacional contra las Adicciones)

## Checklist de Cumplimiento Operativo

### Diario
- [ ] Registro de asistencia a terapias
- [ ] Notas de evolución
- [ ] Administración de medicamentos
- [ ] Bitácora de incidentes

### Semanal
- [ ] Revisión de expedientes activos
- [ ] Junta de equipo multidisciplinario
- [ ] Limpieza y mantenimiento

### Mensual
- [ ] Reporte a COFEPRIS
- [ ] Revisión de cuentas financieras
- [ ] Capacitación de personal
- [ ] Mantenimiento preventivo

### Trimestral
- [ ] Auditoría interna
- [ ] Revisión de protocolos
- [ ] Actualización de expedientes
- [ ] Evaluación de satisfacción

### Anual
- [ ] Auditoría externa
- [ ] Renovación de permisos
- [ ] Actualización de seguros
- [ ] Revisión de normativa

## Contacto para Cumplimiento

**Responsable de Protección de Datos:**
Ibrahim Babún Romero
contacto@cercasp.org
(872) 108-4263

**Autoridades Competentes:**
- COFEPRIS: www.gob.mx/cofepris
- INAI (Datos Personales): www.inai.org.mx
- Secretaría de Salud Coahuila: www.saludcoahuila.gob.mx
