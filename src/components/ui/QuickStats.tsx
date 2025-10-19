import { motion } from 'framer-motion';
import { itemVariants } from '../../constants/animations';

export default function QuickStats() {
  return (
    <motion.div variants={itemVariants} className="flex gap-4 text-center">
      <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
        <div className="text-2xl font-bold text-purple-400">1,247</div>
        <div className="text-xs text-gray-400">Battles Won</div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
        <div className="text-2xl font-bold text-pink-400">89%</div>
        <div className="text-xs text-gray-400">Win Rate</div>
      </div>
    </motion.div>
  );
}