import { motion } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  musicEnabled: boolean;
  onClose: () => void;
  onToggleMusic: () => void;
}

export default function SettingsModal({ 
  isOpen, 
  musicEnabled, 
  onClose, 
  onToggleMusic 
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gray-900 border-2 border-purple-500/50 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-purple-400 mb-6">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-white">Background Music</span>
            <button
              onClick={onToggleMusic}
              className={`w-12 h-6 rounded-full transition-colors ${
                musicEnabled ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: musicEnabled ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}