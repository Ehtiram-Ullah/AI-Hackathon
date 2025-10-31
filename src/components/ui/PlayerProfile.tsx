import { motion } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
import { Crown } from 'lucide-react';
import char from "../../assets/character/char.png";
// import RealisticCharacter from '../3d/RealisticCharacter';
import type { PlayerStats } from '../../types';
import { itemVariants } from '../../constants/animations';

interface PlayerProfileProps {
  playerStats: PlayerStats;
}

export default function PlayerProfile({ playerStats }: PlayerProfileProps) {
  const xpPercentage = (playerStats.currentXP / playerStats.maxXP) * 100;

  return (
    <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
      {/* 3D Character Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
        className="relative w-64 h-64"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 p-1 shadow-2xl shadow-purple-500/50">
          <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
           <img
      
  src={char}
  alt={playerStats.name}
  className="w-full h-full object-cover rounded-full"
/>

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
  );
}