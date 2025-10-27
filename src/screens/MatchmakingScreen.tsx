import { motion } from "framer-motion";

export default function MatchmakingScreen() {
  return (
    <motion.div
      key="matchmaking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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
