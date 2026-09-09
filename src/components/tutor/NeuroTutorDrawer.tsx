import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Bot,
  ChevronDown
} from "lucide-react";
import { TutorChatMessage, TutorDifficulty, TutorMode, AppTheme } from "../../types";
import { askNeuroTutor } from "../../services/tutorApi";

interface NeuroTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeQuestTitle?: string;
  activeStageTitle?: string;
  activePhase?: string;
  theme?: AppTheme;
}

export const NeuroTutorDrawer: React.FC<NeuroTutorDrawerProps> = ({
  isOpen,
  onClose,
  activeQuestTitle = "Artificial Intelligence",
  activeStageTitle = "Foundations",
  activePhase = "Learn",
  theme = "riso-pop",
}) => {
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";
  const [difficulty, setDifficulty] = useState<TutorDifficulty>("intermediate");
  const [messages, setMessages] = useState<TutorChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "neuro-ai",
      text: `Welcome to your learning session! I am **Neuro AI**, your Socratic learning mentor. Rather than just giving answers, I help you build deep intuition.\n\nHow can I help you explore **${activeQuestTitle}** right now?`,
      timestamp: "Just now",
      source: "pedagogical_engine",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const sendMessage = async (customPrompt?: string, mode: TutorMode = "chat") => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: TutorChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputText("");
    setIsLoading(true);

    try {
      const response = await askNeuroTutor({
        prompt: textToSend,
        questTitle: activeQuestTitle,
        stageTitle: activeStageTitle,
        currentPhase: activePhase,
        difficulty,
        mode,
      });

      const aiMessage: TutorChatMessage = {
        id: "ai-" + Date.now(),
        sender: "neuro-ai",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode,
        difficulty,
        source: response.source,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "neuro-ai",
          text: "I experienced a brief interruption. Let's refocus on the current concept: what specific part would you like to dissect?",
          timestamp: "Just now",
          source: "fallback",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPill = (label: string, mode: TutorMode) => {
    let prompt = "";
    if (mode === "explain") {
      prompt = `Explain the core concept of ${activeQuestTitle} simply using a vivid analogy.`;
    } else if (mode === "hint") {
      prompt = `Give me a Socratic hint to solve the current interactive challenge in ${activeQuestTitle} without spoiling the final answer.`;
    } else if (mode === "misconceptions") {
      prompt = `What are the most common misconceptions students have when studying ${activeQuestTitle}?`;
    } else if (mode === "practice") {
      prompt = `Generate a rapid-fire practice question to test my understanding of ${activeQuestTitle}.`;
    }
    sendMessage(prompt, mode);
  };

  return (
    <div
      id="neuro-tutor-drawer"
      className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] border-l-2 shadow-2xl flex flex-col transition-all duration-300 ${
        isDark
          ? "bg-[#18181B] text-zinc-100 border-[#3F3F46]"
          : "bg-[#FFFDF9] text-[#1E1B18] border-[#1E1B18]"
      }`}
    >
      {/* Drawer Header */}
      <div
        className={`px-5 py-4 border-b-2 flex items-center justify-between ${
          isDark
            ? "bg-[#27272A] border-[#3F3F46]"
            : "bg-[#F4EFE6] border-[#1E1B18]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center shadow-sm ${
              isDark
                ? "bg-amber-400 text-zinc-950 border-amber-500"
                : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
            }`}
          >
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-tight">Neuro AI</h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-black uppercase ${
                  isDark
                    ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
                    : "bg-[#EEF2FF] text-[#4F46E5] border-[#1E1B18]"
                }`}
              >
                Tutor
              </span>
            </div>
            <p className={`text-[11px] truncate max-w-[240px] font-mono ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {activeQuestTitle} • {activePhase}
            </p>
          </div>
        </div>

        <button
          id="close-tutor-btn"
          onClick={onClose}
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark
              ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border-zinc-700"
              : "text-[#1E1B18] hover:bg-zinc-200 border-[#1E1B18]"
          }`}
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Difficulty Tier Selector */}
      <div
        className={`px-4 py-2.5 border-b-2 flex items-center justify-between text-xs ${
          isDark
            ? "bg-[#1F1F23] border-[#3F3F46]"
            : "bg-[#FFFDF9] border-[#1E1B18]"
        }`}
      >
        <span className={`font-mono text-xs font-bold flex items-center gap-1.5 ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
          <GraduationCap className={`w-3.5 h-3.5 ${isDark ? "text-amber-400" : "text-[#4F46E5]"}`} />
          <span>Depth:</span>
        </span>
        <div className={`flex border-2 rounded-xl p-0.5 ${isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-[#1E1B18]"}`}>
          {(["beginner", "intermediate", "advanced"] as TutorDifficulty[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black uppercase transition-colors ${
                difficulty === level
                  ? isDark
                    ? "bg-amber-400 text-zinc-950 font-bold"
                    : "bg-[#1E1B18] text-white font-bold shadow-sm"
                  : isDark
                  ? "text-zinc-400 hover:text-zinc-200"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {level === "beginner" ? "Simple" : level === "intermediate" ? "Standard" : "Formal"}
            </button>
          ))}
        </div>
      </div>

      {/* Socratic Quick Prompts */}
      <div
        className={`px-4 py-2.5 border-b-2 overflow-x-auto flex items-center gap-2 no-scrollbar ${
          isDark ? "bg-[#18181B] border-[#3F3F46]" : "bg-[#FFFDF9] border-[#1E1B18]"
        }`}
      >
        <button
          type="button"
          onClick={() => handleQuickPill("Explain simply", "explain")}
          className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border-2 flex items-center gap-1.5 transition-transform active:scale-95 ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:border-amber-400 hover:text-amber-300"
              : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[1px_1px_0px_#1E1B18]"
          }`}
        >
          <Lightbulb className="w-3 h-3 text-amber-500" />
          <span>Explain simply</span>
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill("Give a hint", "hint")}
          className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border-2 flex items-center gap-1.5 transition-transform active:scale-95 ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:border-amber-400 hover:text-amber-300"
              : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[1px_1px_0px_#1E1B18]"
          }`}
        >
          <HelpCircle className="w-3 h-3 text-amber-500" />
          <span>Socratic hint</span>
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill("Common misconceptions", "misconceptions")}
          className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border-2 flex items-center gap-1.5 transition-transform active:scale-95 ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:border-amber-400 hover:text-amber-300"
              : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[1px_1px_0px_#1E1B18]"
          }`}
        >
          <AlertTriangle className="w-3 h-3 text-rose-500" />
          <span>Misconceptions</span>
        </button>
        <button
          type="button"
          onClick={() => handleQuickPill("Practice drill", "practice")}
          className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border-2 flex items-center gap-1.5 transition-transform active:scale-95 ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:border-amber-400 hover:text-amber-300"
              : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[1px_1px_0px_#1E1B18]"
          }`}
        >
          <Sparkles className="w-3 h-3 text-emerald-500" />
          <span>Practice drill</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === "neuro-ai";
          return (
            <div key={msg.id} className={`flex gap-3 ${isAI ? "items-start" : "items-end justify-end"}`}>
              {isAI && (
                <div
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark
                      ? "bg-amber-400/15 text-amber-400 border-amber-400/30"
                      : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
                  }`}
                >
                  <Bot className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed border-2 ${
                  isAI
                    ? isDark
                      ? "bg-[#27272A] border-[#3F3F46] text-zinc-100"
                      : "bg-white border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                    : isDark
                    ? "bg-amber-400 border-amber-500 text-zinc-950 font-bold"
                    : "bg-[#1E1B18] border-[#1E1B18] text-white font-bold shadow-[2px_2px_0px_#1E1B18]"
                }`}
              >
                <div className="whitespace-pre-wrap space-y-2">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 font-mono flex items-center gap-2 ${
                    isAI
                      ? isDark ? "text-zinc-500" : "text-zinc-500"
                      : isDark ? "text-zinc-900" : "text-zinc-400"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.source && (
                    <span className="opacity-75">
                      • {msg.source === "gemini" ? "Gemini Flash" : "Pedagogy Engine"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-start">
            <div
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 ${
                isDark
                  ? "bg-amber-400/15 text-amber-400 border-amber-400/30"
                  : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
              }`}
            >
              <Bot className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div
              className={`border-2 rounded-2xl p-3.5 text-xs flex items-center gap-2 ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46] text-zinc-300"
                  : "bg-white border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-amber-400" : "bg-[#4F46E5]"}`}></span>
              <span className="font-mono font-bold">Formulating pedagogical guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div
        className={`p-3.5 border-t-2 ${
          isDark
            ? "bg-[#27272A] border-[#3F3F46]"
            : "bg-[#F4EFE6] border-[#1E1B18]"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="tutor-input-box"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask Neuro AI about ${activeQuestTitle}...`}
            className={`flex-1 border-2 rounded-xl px-3.5 py-2.5 text-xs font-mono transition-colors focus:outline-none ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100 placeholder-zinc-500 focus:border-amber-400"
                : "bg-white border-[#1E1B18] text-[#1E1B18] placeholder-zinc-500 focus:border-[#4F46E5] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          />
          <button
            id="send-tutor-msg-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-transform active:scale-95 shrink-0 font-black disabled:opacity-40 ${
              isDark
                ? "bg-amber-400 border-amber-500 text-zinc-950 hover:bg-amber-300"
                : "bg-[#1E1B18] border-[#1E1B18] text-white hover:bg-black shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
