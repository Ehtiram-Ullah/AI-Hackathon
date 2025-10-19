import { useState } from 'react';
import { motion } from 'framer-motion';
import Background from './components/layout/Background';
import TopBar from './components/ui/TopBar';
import PlayerProfile from './components/ui/PlayerProfile';
import MenuButtons from './components/ui/MenuButtons';
import QuickStats from './components/ui/QuickStats';
import SettingsModal from './components/ui/SettingsModal';
import type { PlayerStats } from './types';
import { containerVariants, itemVariants } from './constants/animations';

export default function App() {
  const [playerStats] = useState<PlayerStats>({
    name: 'Player_001',
    level: 42,
    currentXP: 3450,
    maxXP: 5000,
    coins: 12500
  });

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      <Background />
      
      <TopBar 
        playerStats={playerStats}
        musicEnabled={musicEnabled}
        onToggleMusic={() => setMusicEnabled(!musicEnabled)}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        <PlayerProfile playerStats={playerStats} />

        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-8">
          {/* Game Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
            className="text-center space-y-2"
          >
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              QUIZ CLASH
            </h1>
            <p className="text-purple-300/80 text-lg tracking-widest font-semibold">
              BATTLE ROYALE
            </p>
          </motion.div>

          <MenuButtons onSettingsClick={() => setShowSettings(true)} />
          <QuickStats />
        </motion.div>
      </motion.div>

      <SettingsModal
        isOpen={showSettings}
        musicEnabled={musicEnabled}
        onClose={() => setShowSettings(false)}
        onToggleMusic={() => setMusicEnabled(!musicEnabled)}
      />
    </div>
  );
}