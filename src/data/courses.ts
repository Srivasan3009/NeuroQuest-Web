import { Course } from "../types";

export const AVAILABLE_COURSES: Course[] = [
  {
    id: "ai-foundations",
    title: "AI Foundations & Deep Learning",
    subtitle: "From Classical Code to Self-Attention & Autonomous Systems",
    tag: "Core Track",
    lessonsCount: 26,
    icon: "Cpu"
  },
  {
    id: "ai-agents",
    title: "Autonomous Agents & Tool Calling",
    subtitle: "ReAct loops, environment actions, memory, and cognitive architectures",
    tag: "Advanced",
    lessonsCount: 18,
    icon: "Bot"
  },
  {
    id: "generative-ai",
    title: "Generative AI & LLM Systems",
    subtitle: "Token embeddings, temperature calibration, and prompt engineering",
    tag: "Popular",
    lessonsCount: 22,
    icon: "Sparkles"
  },
  {
    id: "trends-memes",
    title: "Trends & Meme-Based AI",
    subtitle: "Virality models, diffusion humor, and real-time AI shifts",
    tag: "Community",
    lessonsCount: 10,
    icon: "TrendingUp"
  },
  {
    id: "vision-ai",
    title: "Video & Vision AI Masterclass",
    subtitle: "Multimodal frames, zero-shot segmentation, and generative video",
    tag: "New",
    lessonsCount: 14,
    icon: "Film"
  }
];
