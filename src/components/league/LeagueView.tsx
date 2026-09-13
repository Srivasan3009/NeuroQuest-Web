import React, { useState } from "react";
import { Trophy, Medal, Sparkles, Zap, ChevronUp, Award } from "lucide-react";
import { UserProfile, AppTheme } from "../../types";

interface LeagueViewProps {
  user: UserProfile;
  theme?: AppTheme;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarLetter: string;
  tier: "DIAMOND" | "PLATINUM" | "GOLD" | "BRONZE";
  sparks: number;
  isUser?: boolean;
}

export const LeagueView: React.FC<LeagueViewProps> = ({
  user,
  theme = "neumorphic"
}) => {
  const isNeumorphic = theme === "neumorphic";
  const isRiso = theme === "riso-pop" || theme === "warm-editorial";
  const [filter, setFilter] = useState<"lifetime" | "weekly">("lifetime");

  const userSparks = user.sparks ?? 45;

  // Static mock leaderboard entries matching video
  const otherRankers: LeaderboardEntry[] = [
    { rank: 4, name: "Priya", avatarLetter: "P", tier: "DIAMOND", sparks: 3035 },
    { rank: 5, name: "Kabir", avatarLetter: "K", tier: "DIAMOND", sparks: 2968 },
    { rank: 6, name: "Meera", avatarLetter: "M", tier: "DIAMOND", sparks: 2901 },
    { rank: 7, name: "Arjun", avatarLetter: "A", tier: "DIAMOND", sparks: 2870 },
    { rank: 8, name: "Sara", avatarLetter: "S", tier: "DIAMOND", sparks: 2803 },
    { rank: 9, name: "Dev", avatarLetter: "D", tier: "DIAMOND", sparks: 2736 },
    { rank: 10, name: "Isha", avatarLetter: "I", tier: "DIAMOND", sparks: 2705 },
    { rank: 11, name: "Vikram", avatarLetter: "V", tier: "DIAMOND", sparks: 2638 },
    { rank: 12, name: "Nisha", avatarLetter: "N", tier: "DIAMOND", sparks: 2571 },
    { rank: 13, name: "Omar", avatarLetter: "O", tier: "DIAMOND", sparks: 2540 },
    { rank: 14, name: "Lina", avatarLetter: "L", tier: "DIAMOND", sparks: 2473 }
  ];

  const getTierBadgeStyle = (tier: string) => {
    if (isNeumorphic) {
      switch (tier) {
        case "DIAMOND":
          return "neu-pill-accent text-indigo-600";
        case "PLATINUM":
          return "neu-inset text-slate-600";
        case "GOLD":
          return "neu-pill-accent text-amber-600";
        default:
          return "neu-inset text-amber-700";
      }
    }
    switch (tier) {
      case "DIAMOND":
        return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30";
      case "PLATINUM":
        return "bg-slate-300/10 text-slate-300 border border-slate-400/30";
      case "GOLD":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/30";
      default:
        return "bg-amber-800/20 text-amber-500 border border-amber-700/30";
    }
  };

  return (
    <div id="league-view" className="w-full max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-32 space-y-6">
      {/* Top Banner matching video */}
      <div className="text-center">
        <span className={`text-[11px] font-mono ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
          Add your name in settings for the board
        </span>
      </div>

      {/* Header matching video */}
      <div className="text-center space-y-1">
        <div className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isNeumorphic ? "text-[#4F46E5]" : "text-cyan-400"}`}>
          GLOBAL COMPETITION
        </div>
        <h1 className={`text-2xl sm:text-3xl font-black tracking-tight uppercase ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>
          LIFETIME RANKS
        </h1>
        <div className={`text-xs font-mono ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>
          TOP 50 • SPARKS EARNED
        </div>
      </div>

      {/* 3. The Podium Visual matching video (#2 Rohan, #1 Aanya, #3 You) */}
      <div className="pt-4 pb-2 max-w-xl mx-auto w-full">
        <div className="flex items-end justify-center gap-3">
          {/* #2 Rohan (Silver / Left) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                isNeumorphic ? "neu-flat text-slate-700" : "bg-slate-800 border-2 border-slate-500 text-slate-200 shadow-md"
              }`}>
                R
              </div>
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1 rounded-md ${
                isNeumorphic ? "neu-inset text-indigo-600" : "bg-cyan-950 text-cyan-300 border border-cyan-500/30"
              }`}>
                DIAMOND
              </span>
            </div>
            <div className={`text-xs font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-200"}`}>Rohan</div>
            <div className={`text-xs font-mono ${isNeumorphic ? "text-slate-500" : "text-slate-400"}`}>3,133</div>
            {/* Podium step 2 */}
            <div
              className={`w-full h-24 mt-2 rounded-t-2xl flex items-center justify-center font-black text-3xl transition-all ${
                isNeumorphic
                  ? "neu-raised text-slate-600"
                  : isRiso
                  ? "bg-[#E2E8F0] text-[#1E1B18] border-2 border-b-0 border-[#1E1B18]"
                  : "bg-gradient-to-t from-slate-900 to-slate-800 text-slate-400 border-t-2 border-slate-500/60 shadow-md"
              }`}
            >
              2
            </div>
          </div>

          {/* #1 Aanya (Gold / Center Highest) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-xl ${
                isNeumorphic ? "neu-flat text-amber-500" : "bg-amber-500/20 border-2 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              }`}>
                A
              </div>
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1.5 rounded-md ${
                isNeumorphic ? "neu-pill-accent text-amber-600" : "bg-amber-950 text-amber-300 border border-amber-500/40"
              }`}>
                DIAMOND
              </span>
            </div>
            <div className={`text-xs font-bold ${isNeumorphic ? "text-amber-600 font-black" : "text-amber-300"}`}>Aanya</div>
            <div className={`text-xs font-mono font-bold ${isNeumorphic ? "text-amber-600" : "text-amber-400"}`}>3,200</div>
            {/* Podium step 1 */}
            <div
              className={`w-full h-32 mt-2 rounded-t-2xl flex items-center justify-center font-black text-4xl transition-all ${
                isNeumorphic
                  ? "neu-raised text-amber-500"
                  : isRiso
                  ? "bg-[#FEF08A] text-[#1E1B18] border-2 border-b-0 border-[#1E1B18]"
                  : "bg-gradient-to-t from-amber-950/60 via-amber-900/40 to-amber-700/50 text-amber-400 border-t-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              }`}
            >
              1
            </div>
          </div>

          {/* #3 You / Learner (Bronze / Right) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                isNeumorphic ? "neu-flat text-indigo-600" : "bg-amber-950/60 border-2 border-amber-600 text-amber-400 shadow-md"
              }`}>
                Y
              </div>
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1 rounded-md ${
                isNeumorphic ? "neu-inset text-amber-700" : "bg-amber-950 text-amber-400 border border-amber-600/30"
              }`}>
                BRONZE
              </span>
            </div>
            <div className={`text-xs font-bold ${isNeumorphic ? "text-indigo-600" : "text-cyan-400"}`}>You</div>
            <div className={`text-xs font-mono font-bold ${isNeumorphic ? "text-indigo-500" : "text-cyan-300"}`}>{userSparks}</div>
            {/* Podium step 3 */}
            <div
              className={`w-full h-20 mt-2 rounded-t-2xl flex items-center justify-center font-black text-3xl transition-all ${
                isNeumorphic
                  ? "neu-raised text-slate-500"
                  : isRiso
                  ? "bg-[#FFEDD5] text-[#1E1B18] border-2 border-b-0 border-[#1E1B18]"
                  : "bg-gradient-to-t from-slate-900 to-amber-950/40 text-amber-600 border-t-2 border-amber-700/60 shadow-md"
              }`}
            >
              3
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full Rankings List matching video (Rank 4 to 50) */}
      <div
        className={`max-w-3xl mx-auto w-full rounded-2xl overflow-hidden transition-all ${
          isNeumorphic
            ? "neu-raised text-slate-800"
            : isRiso
            ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            : "bg-slate-900/90 border border-slate-800 shadow-md"
        }`}
      >
        <div className={`px-4 py-3 flex items-center justify-between text-xs font-mono ${
          isNeumorphic ? "border-b border-slate-300 text-slate-500" : "border-b border-slate-800 text-slate-400"
        }`}>
          <span className="uppercase font-bold">RANKINGS</span>
          <span>50 / 50</span>
        </div>

        <div className={isNeumorphic ? "divide-y divide-slate-300/80" : "divide-y divide-slate-800/70"}>
          {otherRankers.map((r) => (
            <div
              key={r.rank}
              className={`px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                isNeumorphic ? "hover:bg-slate-200/50" : "hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 text-sm font-black font-mono ${isNeumorphic ? "text-slate-600" : "text-slate-400"}`}>
                  {r.rank}
                </span>

                <div className="relative">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    isNeumorphic ? "neu-inset text-slate-700" : "bg-slate-800 border border-slate-700 text-slate-200"
                  }`}>
                    {r.avatarLetter}
                  </div>
                </div>

                <div>
                  <div className={`text-xs font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-200"}`}>{r.name}</div>
                  <span
                    className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-md ${getTierBadgeStyle(
                      r.tier
                    )}`}
                  >
                    {r.tier}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs font-mono font-bold ${isNeumorphic ? "text-slate-800" : "text-slate-100"}`}>
                  {r.sparks.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
