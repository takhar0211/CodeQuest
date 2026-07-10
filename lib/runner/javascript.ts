/**
 * Run JS code in a sandboxed iframe. Captures console output and returns it.
 * Not a security boundary against malicious code — this is a learning sandbox,
 * not a multi-tenant service. Times out at 2s.
 */
export async function runJavaScript(
  code: string,
  timeoutMs = 2000,
): Promise<{ output: string; error?: string }> {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.sandbox.add("allow-scripts");
    document.body.appendChild(iframe);

    const channel = "cq-" + Math.random().toString(36).slice(2);
    const html = `<!doctype html><html><body><script>
      (function(){
        const lines = [];
        function fmt(v){
          if (typeof v === 'string') return v;
          try { return JSON.stringify(v); } catch(e){ return String(v); }
        }
        const orig = console.log;
        console.log = function(){
          const args = Array.prototype.slice.call(arguments);
          lines.push(args.map(fmt).join(' '));
        };
        let err;
        try {
          (function(){ ${code} })();
        } catch(e){ err = (e && e.message) || String(e); }
        parent.postMessage({ channel: ${JSON.stringify(channel)}, output: lines.join('\\n'), error: err }, '*');
      })();
    <\/script></body></html>`;

    const timer = window.setTimeout(() => {
      cleanup();
      resolve({ output: "", error: "Timed out after " + timeoutMs + "ms" });
    }, timeoutMs);

    function onMessage(e: MessageEvent) {
      if (!e.data || e.data.channel !== channel) return;
      cleanup();
      resolve({ output: e.data.output || "", error: e.data.error });
    }

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      iframe.remove();
    }

    window.addEventListener("message", onMessage);
    iframe.srcdoc = html;
  });
}
