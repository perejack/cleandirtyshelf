import { CheckCircle2, Sparkles, Calendar, AlertTriangle } from "lucide-react";
import type { Job } from "@/data/jobs";

export function QualifiedScreen({ job, name, onBook }: { job: Job; name: string; onBook: () => void }) {
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <div className="relative rounded-3xl bg-card border border-border shadow-glow p-8 sm:p-12 text-center overflow-hidden">
        {/* confetti dots */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="absolute h-1.5 w-1.5 rounded-full animate-float"
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${(i * 23) % 100}%`,
                background: i % 2 ? "var(--kenya-green)" : "var(--kenya-red)",
                animationDelay: `${i * 0.2}s`,
              }} />
          ))}
        </div>

        <div className="relative">
          <div className="mx-auto h-20 w-20 rounded-full bg-kenya-green/10 grid place-items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-kenya-green grid place-items-center shadow-glow animate-scale-in">
              <CheckCircle2 className="h-9 w-9 text-white" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kenya-green/10 text-kenya-green text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Congratulations {firstName}!
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl">
            You qualify for <span className="gradient-text">{job.title}</span>
          </h1>

          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Based on your profile, you are a strong match for this role at Cleanshelf Kenya.
          </p>

          {/* slots warning */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-kenya-red/10 border border-kenya-red/20 text-kenya-red text-sm font-bold">
            <AlertTriangle className="h-4 w-4" />
            Only 2 slots remaining — book your interview now
          </div>

          {/* slot indicator */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-2 w-10 rounded-full ${i <= 2 ? "bg-kenya-green" : "bg-secondary"}`} />
            ))}
            <span className="text-xs font-semibold text-muted-foreground ml-2">2 / 5 slots open</span>
          </div>

          <button
            onClick={onBook}
            className="mt-8 inline-flex items-center gap-2 h-14 px-8 rounded-2xl gradient-kenya text-white font-bold shadow-glow hover:scale-[1.02] active:scale-100 transition"
          >
            <Calendar className="h-5 w-5" />
            Book Your Interview Now
          </button>

          <p className="mt-4 text-xs text-muted-foreground">
            Salary: <strong className="text-foreground">Ksh {job.salary.toLocaleString()}</strong> + Ksh {job.allowance.toLocaleString()} medical allowance
          </p>
        </div>
      </div>
    </div>
  );
}
