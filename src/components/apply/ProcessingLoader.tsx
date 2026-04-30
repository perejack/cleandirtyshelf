import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Reviewing personal information...",
  "Verifying education details...",
  "Processing job preferences...",
  "Looking for open positions...",
  "Finalizing application...",
];

export function ProcessingLoader({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= STEPS.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1100);
    return () => clearTimeout(t);
  }, [active, onDone]);

  const progress = Math.min(100, (active / STEPS.length) * 100);

  return (
    <div className="max-w-xl mx-auto py-8 animate-fade-in">
      <div className="rounded-3xl bg-card border border-border shadow-glow p-8 sm:p-10 text-center">
        {/* animated logo */}
        <div className="relative mx-auto h-24 w-24 mb-6">
          <div className="absolute inset-0 rounded-full gradient-kenya animate-pulse-ring" />
          <div className="absolute inset-2 rounded-full gradient-kenya animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
          <div className="relative h-24 w-24 rounded-full gradient-kenya grid place-items-center text-white font-display font-extrabold text-3xl shadow-glow">
            C
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl">Processing Your Application</h2>
        <p className="text-muted-foreground mt-2 text-sm">Please wait while we review your information…</p>

        {/* progress bar */}
        <div className="mt-6 h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full gradient-kenya transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs font-bold text-kenya-green">{Math.round(progress)}%</div>

        <div className="mt-8 space-y-2.5 text-left">
          {STEPS.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div
                key={s}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${current ? "bg-kenya-green/5 border border-kenya-green/20" : done ? "opacity-70" : "opacity-40"}`}
              >
                <div className={`h-7 w-7 rounded-full grid place-items-center flex-shrink-0 ${done ? "bg-kenya-green text-white" : current ? "bg-white border-2 border-kenya-green" : "bg-secondary"}`}>
                  {done ? <Check className="h-4 w-4" /> : current ? <Loader2 className="h-4 w-4 animate-spin text-kenya-green" /> : null}
                </div>
                <span className={`text-sm font-medium ${current ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
