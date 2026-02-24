import axios from 'axios';

// Usar la URL del backend según el ambiente
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para logging (útil para debug)
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.message);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export const gameAPI = {
  play: async (playerMove, mode) => {
    try {
      const response = await api.post('/game/play', {
        player_move: playerMove,
        mode: mode,
      });
      return response.data;
    } catch (error) {
      console.error('Error al jugar:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('El servidor tardó demasiado en responder');
      }
      if (error.response?.status === 404) {
        throw new Error('Endpoint no encontrado. Verifica la URL del backend');
      }
      if (error.message === 'Network Error') {
        throw new Error('Error de red. Verifica que el backend esté activo');
      }
      throw error;
    }
  },
};

export const leaderboardAPI = {
  getLeaderboard: async (mode) => {
    try {
      const response = await api.get(`/leaderboard/${mode}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo leaderboard:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('El servidor tardó demasiado en responder');
      }
      if (error.response?.status === 404) {
        throw new Error('Endpoint no encontrado. Verifica la URL del backend');
      }
      if (error.message === 'Network Error') {
        throw new Error('Error de red. Verifica que el backend esté activo');
      }
      throw error;
    }
  },

  saveScore: async (playerName, score, mode) => {
    try {
      const response = await api.post('/leaderboard', {
        player_name: playerName,
        score: score,
        mode: mode,
      });
      return response.data;
    } catch (error) {
      console.error('Error guardando puntuación:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('El servidor tardó demasiado en responder');
      }
      if (error.response?.status === 404) {
        throw new Error('Endpoint no encontrado. Verifica la URL del backend');
      }
      if (error.message === 'Network Error') {
        throw new Error('Error de red. Verifica que el backend esté activo');
      }
      throw error;
    }
  },
};

export default api;
