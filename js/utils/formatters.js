/**
 * CERCASP Formatters
 * Formateo de datos para visualización
 */

const Formatters = {
  /**
   * Formatear fecha a español mexicano
   */
  date(date, format = 'long') {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    
    const options = {
      short: { year: 'numeric', month: '2-digit', day: '2-digit' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };

    return d.toLocaleDateString('es-MX', options[format] || options.long);
  },

  /**
   * Formatear fecha y hora
   */
  datetime(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Formatear moneda (pesos mexicanos)
   */
  currency(amount) {
    if (amount === null || amount === undefined) return '';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  },

  /**
   * Formatear teléfono
   */
  phone(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  /**
   * Formatear CURP
   */
  curp(curp) {
    if (!curp) return '';
    return curp.toUpperCase();
  },

  /**
   * Formatear RFC
   */
  rfc(rfc) {
    if (!rfc) return '';
    return rfc.toUpperCase();
  },

  /**
   * Formatear nombre (capitalizar)
   */
  name(name) {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  /**
   * Formatear porcentaje
   */
  percentage(value, decimals = 0) {
    if (value === null || value === undefined) return '';
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Truncar texto
   */
  truncate(text, length = 50) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  /**
   * Formatear duración en días
   */
  days(days) {
    if (!days) return '0 días';
    if (days === 1) return '1 día';
    return `${days} días`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Formatters;
}
