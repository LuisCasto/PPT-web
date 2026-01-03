import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { gameAPI, leaderboardAPI } from '../services/Api';

const Game = ({ playerName, mode, onBackToMenu }) => {
  const [gameState, setGameState] = useState({
    playerWins: 0,
    cpuWins: 0,
    ties: 0,
    score: 0,
  });
  const [lastRound, setLastRound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const moves = {
    1: { emoji: '🪨', name: 'Piedra' },
    2: { emoji: '📄', name: 'Papel' },
    3: { emoji: '✂️', name: 'Tijera' },
  };

  const makeMove = async (playerMove) => {
    if (gameOver || isLoading) return;

    setIsLoading(true);
    try {
      const result = await gameAPI.play(playerMove, mode);

      const newState = { ...gameState };

      if (result.result === 'player') {
        newState.playerWins += 1;
      } else if (result.result === 'cpu') {
        newState.cpuWins += 1;
      } else {
        newState.ties += 1;
      }

      newState.score = (newState.playerWins * 100) - (newState.cpuWins * 100) + (newState.ties * 25);

      setGameState(newState);
      setLastRound({
        playerMove,
        cpuMove: result.cpu_move,
        result: result.result,
      });

      if (newState.playerWins >= 5 || newState.cpuWins >= 5) {
        setGameOver(true);
        setWinner(newState.playerWins >= 5 ? 'player' : 'cpu');
        await leaderboardAPI.saveScore(playerName, newState.score, mode);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al hacer la jugada');
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Menú</span>
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{playerName}</h2>
            <p className="text-gray-400">{mode === 'normal' ? '😊 Modo Normal' : '😠 Modo IMPOSIBLE'}</p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Marcador */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border-2 border-gray-800">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-6xl mb-3">👤</p>
              <p className="text-5xl font-black text-green-400 mb-2">{gameState.playerWins}</p>
              <p className="text-gray-400 font-semibold">Tú</p>
            </div>
            <div>
              <p className="text-4xl mb-3">🤝</p>
              <p className="text-4xl font-black text-orange-400 mb-2">{gameState.ties}</p>
              <p className="text-gray-400 font-semibold">Empates</p>
            </div>
            <div>
              <p className="text-6xl mb-3">🤖</p>
              <p className="text-5xl font-black text-red-400 mb-2">{gameState.cpuWins}</p>
              <p className="text-gray-400 font-semibold">CPU</p>
            </div>
          </div>
          <div className="mt-6 text-center pt-6 border-t border-gray-800">
            <p className="text-yellow-400 text-2xl font-bold">
              📊 Puntuación: {gameState.score}
            </p>
          </div>
        </div>

        {/* Resultado última ronda */}
        {lastRound && (
          <div className={`rounded-2xl p-10 mb-8 border-4 ${
            lastRound.result === 'player' ? 'bg-green-900 border-green-500' :
            lastRound.result === 'cpu' ? 'bg-red-900 border-red-500' :
            'bg-orange-900 border-orange-500'
          }`}>
            <p className={`text-center text-4xl font-black mb-8 ${
              lastRound.result === 'player' ? 'text-green-300' :
              lastRound.result === 'cpu' ? 'text-red-300' : 'text-orange-300'
            }`}>
              {lastRound.result === 'player' ? '🎉 ¡GANASTE!' :
               lastRound.result === 'cpu' ? '💀 PERDISTE' : '🤝 ¡EMPATE!'}
            </p>
            <div className="flex justify-center items-center gap-16">
              <div className="text-center">
                <div className="text-9xl mb-4">{moves[lastRound.playerMove].emoji}</div>
                <p className="text-white text-xl font-bold">{moves[lastRound.playerMove].name}</p>
              </div>
              <div className="text-white text-5xl font-black">VS</div>
              <div className="text-center">
                <div className="text-9xl mb-4">{moves[lastRound.cpuMove].emoji}</div>
                <p className="text-white text-xl font-bold">{moves[lastRound.cpuMove].name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        {!gameOver ? (
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((move) => (
              <button
                key={move}
                onClick={() => makeMove(move)}
                disabled={isLoading}
                className="bg-gray-800 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-gray-800 text-white font-bold py-16 rounded-2xl transition-all disabled:cursor-not-allowed border-4 border-gray-700 hover:border-blue-500 group"
              >
                <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">{moves[move].emoji}</div>
                <div className="text-2xl font-bold">{moves[move].name}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl p-12 text-center border-4 border-gray-800">
            <div className="text-8xl mb-6">{winner === 'player' ? '🏆' : '😢'}</div>
            <h2 className="text-5xl font-black text-white mb-4">
              {winner === 'player' ? '¡VICTORIA!' : 'DERROTA'}
            </h2>
            <p className="text-gray-400 text-2xl mb-8">
              {winner === 'player' ? '¡Has ganado la partida!' : 'La CPU ha ganado'}
            </p>
            <div className="bg-gray-800 rounded-xl p-6 inline-block mb-8">
              <p className="text-yellow-400 text-3xl font-black">
                {gameState.score} puntos
              </p>
            </div>
            <br />
            <button
              onClick={onBackToMenu}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-colors text-xl"
            >
              Volver al menú
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;