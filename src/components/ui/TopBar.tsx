import { motion } from 'framer-motion';
import { Volume2, VolumeX, Coins, Zap } from 'lucide-react';
import type { PlayerStats } from '../../types';

interface TopBarProps {
  playerStats: PlayerStats;
  musicEnabled: boolean;
  onToggleMusic: () => void;
}

export default function TopBar({ playerStats, musicEnabled, onToggleMusic }: TopBarProps) {
  return (
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
        onClick={onToggleMusic}
        className="bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-full p-3 hover:bg-purple-900/50 transition-colors"
      >
        {musicEnabled ? (
          <Volume2 className="w-5 h-5 text-purple-400" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </motion.button>
    </motion.div>
  );
}