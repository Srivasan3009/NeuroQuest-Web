import React from "react";
import { X, Check, BookOpen, Sparkles, Bot, Cpu, Film, TrendingUp } from "lucide-react";
import { Course, AppTheme } from "../../types";
import { soundFx } from "../../utils/sound";

interface CoursePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  activeCourseId: string;
  onSelectCourse: (course: Course) => void;
  theme?: AppTheme;
}

export const CoursePickerModal: React.FC<CoursePickerModalProps> = ({
  isOpen,
  onClose,
  courses,
  activeCourseId,
  onSelectCourse,
  theme = "riso-pop"
}) => {
  if (!isOpen) return null;
  const isDark = theme === "obsidian-gold" || theme === "obsidian-noir";

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-[#4F46E5]"}`} />;
      case "Bot":
        return <Bot className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-[#4F46E5]"}`} />;
      case "Sparkles":
        return <Sparkles className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-[#EA580C]"}`} />;
      case "Film":
        return <Film className={`w-5 h-5 ${isDark ? "text-rose-400" : "text-[#E11D48]"}`} />;
      case "TrendingUp":
        return <TrendingUp className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-[#059669]"}`} />;
      default:
        return <BookOpen className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-[#4F46E5]"}`} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto transition-all ${
          isDark
            ? "bg-[#18181B] border-2 border-[#3F3F46] shadow-2xl text-zinc-100"
            : "bg-[#FFFDF9] border-2 border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] text-[#1E1B18]"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-3 border-b ${
            isDark ? "border-[#27272A]" : "border-[#1E1B18]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 ${
                isDark
                  ? "bg-amber-400/10 border-amber-400 text-amber-300"
                  : "bg-[#FEF08A] border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div
                className={`text-[10px] font-mono uppercase tracking-widest font-black ${
                  isDark ? "text-amber-400" : "text-[#4F46E5]"
                }`}
              >
                CURRICULUM
              </div>
              <h2 className="text-lg font-black tracking-tight uppercase">Pick a course</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl border-2 transition-colors ${
              isDark
                ? "border-[#3F3F46] text-zinc-400 hover:text-zinc-100"
                : "border-[#1E1B18] text-[#1E1B18] bg-white hover:bg-zinc-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course items */}
        <div className="space-y-2.5">
          {courses.map((course) => {
            const isSelected = course.id === activeCourseId;
            return (
              <button
                key={course.id}
                onClick={() => {
                  soundFx.playTap();
                  onSelectCourse(course);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3.5 border-2 ${
                  isSelected
                    ? isDark
                      ? "bg-[#27272A] border-amber-400 shadow-md"
                      : "bg-[#EEF2FF] border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                    : isDark
                    ? "bg-[#27272A]/50 border-[#3F3F46] hover:border-zinc-500 text-zinc-300"
                    : "bg-white border-[#1E1B18]/30 hover:border-[#1E1B18] text-[#1E1B18]"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 border ${
                    isSelected
                      ? isDark
                        ? "bg-amber-400/20 border-amber-400/40"
                        : "bg-[#FEF08A] border-[#1E1B18]"
                      : isDark
                      ? "bg-[#18181B] border-[#3F3F46]"
                      : "bg-[#FFFDF9] border-zinc-200"
                  }`}
                >
                  {getIcon(course.icon)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                        isDark
                          ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                          : "bg-zinc-100 text-zinc-700 border-zinc-300"
                      }`}
                    >
                      {course.tag}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {course.lessonsCount} lessons
                    </span>
                  </div>
                  <h3 className="font-black text-sm sm:text-base mt-1 leading-snug">
                    {course.title}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 line-clamp-2 ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {course.subtitle}
                  </p>
                </div>

                {isSelected && (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 border ${
                      isDark
                        ? "bg-amber-400 text-zinc-950 border-amber-500"
                        : "bg-[#4F46E5] text-white border-[#1E1B18]"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div
          className={`pt-2 text-center text-xs font-mono ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Switch courses anytime without losing your quest progress.
        </div>
      </div>
    </div>
  );
};
