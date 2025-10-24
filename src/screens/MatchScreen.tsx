import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { generateMCQ } from "../lib/ai";
import char from "../assets/character/char.png";
import PlayerCard from "../components/PlayerCard";


export default function MatchScreen({ playerName, enemyName }: { playerName: string; enemyName: string }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const topic = "General Knowledge";

  // Helper: normalize different possible shapes from generateMCQ
  function normalizeQuestion(raw: any) {
    if (!raw) return null;

    // question text
    const qText = raw.question || raw.q || raw.prompt || "Untitled question";

    // options array detection (prefer explicit array)
    let options: string[] = Array.isArray(raw.options)
      ? raw.options
      : raw.A // fallback to lettered properties
      ? [raw.A, raw.B, raw.C, raw.D].filter(Boolean)
      : [];

    // determine the correct option *text*
    let correctText: string | undefined;

    const candidate = raw.correct ?? raw.answer ?? raw.answerKey ?? raw.answer_letter ?? raw.correctOption;
    if (candidate !== undefined) {
      if (typeof candidate === "string" && /^[A-D]$/i.test(candidate) && options.length) {
        // if answer is a letter like "A", translate to option text
        correctText = options[candidate.toUpperCase().charCodeAt(0) - 65];
      } else if (typeof candidate === "number" && options.length) {
        correctText = options[candidate];
      } else if (options.includes(candidate)) {
        // if candidate already is the option text
        correctText = candidate;
      } else if (typeof candidate === "string") {
        // maybe the API returned something like "Paris" or "A. Paris"
        // try to strip leading letter + dot
        const stripped = candidate.replace(/^[A-D]\.?\s*/i, "");
        if (options.includes(stripped)) correctText = stripped;
      }
    }

    // Last-resort fallback: if no correct found but options exist, pick first (so UI still works)
    if (!correctText && options.length) correctText = options[0];

    return {
      question: qText,
      options,
      correct: correctText
    };
  }

  // Generate question on mount and when moving to next question
  useEffect(() => {
    async function loadQuestion() {
      setLoading(true);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(30);

      try {
        const result = await generateMCQ(topic);

        // result might already be normalized, or might be lettered (A/B/C/D) — normalize either way
        if (result && (Array.isArray(result.options) || result.A || result.B)) {
          const normalized = normalizeQuestion(result);
          setQuestion(normalized);
        } else if (result && result.error) {
          console.error("MCQ generation error:", result.error);
          // fallback
          setQuestion(normalizeQuestion({
            question: "What is the capital of France?",
            A: "Paris",
            B: "Berlin",
            C: "London",
            D: "Rome",
            answer: "A"
          }));
        } else {
          // if result shape is unknown, try to normalize anyway
          const normalized = normalizeQuestion(result);
          if (normalized) setQuestion(normalized);
          else {
            // final fallback
            setQuestion(normalizeQuestion({
              question: "What is the capital of France?",
              A: "Paris",
              B: "Berlin",
              C: "London",
              D: "Rome",
              answer: "A"
            }));
          }
        }
      } catch (error) {
        console.error("Error generating question:", error);
        setQuestion(normalizeQuestion({
          question: "What is the capital of France?",
          A: "Paris",
          B: "Berlin",
          C: "London",
          D: "Rome",
          answer: "A"
        }));
      }
      setLoading(false);
    }

    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  // Timer countdown
  useEffect(() => {
    if (loading || answered) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, answered]);

  const handleTimeUp = () => {
    if (answered) return;
    setAnswered(true);
    // Enemy scores when player doesn't answer in time
    setEnemyScore(prev => prev + 100);
    setTimeout(nextQuestion, 2000);
  };

  // NOTE: optionKey is option *text* (e.g. "Paris"). We compare by text to question.correct
  const handleAnswerSelect = (optionKey: string) => {
    if (answered || !question) return;

    setSelectedAnswer(optionKey);
    setAnswered(true);

    const isCorrect = optionKey === question.correct;
    if (isCorrect) {
      const points = Math.max(50, timeLeft * 10);
      setPlayerScore(prev => prev + points);
    } else {
      // Enemy gets points when player is wrong
      setEnemyScore(prev => prev + 100);
    }

    // Simulate enemy answering (50% chance to be correct)
    if (Math.random() > 0.5 && !isCorrect) {
      setTimeout(() => {
        setEnemyScore(prev => prev + Math.floor(Math.random() * 150 + 50));
      }, 500);
    }

    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion >= 10) {
      // End game
      alert(`Game Over!\nYour Score: ${playerScore}\nEnemy Score: ${enemyScore}`);
      return;
    }
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <motion.div
      key="match"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-20 flex flex-col items-center justify-center space-y-6 w-full max-w-4xl px-4"
    >
      {/* Top Section: Player Cards & Timer */}
      <div className="flex justify-between w-full items-center mb-6">
        <PlayerCard name={playerName} sprite={char} isPlayer />
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
        <PlayerCard name={enemyName} sprite={char} isPlayer={false} />
      </div>

      {/* Question Card */}
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
            <div className="text-purple-400 text-sm font-semibold mb-2">QUESTION {currentQuestion} / 10</div>
            <h3 className="text-2xl font-bold text-white mb-4">{question?.question || "Loading..."}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(question?.options || []).map((opt: string, i: number) => {
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
                  <span className="mr-2 text-purple-300">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="flex gap-4 w-full justify-center">
        <div className="bg-purple-900/50 px-6 py-3 rounded-lg border border-purple-500/50">
          <span className="text-purple-300 font-semibold">Your Score: </span>
          <span className="text-white font-bold text-xl">{playerScore}</span>
        </div>
        <div className="bg-red-900/50 px-6 py-3 rounded-lg border border-red-500/50">
          <span className="text-red-300 font-semibold">Enemy Score: </span>
          <span className="text-white font-bold text-xl">{enemyScore}</span>
        </div>
      </div>
    </motion.div>
  );
}
