import React, { useState } from "react";
import { X, Gift, Sparkles, Zap, Award, CheckCircle } from "lucide-react";
import { soundFx } from "../../utils/sound";
import { AppTheme } from "../../types";

interface DailyGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimReward: (sparks: number, xp: number) => void;
  theme?: AppTheme;
}

export const DailyGiftModal: React.FC<DailyGiftModalProps> = ({
  isOpen,
  onClose,
  onClaimReward,
  theme = "riso-pop"
}) => {
  const [opened, setOpened] = useState(false);
  if (!isOpen) return null;
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";

  const handleOpenChest = () => {
    if (opened) return;
    setOpened(true);
    soundFx.playChestOpen();
    onClaimReward(15, 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={`w-full max-w-md rounded-3xl p-6 space-y-5 text-center relative transition-all border-2 ${
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

        <div className="space-y-2 pt-2">
          <div
            className={`text-[10px] font-mono uppercase tracking-widest font-black ${
              isDark ? "text-amber-400" : "text-[#4F46E5]"
            }`}
          >
            DAILY SURPRISE CHEST
          </div>
          <h2 className="text-2xl font-black uppercase">
            {opened ? "Reward Unlocked!" : "Your Daily Mystery Gift"}
          </h2>
          <p className={`text-xs max-w-xs mx-auto ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
            {opened
              ? "You claimed today's rewards! Return tomorrow for another mystery drop."
              : "Tap the mystery chest to synthesize free Sparks and experience points."}
          </p>
        </div>

        {/* Chest Visual */}
        <div className="py-4">
          <button
            onClick={handleOpenChest}
            disabled={opened}
            className={`relative w-28 h-28 mx-auto rounded-3xl flex items-center justify-center border-2 transition-all active:scale-95 ${
              opened
                ? isDark
                  ? "bg-amber-400/20 border-amber-400 text-amber-300"
                  : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18] shadow-[4px_4px_0px_#1E1B18]"
                : isDark
                ? "bg-[#27272A] border-[#3F3F46] hover:border-amber-400 text-amber-400 cursor-pointer"
                : "bg-white border-[#1E1B18] hover:bg-[#FEF08A] text-[#1E1B18] cursor-pointer shadow-[3px_3px_0px_#1E1B18]"
            }`}
          >
            {opened ? (
              <Sparkles className="w-14 h-14 animate-spin text-amber-500" />
            ) : (
              <Gift className="w-14 h-14" />
            )}
          </button>
        </div>

        {opened ? (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3 border-2 rounded-2xl flex flex-col items-center ${
                  isDark ? "bg-[#27272A] border-[#3F3F46]" : "bg-white border-[#1E1B18]"
                }`}
              >
                <Zap className="w-5 h-5 text-amber-500 fill-current mb-1" />
                <span className="text-lg font-black font-mono">+15</span>
                <span className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Sparks Added
                </span>
              </div>
              <div
                className={`p-3 border-2 rounded-2xl flex flex-col items-center ${
                  isDark ? "bg-[#27272A] border-[#3F3F46]" : "bg-white border-[#1E1B18]"
                }`}
              >
                <Award className="w-5 h-5 text-[#4F46E5] mb-1" />
                <span className="text-lg font-black font-mono">+50</span>
                <span className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  XP Earned
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-transform active:scale-95 ${
                isDark
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                  : "bg-[#1E1B18] text-white hover:bg-black shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              Continue Learning
            </button>
          </div>
        ) : (
          <button
            onClick={handleOpenChest}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-transform active:scale-95 ${
              isDark
                ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                : "bg-[#4F46E5] text-white hover:bg-[#4338CA] border-2 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            Tap to Open Chest
          </button>
        )}
      </div>
    </div>
  );
};
