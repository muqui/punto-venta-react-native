// src/config/apiConfig.ts
export const BASE_URL = 'https://back-navarro-pos.duckdns.org';  // Base URL

export const API_URLS = {
  auth: '/auth/signin',          // Ruta de autenticación
  products: '/products',         // Ruta de productos
  inventory: '/products/entries' // Ruta para inventario
  // Puedes agregar más rutas si es necesario
};

// Función para construir la URL completa
export const buildUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;
