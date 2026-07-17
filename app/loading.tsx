import { ClientShell } from "@/components/ClientShell";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <ClientShell hideHud>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Loader2 className="animate-spin text-gold-400 mb-4" size={48} />
        <h2 className="font-display text-2xl text-parchment-100 animate-pulse">
          Consulting the scrolls...
        </h2>
      </div>
    </ClientShell>
  );
}
