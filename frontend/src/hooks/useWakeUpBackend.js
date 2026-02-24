import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL2;

/**
 * Hook personalizado para despertar el backend antes de usar la app
 * @returns {Object} { isReady, error, retry }
 */
//reload
export const useWakeUpBackend = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const MAX_ATTEMPTS = 4;
  const TIMEOUT = 60000; // 30 segundos

  const wakeUp = async () => {
    try {
      console.log(`🔌 Intento ${attempts + 1} de despertar el backend...`);
      
      // Hacer un ping al endpoint de health
      const response = await axios.get(`${API_URL}/health`, {
        timeout: TIMEOUT,
      });

      if (response.status === 200) {
        console.log('✅ Backend despierto y listo!');
        setIsReady(true);
        setError(null);
        return true;
      }
    } catch (err) {
      console.error('❌ Error despertando backend:', err.message);
      
      if (attempts < MAX_ATTEMPTS - 1) {
        // Reintentar
        setAttempts(prev => prev + 1);
        // Esperar un poco antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 2000));
        return false;
      } else {
        // Falló después de todos los intentos
        setError('No se pudo conectar con el servidor. Por favor, intenta más tarde.');
        return false;
      }
    }
  };

  const retry = () => {
    setError(null);
    setAttempts(0);
    setIsReady(false);
  };

  useEffect(() => {
    let mounted = true;

    const attemptWakeUp = async () => {
      if (!mounted) return;
      
      const success = await wakeUp();
      
      // Si falló y quedan intentos, reintentar automáticamente
      if (!success && attempts < MAX_ATTEMPTS - 1 && mounted) {
        setTimeout(() => {
          if (mounted) {
            attemptWakeUp();
          }
        }, 1000);
      }
    };

    attemptWakeUp();

    return () => {
      mounted = false;
    };
  }, [attempts]);

  return {
    isReady,
    error,
    retry,
    attempts,
    maxAttempts: MAX_ATTEMPTS
  };
};