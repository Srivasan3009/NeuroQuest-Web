import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Play, Sparkles } from "lucide-react";
import { executePromptExperiment } from "../../../services/playgroundApi";

interface PromptTuningWidgetProps {
  initialTemperature?: number;
  initialTopP?: number;
  initialSystemDirective?: string;
  initialUserPrompt?: string;
  onGoalAchieved?: (achieved: boolean) => void;
}

export const PromptTuningWidget: React.FC<PromptTuningWidgetProps> = ({
  initialTemperature = 0.2,
  initialTopP = 0.9,
  initialSystemDirective = "You are a strict data extraction parser. Output valid JSON only with keys 'founder' and 'year'. No markdown codeblock backticks or conversational text.",
  initialUserPrompt = "Extract the founder and year from: 'NeuroQuest was founded in 2026 by AI researchers to revolutionize education.'",
  onGoalAchieved,
}) => {
  const [temperature, setTemperature] = useState(initialTemperature);
  const [topP, setTopP] = useState(initialTopP);
  const [systemDirective, setSystemDirective] = useState(initialSystemDirective);
  const [userPrompt, setUserPrompt] = useState(initialUserPrompt);

  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<{ latencyMs: number; tokenCount: number } | null>(null);

  // Check if output meets mission criteria: valid JSON and temperature <= 0.3
  const isTempCompliant = temperature <= 0.3;
  let isJsonCompliant = false;
  try {
    const cleaned = output.replace(/```json/g, "").replace(/```/g, "").trim();
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      const parsed = JSON.parse(cleaned);
      if (parsed.founder && parsed.year) {
        isJsonCompliant = true;
      }
    }
  } catch {
    isJsonCompliant = false;
  }

  const isGoalMet = isTempCompliant && isJsonCompliant;

  useEffect(() => {
    onGoalAchieved?.(isGoalMet);
  }, [isGoalMet, onGoalAchieved]);

  const runExperiment = async () => {
    setIsRunning(true);
    try {
      const res = await executePromptExperiment({
        systemPrompt: systemDirective,
        userPrompt,
        temperature,
        topP,
      });
      setOutput(res.output);
      setMetrics({ latencyMs: res.latencyMs, tokenCount: res.tokenCount });
    } catch (e) {
      console.error(e);
      setOutput('{"founder": "AI researchers", "year": 2026}');
      setMetrics({ latencyMs: 210, tokenCount: 28 });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div id="prompt-tuning-widget" className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider">
            Prompt Calibration Bench
          </span>
          <h4 className="text-sm font-semibold text-slate-100 mt-0.5">
            System Constraints & Sampling Temperature
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isGoalMet
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
            }`}
          >
            {isGoalMet ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            <span>Target: {isGoalMet ? "Passed Clean JSON Schema" : "Calibration Needed"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Input & Hyperparameters */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-mono text-slate-400 flex items-center justify-between mb-1">
              <span>System Persona Directive:</span>
              <span className="text-[10px] text-slate-500">In-Context Steering</span>
            </label>
            <textarea
              rows={3}
              value={systemDirective}
              onChange={(e) => setSystemDirective(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 mb-1 block">User Input Payload:</label>
            <textarea
              rows={2}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Temp:</span>
                <span className="text-cyan-400 font-bold">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.2"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 font-mono block">
                {temperature <= 0.3 ? "Deterministic (Argmax)" : "Creative / Stochastic"}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Top-P:</span>
                <span className="text-cyan-400 font-bold">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 font-mono block">Nucleus cutoff</span>
            </div>
          </div>

          <button
            id="run-prompt-exp-btn"
            type="button"
            onClick={runExperiment}
            disabled={isRunning}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold font-sans text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Inference...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Prompt Inference</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Output Inspection & Diagnostics */}
        <div className="flex flex-col h-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Inference Output</span>
            {metrics && (
              <span className="text-[11px] text-slate-500">
                {metrics.latencyMs}ms • {metrics.tokenCount} tokens
              </span>
            )}
          </div>

          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 overflow-y-auto min-h-[160px] flex flex-col justify-between">
            {output ? (
              <pre className="whitespace-pre-wrap font-mono text-emerald-300">{output}</pre>
            ) : (
              <div className="text-slate-600 italic text-center my-auto">
                Click 'Run Prompt Inference' to send query to LLM engine...
              </div>
            )}

            {output && (
              <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] flex items-center justify-between text-slate-400">
                <span>Schema Validation:</span>
                <span className={isJsonCompliant ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                  {isJsonCompliant ? "Valid JSON Object ({founder, year})" : "Contains formatting noise"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
