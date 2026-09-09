import React from "react";
import { X, Flame, Shield, Calendar, Sparkles } from "lucide-react";
import { AppTheme } from "../../types";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  theme?: AppTheme;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  theme = "riso-pop"
}) => {
  if (!isOpen) return null;
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDayIndex = 3; // e.g. Thursday

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={`w-full max-w-md rounded-3xl p-6 space-y-5 relative transition-all border-2 ${
          isDark
            ? "bg-[#18181B] border-[#3F3F46] shadow-2xl text-zinc-100"
            : "bg-[#FFFDF9] border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] text-[#1E1B18]"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full border transition-colors ${
            isDark
              ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-100"
              : "border-[#1E1B18] text-[#1E1B18] bg-white hover:bg-zinc-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <div
            className={`w-16 h-16 mx-auto rounded-3xl border-2 flex items-center justify-center shadow-md ${
              isDark
                ? "bg-rose-500/20 border-rose-400 text-rose-400"
                : "bg-[#FFE4E6] border-[#1E1B18] text-[#E11D48]"
            }`}
          >
            <Flame className="w-9 h-9 fill-current animate-bounce" />
          </div>
          <h2 className="text-2xl font-black tracking-tight uppercase">
            {streakDays} Day Streak!
          </h2>
          <p className={`text-xs max-w-xs mx-auto ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
            You're building continuous momentum. Complete at least one bite-sized lesson every day
            to keep your streak alive.
          </p>
        </div>

        {/* Weekly tracker bar */}
        <div
          className={`border-2 rounded-2xl p-4 space-y-3 ${
            isDark ? "bg-[#27272A] border-[#3F3F46]" : "bg-white border-[#1E1B18]"
          }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-mono ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            <span className="font-bold">This Week</span>
            <span className="text-rose-500 font-black">4/7 Active</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const isPast = idx <= currentDayIndex;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black font-mono border-2 transition-all ${
                      isPast
                        ? isDark
                          ? "bg-rose-500 text-zinc-950 border-rose-400"
                          : "bg-[#FFE4E6] text-[#E11D48] border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                        : isDark
                        ? "bg-zinc-800 text-zinc-500 border-zinc-700"
                        : "bg-zinc-100 text-zinc-400 border-zinc-200"
                    }`}
                  >
                    {isPast ? <Flame className="w-4 h-4 fill-current" /> : day}
                  </div>
                  <span
                    className={`text-[10px] font-mono ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Freeze Shield perk */}
        <div
          className={`flex items-center gap-3 p-3.5 border-2 rounded-2xl ${
            isDark ? "bg-[#27272A] border-[#3F3F46]" : "bg-[#EEF2FF] border-[#1E1B18]"
          }`}
        >
          <div
            className={`p-2 rounded-xl border ${
              isDark
                ? "bg-amber-400/20 text-amber-400 border-amber-400/30"
                : "bg-[#4F46E5] text-white border-[#1E1B18]"
            }`}
          >
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-black uppercase">Streak Freeze Active</div>
            <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              1 missed day will be automatically protected without resetting your counter.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-transform active:scale-95 ${
            isDark
              ? "bg-rose-500 text-zinc-950 hover:bg-rose-400 shadow-md"
              : "bg-[#1E1B18] text-white hover:bg-black shadow-[2px_2px_0px_#1E1B18]"
          }`}
        >
          Keep Building Momentum
        </button>
      </div>
    </div>
  );
};
