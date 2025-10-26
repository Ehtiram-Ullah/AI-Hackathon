import { useState, useEffect } from "react";
import Background from "./components/layout/Background";
import TopBar from "./components/ui/TopBar";
import type { PlayerStats } from "./types";
import RegisterScreen from "./screens/RegisterScreen";
import MenuScreen from "./screens/MenuScreen";
import MatchmakingScreen from "./screens/MatchmakingScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MatchScreen from "./screens/MatchScreen";
import VersusScreen from "./screens/VersusScreen";
import TopicModal from "./components/ui/TopicModel";


export default function App() {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [screen, setScreen] = useState<"register" | "menu" | "matchmaking" | "loading" | "versus" | "match">("register");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [enemyName, setEnemyName] = useState("");

    const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // 🎯 Flow control (auto-switch screens)
  useEffect(() => {
    if (screen === "matchmaking") {
      const t = setTimeout(() => setScreen("loading"), 3000);
      return () => clearTimeout(t);
    }
    if (screen === "loading") {
      // Pick random enemy from 20 players
      const players = Array.from({ length: 19 }, (_, i) => `Player_${String(i + 2).padStart(3, '0')}`);
      setEnemyName(players[Math.floor(Math.random() * players.length)]);
      const t = setTimeout(() => setScreen("versus"), 60000);
      return () => clearTimeout(t);
    }
    if (screen === "versus") {
      const t = setTimeout(() => setScreen("match"), 3000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleRegistration = (name: string) => {
    setPlayerStats({
      name: name,
      level: 1,
      currentXP: 0,
      maxXP: 1000,
      coins: 0,
    });
    setScreen("menu");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      <Background />

      {playerStats && (
        <TopBar
          playerStats={playerStats}
          musicEnabled={musicEnabled}
          onToggleMusic={() => setMusicEnabled(!musicEnabled)}
        />
      )}

      {screen === "register" && <RegisterScreen onRegister={handleRegistration} />}

      {screen === "menu" && playerStats && (
        <MenuScreen
         playerStats={playerStats}
          onStartMatch={() => setScreen("matchmaking")}
       
        onSelectTopic={() => setShowTopicModal(true)}
        selectedTopic={selectedTopic}
        
      />
      )}

      {screen === "matchmaking" && <MatchmakingScreen />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "versus" && playerStats && <VersusScreen playerName={playerStats.name} enemyName={enemyName} />}
      {screen === "match" && playerStats && <MatchScreen playerName={playerStats.name} enemyName={enemyName} topic={selectedTopic??'Math'} />}

  
       {showTopicModal && (
        <TopicModal
          onSelect={(topic) => {
            setSelectedTopic(topic);
            setShowTopicModal(false);
          }}
          onClose={() => setShowTopicModal(false)}
        />
      )}
    </div>
  );
}









