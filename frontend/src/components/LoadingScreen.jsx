import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ onReady }) => {
  const [dots, setDots] = useState('');
  const [message, setMessage] = useState('Despertando el servidor');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animación de puntos
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progreso simulado
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 300);

    // Cambiar mensajes
    const messages = [
      'Despertando el servidor',
      'Conectando con la base de datos',
      'Inicializando el juego',
      'Casi listo'
    ];
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo animado */}
        <div className="mb-8 animate-pulse">
          <div className="inline-block bg-white px-8 py-5 mb-2">
            <h1 className="text-6xl font-black text-blue-600" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em' }}>
              PPT
            </h1>
          </div>
          <div className="bg-blue-600 px-8 py-3">
            <p className="text-2xl font-bold text-black tracking-wider" style={{ fontFamily: 'Courier New, monospace' }}>
              BY LUIS
            </p>
          </div>
        </div>

        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <Loader2 className="animate-spin text-blue-500" size={64} strokeWidth={2.5} />
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <p className="text-white text-2xl font-bold mb-2">
            {message}{dots}
          </p>
          <p className="text-gray-400 text-sm">
            El servidor se estaba durmiendo, dame unos segundos
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Texto adicional */}
        <p className="text-gray-500 text-xs animate-pulse">
          Esto solo toma unos segundos la primera vez...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;