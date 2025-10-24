import { motion } from "framer-motion";
import { useState } from "react";
import { createUser } from "../services/firebase_service";
import type { UserData } from "../services/firebase_service";
import { useUser } from "../context/UserContext";

export default function RegisterScreen({ onRegister }: { onRegister: (name: string) => void }) {
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