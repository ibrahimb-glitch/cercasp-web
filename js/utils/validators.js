/**
 * CERCASP Validators
 * Validación de formularios y datos
 */

const Validators = {
  /**
   * Validar email
   */
  email(value) {
    const result = AppConfig.validate('email', value);
    return result;
  },

  /**
   * Validar teléfono
   */
  phone(value) {
    const result = AppConfig.validate('phone', value);
    return result;
  },

  /**
   * Validar CURP
   */
  curp(value) {
    const result = AppConfig.validate('curp', value);
    return result;
  },

  /**
   * Validar RFC
   */
  rfc(value) {
    const result = AppConfig.validate('rfc', value);
    return result;
  },

  /**
   * Validar campo requerido
   */
  required(value) {
    const valid = value !== null && value !== undefined && value !== '';
    return {
      valid,
      message: valid ? '' : 'Este campo es requerido'
    };
  },

  /**
   * Validar longitud mínima
   */
  minLength(value, min) {
    const valid = value && value.length >= min;
    return {
      valid,
      message: valid ? '' : `Mínimo ${min} caracteres`
    };
  },

  /**
   * Validar longitud máxima
   */
  maxLength(value, max) {
    const valid = value && value.length <= max;
    return {
      valid,
      message: valid ? '' : `Máximo ${max} caracteres`
    };
  },

  /**
   * Validar fecha
   */
  date(value) {
    const date = new Date(value);
    const valid = date instanceof Date && !isNaN(date);
    return {
      valid,
      message: valid ? '' : 'Fecha inválida'
    };
  },

  /**
   * Validar rango de fecha
   */
  dateRange(value, min, max) {
    const date = new Date(value);
    const minDate = min ? new Date(min) : null;
    const maxDate = max ? new Date(max) : null;

    let valid = date instanceof Date && !isNaN(date);
    let message = '';

    if (valid && minDate && date < minDate) {
      valid = false;
      message = `La fecha debe ser posterior a ${minDate.toLocaleDateString('es-MX')}`;
    }

    if (valid && maxDate && date > maxDate) {
      valid = false;
      message = `La fecha debe ser anterior a ${maxDate.toLocaleDateString('es-MX')}`;
    }

    return { valid, message };
  },

  /**
   * Validar número
   */
  number(value) {
    const num = Number(value);
    const valid = !isNaN(num);
    return {
      valid,
      message: valid ? '' : 'Debe ser un número válido'
    };
  },

  /**
   * Validar rango numérico
   */
  numberRange(value, min, max) {
    const num = Number(value);
    let valid = !isNaN(num);
    let message = '';

    if (valid && min !== undefined && num < min) {
      valid = false;
      message = `El valor debe ser mayor o igual a ${min}`;
    }

    if (valid && max !== undefined && num > max) {
      valid = false;
      message = `El valor debe ser menor o igual a ${max}`;
    }

    return { valid, message };
  },

  /**
   * Validar formulario completo
   */
  validateForm(formData, rules) {
    const errors = {};
    let isValid = true;

    for (const field in rules) {
      const value = formData[field];
      const fieldRules = rules[field];

      for (const rule of fieldRules) {
        const result = rule.validator(value, ...rule.params || []);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
          break;
        }
      }
    }

    return { isValid, errors };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Validators;
}
