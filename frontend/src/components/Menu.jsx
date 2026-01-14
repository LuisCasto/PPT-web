import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const Menu = ({ onStartGame, onShowLeaderboard }) => {
  const [playerName, setPlayerName] = useState('');

  // Cargar el nombre guardado al montar el componente
  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleStartGame = (mode) => {
    if (!playerName.trim()) {
      alert('¡Por favor introduce tu nombre!');
      return;
    }
    
    // Guardar el nombre en localStorage
    localStorage.setItem('playerName', playerName.trim());
    onStartGame(playerName.trim(), mode);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Limitar a 5 caracteres y convertir a mayúsculas
    if (value.length <= 5) {
      setPlayerName(value.toUpperCase());
    }
  };

  const clearName = () => {
    setPlayerName('');
    localStorage.removeItem('playerName');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Logo PPT */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className="bg-white px-8 py-5 mb-0">
              <h1 className="text-5xl font-black text-blue-600" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em' }}>
                PPT
              </h1>
            </div>
            <div className="bg-blue-600 px-8 py-3">
              <p className="text-2xl font-bold text-black tracking-wider" style={{ fontFamily: 'Courier New, monospace' }}>
                BY LUIS
              </p>
            </div>
          </div>
        </div>

        {/* Input Nombre */}
        <div className="mb-6">
          <label className="block text-white text-xl font-bold text-center mb-3">
            Introduce tu nombre:
          </label>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={playerName}
              onChange={handleNameChange}
              className="w-full px-5 py-3 bg-black border-3 border-blue-600 text-white text-lg text-center rounded-none focus:outline-none focus:border-blue-400 transition-colors font-bold tracking-wider"
              maxLength={5}
              placeholder="5 LETRAS"
            />
            {playerName && (
              <button
                onClick={clearName}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                title="Borrar nombre"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </button>
            )}
          </div>
          <p className="text-center text-gray-500 text-xs mt-2">
            {playerName.length}/5 caracteres
          </p>
        </div>

        {/* Selector de Modo */}
        <div className="mb-6">
          <p className="text-white text-xl font-bold text-center mb-4">
            Haz clic en la dificultad:
          </p>

          <div className="space-y-3">
            {/* Modo Normal */}
            <button
              onClick={() => handleStartGame('normal')}
              className="w-full bg-gray-700 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">😊</span>
              </div>
              <span className="text-2xl font-bold">Modo normal</span>
            </button>

            {/* Modo Imposible */}
            <button
              onClick={() => handleStartGame('imposible')}
              className="w-full bg-gray-700 hover:bg-red-600 text-white font-bold py-6 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">😠</span>
              </div>
              <span className="text-2xl font-bold">Modo IMPOSIBLE</span>
            </button>
          </div>
        </div>

        {/* Tablas de clasificación */}
        <div className="mt-8">
          <p className="text-white text-lg font-semibold text-center mb-3">
            Tablas de clasificación
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onShowLeaderboard('normal')}
              className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-base font-semibold"
            >
              <Trophy size={16} />
              Normal
            </button>
            <button
              onClick={() => onShowLeaderboard('imposible')}
              className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-base font-semibold"
            >
              <Trophy size={16} />
              Imposible
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Primer jugador en llegar a <span className="text-white font-bold">5 victorias</span> gana
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;