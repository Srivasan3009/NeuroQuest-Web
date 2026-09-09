import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sliders,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Bot,
  RotateCcw,
  Zap
} from "lucide-react";
import { Quest, QuestPhase, Stage, AppTheme } from "../../types";
import { DecisionBoundaryWidget } from "./widgets/DecisionBoundaryWidget";
import { NeuronWeightsWidget } from "./widgets/NeuronWeightsWidget";
import { TokenEmbeddingWidget } from "./widgets/TokenEmbeddingWidget";
import { PromptTuningWidget } from "./widgets/PromptTuningWidget";
import { AgentLoopWidget } from "./widgets/AgentLoopWidget";
import { triggerCelebrationConfetti } from "../../utils/confetti";

interface QuestViewProps {
  quest: Quest;
  stage: Stage;
  onBackToJourney: () => void;
  onCompleteQuest: (questId: string, xpReward: number, skillTag: string) => void;
  onOpenTutor: (questTitle: string, phase: string) => void;
  onNavigateNextQuest?: (nextQuestId: string) => void;
  theme?: AppTheme;
}

export const QuestView: React.FC<QuestViewProps> = ({
  quest,
  stage,
  onBackToJourney,
  onCompleteQuest,
  onOpenTutor,
  onNavigateNextQuest,
  theme = "riso-pop"
}) => {
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";
  const [phase, setPhase] = useState<QuestPhase>("learn");
  const [interactSolved, setInteractSolved] = useState(false);
  const [solveSolved, setSolveSolved] = useState(false);
  const [selectedProveOption, setSelectedProveOption] = useState<string | null>(null);
  const [proveSubmitted, setProveSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);

  const handleNextPhase = () => {
    if (phase === "learn") setPhase("interact");
    else if (phase === "interact") setPhase("solve");
    else if (phase === "solve") setPhase("prove");
    else if (phase === "prove") {
      setPhase("reward");
      setIsCompleted(true);
      triggerCelebrationConfetti();
      onCompleteQuest(quest.id, quest.xpReward, quest.skillTag);
    }
  };

  const handleProveSubmit = () => {
    if (!selectedProveOption) return;
    setProveSubmitted(true);
    const chosen = quest.prove.options.find((o) => o.id === selectedProveOption);
    if (chosen?.isCorrect) {
      // Allow progression
    }
  };

  const renderWidget = (isSolvePhase: boolean = false) => {
    const onGoalAchieved = (achieved: boolean) => {
      if (isSolvePhase) {
        setSolveSolved(achieved);
      } else {
        setInteractSolved(achieved);
      }
    };

    switch (quest.interact.widgetType) {
      case "decision-boundary":
        return (
          <DecisionBoundaryWidget
            targetAccuracy={isSolvePhase ? 95 : 85}
            onGoalAchieved={(achieved) => onGoalAchieved(achieved)}
          />
        );
      case "neuron-weights":
        return (
          <NeuronWeightsWidget
            targetGate="AND"
            onGoalAchieved={(achieved) => onGoalAchieved(achieved)}
          />
        );
      case "token-embeddings":
        return (
          <TokenEmbeddingWidget
            targetKeyword="Autonomous Neural Agent"
            onGoalAchieved={(achieved) => onGoalAchieved(achieved)}
          />
        );
      case "prompt-tuning":
        return (
          <PromptTuningWidget
            onGoalAchieved={(achieved) => onGoalAchieved(achieved)}
          />
        );
      case "agent-loop":
        return (
          <AgentLoopWidget
            onGoalAchieved={(achieved) => onGoalAchieved(achieved)}
          />
        );
      default:
        return (
          <div
            className={`p-8 text-center rounded-2xl border-2 ${
              isDark
                ? "text-zinc-400 bg-zinc-900 border-zinc-800"
                : "text-zinc-700 bg-white border-[#1E1B18]"
            }`}
          >
            Interactive Module
          </div>
        );
    }
  };

  const phases: { id: QuestPhase; label: string; icon: any }[] = [
    { id: "learn", label: "1. Learn", icon: BookOpen },
    { id: "interact", label: "2. Interact", icon: Sliders },
    { id: "solve", label: "3. Solve", icon: Zap },
    { id: "prove", label: "4. Prove", icon: CheckCircle2 },
    { id: "reward", label: "5. Reward", icon: Award },
  ];

  return (
    <div id="quest-view-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Breadcrumb & Control Bar */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? "border-[#27272A]" : "border-[#1E1B18]"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            id="back-to-journey-btn"
            onClick={onBackToJourney}
            className={`p-2 rounded-xl border-2 transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-mono font-black uppercase ${
              isDark
                ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:text-zinc-100"
                : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Journey</span>
          </button>
          <div>
            <div
              className={`text-[10px] font-mono font-black tracking-widest uppercase ${
                isDark ? "text-amber-400" : "text-[#4F46E5]"
              }`}
            >
              Stage {stage.number}: {stage.title}
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
              {quest.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="open-neuro-tutor-btn"
            onClick={() => onOpenTutor(quest.title, phase)}
            className={`px-3.5 py-2 rounded-xl border-2 text-xs font-mono font-black uppercase flex items-center gap-2 transition-transform active:scale-95 ${
              isDark
                ? "bg-amber-400/10 border-amber-400 text-amber-300 hover:bg-amber-400/20"
                : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            <Bot className="w-4 h-4 stroke-[2.5]" />
            <span>Ask Tutor</span>
          </button>
          <div
            className={`px-3 py-2 rounded-xl border-2 text-xs font-mono font-black flex items-center gap-1.5 ${
              isDark
                ? "bg-[#27272A] border-[#3F3F46] text-amber-300"
                : "bg-[#FFE4E6] border-[#1E1B18] text-[#E11D48] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{quest.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* 5-Step Phase Stepper */}
      <div
        className={`grid grid-cols-5 gap-1.5 p-1.5 border-2 rounded-2xl ${
          isDark
            ? "bg-[#27272A]/80 border-[#3F3F46]"
            : "bg-white border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
        }`}
      >
        {phases.map((p) => {
          const Icon = p.icon;
          const isActive = phase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setPhase(p.id)}
              className={`py-2 px-1 rounded-xl text-xs font-mono font-black flex items-center justify-center gap-1.5 transition-all border ${
                isActive
                  ? isDark
                    ? "bg-amber-400 text-zinc-950 border-amber-500 shadow-md"
                    : "bg-[#1E1B18] text-white border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                  : isDark
                  ? "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  : "border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* PHASE 1: LEARN */}
      {phase === "learn" && (
        <div id="quest-phase-learn" className="space-y-6">
          <div
            className={`border-2 rounded-3xl p-6 sm:p-8 space-y-6 ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100 shadow-xl"
                : "bg-[#FFFDF9] border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] text-[#1E1B18]"
            }`}
          >
            <div className="space-y-2">
              <span
                className={`text-xs font-mono uppercase tracking-widest font-black ${
                  isDark ? "text-amber-400" : "text-[#4F46E5]"
                }`}
              >
                Conceptual Overview
              </span>
              <h2 className="text-2xl font-black tracking-tight uppercase">
                {quest.learn.title}
              </h2>
              <p
                className={`text-sm leading-relaxed max-w-3xl ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {quest.learn.summary}
              </p>
            </div>

            {/* Key concepts cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {(quest.learn.keyConcepts || []).map((item, idx) => (
                <div
                  key={idx}
                  className={`border-2 rounded-2xl p-4 space-y-2 ${
                    isDark
                      ? "bg-[#27272A] border-[#3F3F46]"
                      : "bg-white border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                  }`}
                >
                  <div
                    className={`text-xs font-mono font-black uppercase ${
                      isDark ? "text-amber-400" : "text-[#4F46E5]"
                    }`}
                  >
                    {item.term}
                  </div>
                  <div
                    className={`text-xs leading-relaxed ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {item.definition}
                  </div>
                </div>
              ))}
            </div>

            {/* Markdown deep dive */}
            <div
              className={`border-2 rounded-2xl p-5 text-xs font-mono whitespace-pre-wrap leading-relaxed ${
                isDark
                  ? "bg-[#27272A]/70 border-[#3F3F46] text-zinc-300"
                  : "bg-white border-[#1E1B18] text-zinc-800 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              {quest.learn.contentMarkdown}
            </div>

            {/* Pro Tip */}
            <div
              className={`p-4 border-2 rounded-2xl text-xs flex items-start gap-3 ${
                isDark
                  ? "bg-amber-400/10 border-amber-400 text-amber-300"
                  : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <div>
                <span className="font-black uppercase tracking-wider text-[11px] font-mono block mb-0.5">
                  Neuro Intuition Note
                </span>
                <span className="font-medium">{quest.learn.proTip}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              id="continue-to-interact-btn"
              onClick={handleNextPhase}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 ${
                isDark
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md"
                  : "bg-[#1E1B18] text-white hover:bg-black border-2 border-[#1E1B18] shadow-[4px_4px_0px_#1E1B18]"
              }`}
            >
              <span>Proceed to Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: INTERACT */}
      {phase === "interact" && (
        <div id="quest-phase-interact" className="space-y-6">
          <div
            className={`border-2 rounded-3xl p-6 space-y-2 ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100"
                : "bg-[#FFFDF9] border-[#1E1B18] shadow-[4px_4px_0px_#1E1B18] text-[#1E1B18]"
            }`}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider font-black ${
                isDark ? "text-amber-400" : "text-[#4F46E5]"
              }`}
            >
              Interactive Experimentation
            </span>
            <h2 className="text-xl font-black tracking-tight uppercase">
              {quest.interact.title}
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              {quest.interact.instruction}
            </p>
          </div>

          {/* Render the interactive widget */}
          {renderWidget(false)}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPhase("learn")}
              className={`px-4 py-2.5 rounded-xl border-2 text-xs font-mono font-black uppercase transition-colors ${
                isDark
                  ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-100 bg-[#27272A]"
                  : "border-[#1E1B18] text-[#1E1B18] bg-white hover:bg-zinc-100 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              ← Review Concept
            </button>
            <button
              id="continue-to-solve-btn"
              onClick={handleNextPhase}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 ${
                isDark
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md"
                  : "bg-[#1E1B18] text-white hover:bg-black border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
              }`}
            >
              <span>Advance to Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: SOLVE */}
      {phase === "solve" && (
        <div id="quest-phase-solve" className="space-y-6">
          <div
            className={`border-2 rounded-3xl p-6 space-y-4 ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100"
                : "bg-[#FFFDF9] border-[#1E1B18] shadow-[4px_4px_0px_#1E1B18] text-[#1E1B18]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-black ${
                  isDark ? "text-amber-400" : "text-[#4F46E5]"
                }`}
              >
                Objective Mission
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  solveSolved
                    ? "bg-emerald-500/20 text-emerald-600 border-emerald-500"
                    : isDark
                    ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                    : "bg-zinc-100 text-zinc-600 border-zinc-300"
                }`}
              >
                Status: {solveSolved ? "Satisfied" : "Pending"}
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight uppercase">
              {quest.solve.title}
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              {quest.solve.missionBrief}
            </p>

            <div
              className={`p-3.5 border-2 rounded-2xl text-xs font-mono flex items-center gap-2 ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46] text-amber-300"
                  : "bg-[#FEF08A]/50 border-[#1E1B18] text-[#1E1B18]"
              }`}
            >
              <span className="font-black uppercase">Target:</span>
              <span className="font-bold">{quest.solve.targetObjective}</span>
            </div>
          </div>

          {/* Interactive Challenge Canvas */}
          {renderWidget(true)}

          {/* Progressive Hint Drawer */}
          <div
            className={`border-2 rounded-2xl p-4 space-y-3 ${
              isDark ? "bg-[#18181B] border-[#3F3F46]" : "bg-white border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Need Guidance? ({hintsUnlocked}/2 hints unlocked)</span>
              </span>
              {hintsUnlocked < 2 && (
                <button
                  onClick={() => setHintsUnlocked((prev) => prev + 1)}
                  className={`text-xs font-mono font-black uppercase underline ${
                    isDark ? "text-amber-400 hover:text-amber-300" : "text-[#4F46E5] hover:text-[#4338CA]"
                  }`}
                >
                  Unlock Hint #{hintsUnlocked + 1}
                </button>
              )}
            </div>

            {hintsUnlocked >= 1 && (
              <div
                className={`p-3 border-2 rounded-xl text-xs ${
                  isDark
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    : "bg-[#FEF9C3] border-[#1E1B18] text-[#1E1B18]"
                }`}
              >
                <strong>Hint 1:</strong> {quest.solve.firstHint}
              </div>
            )}
            {hintsUnlocked >= 2 && (
              <div
                className={`p-3 border-2 rounded-xl text-xs ${
                  isDark
                    ? "bg-zinc-800 border-zinc-600 text-zinc-200"
                    : "bg-[#EEF2FF] border-[#1E1B18] text-[#1E1B18]"
                }`}
              >
                <strong>Hint 2:</strong> {quest.solve.secondHint}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPhase("interact")}
              className={`px-4 py-2.5 rounded-xl border-2 text-xs font-mono font-black uppercase transition-colors ${
                isDark
                  ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-100 bg-[#27272A]"
                  : "border-[#1E1B18] text-[#1E1B18] bg-white hover:bg-zinc-100 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              ← Back to Sandbox
            </button>
            <button
              id="continue-to-prove-btn"
              onClick={handleNextPhase}
              disabled={!solveSolved}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-40 ${
                isDark
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md"
                  : "bg-[#1E1B18] text-white hover:bg-black border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
              }`}
            >
              <span>Prove Comprehension</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: PROVE */}
      {phase === "prove" && (
        <div id="quest-phase-prove" className="space-y-6">
          <div
            className={`border-2 rounded-3xl p-6 sm:p-8 space-y-4 ${
              isDark
                ? "bg-[#18181B] border-[#3F3F46] text-zinc-100"
                : "bg-[#FFFDF9] border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] text-[#1E1B18]"
            }`}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider font-black ${
                isDark ? "text-amber-400" : "text-[#4F46E5]"
              }`}
            >
              Comprehension Check
            </span>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
              {quest.prove.question}
            </h2>
            <div
              className={`p-3.5 border-2 rounded-2xl text-xs italic ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46] text-zinc-300"
                  : "bg-white border-[#1E1B18] text-zinc-700 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              Scenario: {quest.prove.scenario}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {(quest.prove.options || []).map((opt) => {
                const isSelected = selectedProveOption === opt.id;
                const showFeedback = proveSubmitted;

                let cardStyle = isDark
                  ? "bg-[#27272A] border-[#3F3F46] text-zinc-200 hover:border-zinc-500"
                  : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-50 shadow-[2px_2px_0px_#1E1B18]";

                if (isSelected && !showFeedback) {
                  cardStyle = isDark
                    ? "bg-amber-400/20 border-amber-400 text-amber-200"
                    : "bg-[#EEF2FF] border-[#4F46E5] text-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]";
                } else if (showFeedback) {
                  if (opt.isCorrect) {
                    cardStyle = isDark
                      ? "bg-emerald-950/50 border-emerald-500 text-emerald-200"
                      : "bg-[#ECFDF5] border-emerald-700 text-emerald-950 shadow-[3px_3px_0px_#047857]";
                  } else if (isSelected && !opt.isCorrect) {
                    cardStyle = isDark
                      ? "bg-rose-950/50 border-rose-500 text-rose-200"
                      : "bg-[#FFF1F2] border-rose-700 text-rose-950 shadow-[3px_3px_0px_#BE123C]";
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => !proveSubmitted && setSelectedProveOption(opt.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black font-mono ${
                          isSelected
                            ? isDark
                              ? "border-amber-400 bg-amber-400 text-zinc-950"
                              : "border-[#1E1B18] bg-[#4F46E5] text-white"
                            : isDark
                            ? "border-zinc-600"
                            : "border-[#1E1B18]"
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </div>
                      <div className="space-y-1 text-xs leading-relaxed font-bold">
                        <div>{opt.text}</div>
                        {showFeedback && (isSelected || opt.isCorrect) && (
                          <p
                            className={`text-[11px] font-mono pt-1 font-bold ${
                              opt.isCorrect
                                ? isDark
                                  ? "text-emerald-400"
                                  : "text-emerald-800"
                                : isDark
                                ? "text-rose-400"
                                : "text-rose-800"
                            }`}
                          >
                            {opt.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deep Dive Note when completed */}
            {proveSubmitted && (
              <div
                className={`p-4 border-2 rounded-2xl space-y-1 ${
                  isDark
                    ? "bg-[#27272A] border-[#3F3F46]"
                    : "bg-[#FEF08A]/60 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
                }`}
              >
                <span
                  className={`text-[11px] font-mono uppercase font-black ${
                    isDark ? "text-amber-400" : "text-[#4F46E5]"
                  }`}
                >
                  Engineering Takeaway:
                </span>
                <p className={`text-xs leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-800"}`}>
                  {quest.prove.deepDiveExplanation}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPhase("solve")}
              className={`px-4 py-2.5 rounded-xl border-2 text-xs font-mono font-black uppercase transition-colors ${
                isDark
                  ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-100 bg-[#27272A]"
                  : "border-[#1E1B18] text-[#1E1B18] bg-white hover:bg-zinc-100 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              ← Back to Mission
            </button>

            {!proveSubmitted ? (
              <button
                id="submit-prove-answer-btn"
                onClick={handleProveSubmit}
                disabled={!selectedProveOption}
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-transform active:scale-95 disabled:opacity-40 ${
                  isDark
                    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md"
                    : "bg-[#1E1B18] text-white hover:bg-black border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                }`}
              >
                Validate Answer
              </button>
            ) : (
              <button
                id="claim-quest-reward-btn"
                onClick={handleNextPhase}
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 ${
                  isDark
                    ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-md"
                    : "bg-[#059669] text-white hover:bg-emerald-700 border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                }`}
              >
                <span>Claim XP & Finish Quest</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* PHASE 5: REWARD */}
      {phase === "reward" && (
        <div
          id="quest-phase-reward"
          className={`border-2 rounded-3xl p-8 text-center space-y-6 ${
            isDark
              ? "bg-[#18181B] border-[#3F3F46] text-zinc-100 shadow-2xl"
              : "bg-[#FFFDF9] border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] text-[#1E1B18]"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-3xl border-2 flex items-center justify-center mx-auto shadow-md ${
              isDark
                ? "bg-amber-400/20 border-amber-400 text-amber-300"
                : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18]"
            }`}
          >
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span
              className={`text-xs font-mono uppercase tracking-widest font-black ${
                isDark ? "text-emerald-400" : "text-[#059669]"
              }`}
            >
              Mission Accomplished
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Quest Completed!
            </h2>
            <p className={`text-sm max-w-md mx-auto ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              You mastered <span className="font-black uppercase">{quest.title}</span> and proved
              your conceptual mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
            <div
              className={`border-2 p-3.5 rounded-2xl ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46]"
                  : "bg-white border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <div className={`text-[11px] font-mono font-bold ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                XP Awarded
              </div>
              <div className="text-lg font-black font-mono text-amber-500">+{quest.xpReward} XP</div>
            </div>
            <div
              className={`border-2 p-3.5 rounded-2xl ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46]"
                  : "bg-white border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <div className={`text-[11px] font-mono font-bold ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Skill Advanced
              </div>
              <div className="text-sm font-black truncate">{quest.skillTag}</div>
            </div>
            <div
              className={`border-2 p-3.5 rounded-2xl ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46]"
                  : "bg-white border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <div className={`text-[11px] font-mono font-bold ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Badge Unlocked
              </div>
              <div className="text-sm font-black truncate text-emerald-600 dark:text-emerald-400">
                {quest.badgeTitle || "Mastery"}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              id="return-journey-finish-btn"
              onClick={onBackToJourney}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl border-2 text-xs font-mono font-black uppercase transition-transform active:scale-95 ${
                isDark
                  ? "bg-[#27272A] border-[#3F3F46] text-zinc-300 hover:text-zinc-100"
                  : "bg-white border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-100 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              Return to Journey Path
            </button>
            {onNavigateNextQuest && (
              <button
                id="next-quest-btn"
                onClick={() => onNavigateNextQuest("next")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl border-2 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                  isDark
                    ? "bg-amber-400 border-amber-500 text-zinc-950 hover:bg-amber-300 shadow-md"
                    : "bg-[#1E1B18] border-[#1E1B18] text-white hover:bg-black shadow-[3px_3px_0px_#1E1B18]"
                }`}
              >
                <span>Continue to Next Quest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
