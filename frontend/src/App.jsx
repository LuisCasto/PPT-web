import { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {
  const [screen, setScreen] = useState('menu'); // 'menu', 'game', 'leaderboard'
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState('');

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