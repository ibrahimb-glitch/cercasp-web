/**
 * CERCASP Sanitizers
 * Sanitización para prevenir XSS
 */

const Sanitizers = {
  /**
   * Escapar HTML para prevenir XSS
   */
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Sanitizar string eliminando tags HTML
   */
  stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  },

  /**
   * Sanitizar para uso en atributos HTML
   */
  sanitizeAttribute(value) {
    return String(value)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Sanitizar URL
   */
  sanitizeURL(url) {
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    try {
      const urlObj = new URL(url);
      if (allowedProtocols.includes(urlObj.protocol)) {
        return url;
      }
    } catch (e) {
      // URL inválida
    }
    return '#';
  },

  /**
   * Sanitizar texto para búsqueda
   */
  sanitizeSearch(text) {
    return String(text)
      .trim()
      .replace(/[<>]/g, '')
      .substring(0, 100); // Limitar longitud
  },

  /**
   * Sanitizar nombre de archivo
   */
  sanitizeFilename(filename) {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sanitizers;
}
