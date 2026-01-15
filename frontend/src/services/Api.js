import axios from 'axios';

// Usar la URL del backend según el ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      throw error;
    }
  },
};

export default api;