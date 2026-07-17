"use client";

import { useState } from "react";
import { Play, Loader2, RotateCcw, Eye } from "lucide-react";
import { runJavaScript } from "@/lib/runner/javascript";
import { runPython } from "@/lib/runner/python";
import type { LanguageId, Exercise } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  language: LanguageId;
  exercise: Exercise;
  onSuccess: () => void;
  alreadyCompleted: boolean;
}

export function CodeRunner({ language, exercise, onSuccess, alreadyCompleted }: Props) {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [success, setSuccess] = useState(alreadyCompleted);
  const [showSolution, setShowSolution] = useState(false);

  async function handleRun() {
    setRunning(true);
    setError(null);
    setOutput(null);
    try {
      if (exercise.testcases && exercise.testcases.length > 0) {
        let allPassed = true;
        const outputs = [];
        for (let i = 0; i < exercise.testcases.length; i++) {
          const tc = exercise.testcases[i];
          const res = language === "python" ? await runPython(code, 8000, tc.stdin) : await runJavaScript(code);
          if (res.error) {
            setError(`Testcase ${i + 1} failed with error:\n${res.error}`);
            allPassed = false;
            break;
          }
          outputs.push(`Testcase ${i + 1}:\nOutput: ${res.output.trim() || "(empty)"}`);
          const passed = tc.expectedOutputIncludes ? normalize(res.output).includes(normalize(tc.expectedOutputIncludes)) : true;
          if (!passed) {
             allPassed = false;
             setError(`Testcase ${i + 1} failed.\nInput: ${tc.stdin}\nExpected output to include: ${tc.expectedOutputIncludes}\nGot: ${res.output}`);
             break;
          }
        }
        if (allPassed) {
           setOutput("All testcases passed!\n\n" + outputs.join("\n---\n"));
           if (!success) {
             setSuccess(true);
             onSuccess();
           }
        }
      } else {
        const res =
          language === "python"
            ? await runPython(code, 8000, exercise.stdin)
            : await runJavaScript(code);
        setOutput(res.output);
        setError(res.error ?? null);

        if (!res.error) {
          const expected = exercise.expectedOutputIncludes;
          const passed = expected
            ? normalize(res.output).includes(normalize(expected))
            : true;
          if (passed && !success) {
            setSuccess(true);
            onSuccess();
          }
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  }

  function handleReset() {
    setCode(exercise.starterCode);
    setOutput(null);
    setError(null);
  }

  const langLabel =
    language === "python" ? "Python (Pyodide)" : "JavaScript";

  return (
    <div className="panel-stone p-4 mt-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-display text-lg text-parchment-50 flex items-center gap-2">
          <span className="coin w-4 h-4 rounded-full" />
          Exercise · {exercise.xp} XP
          {success && (
            <span className="pill bg-moss-500 text-bark-900 ml-2">
              Solved
            </span>
          )}
        </div>
        <div className="text-xs text-parchment-100/80">{langLabel}</div>
      </div>
      <div className="font-body text-parchment-50 mb-3">{exercise.prompt}</div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="code w-full min-h-[180px] p-3 rounded-lg bg-royal-900/70 text-parchment-50 border-2 border-bark-900 outline-none focus:border-gold-500 text-sm leading-relaxed"
      />

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button onClick={handleRun} disabled={running} className="btn-gold">
          {running ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Play size={18} />
          )}
          {running ? "Running…" : "Run code"}
        </button>
        <button onClick={handleReset} className="btn-stone">
          <RotateCcw size={16} /> Reset
        </button>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="btn-stone"
        >
          <Eye size={16} /> {showSolution ? "Hide" : "Peek"} solution
        </button>
      </div>

      {showSolution && (
        <pre className="code mt-3 p-3 rounded-lg bg-bark-900 text-moss-400 text-xs whitespace-pre-wrap">
          {exercise.solution}
        </pre>
      )}

      {(output !== null || error) && (
        <div
          className={cn(
            "mt-3 p-3 rounded-lg border-2 font-mono text-sm whitespace-pre-wrap",
            error
              ? "bg-ember-600/20 border-ember-500 text-ember-400"
              : "bg-bark-900 border-moss-500 text-parchment-50",
          )}
        >
          {error ? (
            <span>Error: {error}</span>
          ) : output?.length ? (
            output
          ) : (
            <span className="text-parchment-100/60">
              (no output — try a console.log / print)
            </span>
          )}
        </div>
      )}

      {!success &&
        output !== null &&
        !error &&
        exercise.expectedOutputIncludes && (
          <div className="mt-2 text-xs text-parchment-100/80">
            Hint: expected output should include{" "}
            <code className="text-gold-400">{exercise.expectedOutputIncludes}</code>.
          </div>
        )}
    </div>
  );
}

function normalize(s: string) {
  return s.replace(/\s+/g, "").toLowerCase();
}
