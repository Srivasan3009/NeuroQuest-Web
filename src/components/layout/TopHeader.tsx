import React, { useState } from "react";
import {
  ChevronDown,
  Zap,
  Flame,
  Gift,
  X,
  PlayCircle,
  Sparkles
} from "lucide-react";
import { UserProfile, Course, AppTheme } from "../../types";
import { soundFx } from "../../utils/sound";

interface TopHeaderProps {
  user: UserProfile;
  activeCourse: Course;
  onOpenCoursePicker: () => void;
  onOpenSparksModal: () => void;
  onOpenStreakModal: () => void;
  onOpenGiftModal: () => void;
  theme?: AppTheme;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  activeCourse,
  onOpenCoursePicker,
  onOpenSparksModal,
  onOpenStreakModal,
  onOpenGiftModal,
  theme = "riso-pop"
}) => {
  const [showSparksBanner, setShowSparksBanner] = useState(false);
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";

  const handleSparksClick = () => {
    soundFx.playTap();
    setShowSparksBanner(!showSparksBanner);
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md transition-colors duration-300">
      <div
        className={`px-3 py-2.5 flex items-center justify-between gap-2 border-b transition-colors ${
          isDark
            ? "bg-[#18181B]/95 border-[#27272A] text-[#F4F4F5]"
            : "bg-[#FBF9F4]/95 border-[#1E1B18] text-[#1E1B18]"
        }`}
      >
        {/* Left: Choose Course Button */}
        <button
          id="btn-choose-course"
          onClick={() => {
            soundFx.playTap();
            onOpenCoursePicker();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            isDark
              ? "bg-[#27272A] border border-[#3F3F46] text-[#F4F4F5] hover:border-amber-400/60"
              : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] font-black shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5 active:translate-y-1"
          }`}
        >
          <div className="flex flex-col text-left">
            <span
              className={`text-[9px] uppercase tracking-wider font-extrabold ${
                isDark ? "text-amber-400 font-mono" : "text-[#4F46E5] font-black"
              }`}
            >
              CHOOSE COURSE
            </span>
            <span
              className={`text-xs font-bold truncate max-w-[120px] sm:max-w-[170px] ${
                isDark ? "text-[#F4F4F5]" : "text-[#1E1B18]"
              }`}
            >
              {activeCourse.title}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 ml-0.5 shrink-0 transition-transform ${
              isDark ? "text-amber-400" : "text-[#1E1B18]"
            }`}
          />
        </button>

        {/* Right Stats: Sparks ⚡, Streak 🔥, Gift 🎁 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sparks Pill */}
          <button
            id="btn-sparks-pill"
            onClick={handleSparksClick}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-transform active:scale-95 ${
              isDark
                ? "bg-amber-950/40 border border-amber-500/40 text-amber-300"
                : "bg-[#FEF08A] border-2 border-[#1E1B18] text-[#1E1B18] font-black shadow-[1.5px_1.5px_0px_#1E1B18]"
            }`}
          >
            <Zap className={`w-4 h-4 fill-current ${isDark ? "text-amber-400" : "text-[#1E1B18]"}`} />
            <span className="text-xs font-mono font-black">{user.sparks ?? 45}</span>
          </button>

          {/* Streak Pill */}
          <button
            id="btn-streak-pill"
            onClick={() => {
              soundFx.playTap();
              onOpenStreakModal();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-transform active:scale-95 ${
              isDark
                ? "bg-rose-950/40 border border-rose-500/40 text-rose-300"
                : "bg-[#FFEDD5] border-2 border-[#1E1B18] text-[#1E1B18] font-black shadow-[1.5px_1.5px_0px_#1E1B18]"
            }`}
          >
            <Flame className={`w-4 h-4 fill-current ${isDark ? "text-rose-400" : "text-[#E11D48]"}`} />
            <span className="text-xs font-mono font-black">{user.streakDays || 1}</span>
          </button>

          {/* Gift Box */}
          <button
            id="btn-gift-box"
            onClick={() => {
              soundFx.playTap();
              onOpenGiftModal();
            }}
            className={`p-1.5 rounded-xl transition-transform active:scale-95 ${
              isDark
                ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400"
                : "bg-[#99F6E4] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[1.5px_1.5px_0px_#1E1B18]"
            }`}
            title="Daily Mystery Reward"
          >
            <Gift className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sparks Popover Banner (Matching the video) */}
      {showSparksBanner && (
        <div
          id="sparks-notice-banner"
          className={`px-4 py-3 mx-3 my-2 rounded-2xl relative transition-all animate-in fade-in slide-in-from-top-2 ${
            isDark
              ? "bg-[#27272A] border border-[#3F3F46] text-[#F4F4F5] shadow-xl"
              : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
          }`}
        >
          <button
            onClick={() => setShowSparksBanner(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-2.5 pr-6">
            <div
              className={`p-1.5 rounded-xl shrink-0 ${
                isDark ? "bg-amber-500/20 text-amber-400" : "bg-[#FEF08A] text-[#1E1B18] border border-[#1E1B18]"
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <span>SPARKS</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isDark ? "bg-[#18181B] text-amber-400 border border-amber-500/30" : "bg-amber-100 text-[#1E1B18] border border-[#1E1B18]"
                  }`}
                >
                  {user.sparks ?? 45} Available
                </span>
              </div>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                Low on Sparks? Tap below to watch a quick demo and earn more. NEUROBOT tutoring costs 2
                Sparks per answer.
              </p>
              <div className="flex items-center gap-2 pt-1.5">
                <button
                  onClick={() => {
                    setShowSparksBanner(false);
                    onOpenSparksModal();
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    isDark
                      ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold"
                      : "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[2px_2px_0px_#1E1B18]"
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Get +5 Sparks Free</span>
                </button>
                <span className="text-[10px] text-zinc-500 font-mono">TAP TO OPEN • X = CLOSE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
