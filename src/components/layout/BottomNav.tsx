import React from "react";
import {
  Home,
  FlaskConical,
  Trophy,
  User
} from "lucide-react";
import { soundFx } from "../../utils/sound";
import { AppTheme } from "../../types";

export type NavTab = "home" | "lab" | "league" | "you";

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme?: AppTheme;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  theme = "riso-pop"
}) => {
  const tabs = [
    { id: "home" as NavTab, label: "HOME", icon: Home },
    { id: "lab" as NavTab, label: "LAB", icon: FlaskConical },
    { id: "league" as NavTab, label: "LEAGUE", icon: Trophy },
    { id: "you" as NavTab, label: "YOU", icon: User }
  ];

  const handleTabClick = (tab: NavTab) => {
    soundFx.playTap();
    onSelectTab(tab);
  };

  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";

  return (
    <nav
      id="app-bottom-dock"
      className={`fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto transition-colors duration-300 ${
        isDark
          ? "bg-[#18181B] border-t border-[#27272A] shadow-lg"
          : "bg-[#FBF9F4] border-t-2 border-[#1E1B18] shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          if (isDark) {
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-amber-400 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`} />
                <span className="text-[10px] tracking-wider mt-0.5 font-bold uppercase">
                  {tab.label}
                </span>
              </button>
            );
          }

          // Warm Editorial (Default)
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#4F46E5] text-white font-black shadow-[2px_2px_0px_#1E1B18]"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`} />
              <span className="text-[10px] tracking-wider mt-0.5 font-bold uppercase">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
