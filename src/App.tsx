import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createUser } from "./services/firebase_service";
import type {UserData} from "./services/firebase_service";
import char from "./assets/character/char.png";
import Background from "./components/layout/Background";
import TopBar from "./components/ui/TopBar";
import PlayerProfile from "./components/ui/PlayerProfile";
import MenuButtons from "./components/ui/MenuButtons";
import QuickStats from "./components/ui/QuickStats";
import SettingsModal from "./components/ui/SettingsModal";
import type { PlayerStats } from "./types";
import { containerVariants, itemVariants } from "./constants/animations";
import { useUser } from "./context/UserContext";


export default function App() {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [screen, setScreen] = useState<"register" | "menu" | "matchmaking" | "loading" | "versus" | "match">("register");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [enemyName, setEnemyName] = useState("");

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
          onSettings={() => setShowSettings(true)}
        />
      )}

      {screen === "matchmaking" && <MatchmakingScreen />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "versus" && playerStats && <VersusScreen playerName={playerStats.name} enemyName={enemyName} />}
      {screen === "match" && playerStats && <MatchScreen playerName={playerStats.name} enemyName={enemyName} />}

      <SettingsModal
        isOpen={showSettings}
        musicEnabled={musicEnabled}
        onClose={() => setShowSettings(false)}
        onToggleMusic={() => setMusicEnabled(!musicEnabled)}
      />
    </div>
  );
}

function RegisterScreen({ onRegister }: { onRegister: (name: string) => void }) {
  const [isLoading, setLoadingState] = useState(false);
  const [userName, setUserName] = useState("");
  const {setUserId } = useUser();

  const handleRegister = async () => {
    if (userName.trim().length < 3) {
      alert("Name must be at least 3 characters!");
      return;
    }
    
    setLoadingState(true);
    try {
      const user: UserData = {
        name: userName,
         createdAt: new Date().toISOString()
      };
     const id = await createUser(user);
     setUserId(id);
     setLoadingState(false);
     onRegister(userName);
    
    } catch (error) {
      console.error("Registration error:", error);
      setLoadingState(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col items-center justify-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
        <p className="text-purple-300 text-xl font-semibold">Creating your profile...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-md w-full"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          QUIZ CLASH
        </h1>
        <p className="text-purple-300/80 text-lg tracking-widest font-semibold">
          BATTLE ROYALE
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-8 w-full shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome, Player!</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2">
              Choose your username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleRegister()}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all"
              maxLength={20}
            />
            <p className="text-gray-400 text-xs mt-2">Minimum 3 characters</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRegister}
            disabled={userName.trim().length < 3}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              userName.trim().length >= 3
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            🎮 Start Playing
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-purple-300/60 text-sm"
      >
        <p>Join thousands of players in epic quiz battles!</p>
      </motion.div>
    </motion.div>
  );
}

function MenuScreen({ playerStats, onStartMatch, onSettings }: { playerStats: PlayerStats; onStartMatch: () => void; onSettings: () => void }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
    >
      <PlayerProfile playerStats={playerStats} />

      <motion.div variants={itemVariants as any} className="flex flex-col items-center space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            QUIZ CLASH
          </h1>
          <p className="text-purple-300/80 text-lg tracking-widest font-semibold">
            BATTLE ROYALE
          </p>
        </motion.div>

        <MenuButtons onSettingsClick={onSettings} onMatchFound={onStartMatch} />
        <QuickStats />
      </motion.div>
    </motion.div>
  );
}

function MatchmakingScreen() {
  return (
    <motion.div
      key="matchmaking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center justify-center w-full h-[70vh] max-w-3xl space-y-8"
    >
      <div className="text-3xl font-bold text-purple-400">🔍 Matching Players...</div>
      <motion.div
        className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden border border-purple-500/40"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
      />
      <p className="text-purple-300 animate-pulse">Finding Opponent...</p>
    </motion.div>
  );
}

