import { motion } from "framer-motion";
import PlayerProfile from "../components/ui/PlayerProfile";
import MenuButtons from "../components/ui/MenuButtons";
import QuickStats from "../components/ui/QuickStats";
import type { PlayerStats } from "../types";
import { containerVariants, itemVariants } from "../constants/animations";

export default function MenuScreen({ playerStats, onStartMatch, onSettings }: { playerStats: PlayerStats; onStartMatch: () => void; onSettings: () => void }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
    >
      <PlayerProfile playerStats={playerStats} />

      <motion.div variants={itemVariants as any} className="flex flex-col items-center space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            QUIZ CLASH
          </h1>
          <p className="text-purple-300/80 text-lg tracking-widest font-semibold">
            BATTLE ROYALE
          </p>
        </motion.div>

        <MenuButtons onSettingsClick={onSettings} onMatchFound={onStartMatch} />
        <QuickStats />
      </motion.div>
    </motion.div>
  );
}
