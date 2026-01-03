import { useState, useEffect } from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { leaderboardAPI } from '../services/Api';

const Leaderboard = ({ mode, onBack }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [mode]);

  const loadLeaderboard = async () => {
    try {
      const data = await leaderboardAPI.getLeaderboard(mode);
      setLeaderboard(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Volver</span>
          </button>
          <div className="text-center">
            <h2 className="text-4xl font-black text-white flex items-center gap-3 justify-center">
              <Trophy size={36} className="text-yellow-400" />
              Clasificación
            </h2>
            <p className="text-gray-400 mt-2">
              {mode === 'normal' ? '😊 Modo Normal' : '😠 Modo IMPOSIBLE'}
            </p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">Cargando...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="mx-auto mb-4 text-gray-700" size={64} />
              <p className="text-gray-400 text-xl">Sin puntuaciones todavía</p>
            </div>
          ) : (
            <div>
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white text-2xl">{entry.player_name}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(entry.timestamp).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className={`text-4xl font-black ${
                    entry.score >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {entry.score}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;