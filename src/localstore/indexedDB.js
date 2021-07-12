export function indexedDB() {
    const db =
      (typeof window !== 'undefined' && window && window.indexedDB) ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
  
    if (!db) {
      window.alert(
        "El Navegador no soporta INDEXDB.",
      );
    } else {
      return db;
    }
  }