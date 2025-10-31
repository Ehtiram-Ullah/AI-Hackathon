import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { generateMCQ } from "../lib/ai";
import char from "../assets/character/char.png";
import PlayerCard from "../components/PlayerCard";

interface MatchScreenProps {
  playerName: string;
  enemyName: string;
  topic: string;
  onBackToMenu: () => void;
}

interface NormalizedQuestion {
  question: string;
  options: string[];
  correct: string;
}

export default function MatchScreen({ 
  playerName, 
  enemyName, 
  topic, 
  onBackToMenu 
}: MatchScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<NormalizedQuestion | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // 🧠 NEW: AI control refs
  const aiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aiHasAnsweredRef = useRef(false);

  // 🧠 For async safety
  const fetchIdRef = useRef(0);

  function normalizeQuestion(raw: any): NormalizedQuestion | null {
    if (!raw) return null;
    const qText = raw.question || raw.q || raw.prompt || "Untitled question";
    let options: string[] = Array.isArray(raw.options)
      ? raw.options
      : raw.A
      ? [raw.A, raw.B, raw.C, raw.D].filter(Boolean)
      : [];
    let correctText: string | undefined;
    const candidate = raw.correct ?? raw.answer ?? raw.answerKey ?? raw.answer_letter ?? raw.correctOption;
    if (candidate !== undefined) {
      if (typeof candidate === "string" && /^[A-D]$/i.test(candidate) && options.length) {
        correctText = options[candidate.toUpperCase().charCodeAt(0) - 65];
      } else if (typeof candidate === "number" && options.length) {
        correctText = options[candidate];
      } else if (options.includes(candidate)) {
        correctText = candidate;
      } else if (typeof candidate === "string") {
        const stripped = candidate.replace(/^[A-D]\.?\s*/i, "");
        if (options.includes(stripped)) correctText = stripped;
      }
    }
    if (!correctText && options.length) correctText = options[0];
    return {
      question: qText,
      options,
      correct: correctText || ""
    };
  }

  // 🧠 Load new question
  useEffect(() => {
    if (gameOver) return;

    let cancelled = false;
    const thisFetchId = ++fetchIdRef.current;

    async function loadQuestion() {
      setLoading(true);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(30);

      // reset AI state
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
      aiHasAnsweredRef.current = false;

      try {
        const result = await generateMCQ(topic);
        if (cancelled || thisFetchId !== fetchIdRef.current) return;

        const normalized = normalizeQuestion(result) || normalizeQuestion({
          question: "What is the capital of Pakistan?",
          A: "Islamabad",
          B: "Karachi",
          C: "Peshawar",
          D: "Lahore",
          answer: "A"
        });
        setQuestion(normalized);
      } catch {
        if (cancelled || thisFetchId !== fetchIdRef.current) return;
        setQuestion(normalizeQuestion({
          question: "What is the capital of Pakistan?",
          A: "Islamabad",
          B: "Karachi",
          C: "Peshawar",
          D: "Lahore",
          answer: "A"
        }));
      } finally {
        if (cancelled || thisFetchId !== fetchIdRef.current) return;
        setLoading(false);
      }
    }

    loadQuestion();

    return () => {
      cancelled = true;
      fetchIdRef.current++;
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    };
  }, [currentQuestion, topic, gameOver]);

  // 🧠 Game over logic
  useEffect(() => {
    if (playerHealth <= 0 && enemyHealth <= 0) {
      setGameOver(true);
      setWinner("Draw");
    } else if (playerHealth <= 0) {
      setGameOver(true);
      setWinner(enemyName);
    } else if (enemyHealth <= 0) {
      setGameOver(true);
      setWinner(playerName);
    }
  }, [playerHealth, enemyHealth, playerName, enemyName]);

  // 🧠 Timer countdown
  useEffect(() => {
    if (loading || answered || gameOver) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, answered, gameOver]);

  // 🧠 Simulate AI thinking process
  useEffect(() => {
    if (loading || answered || gameOver || !question) return;

    const aiThinkingTime = Math.floor(Math.random() * 30) + 1; // 1–30 seconds

    aiTimeoutRef.current = setTimeout(() => {
      if (aiHasAnsweredRef.current) return; // already answered (cancelled by player)

      aiHasAnsweredRef.current = true;
      const aiCorrect = Math.random() > 0.4; // 60% chance correct

      if (aiCorrect) {
        // AI shoots first → player loses HP, skip waiting
        setPlayerHealth(prev => Math.max(0, prev - 20));
        setAnswered(true);
        setTimeout(nextQuestion, 1500);
      } 
      // If incorrect → do nothing and wait for player
    }, aiThinkingTime * 1000);

    return () => {
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    };
  }, [loading, question, gameOver]);

  // 🧠 When time runs out
  const handleTimeUp = () => {
    if (answered || !question) return;

    setAnswered(true);
    // both punished slightly if time runs out
    setPlayerHealth(prev => Math.max(0, prev - 10));
    setEnemyHealth(prev => Math.max(0, prev - 10));
    setTimeout(nextQuestion, 1500);
  };

  // 🧠 When player selects an answer
  const handleAnswerSelect = (optionKey: string) => {
    if (answered || !question || gameOver) return;

    setSelectedAnswer(optionKey);
    setAnswered(true);

    const isPlayerCorrect = optionKey === question.correct;

    // cancel AI if it hasn’t answered yet
    if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    aiHasAnsweredRef.current = true;

    if (isPlayerCorrect) {
      // player correct first → AI loses HP
      if (timeLeft >= 25) setEnemyHealth(prev => Math.max(0, prev - 30));
      else if (timeLeft >= 15) setEnemyHealth(prev => Math.max(0, prev - 20));
      else setEnemyHealth(prev => Math.max(0, prev - 10));
    } else {
      // player wrong → AI may answer later (but we cancelled its timer, so just apply small damage)
      setPlayerHealth(prev => Math.max(0, prev - 10));
      setEnemyHealth(prev => Math.max(0, prev - 10));
    }

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    if (playerHealth <= 0 || enemyHealth <= 0) return;
    setCurrentQuestion(prev => prev + 1);
  };

  // 🧠 UI unchanged except AI indicator removed (hidden behavior)
  return (
    <motion.div
      key="match"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-20 flex flex-col items-center justify-center space-y-6 w-full max-w-4xl px-4"
    >
      {/* Winner Screen Overlay */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 border-4 border-yellow-400 rounded-3xl p-12 max-w-2xl w-full mx-4 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-center mb-6"
            >
              <div className="text-8xl mb-4">
                {winner === "Draw" ? "🤝" : winner === playerName ? "👑" : "💀"}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl font-black text-center mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
            >
              GAME OVER
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-8"
            >
              {winner === "Draw" ? (
                <>
                  <p className="text-2xl text-purple-300 mb-2">⚔️ DRAW! ⚔️</p>
                  <p className="text-3xl font-bold text-white">
                    Both warriors <span className="text-yellow-400">fell!</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl text-purple-300 mb-2">
                    {winner === playerName ? "🎉 VICTORY! 🎉" : "💔 DEFEAT 💔"}
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {winner} <span className="text-yellow-400">WINS!</span>
                  </p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-around mb-8 bg-black/30 rounded-xl p-6"
            >
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-1 font-semibold">
                  {playerName.toUpperCase()}
                </p>
                <p className={`text-3xl font-bold ${playerHealth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {playerHealth}%
                </p>
              </div>
              <div className="text-4xl text-purple-500 self-center">VS</div>
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-1 font-semibold">
                  {enemyName.toUpperCase()}
                </p>
                <p className={`text-3xl font-bold ${enemyHealth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {enemyHealth}%
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackToMenu}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
            >
              ← BACK TO MENU
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Player cards & timer */}
      <div className="flex justify-between w-full items-center mb-6">
        <PlayerCard name={playerName} sprite={char} isPlayer playerHealth={playerHealth}/>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-black text-pink-400 mb-2">{timeLeft}s</div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <PlayerCard name={enemyName} sprite={char} isPlayer={false} playerHealth={enemyHealth}/>
      </div>

      {/* Question card (unchanged) */}
      {loading ? (
        <div className="bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-8 w-full shadow-2xl flex items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
            />
            <p className="text-purple-300 text-lg">Loading question...</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-8 w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-purple-400 text-sm font-semibold mb-2">
              QUESTION {currentQuestion}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {question?.question || "Loading..."}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(question?.options || []).map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = answered && opt === question?.correct;
              const isWrong = answered && isSelected && opt !== question?.correct;

              return (
                <motion.button
                  key={opt + i}
                  whileHover={!answered ? { scale: 1.05 } : {}}
                  whileTap={!answered ? { scale: 0.95 } : {}}
                  onClick={() => handleAnswerSelect(opt)}
                  disabled={answered}
                  className={`px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isCorrect
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-300"
                      : isWrong
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-300"
                      : isSelected
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-300"
                      : "bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-purple-500"
                  } ${answered ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <span className="mr-2 text-purple-300">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
