import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Neuro AI Tutor Endpoint
app.post("/api/tutor/message", async (req, res) => {
  try {
    const {
      prompt,
      questTitle,
      stageTitle,
      currentPhase,
      difficulty = "intermediate",
      mode = "chat",
      history = [],
    } = req.body;

    const ai = getAI();

    // Fallback response generator if Gemini key is missing or calls encounter temporary limits
    const getFallbackResponse = (userPrompt: string, reqMode: string, diff: string) => {
      const topic = questTitle || "Artificial Intelligence";
      if (reqMode === "hint") {
        return `**Socratic Hint for ${topic}:**\nThink about what the model optimizes for. If you adjust the parameter or loss penalty slightly, observe which data points switch classification first. Where is the boundary line most sensitive?`;
      }
      if (reqMode === "misconceptions") {
        return `**Common Misconceptions in ${topic}:**\n1. **"More parameters always mean better performance"** — without adequate data and regularization, oversized models suffer from overfitting.\n2. **"Neural networks think like human brains"** — in reality, they compute high-dimensional linear combinations followed by non-linear activations.\n3. **"AI models understand truth"** — LLMs predict the most statistically probable next token based on their training distribution.`;
      }
      if (reqMode === "practice") {
        return `**Neuro Quick Practice on ${topic} (${diff}):**\nSuppose a classifier achieves 99% accuracy on a dataset where 99% of images are "cats" and 1% are "dogs".\n*Question:* Why is accuracy a misleading metric here, and what metric should you inspect instead? (Hint: Think about class imbalance and Recall / F1-Score).`;
      }
      if (diff === "beginner") {
        return `Imagine **${topic}** like learning to ride a bicycle: rather than memorizing every possible pebble on the road, you adjust your balance based on feedback until you can handle any smooth or bumpy path automatically. What specific part would you like to explore next?`;
      }
      return `In **${topic}**, the core mechanism relies on iterative optimization and structured representation. When working through the ${currentPhase || "current"} phase, focus on observing how shifting the hyper-parameters directly alters the decision boundary or generated distribution.\n\nWould you like to analyze an example or test your intuition with a rapid challenge?`;
    };

    if (!ai) {
      // Return high-quality pedagogical fallback immediately
      return res.json({
        reply: getFallbackResponse(prompt, mode, difficulty),
        source: "pedagogical_engine",
        status: "success",
      });
    }

    const systemInstruction = `You are Neuro AI, the dedicated pedagogical AI tutor inside NeuroQuest (an interactive AI learning platform).
Your motto is: "Learn → Interact → Solve → Prove".
Your goal is to guide students toward genuine deep intuition and mathematical/conceptual clarity.
RULES:
1. Never just hand out direct answers to challenges. Guide with Socratic questions, analogies, and step-by-step intuition.
2. Tone: Crisp, encouraging, technically rigorous yet approachable, like a top computer science professor and mentor.
3. Current Context:
   - Quest: "${questTitle || "General AI"}"
   - Stage: "${stageTitle || "Foundations"}"
   - Learning Phase: "${currentPhase || "Learn"}"
   - Learner Difficulty Setting: "${difficulty}" (Beginner = vivid real-world analogies, Intermediate = balanced mechanics, Advanced = mathematical formulation and trade-offs).
   - Mode: "${mode}" (explain, hint, misconceptions, practice, chat).
4. Use clean Markdown formatting with bold headers and concise bullet points. Avoid robotic filler phrases.`;

    const userMessageContent = `Learner Prompt: ${prompt}
Mode requested: ${mode}
Difficulty level: ${difficulty}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userMessageContent,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || getFallbackResponse(prompt, mode, difficulty);

    res.json({
      reply,
      source: "gemini",
      status: "success",
    });
  } catch (err: any) {
    console.error("Neuro AI error:", err);
    res.json({
      reply: `I ran into an issue connecting to the inference engine, but here is guidance for your quest:\n\nRemember to verify the fundamental mechanics first: check your input dimensions, inspect the loss progression, and test edge cases. What specific step in the interactive exercise are you trying to resolve?`,
      source: "fallback",
      status: "partial",
    });
  }
});

// Playground Prompt Engineering Lab Execution
app.post("/api/playground/prompt-run", async (req, res) => {
  try {
    const {
      systemPrompt = "",
      userPrompt = "",
      temperature = 0.7,
      topP = 0.95,
      version = "A",
    } = req.body;

    const startTime = Date.now();
    const ai = getAI();

    if (!ai) {
      const simulatedOutput = `[Execution Simulator - Version ${version}]
Analysis: Temperature=${temperature}, TopP=${topP}
Prompt: "${userPrompt}"

Output:
Based on the provided constraints, here is the structured analysis:
1. Core intent identified: ${userPrompt.slice(0, 40)}...
2. Determinism factor: ${temperature < 0.3 ? "High determinism (focused, predictable output)" : "Higher variance (creative exploration allowed)"}
3. The response adapts directly to your system directive: "${systemPrompt || "Default helpful assistant"}"`;

      const latencyMs = Math.floor(Math.random() * 200) + 180;
      const tokenCount = Math.floor((userPrompt.length + systemPrompt.length + simulatedOutput.length) / 4);

      return res.json({
        output: simulatedOutput,
        latencyMs,
        tokenCount,
        source: "simulator",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt || "Hello AI",
      config: {
        systemInstruction: systemPrompt || undefined,
        temperature: Number(temperature),
        topP: Number(topP),
      },
    });

    const latencyMs = Date.now() - startTime;
    const outputText = response.text || "No output generated.";
    const tokenCount = Math.round((userPrompt.length + (systemPrompt?.length || 0) + outputText.length) / 3.8);

    res.json({
      output: outputText,
      latencyMs,
      tokenCount,
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Playground error:", err);
    res.status(500).json({
      error: err.message || "Failed to execute prompt in playground",
    });
  }
});

// Supabase Integration Health / Config check
app.get("/api/supabase/status", (_req, res) => {
  const isConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
  res.json({
    configured: isConfigured,
    mode: isConfigured ? "cloud_synced" : "client_persistence",
    tables: ["profiles", "user_progress", "completed_quests", "achievements"],
    notice: isConfigured
      ? "Supabase cloud database is connected"
      : "Running in self-contained local storage adapter mode. Set SUPABASE_URL and SUPABASE_ANON_KEY to sync to cloud.",
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NeuroQuest Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
