import { TutorDifficulty, TutorMode } from "../types";

export interface TutorRequestParams {
  prompt: string;
  questTitle?: string;
  stageTitle?: string;
  currentPhase?: string;
  difficulty?: TutorDifficulty;
  mode?: TutorMode;
  history?: { role: string; text: string }[];
}

export interface TutorResponse {
  reply: string;
  source: "gemini" | "pedagogical_engine" | "fallback";
  status: "success" | "partial" | "error";
}

export async function askNeuroTutor(params: TutorRequestParams): Promise<TutorResponse> {
  try {
    const res = await fetch("/api/tutor/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      reply: data.reply || "I am ready to help you analyze this concept.",
      source: data.source || "gemini",
      status: data.status || "success",
    };
  } catch (err) {
    console.warn("Tutor API call fell back to local pedagogical responder:", err);
    // Offline / Network fallback
    return {
      reply: `**Neuro Socratic Guidance:**\nWhen exploring **${params.questTitle || "this topic"}**, keep in mind how the optimization goal is represented mathematically. Try perturbing one parameter at a time and note the resulting change in error or output!`,
      source: "fallback",
      status: "partial",
    };
  }
}
