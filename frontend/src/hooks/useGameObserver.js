/**
 * useGameObserver — Patrón Observer en el frontend
 *
 * Permite que cualquier componente React "observe" el estado del juego
 * y se re-renderice automáticamente cuando cambia, sin conocer
 * los detalles del protocolo HTTP ni de la lógica de negocio.
 *
 * Uso:
 *   const { gameState, handleMove, resetGame } = useGameObserver(playerName, mode);
 */

import { useState, useCallback } from 'react';
import { gameAPI, leaderboardAPI } from '../services/Api';

const initialState = {
  playerWins: 0,
  cpuWins: 0,
  ties: 0,
  score: 0,
  lastRound: null,
  isLoading: false,
  gameOver: false,
  winner: null,
};

export function useGameObserver(playerName, mode) {
  const [gameState, setGameState] = useState(initialState);

  /**
   * Notifica a todos los "observadores" (componentes suscritos)
   * actualizando el estado de forma inmutable.
   */
  const notify = useCallback((updater) => {
    setGameState((prev) => ({ ...prev, ...updater }));
  }, []);

  const handleMove = useCallback(
    async (playerMove) => {
      if (gameState.gameOver || gameState.isLoading) return;

      notify({ isLoading: true });

      try {
        const result = await gameAPI.play(playerMove, mode);

        // Calcular nuevo estado
        const playerWins =
          gameState.playerWins + (result.result === 'player' ? 1 : 0);
        const cpuWins =
          gameState.cpuWins + (result.result === 'cpu' ? 1 : 0);
        const ties =
          gameState.ties + (result.result === 'tie' ? 1 : 0);
        const score = playerWins * 100 - cpuWins * 100 + ties * 25;

        const isGameOver = playerWins >= 5 || cpuWins >= 5;
        const winner = isGameOver
          ? playerWins >= 5
            ? 'player'
            : 'cpu'
          : null;

        // Notificar a los observadores con el nuevo estado
        notify({
          playerWins,
          cpuWins,
          ties,
          score,
          lastRound: {
            playerMove,
            cpuMove: result.cpu_move,
            result: result.result,
          },
          gameOver: isGameOver,
          winner,
          isLoading: false,
        });

        // Guardar puntuación si la partida terminó
        if (isGameOver) {
          await leaderboardAPI.saveScore(playerName, score, mode);
        }
      } catch (error) {
        console.error('Error en handleMove:', error);
        notify({ isLoading: false });
        alert('Error al hacer la jugada: ' + (error.message || 'Error desconocido'));
      }
    },
    [gameState, playerName, mode, notify]
  );

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return { gameState, handleMove, resetGame };
}