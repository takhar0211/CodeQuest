"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { ClientShell } from "@/components/ClientShell";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <ClientShell hideHud>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-ember-600/20 text-ember-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} />
        </div>
        <h1 className="font-display text-3xl text-gold-400 mb-2">
          The magic fizzled
        </h1>
        <p className="font-body text-parchment-100 max-w-md mb-8">
          A runtime error occurred in this sector of the keep. The scribes have been notified.
        </p>
        <button onClick={reset} className="btn-gold">
          Try again
        </button>
      </div>
    </ClientShell>
  );
}
