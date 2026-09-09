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
  theme = "cyber-dark"
}) => {
  const isRiso = theme === "riso-pop";
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
    <div id="league-view" className="space-y-6 pb-24 max-w-lg mx-auto px-4 pt-2">
      {/* Top Banner matching video */}
      <div className="text-center">
        <span className="text-[11px] font-mono text-slate-400">
          Add your name in settings for the board
        </span>
      </div>

      {/* Header matching video */}
      <div className="text-center space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
          GLOBAL COMPETITION
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100 uppercase">
          LIFETIME RANKS
        </h1>
        <div className="text-xs font-mono text-slate-400">
          TOP 50 • SPARKS EARNED
        </div>
      </div>

      {/* 3. The Podium Visual matching video (#2 Rohan, #1 Aanya, #3 You) */}
      <div className="pt-4 pb-2">
        <div className="flex items-end justify-center gap-3">
          {/* #2 Rohan (Silver / Left) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center text-slate-200 font-bold text-lg shadow-md">
                R
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-1 rounded-md">
                DIAMOND
              </span>
            </div>
            <div className="text-xs font-bold text-slate-200">Rohan</div>
            <div className="text-xs font-mono text-slate-400">3,133</div>
            {/* Podium step 2 */}
            <div
              className={`w-full h-24 mt-2 rounded-t-2xl flex items-center justify-center font-black text-3xl transition-all ${
                isRiso
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
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                A
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40 px-1.5 rounded-md">
                DIAMOND
              </span>
            </div>
            <div className="text-xs font-bold text-amber-300">Aanya</div>
            <div className="text-xs font-mono text-amber-400 font-bold">3,200</div>
            {/* Podium step 1 */}
            <div
              className={`w-full h-32 mt-2 rounded-t-2xl flex items-center justify-center font-black text-4xl transition-all ${
                isRiso
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
              <div className="w-14 h-14 rounded-full bg-amber-950/60 border-2 border-amber-600 flex items-center justify-center text-amber-400 font-bold text-lg shadow-md">
                Y
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-600/30 px-1 rounded-md">
                BRONZE
              </span>
            </div>
            <div className="text-xs font-bold text-cyan-400">You</div>
            <div className="text-xs font-mono text-cyan-300 font-bold">{userSparks}</div>
            {/* Podium step 3 */}
            <div
              className={`w-full h-20 mt-2 rounded-t-2xl flex items-center justify-center font-black text-3xl transition-all ${
                isRiso
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
        className={`rounded-2xl border overflow-hidden transition-all ${
          isRiso
            ? "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            : "bg-slate-900/90 border-slate-800 shadow-md"
        }`}
      >
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="uppercase font-bold">RANKINGS</span>
          <span>50 / 50</span>
        </div>

        <div className="divide-y divide-slate-800/70">
          {otherRankers.map((r) => (
            <div
              key={r.rank}
              className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-sm font-black font-mono text-slate-400">
                  {r.rank}
                </span>

                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                    {r.avatarLetter}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-200">{r.name}</div>
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
                <span className="text-xs font-mono font-bold text-slate-100">
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
