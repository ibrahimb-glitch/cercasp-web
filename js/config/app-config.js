/**
 * CERCASP Application Configuration
 * Configuración sin credenciales sensibles
 * Las credenciales deben cargarse desde variables de entorno
 */

const AppConfig = {
  // Información de CERCASP
  organization: {
    name: 'CERCASP A.C.',
    fullName: 'Centro de Restauración Contra las Adicciones San Pedro',
    rfc: 'CRC2302227N7',
    foundationDate: '2023-02-22',
    address: 'Calle González Ortega Nº 106, Zona Centro, CP 27800, San Pedro, Coahuila de Zaragoza',
    phone: '872 108 4263',
    email: 'contacto@cercasp.org',
    director: 'Ibrahim Babún Romero',
    capacity: 32,
    scholarships: 10,
    weeklyFee: 800,
    treatmentDuration: 5 // meses
  },

  // Configuración de la aplicación
  app: {
    name: 'CERCASP System',
    version: '1.0.0',
    environment: 'development', // Se sobrescribe con ENV
    sessionTimeout: 15, // minutos
    allowedIPRanges: [], // Se cargan desde ENV
  },

  // Roles de usuario
  roles: {
    FOUNDER: 'Fundador',
    COORDINATOR: 'Coordinador',
    STAFF: 'Personal',
    VIEWER: 'Observador'
  },

  // Permisos por rol
  permissions: {
    FOUNDER: ['all'],
    COORDINATOR: ['patients:read', 'patients:write', 'medical:read', 'medical:write', 'finance:read', 'finance:write'],
    STAFF: ['patients:read', 'medical:read', 'medical:write'],
    VIEWER: ['patients:read']
  },

  // Fases de tratamiento (NOM-028)
  treatmentPhases: {
    DETOX: 'Desintoxicación',
    AWARENESS: 'Consciencia',
    REINTEGRATION: 'Reinserción'
  },

  // Pasos del programa de 12 pasos
  twelveSteps: [
    '1. Admitimos que éramos impotentes ante el alcohol',
    '2. Llegamos a creer que un Poder superior a nosotros mismos',
    '3. Decidimos poner nuestra voluntad y nuestra vida',
    '4. Sin miedo hicimos un minucioso inventario moral',
    '5. Admitimos ante Dios, ante nosotros mismos',
    '6. Estuvimos enteramente dispuestos a dejar que Dios',
    '7. Humildemente le pedimos que nos liberase',
    '8. Hicimos una lista de todas aquellas personas',
    '9. Reparamos directamente a cuantos nos fue posible',
    '10. Continuamos haciendo nuestro inventario personal',
    '11. Buscamos a través de la oración y la meditación',
    '12. Habiendo obtenido un despertar espiritual'
  ],

  // Tipos de sustancias (para historial clínico)
  substanceTypes: [
    'Alcohol',
    'Marihuana',
    'Cocaína',
    'Metanfetaminas',
    'Heroína',
    'Inhalantes',
    'Benzodiacepinas',
    'Prescripción médica',
    'Otra'
  ],

  // Configuración de IndexedDB
  indexedDB: {
    name: 'cercasp_db',
    version: 1,
    stores: {
      patients: 'patients',
      medical: 'medical_records',
      psychology: 'psychology_records',
      finance: 'finance_records',
      logs: 'system_logs',
      offline_queue: 'offline_queue'
    }
  },

  // Configuración de encriptación
  encryption: {
    algorithm: 'AES-GCM',
    keyLength: 256,
    ivLength: 12,
    tagLength: 128
  },

  // Configuración de validación
  validation: {
    curp: {
      pattern: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/,
      message: 'CURP inválida. Formato: AAAA######HAAAAA#0'
    },
    rfc: {
      pattern: /^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{3}$/,
      message: 'RFC inválido. Formato: AAA######ABC'
    },
    phone: {
      pattern: /^\d{10}$/,
      message: 'Teléfono inválido. Formato: ##########'
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email inválido'
    }
  },

  // Configuración NOM-028
  nom028: {
    minTreatmentDays: 30,
    maxTreatmentDays: 180,
    requiredDocuments: [
      'consent_treatment',
      'consent_data_protection',
      'medical_history',
      'psychiatric_evaluation'
    ],
    followUpMonths: 12
  },

  // Configuración NOM-004
  nom004: {
    soapFormat: {
      subjective: 'Subjetivo (síntomas reportados por paciente)',
      objective: 'Objetivo (signos observados)',
      assessment: 'Análisis (diagnóstico)',
      plan: 'Plan (tratamiento)'
    },
    retentionYears: 5
  },

  // Configuración LFPDPPP
  lfpdppp: {
    arcoRights: [
      'Acceso',
      'Rectificación',
      'Cancelación',
      'Oposición'
    ],
    sensitiveDataCategories: [
      'Salud física',
      'Salud mental',
      'Datos genéticos',
      'Vida sexual'
    ]
  },

  // API endpoints (se cargan desde ENV)
  api: {
    grok: null, // Se carga desde ENV
    stripe: null, // Se carga desde ENV
    recaptcha: null // Se carga desde ENV
  },

  // Mensajes del sistema
  messages: {
    loading: 'Cargando...',
    saving: 'Guardando...',
    success: 'Operación exitosa',
    error: 'Ha ocurrido un error',
    sessionExpired: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
    unauthorized: 'No tienes permisos para realizar esta acción',
    offlineMode: 'Modo sin conexión. Los cambios se sincronizarán cuando vuelvas a estar en línea.'
  },

  // Configuración de gráficos
  charts: {
    colors: {
      primary: '#D4AF37',
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      info: '#3b82f6'
    }
  },

  /**
   * Inicializar configuración desde variables de entorno
   */
  init() {
    // Esta función se llama al cargar la aplicación
    // para sobrescribir valores con variables de entorno
    if (window.ENV) {
      this.app.environment = window.ENV.APP_ENV || 'development';
      this.app.sessionTimeout = parseInt(window.ENV.SESSION_TIMEOUT_MINUTES) || 15;
      
      if (window.ENV.ALLOWED_IP_RANGES) {
        this.app.allowedIPRanges = window.ENV.ALLOWED_IP_RANGES.split(',');
      }
    }
  },

  /**
   * Verificar si un usuario tiene un permiso específico
   */
  hasPermission(userRole, permission) {
    const rolePermissions = this.permissions[userRole] || [];
    return rolePermissions.includes('all') || rolePermissions.includes(permission);
  },

  /**
   * Obtener información de fase de tratamiento
   */
  getTreatmentPhaseInfo(phase) {
    return this.treatmentPhases[phase] || 'Desconocida';
  },

  /**
   * Validar formato de dato
   */
  validate(type, value) {
    const validation = this.validation[type];
    if (!validation) return { valid: true };
    
    const valid = validation.pattern.test(value);
    return {
      valid,
      message: valid ? '' : validation.message
    };
  }
};

// Inicializar configuración
AppConfig.init();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppConfig;
}
