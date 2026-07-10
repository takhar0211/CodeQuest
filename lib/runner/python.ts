/**
 * Pyodide-backed Python runner. Loads Pyodide lazily on first use.
 */

type PyodideAPI = {
  runPython: (s: string) => unknown;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideAPI>;
  }
}

let pyodidePromise: Promise<PyodideAPI> | null = null;

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

async function getPyodide(): Promise<PyodideAPI> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    await loadScriptOnce(PYODIDE_INDEX + "pyodide.js");
    if (!window.loadPyodide) throw new Error("Pyodide failed to expose loader");
    return window.loadPyodide({ indexURL: PYODIDE_INDEX });
  })();
  return pyodidePromise;
}

export async function runPython(
  code: string,
  timeoutMs = 8000,
): Promise<{ output: string; error?: string }> {
  const py = await getPyodide();
  const out: string[] = [];
  const err: string[] = [];
  py.setStdout({ batched: (s) => out.push(s) });
  py.setStderr({ batched: (s) => err.push(s) });
  // Pyodide runs synchronously inside the main thread; the timeout is only a soft
  // ceiling for the wait — long-running code will still block. We surface the
  // limit as an error if exceeded after the fact.
  const start = performance.now();
  try {
    py.runPython(code);
  } catch (e: unknown) {
    err.push(e instanceof Error ? e.message : String(e));
  }
  const elapsed = performance.now() - start;
  return {
    output: out.join("\n"),
    error:
      err.length > 0
        ? err.join("\n")
        : elapsed > timeoutMs
          ? `Execution took ${Math.round(elapsed)}ms`
          : undefined,
  };
}

export function pyodideIsReady(): boolean {
  return pyodidePromise !== null;
}
