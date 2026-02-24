import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorScreen = ({ message, onRetry, attempts, maxAttempts }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 opacity-50">
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

        {/* Icono de error */}
        <div className="mb-6 flex justify-center">
          <AlertCircle className="text-red-500" size={64} strokeWidth={2} />
        </div>

        {/* Mensaje de error */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-3">
            😔 No se pudo conectar
          </h2>
          <p className="text-gray-400 text-base mb-4">
            {message}
          </p>
          <p className="text-gray-500 text-sm">
            Intentos: {attempts}/{maxAttempts}
          </p>
        </div>

        {/* Botón de reintentar */}
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
        >
          <RefreshCw size={20} />
          Reintentar conexión
        </button>

        {/* Consejo */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">
            💡 <strong className="text-white">Consejo:</strong> Si el problema persiste, 
            espera 1-2 minutos y vuelve a intentar. El servidor gratuito puede tardar 
            en despertar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;