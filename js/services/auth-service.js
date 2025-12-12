/**
 * CERCASP Auth Service
 * Gestión de autenticación y autorización
 * Cumplimiento: LFPDPPP (Control de acceso a datos personales)
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.sessionTimeout = null;
    this.sessionTimer = null;
  }

  /**
   * Inicializar sesión con Firebase y validación IP
   */
  async init() {
    // Listener de cambios de autenticación
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Cargar datos adicionales del usuario
        const userDoc = await firebaseService.get('users', user.uid);
        this.currentUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: userDoc?.role || 'VIEWER',
          ...userDoc
        };

        // Iniciar timer de sesión
        this.startSessionTimer();

        // Log de inicio de sesión
        await this.logAction('login', { email: user.email });
      } else {
        this.currentUser = null;
        this.stopSessionTimer();
      }
    });
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  async signIn(email, password) {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      
      // Validar IP permitida (desde backend en producción)
      if (AppConfig.app.environment === 'production') {
        const isValidIP = await this.validateIP();
        if (!isValidIP) {
          await this.signOut();
          throw new Error('Acceso denegado desde esta ubicación IP');
        }
      }

      return result.user;
    } catch (error) {
      console.error('[AuthService] Error en signIn:', error);
      throw this.handleAuthError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  async signOut() {
    try {
      if (this.currentUser) {
        await this.logAction('logout', { email: this.currentUser.email });
      }
      await firebase.auth().signOut();
      this.currentUser = null;
      this.stopSessionTimer();
    } catch (error) {
      console.error('[AuthService] Error en signOut:', error);
      throw error;
    }
  }

  /**
   * Verificar si usuario está autenticado
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Verificar si usuario tiene un permiso específico
   */
  hasPermission(permission) {
    if (!this.currentUser) return false;
    return AppConfig.hasPermission(this.currentUser.role, permission);
  }

  /**
   * Verificar si usuario tiene un rol específico
   */
  hasRole(role) {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  /**
   * Validar IP permitida
   */
  async validateIP() {
    try {
      // Obtener IP del cliente
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const clientIP = data.ip;

      // Verificar contra rangos permitidos
      const allowedRanges = AppConfig.app.allowedIPRanges;
      if (allowedRanges.length === 0) {
        return true; // Sin restricciones
      }

      // Verificar si IP está en rangos permitidos
      return this.isIPInRanges(clientIP, allowedRanges);
    } catch (error) {
      console.error('[AuthService] Error al validar IP:', error);
      return false;
    }
  }

  /**
   * Verificar si IP está en rangos permitidos
   */
  isIPInRanges(ip, ranges) {
    // Implementación simplificada - en producción usar librería especializada
    for (const range of ranges) {
      if (range.includes('/')) {
        // Es un rango CIDR
        const [network, bits] = range.split('/');
        // Validación simplificada
        if (ip.startsWith(network.split('.').slice(0, 2).join('.'))) {
          return true;
        }
      } else if (ip === range) {
        return true;
      }
    }
    return false;
  }

  /**
   * Iniciar timer de sesión
   */
  startSessionTimer() {
    this.stopSessionTimer();
    
    const timeoutMinutes = AppConfig.app.sessionTimeout;
    this.sessionTimeout = Date.now() + (timeoutMinutes * 60 * 1000);

    // Timer que verifica cada minuto
    this.sessionTimer = setInterval(() => {
      if (Date.now() >= this.sessionTimeout) {
        this.handleSessionTimeout();
      }
    }, 60000); // Cada minuto

    // Resetear timer en actividad del usuario
    ['click', 'keydown', 'scroll', 'mousemove'].forEach(event => {
      document.addEventListener(event, () => this.resetSessionTimer());
    });
  }

  /**
   * Resetear timer de sesión
   */
  resetSessionTimer() {
    const timeoutMinutes = AppConfig.app.sessionTimeout;
    this.sessionTimeout = Date.now() + (timeoutMinutes * 60 * 1000);
  }

  /**
   * Detener timer de sesión
   */
  stopSessionTimer() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  /**
   * Manejar timeout de sesión
   */
  async handleSessionTimeout() {
    alert(AppConfig.messages.sessionExpired);
    await this.signOut();
    window.location.href = '/admin.html';
  }

  /**
   * Registrar acción en logs
   */
  async logAction(action, details = {}) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        userId: this.currentUser?.uid || 'anonymous',
        userEmail: this.currentUser?.email || 'anonymous',
        userRole: this.currentUser?.role || 'unknown',
        action: action,
        details: details,
        userAgent: navigator.userAgent
      };

      // Generar checksum para integridad
      const checksum = await encryptionService.generateChecksum(logEntry);
      logEntry.checksum = checksum;

      // Guardar en Firestore
      await firebaseService.add('logs', logEntry);
    } catch (error) {
      console.error('[AuthService] Error al registrar acción:', error);
    }
  }

  /**
   * Manejar errores de autenticación
   */
  handleAuthError(error) {
    const errorMessages = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión.'
    };

    return new Error(errorMessages[error.code] || error.message);
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(newPassword) {
    try {
      const user = firebase.auth().currentUser;
      await user.updatePassword(newPassword);
      await this.logAction('password_changed');
      return true;
    } catch (error) {
      console.error('[AuthService] Error al cambiar contraseña:', error);
      throw error;
    }
  }

  /**
   * Solicitar reseteo de contraseña
   */
  async resetPassword(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.error('[AuthService] Error al resetear contraseña:', error);
      throw this.handleAuthError(error);
    }
  }
}

// Crear instancia singleton
const authService = new AuthService();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = authService;
}
