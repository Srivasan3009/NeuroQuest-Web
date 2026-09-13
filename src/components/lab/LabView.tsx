import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Circle,
  Users,
  Search,
  ArrowRight,
  Shield,
  HelpCircle,
  RotateCcw,
  Sliders,
  ChevronRight,
  Award,
  Play,
  Flame
} from "lucide-react";
import { UserProfile, Stage, Quest, AppTheme } from "../../types";
import { soundFx } from "../../utils/sound";

interface LabViewProps {
  user: UserProfile;
  stages: Stage[];
  onStartLesson: (quest: Quest, stage: Stage) => void;
  onAddSparks: (amount: number) => void;
  theme?: AppTheme;
}

export const LabView: React.FC<LabViewProps> = ({
  user,
  stages,
  onStartLesson,
  onAddSparks,
  theme = "neumorphic"
}) => {
  const isNeumorphic = theme === "neumorphic";
  const isRiso = theme === "riso-pop" || theme === "warm-editorial";

  // Daily plan checklist state
  const [tasksCompleted, setTasksCompleted] = useState<Record<string, boolean>>({
    learn: (user.completedQuestIds || []).length > 0,
    fix: false,
    play: false
  });

  // Friend challenge state
  const [friendHandle, setFriendHandle] = useState("");
  const [activeDuel, setActiveDuel] = useState<boolean>(false);
  const [duelQuestionIdx, setDuelQuestionIdx] = useState(0);
  const [duelScore, setDuelScore] = useState({ user: 0, bot: 0 });
  const [duelDone, setDuelDone] = useState(false);

  // Active Mini-Game state ("detective", "true-false", "boundary", "none")
  const [activeGame, setActiveGame] = useState<"detective" | "true-false" | "boundary" | "none">("none");
  const [detectiveIdx, setDetectiveIdx] = useState(0);
  const [detectiveScore, setDetectiveScore] = useState(0);

  // Detective Cards
  const detectiveCards = [
    {
      prompt: "Can a neural network memorize training data without generalizing?",
      isTrue: true,
      explanation: "Yes! With high capacity and no regularization, overparameterized models can simply overfit and memorize tokens."
    },
    {
      prompt: "Increasing LLM temperature always makes the factual output more accurate.",
      isTrue: false,
      explanation: "False! Higher temperature flattens softmax probabilities, increasing entropy and hallucination risk."
    },
    {
      prompt: "Transformers process words sequentially one-by-one just like RNNs.",
      isTrue: false,
      explanation: "False! Multi-head self-attention enables parallel processing of all tokens in a context window simultaneously."
    },
    {
      prompt: "Vector embeddings place semantically related words closer together in high-dimensional space.",
      isTrue: true,
      explanation: "Correct! Cosine similarity quantifies semantic proximity between learned vector projections."
    }
  ];

  const handleToggleTask = (taskKey: string) => {
    soundFx.playTap();
    setTasksCompleted((prev) => {
      const nextVal = !prev[taskKey];
      if (nextVal) {
        soundFx.playSpark();
        onAddSparks(5);
      }
      return { ...prev, [taskKey]: nextVal };
    });
  };

  const handleStartDuel = () => {
    if (!friendHandle.trim()) {
      setFriendHandle("AlexAI");
    }
    soundFx.playTap();
    setActiveDuel(true);
    setDuelQuestionIdx(0);
    setDuelScore({ user: 0, bot: 0 });
    setDuelDone(false);
  };

  const duelQuestions = [
    {
      q: "What component is responsible for attention in modern LLMs?",
      options: ["Multi-Head Self-Attention", "Recurrent Hidden State", "K-Means Clustering"],
      correct: 0
    },
    {
      q: "Which metric measures prediction discrepancy in classification?",
      options: ["Cross-Entropy Loss", "Euclidean Distance", "Cosine Similarity"],
      correct: 0
    },
    {
      q: "What does the ReAct loop alternate between?",
      options: ["Reasoning & Action", "Render & Activate", "Recurrent & Attention"],
      correct: 0
    }
  ];

  const handleAnswerDuel = (optionIdx: number) => {
    const isCorrect = optionIdx === duelQuestions[duelQuestionIdx].correct;
    const botCorrect = Math.random() > 0.35;

    soundFx.playTap();
    if (isCorrect) soundFx.playCorrect();

    const nextUser = isCorrect ? duelScore.user + 1 : duelScore.user;
    const nextBot = botCorrect ? duelScore.bot + 1 : duelScore.bot;
    setDuelScore({ user: nextUser, bot: nextBot });

    if (duelQuestionIdx + 1 < duelQuestions.length) {
      setDuelQuestionIdx(duelQuestionIdx + 1);
    } else {
      setDuelDone(true);
      if (nextUser >= nextBot) {
        soundFx.playSpark();
        onAddSparks(10);
      }
    }
  };

  const currentLesson = stages[0]?.quests[0];
  const completedTodayCount = Object.values(tasksCompleted).filter(Boolean).length;

  return (
    <div id="lab-view" className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-32 space-y-6">
      {/* 1. Header with Sparks pill */}
      <div className="flex items-center justify-between pb-1">
        <h1 className={`text-2xl font-black tracking-tight uppercase ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>LAB</h1>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold ${
            isNeumorphic
              ? "neu-pill-accent text-amber-600"
              : isRiso
              ? "bg-[#FEF08A] border-2 border-[#1E1B18] text-[#1E1B18]"
              : "bg-amber-950/40 border border-amber-500/40 text-amber-400"
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>SPARKS {user.sparks ?? 45}</span>
        </div>
      </div>

      {/* Main Grid: Responsive 2-column layout on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Chest Progress & Daily Plan */}
        <div className="space-y-6">
          {/* 2. League Chest Progress Card matching video */}
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all ${
              isNeumorphic
                ? "neu-raised text-slate-800"
                : isRiso
                ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                : "bg-gradient-to-r from-slate-900 to-amber-950/30 border border-amber-500/30 shadow-lg"
            }`}
          >
        <div className="flex items-center gap-3.5">
          {/* League Chest Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            isNeumorphic
              ? "neu-inset text-amber-500"
              : "bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          }`}>
            <Award className="w-7 h-7" />
          </div>

          <div>
            <div className={`text-[10px] font-mono uppercase tracking-wider ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
              LEAGUE • CHEST LV.1
            </div>
            <div className="text-base font-black text-amber-500 uppercase tracking-wide">
              BRONZE
            </div>
            <div className={`text-xs font-mono ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
              {(user.completedQuestIds || []).length || 1}/20 to next chest
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xs font-medium block max-w-[110px] leading-tight ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
            Finish a lesson today • start a streak
          </span>
        </div>
      </div>

      {/* 3. Lab Plan: Today + Journey matching video */}
      <div
        className={`p-4 rounded-2xl space-y-4 transition-all ${
          isNeumorphic
            ? "neu-raised text-slate-800"
            : isRiso
            ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            : "bg-slate-900/90 border border-slate-800 shadow-md"
        }`}
      >
        <div className={`flex items-center justify-between pb-3 ${isNeumorphic ? "border-b border-slate-300" : "border-b border-slate-800"}`}>
          <div>
            <span className={`text-[10px] font-mono uppercase font-bold block ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
              LAB PLAN
            </span>
            <h2 className={`text-base font-black ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>TODAY + JOURNEY</h2>
          </div>
          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
              isNeumorphic
                ? "neu-inset text-[#4F46E5]"
                : isRiso ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-cyan-950 text-cyan-400 border border-cyan-500/30"
            }`}
          >
            {completedTodayCount}/3 today
          </span>
        </div>

        {/* Daily Tasks */}
        <div className="space-y-3">
          {/* Task 1: Learn */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className={`text-xs font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-200"}`}>
                Learn — finish 1 lesson
              </div>
              <div className={`text-xs mt-0.5 ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
                Next: {currentLesson?.title || "AI Basics Made Simple"}
              </div>
            </div>
            <button
              onClick={() => handleToggleTask("learn")}
              className={`p-1.5 rounded-xl transition-all ${
                tasksCompleted.learn
                  ? isNeumorphic ? "neu-flat text-emerald-600" : "text-emerald-400 bg-emerald-950/40"
                  : isNeumorphic ? "neu-inset text-slate-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tasksCompleted.learn ? (
                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Task 2: Fix */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className={`text-xs font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-200"}`}>
                Fix — replay weak concept
              </div>
              <div className={`text-xs mt-0.5 ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
                Review Decision Boundary intuition
              </div>
            </div>
            <button
              onClick={() => handleToggleTask("fix")}
              className={`p-1.5 rounded-xl transition-all ${
                tasksCompleted.fix
                  ? isNeumorphic ? "neu-flat text-emerald-600" : "text-emerald-400 bg-emerald-950/40"
                  : isNeumorphic ? "neu-inset text-slate-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tasksCompleted.fix ? (
                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Task 3: Play */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className={`text-xs font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-200"}`}>
                Play — one Lab game
              </div>
              <div className={`text-xs mt-0.5 ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
                Truth Detector or Decision Classifier
              </div>
            </div>
            <button
              onClick={() => handleToggleTask("play")}
              className={`p-1.5 rounded-xl transition-all ${
                tasksCompleted.play
                  ? isNeumorphic ? "neu-flat text-emerald-600" : "text-emerald-400 bg-emerald-950/40"
                  : isNeumorphic ? "neu-inset text-slate-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tasksCompleted.play ? (
                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Milestone Rewards Track */}
        <div className={`pt-3 border-t space-y-2 ${isNeumorphic ? "border-slate-300" : "border-slate-800"}`}>
          <div className={`text-[10px] font-mono uppercase font-bold ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
            JOURNEY • BRONZE MILESTONES
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className={`p-2 rounded-xl ${isNeumorphic ? "neu-inset text-slate-800" : "bg-slate-950/60 border border-slate-800"}`}>
              <div className={`font-bold ${isNeumorphic ? "text-slate-700" : "text-slate-300"}`}>Lesson 1</div>
              <div className="text-amber-500 font-bold mt-0.5">+15 Sparks</div>
            </div>
            <div className={`p-2 rounded-xl ${isNeumorphic ? "neu-inset text-slate-800" : "bg-slate-950/60 border border-slate-800"}`}>
              <div className={`font-bold ${isNeumorphic ? "text-slate-700" : "text-slate-300"}`}>3 Lessons</div>
              <div className="text-amber-500 font-bold mt-0.5">+35 Sparks</div>
            </div>
            <div className={`p-2 rounded-xl ${isNeumorphic ? "neu-inset text-slate-800" : "bg-slate-950/60 border border-slate-800"}`}>
              <div className={`font-bold ${isNeumorphic ? "text-slate-700" : "text-slate-300"}`}>5 Lessons</div>
              <div className="text-amber-500 font-bold mt-0.5">+50 Sparks</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Play With Friend & Interactive Games Carousel */}
    <div className="space-y-6">
      {/* 4. Play with Friend Card matching video */}
      <div
        className={`p-4 rounded-2xl space-y-3 transition-all ${
          isNeumorphic
            ? "neu-raised text-slate-800"
            : isRiso
            ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            : "bg-slate-900/90 border border-slate-800 shadow-md"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-base font-black uppercase tracking-tight ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>
            PLAY WITH FRIEND
          </h3>
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
            isNeumorphic ? "neu-pill-accent text-indigo-600" : "text-violet-400 bg-violet-950/60 border border-violet-500/30"
          }`}>
            +5 XP WIN
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs ${isNeumorphic ? "text-slate-400" : "text-slate-500"}`}>
              @
            </span>
            <input
              type="text"
              placeholder="username or bot"
              value={friendHandle}
              onChange={(e) => setFriendHandle(e.target.value)}
              className={`w-full rounded-xl pl-7 pr-3 py-2 text-xs font-mono focus:outline-hidden ${
                isNeumorphic
                  ? "neu-inset text-slate-800 placeholder-slate-400"
                  : "bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-400"
              }`}
            />
          </div>

          <button
            id="btn-start-friend-quiz"
            onClick={handleStartDuel}
            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 ${
              isNeumorphic
                ? "neu-btn-primary"
                : isRiso
                ? "bg-[#4F46E5] text-white border-2 border-[#1E1B18]"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:brightness-110 shadow-sm"
            }`}
          >
            <span>QUIZ</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* 5. Games Carousel matching video */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-xs font-mono uppercase tracking-widest font-bold ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
            INTERACTIVE GAMES
          </h3>
          <span className={`text-[10px] font-mono ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>Bite-sized practice</span>
        </div>

        <div className="space-y-3">
          {/* Game 1: AI Detective */}
          <div
            onClick={() => {
              soundFx.playTap();
              setActiveGame("detective");
            }}
            className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-all hover:scale-[1.01] ${
              isNeumorphic
                ? "neu-flat text-slate-800"
                : isRiso
                ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                : "bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 shadow-md"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isNeumorphic ? "neu-inset text-indigo-600" : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
              }`}>
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-sm font-black uppercase ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>AI DETECTIVE</h4>
                <p className={`text-xs mt-0.5 ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
                  Swipe • verify true vs hallucination
                </p>
              </div>
            </div>

            <div className={`p-2 rounded-xl ${isNeumorphic ? "neu-btn text-indigo-600" : "bg-slate-950 text-cyan-400 border border-slate-800"}`}>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Game 2: True or False */}
          <div
            onClick={() => {
              soundFx.playTap();
              setActiveGame("true-false");
            }}
            className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-all hover:scale-[1.01] ${
              isNeumorphic
                ? "neu-flat text-slate-800"
                : isRiso
                ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                : "bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 shadow-md"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isNeumorphic ? "neu-inset text-rose-500" : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-sm font-black uppercase ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>TRUE OR FALSE?</h4>
                <p className={`text-xs mt-0.5 ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>Rapid fire AI concept sprint</p>
              </div>
            </div>

            <div className={`p-2 rounded-xl ${isNeumorphic ? "neu-btn text-rose-500" : "bg-slate-950 text-rose-400 border border-slate-800"}`}>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      {/* Interactive Friend Duel Modal */}
      {activeDuel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl p-6 bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-mono uppercase font-bold text-slate-300">
                  DUEL VS @{friendHandle || "AlexAI"}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {duelScore.user} - {duelScore.bot}
              </span>
            </div>

            {duelDone ? (
              <div className="text-center space-y-4 py-3">
                <div className="text-3xl font-black text-slate-100">
                  {duelScore.user >= duelScore.bot ? "Victory! 🏆" : "Good Try! 🤝"}
                </div>
                <p className="text-xs text-slate-400">
                  Final Score: You {duelScore.user} — {duelScore.bot} @{friendHandle || "AlexAI"}
                </p>
                <button
                  onClick={() => setActiveDuel(false)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  Return to Lab
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">
                  Question {duelQuestionIdx + 1} of {duelQuestions.length}
                </div>
                <h4 className="text-sm font-bold text-slate-100 leading-snug">
                  {duelQuestions[duelQuestionIdx].q}
                </h4>

                <div className="space-y-2">
                  {duelQuestions[duelQuestionIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswerDuel(i)}
                      className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-xs text-slate-200 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive AI Detective Mini-Game Modal */}
      {activeGame === "detective" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl p-6 bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase font-bold text-slate-200">
                  AI DETECTIVE • CASE #{detectiveIdx + 1}
                </span>
              </div>
              <button
                onClick={() => setActiveGame("none")}
                className="text-xs text-slate-400 hover:text-slate-100"
              >
                Close
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-center">
              <div className="text-[10px] font-mono text-cyan-400 font-bold">ANALYZE ASSERTION:</div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                "{detectiveCards[detectiveIdx % detectiveCards.length].prompt}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  const card = detectiveCards[detectiveIdx % detectiveCards.length];
                  if (card.isTrue) {
                    soundFx.playCorrect();
                    setDetectiveScore((s) => s + 1);
                  }
                  setDetectiveIdx((i) => i + 1);
                }}
                className="py-3 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                TRUE FACT
              </button>
              <button
                onClick={() => {
                  const card = detectiveCards[detectiveIdx % detectiveCards.length];
                  if (!card.isTrue) {
                    soundFx.playCorrect();
                    setDetectiveScore((s) => s + 1);
                  }
                  setDetectiveIdx((i) => i + 1);
                }}
                className="py-3 rounded-xl font-bold text-xs bg-rose-500 text-slate-950 hover:bg-rose-400"
              >
                FALSE / HALLUCINATION
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive True/False Sprint Modal */}
      {activeGame === "true-false" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl p-6 bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase font-bold text-slate-200">
                TRUE OR FALSE SPRINT
              </span>
              <button
                onClick={() => setActiveGame("none")}
                className="text-xs text-slate-400 hover:text-slate-100"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Can AI models generate tokens beyond their context length without compaction or sliding
              windows?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  soundFx.playTap();
                  setActiveGame("none");
                }}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200"
              >
                True
              </button>
              <button
                onClick={() => {
                  soundFx.playCorrect();
                  onAddSparks(5);
                  setActiveGame("none");
                }}
                className="py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
              >
                False (+5 Sparks)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
