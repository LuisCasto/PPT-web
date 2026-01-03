import { useState } from 'react';
import { Trophy } from 'lucide-react';

const Menu = ({ onStartGame, onShowLeaderboard }) => {
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = (mode) => {
    if (!playerName.trim()) {
      alert('¡Por favor introduce tu nombre!');
      return;
    }
    onStartGame(playerName, mode);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Logo PPT */}
        <div className="text-center mb-12">
          <div className="inline-block mb-8">
            <div className="bg-white px-12 py-8 mb-0">
              <h1 className="text-7xl font-black text-blue-600" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em' }}>
                PPT
              </h1>
            </div>
            <div className="bg-blue-600 px-12 py-4">
              <p className="text-3xl font-bold text-black tracking-wider" style={{ fontFamily: 'Courier New, monospace' }}>
                BY LUIS
              </p>
            </div>
          </div>
        </div>

        {/* Input Nombre */}
        <div className="mb-8">
          <label className="block text-white text-2xl font-bold text-center mb-4">
            Introduce tu nombre:
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full max-w-md mx-auto block px-6 py-4 bg-black border-4 border-blue-600 text-white text-xl rounded-none focus:outline-none focus:border-blue-400 transition-colors"
            maxLength={20}
            placeholder=""
          />
        </div>

        {/* Selector de Modo */}
        <div className="mb-8">
          <p className="text-white text-2xl font-bold text-center mb-6">
            Haz clic en la dificultad:
          </p>

          <div className="space-y-4">
            {/* Modo Normal */}
            <button
              onClick={() => handleStartGame('normal')}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-8 px-8 rounded-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-6"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-5xl">😊</span>
              </div>
              <span className="text-3xl font-bold">Modo normal</span>
            </button>

            {/* Modo Imposible */}
            <button
              onClick={() => handleStartGame('imposible')}
              className="w-full bg-gray-700 hover:bg-red-600 text-white font-bold py-8 px-8 rounded-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-6"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-5xl">😠</span>
              </div>
              <span className="text-3xl font-bold">Modo IMPOSIBLE</span>
            </button>
          </div>
        </div>

        {/* Tablas de clasificación */}
        <div className="mt-12">
          <p className="text-white text-xl font-semibold text-center mb-4">
            Tablas de clasificación
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onShowLeaderboard('normal')}
              className="bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <Trophy size={20} />
              Normal
            </button>
            <button
              onClick={() => onShowLeaderboard('imposible')}
              className="bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <Trophy size={20} />
              Imposible
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Primer jugador en llegar a <span className="text-white font-bold">5 victorias</span> gana
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;