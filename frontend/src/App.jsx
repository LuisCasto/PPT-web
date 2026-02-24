import { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import { useWakeUpBackend } from './hooks/useWakeUpBackend';

function App() {
  const [screen, setScreen] = useState('menu'); // 'menu', 'game', 'leaderboard'
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState('');

  // Hook para despertar el backend
  const { isReady, error, retry, attempts, maxAttempts } = useWakeUpBackend();

  const handleStartGame = (name, mode) => {
    setPlayerName(name);
    setGameMode(mode);
    setScreen('game');
  };

  const handleBackToMenu = () => {
    setScreen('menu');
    setPlayerName('');
    setGameMode('');
  };

  const handleShowLeaderboard = (mode) => {
    setGameMode(mode);
    setScreen('leaderboard');
  };

  // Mostrar pantalla de error si hay un error
  if (error) {
    return (
      <ErrorScreen 
        message={error}
        onRetry={retry}
        attempts={attempts}
        maxAttempts={maxAttempts}
      />
    );
  }

  // Mostrar pantalla de carga mientras el backend se despierta
  if (!isReady) {
    return <LoadingScreen />;
  }

  // Una vez que el backend está listo, mostrar la app normal
  return (
    <>
      {screen === 'menu' && (
        <Menu 
          onStartGame={handleStartGame}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}
      {screen === 'game' && (
        <Game
          playerName={playerName}
          mode={gameMode}
          onBackToMenu={handleBackToMenu}
        />
      )}
      {screen === 'leaderboard' && (
        <Leaderboard
          mode={gameMode}
          onBack={handleBackToMenu}
        />
      )}
    </>
  );
}

export default App;