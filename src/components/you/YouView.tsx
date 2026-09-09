import React, { useState, useMemo } from "react";
import {
  Settings,
  User,
  Users,
  FolderArchive,
  Bookmark,
  Award,
  LogOut,
  ChevronRight,
  ChevronDown,
  Volume2,
  Mic,
  Palette,
  Play,
  Check,
  ShieldAlert,
  Bot,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  Trophy,
  Flame,
  Cpu
} from "lucide-react";
import { UserProfile, MascotRole, AppTheme, Stage } from "../../types";
import { soundFx } from "../../utils/sound";
import { Achievements } from "./Achievements";
import { computeMilestoneBadges, getAchievementsSummary } from "../../utils/achievements";

interface YouViewProps {
  user: UserProfile;
  stages?: Stage[];
  onSetTheme: (theme: AppTheme) => void;
  onSetMascotRole: (role: MascotRole) => void;
  onAddSparks: (amount: number) => void;
  onResetProgress: () => void;
  onSetStreakDays?: (days: number) => void;
  onCompleteQuest?: (questId: string, xp: number, skill: string) => void;
  theme?: AppTheme;
}

export const YouView: React.FC<YouViewProps> = ({
  user,
  stages,
  onSetTheme,
  onSetMascotRole,
  onAddSparks,
  onResetProgress,
  onSetStreakDays,
  onCompleteQuest,
  theme = "riso-pop"
}) => {
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";
  const isRiso = !isDark;
  const [inSettingsView, setInSettingsView] = useState(false);
  const [inAchievementsView, setInAchievementsView] = useState(false);

  // Compute live milestone badges & summary
  const milestoneBadges = useMemo(
    () => computeMilestoneBadges(user, stages),
    [user, stages]
  );
  const achievementsSummary = useMemo(
    () => getAchievementsSummary(milestoneBadges),
    [milestoneBadges]
  );

  // Settings Accordions
  const [openAccordion, setOpenAccordion] = useState<string | null>("preferences");

  // Local settings toggles
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled());
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Sub-modals for Friends, Portfolio, Bookmarks, Certificates
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
    if (next) soundFx.playTap();
  };

  const handleThemeChange = (newTheme: AppTheme) => {
    soundFx.playTap();
    onSetTheme(newTheme);
  };

  const badges = [
    {
      id: "cert",
      title: "Certificates",
      desc: `${(user.completedQuestIds || []).length > 2 ? 1 : 0}/4 Finished tracks`,
      unlocked: (user.completedQuestIds || []).length >= 3,
      icon: GraduationCap
    },
    {
      id: "starter",
      title: "Starter",
      desc: "Earn any Sparks",
      unlocked: (user.sparks || 0) > 0,
      icon: Sparkles
    },
    {
      id: "first-win",
      title: "First Win",
      desc: "Finish a lesson once",
      unlocked: (user.completedQuestIds || []).length >= 1,
      icon: Award
    },
    {
      id: "scholar",
      title: "Scholar",
      desc: "Clear 3 lessons",
      unlocked: (user.completedQuestIds || []).length >= 3,
      icon: Award
    },
    {
      id: "wonder-down",
      title: "Wonder Down",
      desc: "Complete the Wonder phase",
      unlocked: (user.completedQuestIds || []).length >= 2,
      icon: Award
    }
  ];

  // -------------------------------------------------------------
  // ACHIEVEMENTS SCREEN VIEW
  // -------------------------------------------------------------
  if (inAchievementsView) {
    return (
      <Achievements
        user={user}
        stages={stages}
        onBack={() => setInAchievementsView(false)}
        onSetStreakDays={onSetStreakDays}
        onCompleteFoundationQuest={() => {
          if (onCompleteQuest) {
            onCompleteQuest("quest-1", 120, "Paradigm Modeling");
          }
        }}
        onResetProgress={onResetProgress}
        theme={theme}
      />
    );
  }

  // -------------------------------------------------------------
  // SETTINGS SCREEN VIEW
  // -------------------------------------------------------------
  if (inSettingsView) {
    return (
      <div id="settings-view" className="space-y-4 pb-24 max-w-lg mx-auto px-4 pt-2 animate-in fade-in">
        {/* Settings Header matching video */}
        <div
          className={`flex items-center justify-between py-2 border-b ${
            isDark ? "border-[#27272A]" : "border-[#1E1B18]"
          }`}
        >
          <button
            onClick={() => setInSettingsView(false)}
            className={`flex items-center gap-2 font-black text-xs ${
              isDark ? "text-zinc-300 hover:text-amber-400" : "text-[#1E1B18] hover:text-[#4F46E5]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
          <div
            className={`text-sm font-black uppercase tracking-wide ${
              isDark ? "text-zinc-100" : "text-[#1E1B18]"
            }`}
          >
            APP SETTINGS
          </div>
          <div className="w-8" />
        </div>

        {/* User Card */}
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 ${
            isDark
              ? "bg-[#27272A] border border-[#3F3F46] text-[#F4F4F5]"
              : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
              isDark
                ? "bg-amber-500/20 border-2 border-amber-400 text-amber-300"
                : "bg-[#FEF08A] border-2 border-[#1E1B18] text-[#1E1B18]"
            }`}
          >
            L
          </div>
          <div>
            <div className="text-sm font-black uppercase">LEARNER</div>
            <div className={`text-xs font-mono ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              @learner • Bronze League
            </div>
          </div>
        </div>

        {/* Settings Accordions */}
        <div className="space-y-2.5">
          {/* 1. Preferences Accordion matching video */}
          <div
            className={`rounded-2xl overflow-hidden ${
              isDark
                ? "bg-[#27272A] border border-[#3F3F46]"
                : "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            }`}
          >
            <button
              onClick={() =>
                setOpenAccordion(openAccordion === "preferences" ? null : "preferences")
              }
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <div
                  className={`text-xs font-black uppercase ${
                    isDark ? "text-zinc-100" : "text-[#1E1B18]"
                  }`}
                >
                  PREFERENCES
                </div>
                <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Sound, theme, and extras
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDark ? "text-zinc-400" : "text-[#1E1B18]"
                } ${openAccordion === "preferences" ? "rotate-180" : ""}`}
              />
            </button>

            {openAccordion === "preferences" && (
              <div
                className={`p-4 pt-0 space-y-4 border-t text-xs ${
                  isDark ? "border-[#3F3F46]" : "border-[#1E1B18]/30"
                }`}
              >
                {/* Sound & Haptics Toggle */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2.5">
                    <Volume2 className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
                    <div>
                      <div className={`font-bold ${isDark ? "text-zinc-200" : "text-[#1E1B18]"}`}>
                        Sound & haptics
                      </div>
                      <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                        Beeps and buzzes in lessons
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleSound}
                    className={`px-3 py-1 rounded-full font-mono font-black text-xs border ${
                      soundEnabled
                        ? isDark
                          ? "bg-amber-400 text-zinc-950 border-amber-500"
                          : "bg-[#4F46E5] text-white border-[#1E1B18]"
                        : isDark
                        ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                        : "bg-zinc-200 text-zinc-600 border-zinc-300"
                    }`}
                  >
                    {soundEnabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Lesson Voice Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mic className={`w-4 h-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
                    <div>
                      <div className={`font-bold ${isDark ? "text-zinc-200" : "text-[#1E1B18]"}`}>
                        NEUROBOT lesson voice
                      </div>
                      <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                        AI audio speech narration
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`px-3 py-1 rounded-full font-mono font-black text-xs border ${
                      voiceEnabled
                        ? isDark
                          ? "bg-amber-400 text-zinc-950 border-amber-500"
                          : "bg-[#4F46E5] text-white border-[#1E1B18]"
                        : isDark
                        ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                        : "bg-zinc-200 text-zinc-600 border-zinc-300"
                    }`}
                  >
                    {voiceEnabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* App Appearance / Theme Selector */}
                <div
                  className={`space-y-2 pt-2 border-t ${
                    isDark ? "border-[#3F3F46]" : "border-[#1E1B18]/30"
                  }`}
                >
                  <div className="flex items-center gap-2 font-black">
                    <Palette className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-[#4F46E5]"}`} />
                    <span className={isDark ? "text-zinc-200" : "text-[#1E1B18]"}>
                      App appearance (Theme)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "riso-pop" as AppTheme, label: "Warm Editorial", sub: "Ivory Paper & Ink" },
                      { id: "minimal-light" as AppTheme, label: "Minimalist Light", sub: "Clean & Modern" },
                      { id: "obsidian-noir" as AppTheme, label: "Obsidian Noir", sub: "Charcoal & Amber" },
                      { id: "obsidian-gold" as AppTheme, label: "Obsidian Gold", sub: "Deep Jet & Gold" }
                    ].map((th) => {
                      const isSelected = theme === th.id || (th.id === "riso-pop" && theme === "cyber-dark");
                      return (
                        <button
                          key={th.id}
                          onClick={() => handleThemeChange(th.id)}
                          className={`p-2.5 rounded-xl text-left border-2 transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-amber-400/20 border-amber-400 text-amber-300"
                                : "bg-[#EEF2FF] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                              : isDark
                              ? "bg-[#18181B] border-[#3F3F46] text-zinc-400 hover:border-zinc-500"
                              : "bg-[#FFFDF9] border-zinc-300 text-zinc-600 hover:border-zinc-500"
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span>{th.label}</span>
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  isDark ? "text-amber-400" : "text-[#4F46E5]"
                                }`}
                              />
                            )}
                          </div>
                          <div className={`text-[10px] mt-0.5 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                            {th.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Need Sparks Demo Button matching video */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isDark
                      ? "bg-[#18181B] border-amber-500/30"
                      : "bg-[#FEF08A] border-2 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                  }`}
                >
                  <div>
                    <div className="font-black text-[#1E1B18]">Need Sparks for NEUROBOT?</div>
                    <div className="text-[11px] text-zinc-600">Watch short research demo</div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playSpark();
                      onAddSparks(5);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-1 ${
                      isDark
                        ? "bg-amber-400 text-zinc-950"
                        : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>+5 Sparks</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. About You Accordion */}
          <div
            className={`rounded-2xl overflow-hidden ${
              isDark
                ? "bg-[#27272A] border border-[#3F3F46]"
                : "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            }`}
          >
            <button
              onClick={() => setOpenAccordion(openAccordion === "about" ? null : "about")}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <div className={`text-xs font-black uppercase ${isDark ? "text-zinc-100" : "text-[#1E1B18]"}`}>
                  ABOUT YOU
                </div>
                <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Grade, goals, and learning style
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDark ? "text-zinc-400" : "text-[#1E1B18]"} ${
                  openAccordion === "about" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "about" && (
              <div
                className={`p-4 pt-0 space-y-2 border-t text-xs ${
                  isDark ? "border-[#3F3F46] text-zinc-300" : "border-[#1E1B18]/30 text-zinc-700"
                }`}
              >
                <p>Track Goal: AI Software Engineer & Autonomous Systems Builder</p>
                <p>Pace: 1 bite-sized lesson every day</p>
              </div>
            )}
          </div>

          {/* 3. Account Accordion */}
          <div
            className={`rounded-2xl overflow-hidden ${
              isDark
                ? "bg-[#27272A] border border-[#3F3F46]"
                : "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            }`}
          >
            <button
              onClick={() => setOpenAccordion(openAccordion === "account" ? null : "account")}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <div className={`text-xs font-black uppercase ${isDark ? "text-zinc-100" : "text-[#1E1B18]"}`}>
                  ACCOUNT
                </div>
                <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  {user.email || "Learner account"}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDark ? "text-zinc-400" : "text-[#1E1B18]"} ${
                  openAccordion === "account" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "account" && (
              <div
                className={`p-4 pt-0 space-y-3 border-t text-xs ${
                  isDark ? "border-[#3F3F46]" : "border-[#1E1B18]/30"
                }`}
              >
                <div className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                  Data is safely cached locally in your secure workspace storage.
                </div>
                <button
                  onClick={() => {
                    if (confirm("Reset learning progress and sparks?")) {
                      onResetProgress();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-black text-xs shadow-sm"
                >
                  Reset Progress
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN YOU / PROFILE VIEW matching video
  // -------------------------------------------------------------
  return (
    <div id="you-view" className="space-y-6 pb-24 max-w-lg mx-auto px-4 pt-2">
      {/* 1. Header matching video */}
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
              isDark ? "text-zinc-400" : "text-[#4F46E5]"
            }`}
          >
            YOU
          </div>
          <h1
            className={`text-2xl font-black tracking-tight uppercase ${
              isDark ? "text-zinc-100" : "text-[#1E1B18]"
            }`}
          >
            YOUR PROFILE
          </h1>
          <div className={`text-xs font-mono ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
            Level {user.level || 1}
          </div>
        </div>

        {/* Settings Gear Button */}
        <button
          id="btn-open-settings"
          onClick={() => {
            soundFx.playTap();
            setInSettingsView(true);
          }}
          className={`p-2.5 rounded-2xl border-2 transition-transform active:scale-95 ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:text-amber-400"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Big Profile Card matching video */}
      <div
        className={`p-6 rounded-3xl text-center space-y-3 transition-all ${
          isDark
            ? "bg-[#27272A] border border-[#3F3F46] shadow-xl text-zinc-100"
            : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[4px_4px_0px_#1E1B18]"
        }`}
      >
        <div className="relative inline-block">
          <div
            className={`w-20 h-20 mx-auto rounded-full border-4 flex items-center justify-center text-3xl font-black ${
              isDark
                ? "bg-amber-500/10 border-amber-400/80 text-amber-400"
                : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            L
          </div>
          <span
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-black border px-2 py-0.5 rounded-full uppercase ${
              isDark
                ? "bg-amber-950 text-amber-300 border-amber-500/40"
                : "bg-[#FFFDF9] text-[#1E1B18] border-[#1E1B18]"
            }`}
          >
            BRONZE
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">LEARNER</h2>
          <p className={`text-xs font-mono ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>@learner</p>
        </div>
      </div>

      {/* 3. Action Menu List matching video */}
      <div className="space-y-2.5">
        {/* Achievements & Badges */}
        <button
          id="btn-open-achievements"
          onClick={() => {
            soundFx.playTap();
            setInAchievementsView(true);
          }}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-amber-400 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
              }`}
            >
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase flex items-center gap-2">
                <span>ACHIEVEMENTS</span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                    isDark
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-[#EEF2FF] text-[#4F46E5] border-[#1E1B18]"
                  }`}
                >
                  {achievementsSummary.earned}/{achievementsSummary.total} UNLOCKED
                </span>
              </div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Earned badges for streaks, foundations & milestones
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Friends */}
        <button
          onClick={() => setActiveSubModal("friends")}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-zinc-500 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-[#EEF2FF] text-[#4F46E5] border-[#1E1B18]"
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase">FRIENDS</div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Add @handle • challenge • invite
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Portfolio */}
        <button
          onClick={() => setActiveSubModal("portfolio")}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-zinc-500 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-[#ECFDF5] text-emerald-700 border-[#1E1B18]"
              }`}
            >
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase">PORTFOLIO</div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Prompts, checklists & projects you saved
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Bookmarks */}
        <button
          onClick={() => setActiveSubModal("bookmarks")}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-zinc-500 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-sky-500/10 text-sky-400 border-sky-500/20" : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
              }`}
            >
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase">BOOKMARKS</div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Saved lessons and interactive tools
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Certificates */}
        <button
          onClick={() => setActiveSubModal("certificates")}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-zinc-500 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-[#FFEDD5] text-[#EA580C] border-[#1E1B18]"
              }`}
            >
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase">CERTIFICATES</div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Earned track & video credentials
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Settings row */}
        <button
          onClick={() => setInSettingsView(true)}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            isDark
              ? "bg-[#27272A] border-[#3F3F46] hover:border-zinc-500 text-zinc-100"
              : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] hover:translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-[#FFE4E6] text-[#E11D48] border-[#1E1B18]"
              }`}
            >
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase">SETTINGS</div>
              <div className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Account, sound, appearance & policies
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Log Out */}
        <button
          onClick={() => {
            if (confirm("Reset current guest session?")) {
              onResetProgress();
            }
          }}
          className={`w-full py-3 rounded-2xl border-2 text-xs font-mono flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-200"
              : "border-zinc-300 text-zinc-600 hover:text-[#1E1B18] hover:border-[#1E1B18]"
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>

      {/* 5. Certificates & Badges Horizontal Showcase */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-mono uppercase font-bold ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            UNLOCKS • BADGES ({achievementsSummary.earned}/{achievementsSummary.total})
          </div>
          <button
            id="btn-view-all-badges"
            onClick={() => {
              soundFx.playTap();
              setInAchievementsView(true);
            }}
            className={`text-xs font-mono font-black uppercase flex items-center gap-1 hover:underline ${
              isDark ? "text-amber-400" : "text-[#4F46E5]"
            }`}
          >
            <span>View All ({achievementsSummary.total})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {milestoneBadges.slice(0, 8).map((b) => (
            <button
              key={b.id}
              onClick={() => {
                soundFx.playTap();
                setInAchievementsView(true);
              }}
              className={`shrink-0 w-36 p-4 rounded-2xl border-2 text-center space-y-1.5 transition-all text-left ${
                b.isEarned
                  ? isDark
                    ? "bg-[#27272A] border-amber-400/60 text-zinc-100 shadow-md"
                    : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                  : isDark
                  ? "bg-[#18181B] border-[#3F3F46] text-zinc-500 opacity-60"
                  : "bg-zinc-100 border-zinc-300 text-zinc-400 opacity-60"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center border ${
                  b.isEarned
                    ? isDark
                      ? "bg-amber-400/20 text-amber-400 border-amber-400/30"
                      : "bg-[#FEF08A] text-[#1E1B18] border-[#1E1B18]"
                    : "bg-zinc-200 text-zinc-400 border-transparent"
                }`}
              >
                {b.id.includes("streak") ? (
                  <Flame className="w-5 h-5" />
                ) : b.id.includes("foundation") ? (
                  <Cpu className="w-5 h-5" />
                ) : (
                  <Trophy className="w-5 h-5" />
                )}
              </div>
              <div className="text-xs font-black truncate text-center">{b.title}</div>
              <div className={`text-[10px] line-clamp-1 text-center ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                {b.isEarned ? "Unlocked ✓" : `${b.currentValue}/${b.targetValue} ${b.unit}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-modals for Friends/Portfolio */}
      {activeSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-md rounded-3xl p-6 border-2 shadow-2xl space-y-4 ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100"
                : "bg-[#FFFDF9] border-[#1E1B18] text-[#1E1B18] shadow-[5px_5px_0px_#1E1B18]"
            }`}
          >
            <h3 className="text-base font-black uppercase">{activeSubModal}</h3>
            <p className={`text-xs ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              {activeSubModal === "friends" && "Connect with colleagues, trade AI prompts, and challenge peers in the Lab."}
              {activeSubModal === "portfolio" && "All your synthesized prompt templates and solved challenge code are archived here."}
              {activeSubModal === "bookmarks" && "Review saved lessons and interactive playground widgets."}
              {activeSubModal === "certificates" && "Complete all 6 core stages to earn your verified Neural Architect certificate."}
            </p>
            <button
              onClick={() => setActiveSubModal(null)}
              className={`w-full py-2.5 rounded-xl font-black text-xs uppercase ${
                isDark
                  ? "bg-amber-400 text-zinc-950"
                  : "bg-[#4F46E5] text-white border-2 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
