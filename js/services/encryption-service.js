/**
 * CERCASP Encryption Service
 * Implementa encriptación AES-256-GCM para datos sensibles
 * Cumplimiento: LFPDPPP (Protección de datos personales sensibles)
 */

class EncryptionService {
  constructor() {
    this.algorithm = 'AES-GCM';
    this.keyLength = 256;
    this.ivLength = 12;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.key = null;
  }

  /**
   * Inicializar el servicio con una clave de encriptación
   * @param {string} keyString - Clave de encriptación (debe ser de 256 bits)
   * NOTA: Usando salt fijo para consistencia. En producción de alta seguridad,
   * considerar salts por-registro con gestión de claves más compleja.
   */
  async init(keyString) {
    try {
      // Derivar clave desde string usando PBKDF2
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        this.encoder.encode(keyString),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
      );

      // Usar salt fijo para que la misma clave siempre produzca el mismo resultado
      // SECURITY NOTE: Salt fijo permite encriptación determinística pero reduce
      // resistencia contra rainbow tables. Trade-off aceptable para este caso de uso.
      const salt = this.encoder.encode('cercasp-2023-salt');

      // Derivar clave AES-GCM
      this.key = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        {
          name: 'AES-GCM',
          length: this.keyLength
        },
        false,
        ['encrypt', 'decrypt']
      );

      console.log('[EncryptionService] Inicializado correctamente');
      return true;
    } catch (error) {
      console.error('[EncryptionService] Error al inicializar:', error);
      throw new Error('No se pudo inicializar el servicio de encriptación');
    }
  }

  /**
   * Encriptar texto
   * @param {string} plaintext - Texto plano a encriptar
   * @returns {Promise<string>} Texto encriptado en formato Base64
   */
  async encrypt(plaintext) {
    if (!this.key) {
      throw new Error('El servicio de encriptación no ha sido inicializado');
    }

    if (!plaintext) {
      return '';
    }

    try {
      // Generar IV aleatorio
      const iv = window.crypto.getRandomValues(new Uint8Array(this.ivLength));

      // Encriptar
      const ciphertext = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.key,
        this.encoder.encode(plaintext)
      );

      // Combinar IV + ciphertext
      const combined = new Uint8Array(iv.length + ciphertext.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(ciphertext), iv.length);

      // Convertir a Base64
      return this.arrayBufferToBase64(combined);
    } catch (error) {
      console.error('[EncryptionService] Error al encriptar:', error);
      throw new Error('Error al encriptar datos');
    }
  }

  /**
   * Desencriptar texto
   * @param {string} encryptedText - Texto encriptado en Base64
   * @returns {Promise<string>} Texto plano
   */
  async decrypt(encryptedText) {
    if (!this.key) {
      throw new Error('El servicio de encriptación no ha sido inicializado');
    }

    if (!encryptedText) {
      return '';
    }

    try {
      // Convertir de Base64
      const combined = this.base64ToArrayBuffer(encryptedText);

      // Separar IV y ciphertext
      const iv = combined.slice(0, this.ivLength);
      const ciphertext = combined.slice(this.ivLength);

      // Desencriptar
      const plaintext = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.key,
        ciphertext
      );

      return this.decoder.decode(plaintext);
    } catch (error) {
      console.error('[EncryptionService] Error al desencriptar:', error);
      throw new Error('Error al desencriptar datos');
    }
  }

  /**
   * Encriptar objeto completo
   * @param {Object} obj - Objeto a encriptar
   * @param {Array<string>} sensitiveFields - Campos a encriptar
   * @returns {Promise<Object>} Objeto con campos encriptados
   */
  async encryptObject(obj, sensitiveFields) {
    const encrypted = { ...obj };

    for (const field of sensitiveFields) {
      if (obj[field]) {
        encrypted[field] = await this.encrypt(String(obj[field]));
        encrypted[`${field}_encrypted`] = true;
      }
    }

    return encrypted;
  }

  /**
   * Desencriptar objeto completo
   * @param {Object} obj - Objeto encriptado
   * @param {Array<string>} sensitiveFields - Campos a desencriptar
   * @returns {Promise<Object>} Objeto con campos desencriptados
   */
  async decryptObject(obj, sensitiveFields) {
    const decrypted = { ...obj };

    for (const field of sensitiveFields) {
      if (obj[field] && obj[`${field}_encrypted`]) {
        try {
          decrypted[field] = await this.decrypt(obj[field]);
          delete decrypted[`${field}_encrypted`];
        } catch (error) {
          console.error(`[EncryptionService] Error al desencriptar campo ${field}:`, error);
          decrypted[field] = '[Error al desencriptar]';
        }
      }
    }

    return decrypted;
  }

  /**
   * Generar hash SHA-256 de un texto
   * @param {string} text - Texto a hashear
   * @returns {Promise<string>} Hash en formato hexadecimal
   */
  async hash(text) {
    const buffer = this.encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generar checksum para integridad de logs
   * @param {Object} logEntry - Entrada de log
   * @returns {Promise<string>} Checksum SHA-256
   */
  async generateChecksum(logEntry) {
    const dataString = JSON.stringify(logEntry);
    return await this.hash(dataString);
  }

  /**
   * Verificar checksum de log
   * @param {Object} logEntry - Entrada de log
   * @param {string} checksum - Checksum a verificar
   * @returns {Promise<boolean>} True si el checksum es válido
   */
  async verifyChecksum(logEntry, checksum) {
    const calculatedChecksum = await this.generateChecksum(logEntry);
    return calculatedChecksum === checksum;
  }

  /**
   * Convertir ArrayBuffer a Base64
   * @private
   */
  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convertir Base64 a ArrayBuffer
   * @private
   */
  base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Generar clave aleatoria para uso temporal
   * @returns {string} Clave aleatoria en formato hexadecimal
   */
  generateRandomKey() {
    const array = new Uint8Array(32); // 256 bits
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

// Crear instancia singleton
const encryptionService = new EncryptionService();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = encryptionService;
}
