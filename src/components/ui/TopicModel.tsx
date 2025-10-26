import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function TopicModal({ onSelect, onClose }: { onSelect: (t: string) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 p-6 rounded-2xl shadow-xl w-80 border border-purple-500/30 text-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-300">Select Topic</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {["Math", "Science", "AI", "History", "Sports"].map((topic) => (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelect(topic)}
              className="py-2 rounded-lg font-semibold bg-gray-800 text-purple-300 hover:bg-purple-700/50"
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
