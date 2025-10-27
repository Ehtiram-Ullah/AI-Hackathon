import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  

  const [timeLeft, setTimeLeft] = useState(10);

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
          transition={{ duration: 10, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
}