function LoadingScreen() {
  

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center justify-center w-full h-[70vh] space-y-6"
    >
      <div className="text-3xl text-purple-300 font-bold mb-2">⚔️ Battle Royale Lobby</div>
      <div className="text-6xl font-black text-purple-400">{timeLeft}s</div>
      <p className="text-purple-300 text-lg">20 Players • Waiting for match to start...</p>
      <motion.div
        className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-purple-500/40"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 60, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
}

function VersusScreen({ playerName, enemyName }: { playerName: string; enemyName: string }) {
  return (
    <motion.div
      key="versus"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 flex flex-col items-center justify-center w-full h-[70vh]"
    >
      <div className="flex items-center justify-center gap-12 mb-8">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 border-4 border-purple-400 shadow-2xl">
            <img src={char} alt="You" className="w-24 h-24 pixelated" />
          </div>
          <p className="text-2xl font-bold text-purple-300">{playerName}</p>
          <p className="text-purple-400 text-sm">YOU</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-7xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
        >
          VS
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mb-4 border-4 border-red-400 shadow-2xl">
            <img src={char} alt="Enemy" className="w-24 h-24 pixelated flipped" />
          </div>
          <p className="text-2xl font-bold text-red-300">{enemyName}</p>
          <p className="text-red-400 text-sm">OPPONENT</p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-3xl font-bold text-white animate-pulse"
      >
        ⚡ PREPARE FOR BATTLE! ⚡
      </motion.p>
    </motion.div>
  );
}

function MatchScreen({ playerName, enemyName }: { playerName: string; enemyName: string }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="match"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-20 flex flex-col items-center justify-center space-y-6 w-full max-w-4xl px-4"
    >
      <div className="flex justify-between w-full items-center mb-6">
        <PlayerCard name={playerName} sprite={char} isPlayer />
        <div className="flex flex-col items-center">
          <div className="text-5xl font-black text-pink-400 mb-2">{timeLeft}s</div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 30, ease: "linear" }}
            />
          </div>
        </div>
        <PlayerCard name={enemyName} sprite={char} isPlayer={false} />
      </div>

      <div className="bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-8 w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-purple-400 text-sm font-semibold mb-2">QUESTION 1 / 10</div>
          <h3 className="text-2xl font-bold text-white mb-4">What is the capital of France?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Paris", "Berlin", "London", "Rome"].map((opt, i) => (
            <motion.button
              key={opt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAnswer(opt)}
              className={`px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                selectedAnswer === opt
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-300"
                  : "bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-purple-500"
              }`}
            >
              <span className="mr-2 text-purple-300">{String.fromCharCode(65 + i)}.</span> {opt}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <div className="bg-purple-900/50 px-6 py-3 rounded-lg border border-purple-500/50">
          <span className="text-purple-300 font-semibold">Your Score: </span>
          <span className="text-white font-bold text-xl">0</span>
        </div>
        <div className="bg-red-900/50 px-6 py-3 rounded-lg border border-red-500/50">
          <span className="text-red-300 font-semibold">Enemy Score: </span>
          <span className="text-white font-bold text-xl">0</span>
        </div>
      </div>
    </motion.div>
  );
}

function PlayerCard({ name, sprite, isPlayer }: { name: string; sprite: string; isPlayer: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 border-2 ${
        isPlayer ? "bg-purple-900/50 border-purple-400" : "bg-red-900/50 border-red-400"
      }`}>
        <img
          src={sprite}
          alt={name}
          className={`w-16 h-16 pixelated ${!isPlayer ? "flipped" : ""}`}
        />
      </div>
      <p className={`text-sm font-bold ${isPlayer ? "text-purple-300" : "text-red-300"}`}>{name}</p>
      <div className="w-24 h-2 bg-gray-700 rounded-full mt-2">
        <div className={`h-full rounded-full ${isPlayer ? "bg-purple-500" : "bg-red-500"}`} style={{ width: "100%" }} />
      </div>
    </div>
  );
}