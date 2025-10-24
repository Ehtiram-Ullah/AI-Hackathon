import { motion } from "framer-motion";
import char from "../assets/character/char.png";

export default function VersusScreen({ playerName, enemyName }: { playerName: string; enemyName: string }) {
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