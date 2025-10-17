import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Swords, 
  Trophy, 
  BookOpen, 
  Settings, 
  Volume2, 
  VolumeX,
  Coins,
  Zap,
  Crown,
  Target
} from 'lucide-react';

interface PlayerStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  coins: number;
}

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

  const xpPercentage = (playerStats.currentXP / playerStats.maxXP) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const menuButtons = [
    { icon: Swords, label: 'Start Battle', primary: true },
    { icon: BookOpen, label: 'Select Topic', primary: false },
    { icon: Trophy, label: 'Leaderboard', primary: false },
    { icon: Settings, label: 'Settings', primary: false }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Top Bar - Coins & XP */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="absolute top-4 left-4 right-4 flex justify-between items-center z-20"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{playerStats.coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-bold">{playerStats.currentXP} XP</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMusicEnabled(!musicEnabled)}
          className="bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-full p-3 hover:bg-purple-900/50 transition-colors"
        >
          {musicEnabled ? (
            <Volume2 className="w-5 h-5 text-purple-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left Side - Player Profile & Character */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
          {/* Character Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 p-1 shadow-2xl shadow-purple-500/50">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <Target className="w-32 h-32 text-purple-400" />
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 border-4 border-gray-900 shadow-lg">
              <Crown className="w-6 h-6 text-gray-900" />
            </div>
          </motion.div>

          {/* Player Info */}
          <div className="text-center space-y-3 w-full max-w-sm">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              {playerStats.name}
            </motion.h2>
            
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-4 py-1 border border-purple-400/30">
                <span className="text-white font-bold">Level {playerStats.level}</span>
              </div>
            </motion.div>

            {/* XP Bar */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{playerStats.currentXP} XP</span>
                <span>{playerStats.maxXP} XP</span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-purple-500/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"
                />
                <motion.div
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '50%' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Game Logo & Menu Buttons */}
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

          {/* Menu Buttons */}
          <div className="w-full max-w-md space-y-4">
            {menuButtons.map((button, index) => (
              <motion.button
                key={button.label}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
                onClick={() => button.label === 'Settings' && setShowSettings(!showSettings)}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  button.primary
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/80 backdrop-blur-md text-purple-300 border-2 border-purple-500/30 hover:bg-gray-700/80'
                }`}
              >
                <button.icon className="w-6 h-6" />
                {button.label}
                {button.primary && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 text-center"
          >
            <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-purple-400">1,247</div>
              <div className="text-xs text-gray-400">Battles Won</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-pink-400">89%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gray-900 border-2 border-purple-500/50 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-6">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <span className="text-white">Background Music</span>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    musicEnabled ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: musicEnabled ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}