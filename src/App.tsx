import React, { useState, useEffect } from "react";
import { Stage, Quest, UserProfile, Course, AppTheme, MascotRole } from "./types";
import { STAGES_CURRICULUM } from "./data/curriculum";
import { AVAILABLE_COURSES } from "./data/courses";
import { dataStore } from "./services/storage";
import { BottomNav, NavTab } from "./components/layout/BottomNav";
import { TopHeader } from "./components/layout/TopHeader";
import { HomePathView } from "./components/home/HomePathView";
import { LabView } from "./components/lab/LabView";
import { LeagueView } from "./components/league/LeagueView";
import { YouView } from "./components/you/YouView";
import { QuestView } from "./components/quest/QuestView";
import { NeuroTutorDrawer } from "./components/tutor/NeuroTutorDrawer";
import { CoursePickerModal } from "./components/modals/CoursePickerModal";
import { SparksModal } from "./components/modals/SparksModal";
import { StreakModal } from "./components/modals/StreakModal";
import { DailyGiftModal } from "./components/modals/DailyGiftModal";

export default function App() {
  const [stages] = useState<Stage[]>(STAGES_CURRICULUM);
  const [courses] = useState<Course[]>(AVAILABLE_COURSES);
  const [activeCourse, setActiveCourse] = useState<Course>(AVAILABLE_COURSES[0]);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<NavTab | "quest">("home");
  const [activeQuest, setActiveQuest] = useState<{ quest: Quest; stage: Stage } | null>(null);

  // Modals
  const [isCoursePickerOpen, setIsCoursePickerOpen] = useState(false);
  const [isSparksModalOpen, setIsSparksModalOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const [tutorContext, setTutorContext] = useState({
    questTitle: "Artificial Intelligence Foundations",
    stageTitle: "AI Foundations",
    phase: "Learn",
  });

  // Load user profile on startup
  useEffect(() => {
    async function loadData() {
      const profile = await dataStore.getUserProfile();
      setUser(profile);
    }
    loadData();
  }, []);

  const handleSelectQuest = (quest: Quest, stage: Stage) => {
    setActiveQuest({ quest, stage });
    setTutorContext({
      questTitle: quest.title,
      stageTitle: stage.title,
      phase: "Learn",
    });
    setCurrentTab("quest");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteQuest = async (questId: string, xpReward: number, skillTag: string) => {
    const updated = await dataStore.completeQuest(questId, xpReward, skillTag);
    // Also award +10 sparks on completion!
    const withSparks = await dataStore.addSparks(10);
    setUser(withSparks);
  };

  const handleClaimChest = async (chestId: string, rewardSparks: number, rewardXP: number) => {
    const updated = await dataStore.claimChest(chestId, rewardSparks, rewardXP);
    setUser(updated);
  };

  const handleAddXP = async (amount: number) => {
    const updated = await dataStore.addXP(amount);
    setUser(updated);
  };

  const handleAddSparks = async (amount: number) => {
    const updated = await dataStore.addSparks(amount);
    setUser(updated);
  };

  const handleSetTheme = async (theme: AppTheme) => {
    const updated = await dataStore.setTheme(theme);
    setUser(updated);
  };

  const handleSetMascotRole = async (role: MascotRole) => {
    const updated = await dataStore.setMascotRole(role);
    setUser(updated);
  };

  const handleResetProgress = async () => {
    const reset = await dataStore.resetProgress();
    setUser(reset);
    setCurrentTab("home");
  };

  const handleNavigateNextQuest = () => {
    if (!activeQuest) return;
    let foundCurrent = false;
    let nextQ: { quest: Quest; stage: Stage } | null = null;

    for (const st of stages) {
      for (const q of st.quests) {
        if (foundCurrent) {
          nextQ = { quest: q, stage: st };
          break;
        }
        if (q.id === activeQuest.quest.id) {
          foundCurrent = true;
        }
      }
      if (nextQ) break;
    }

    if (nextQ) {
      handleSelectQuest(nextQ.quest, nextQ.stage);
    } else {
      setCurrentTab("home");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex items-center justify-center text-[#1E1B18] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-ping" />
          <span className="font-bold">Initializing AI Learning Engine...</span>
        </div>
      </div>
    );
  }

  // Normalize theme away from old cyber-dark
  const activeTheme: AppTheme =
    !user.theme || user.theme === "cyber-dark"
      ? "riso-pop"
      : user.theme;

  const isRiso = activeTheme === "riso-pop" || activeTheme === "warm-editorial";

  // Theme-specific root wrapper style
  let themeBg = "bg-[#FBF9F4] text-[#1E1B18]";
  if (activeTheme === "minimal-light") themeBg = "bg-[#FAFAFA] text-[#09090B]";
  if (activeTheme === "obsidian-gold" || activeTheme === "obsidian-noir") themeBg = "bg-[#18181B] text-[#F4F4F5]";

  return (
    <div
      className={`min-h-screen ${themeBg} font-sans selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] transition-colors duration-300 relative overflow-x-hidden`}
    >
      {/* Main Mobile App Frame Container (max-w-lg mx-auto for pristine app feel on all viewports) */}
      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col">
        {/* Top Header (Shown on Home, Lab, League, You) */}
        {currentTab !== "quest" && (
          <TopHeader
            user={user}
            activeCourse={activeCourse}
            onOpenCoursePicker={() => setIsCoursePickerOpen(true)}
            onOpenSparksModal={() => setIsSparksModalOpen(true)}
            onOpenStreakModal={() => setIsStreakModalOpen(true)}
            onOpenGiftModal={() => setIsGiftModalOpen(true)}
            theme={activeTheme}
          />
        )}

        {/* Dynamic View Body */}
        <main className="flex-1">
          {currentTab === "home" && (
            <HomePathView
              stages={stages}
              user={user}
              onSelectQuest={handleSelectQuest}
              onClaimChest={handleClaimChest}
              onOpenTutor={() => setIsTutorOpen(true)}
              onAddXP={handleAddXP}
              theme={activeTheme}
            />
          )}

          {currentTab === "lab" && (
            <LabView
              user={user}
              stages={stages}
              onStartLesson={(q, st) => handleSelectQuest(q, st)}
              onAddSparks={handleAddSparks}
              theme={activeTheme}
            />
          )}

          {currentTab === "league" && (
            <LeagueView user={user} theme={activeTheme} />
          )}

          {currentTab === "you" && (
            <YouView
              user={user}
              stages={stages}
              onSetTheme={handleSetTheme}
              onSetMascotRole={handleSetMascotRole}
              onAddSparks={handleAddSparks}
              onResetProgress={handleResetProgress}
              onSetStreakDays={async (days) => {
                const updated = await dataStore.setStreakDays(days);
                setUser(updated);
              }}
              onCompleteQuest={handleCompleteQuest}
              theme={activeTheme}
            />
          )}

          {currentTab === "quest" && activeQuest && (
            <QuestView
              quest={activeQuest.quest}
              stage={activeQuest.stage}
              onBackToJourney={() => setCurrentTab("home")}
              onCompleteQuest={handleCompleteQuest}
              onOpenTutor={(title, phase) => {
                setTutorContext((prev) => ({
                  ...prev,
                  questTitle: title || prev.questTitle,
                  phase: phase || prev.phase,
                }));
                setIsTutorOpen(true);
              }}
              onNavigateNextQuest={handleNavigateNextQuest}
              theme={activeTheme}
            />
          )}
        </main>

        {/* Persistent 5-Tab Bottom Dock (Hidden only when in full quest challenge mode) */}
        {currentTab !== "quest" && (
          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            theme={activeTheme}
          />
        )}
      </div>

      {/* Socratic Neuro AI Tutor Drawer */}
      <NeuroTutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        activeQuestTitle={tutorContext.questTitle}
        activeStageTitle={tutorContext.stageTitle}
        activePhase={tutorContext.phase}
        theme={activeTheme}
      />

      {/* Modal: Course Picker */}
      <CoursePickerModal
        isOpen={isCoursePickerOpen}
        onClose={() => setIsCoursePickerOpen(false)}
        courses={courses}
        activeCourseId={activeCourse.id}
        onSelectCourse={(c) => setActiveCourse(c)}
        theme={activeTheme}
      />

      {/* Modal: Sparks Refill & Demo */}
      <SparksModal
        isOpen={isSparksModalOpen}
        onClose={() => setIsSparksModalOpen(false)}
        currentSparks={user.sparks ?? 45}
        onAddSparks={handleAddSparks}
        theme={activeTheme}
      />

      {/* Modal: Streak Calendar */}
      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakDays={user.streakDays || 1}
        theme={activeTheme}
      />

      {/* Modal: Daily Gift Box */}
      <DailyGiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        onClaimReward={async (sparks, xp) => {
          await dataStore.addSparks(sparks);
          const updated = await dataStore.getUserProfile();
          setUser(updated);
        }}
        theme={activeTheme}
      />
    </div>
  );
}
