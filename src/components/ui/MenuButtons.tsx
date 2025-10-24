
import { motion } from 'framer-motion';
import { Swords, Trophy, BookOpen, Settings } from 'lucide-react';
import { itemVariants } from '../../constants/animations';
import { findMatchmakingUsers } from '../../services/firebase_service';
import { useUser } from "../../context/UserContext";
interface MenuButtonsProps {
  onSettingsClick: () => void;
  onMatchFound?: () => void; // optional callback for when matching completes
}

export default function MenuButtons({ onSettingsClick, onMatchFound }: MenuButtonsProps) {
const { userId } = useUser(); // ✅ Get userId from context
  const handleStartBattle = async () => {
    console.log("starthere")
    //TODO: I am here
    await findMatchmakingUsers('ehti', userId??'');
  console.log("Battle started!");
  onMatchFound?.(); // Tell App to show loader
};


  // 🕹️ Main Menu
  const menuButtons = [
    { icon: Swords, label: 'Start Battle', primary: true, onPress: handleStartBattle },
    { icon: BookOpen, label: 'Select Topic', primary: false, onPress: () => {} },
    { icon: Trophy, label: 'Leaderboard', primary: false, onPress: () => {} },
    { icon: Settings, label: 'Settings', primary: false, onPress: () => onSettingsClick() },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      {menuButtons.map((button) => (
        
        <motion.button
          key={button.label}
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
          whileTap={{ scale: 0.98 }}
          onClick={button.onPress}
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
  );
}
