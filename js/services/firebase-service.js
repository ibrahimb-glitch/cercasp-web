/**
 * CERCASP Firebase Service
 * Wrapper para Firebase Authentication y Firestore
 * 
 * SEGURIDAD: Las credenciales Firebase se cargan desde variables de entorno
 * NO deben estar hardcodeadas en el código
 */

class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.currentUser = null;
    this.initialized = false;
  }

  /**
   * Inicializar Firebase con configuración desde ENV
   * @param {Object} config - Configuración Firebase desde variables de entorno
   */
  async init(config) {
    try {
      if (!config || !config.apiKey || !config.projectId) {
        throw new Error('Configuración Firebase incompleta. Verifica las variables de entorno. / Incomplete Firebase configuration. Check environment variables.');
      }

      // Inicializar Firebase
      this.app = firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();

      // Configurar Firestore settings
      this.db.settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
      });

      // Habilitar persistencia offline
      await this.db.enablePersistence({
        synchronizeTabs: true
      }).catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('[FirebaseService] Persistencia no disponible: múltiples tabs abiertas');
        } else if (err.code === 'unimplemented') {
          console.warn('[FirebaseService] Persistencia no soportada en este navegador');
        }
      });

      // Listener de cambios de autenticación
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
        if (user) {
          console.log('[FirebaseService] Usuario autenticado:', user.email);
        } else {
          console.log('[FirebaseService] Usuario no autenticado');
        }
      });

      this.initialized = true;
      console.log('[FirebaseService] Inicializado correctamente');
      return true;
    } catch (error) {
      console.error('[FirebaseService] Error al inicializar:', error);
      throw error;
    }
  }

  /**
   * Verificar si el servicio está inicializado
   */
  checkInitialized() {
    if (!this.initialized) {
      throw new Error('FirebaseService no ha sido inicializado. Llama a init() primero.');
    }
  }

  /**
   * Obtener referencia a una colección
   * @param {string} collectionName - Nombre de la colección
   */
  collection(collectionName) {
    this.checkInitialized();
    return this.db.collection(collectionName);
  }

  /**
   * Obtener referencia a un documento
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   */
  doc(collectionName, docId) {
    this.checkInitialized();
    return this.db.collection(collectionName).doc(docId);
  }

  /**
   * Crear documento con ID autogenerado
   * @param {string} collectionName - Nombre de la colección
   * @param {Object} data - Datos a guardar
   */
  async add(collectionName, data) {
    this.checkInitialized();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const docRef = await this.collection(collectionName).add({
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: this.currentUser?.uid || null
    });
    return docRef.id;
  }

  /**
   * Crear o actualizar documento con ID específico
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   * @param {Object} data - Datos a guardar
   * @param {boolean} merge - Si se debe hacer merge con datos existentes
   */
  async set(collectionName, docId, data, merge = true) {
    this.checkInitialized();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await this.doc(collectionName, docId).set({
      ...data,
      updatedAt: timestamp,
      updatedBy: this.currentUser?.uid || null
    }, { merge });
    return docId;
  }

  /**
   * Actualizar documento
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   * @param {Object} data - Datos a actualizar
   */
  async update(collectionName, docId, data) {
    this.checkInitialized();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await this.doc(collectionName, docId).update({
      ...data,
      updatedAt: timestamp,
      updatedBy: this.currentUser?.uid || null
    });
    return docId;
  }

  /**
   * Obtener documento por ID
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   */
  async get(collectionName, docId) {
    this.checkInitialized();
    const doc = await this.doc(collectionName, docId).get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  /**
   * Obtener todos los documentos de una colección
   * @param {string} collectionName - Nombre de la colección
   * @param {Array} queryConstraints - Restricciones de consulta (where, orderBy, limit)
   */
  async getAll(collectionName, queryConstraints = []) {
    this.checkInitialized();
    let query = this.collection(collectionName);

    // Aplicar restricciones de consulta
    queryConstraints.forEach(constraint => {
      query = constraint(query);
    });

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * Eliminar documento
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   */
  async delete(collectionName, docId) {
    this.checkInitialized();
    await this.doc(collectionName, docId).delete();
    return true;
  }

  /**
   * Escuchar cambios en tiempo real en un documento
   * @param {string} collectionName - Nombre de la colección
   * @param {string} docId - ID del documento
   * @param {Function} callback - Función a llamar cuando hay cambios
   */
  onSnapshot(collectionName, docId, callback) {
    this.checkInitialized();
    return this.doc(collectionName, docId).onSnapshot((doc) => {
      if (doc.exists) {
        callback({
          id: doc.id,
          ...doc.data()
        });
      } else {
        callback(null);
      }
    });
  }

  /**
   * Escuchar cambios en tiempo real en una colección
   * @param {string} collectionName - Nombre de la colección
   * @param {Array} queryConstraints - Restricciones de consulta
   * @param {Function} callback - Función a llamar cuando hay cambios
   */
  onCollectionSnapshot(collectionName, queryConstraints = [], callback) {
    this.checkInitialized();
    let query = this.collection(collectionName);

    queryConstraints.forEach(constraint => {
      query = constraint(query);
    });

    return query.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(docs);
    });
  }

  /**
   * Ejecutar transacción
   * @param {Function} updateFunction - Función que define la transacción
   */
  async runTransaction(updateFunction) {
    this.checkInitialized();
    return await this.db.runTransaction(updateFunction);
  }

  /**
   * Obtener timestamp del servidor
   */
  getServerTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  /**
   * Crear batch para operaciones múltiples
   */
  batch() {
    this.checkInitialized();
    return this.db.batch();
  }
}

// Crear instancia singleton
const firebaseService = new FirebaseService();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseService;
}
