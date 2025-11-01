import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, BookOpen, Sparkles, X } from "lucide-react";

// Mock context and services for demo
const useUser = () => ({ userId: "demo-user" });
const findMatchmakingUsers = async (topic: string, userId: string) => {
  console.log("Finding match for:", topic, userId);
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface MenuButtonsProps {
  onMatchFound?: () => void;
  onSelectTopic: () => void;
  selectedTopic?: string | null;
  setSelectedTopic?: (topic: string) => void;
}

export default function MenuButtons({
  onSelectTopic,
  onMatchFound,
  selectedTopic,
}: MenuButtonsProps) {
  const { userId } = useUser();
  const [showPopup, setShowPopup] = useState(false);

  const handleStartBattle = async () => {
    if (!selectedTopic) {
      setShowPopup(true);
      return;
    }

    console.log("Starting battle with topic:", selectedTopic);
    await findMatchmakingUsers(selectedTopic, userId ?? "");
    console.log("Battle started!");
    onMatchFound?.();
  };

  const menuButtons = [
    { icon: Swords, label: "Start Battle", primary: true, onPress: handleStartBattle },
    { icon: BookOpen, label: "Select Topic", primary: false, onPress: () => onSelectTopic() },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-4 relative">
        {menuButtons.map((button) => (
          <motion.button
            key={button.label}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" }}
            whileTap={{ scale: 0.98 }}
            onClick={button.onPress}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
              button.primary
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50"
                : "bg-gray-800/80 backdrop-blur-md text-purple-300 border-2 border-purple-500/30 hover:bg-gray-700/80"
            }`}
          >
            <button.icon className="w-6 h-6" />
            {button.label}
            {button.primary && selectedTopic && (
              <span className="ml-2 text-sm text-green-300">({selectedTopic})</span>
            )}
            {button.primary && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
              />
            )}
          </motion.button>
        ))}

        {/* Beautiful Popup */}
        <AnimatePresence>
          {showPopup && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPopup(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
              >
                <div className="relative bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50 p-8">
                  {/* Animated sparkles */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute -top-4 -right-4 text-yellow-300"
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity, delay: 0.5 }
                    }}
                    className="absolute -bottom-4 -left-4 text-pink-300"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <BookOpen className="w-16 h-16 mx-auto text-yellow-300" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white">
                      Choose Your Topic!
                    </h2>

                    <p className="text-purple-200 text-lg">
                      Please select a battle topic before starting your journey
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowPopup(false);
                        onSelectTopic();
                      }}
                      className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all"
                    >
                      Select Topic Now
                    </motion.button>

                    <button
                      onClick={() => setShowPopup(false)}
                      className="text-purple-300 hover:text-white text-sm transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                    />
                    <motion.div
                      animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}