import { useState, useMemo } from "react";
import { Calendar as CalIcon, Clock, Video, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const TIMES = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export function InterviewBooking({ onSubmit }: { onSubmit: (data: { date: Date; time: string; mode: string; contact: string }) => void }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"physical" | "online">("physical");

  const days = useMemo(() => {
    const first = new Date(viewMonth);
    const lastDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const startWeekday = first.getDay();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= lastDate; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    return cells;
  }, [viewMonth]);

  const canSubmit = date && time;

  return (
    <div className="max-w-3xl mx-auto py-6 animate-fade-in space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-bold uppercase tracking-wider text-kenya-green mb-3">
          <CalIcon className="h-3.5 w-3.5" /> Step 2 · Book Interview
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl">Schedule your interview</h1>
        <p className="text-muted-foreground mt-2">Pick a date, time, and how you'd like to meet.</p>
      </div>

      {/* Calendar */}
      <div className="rounded-3xl bg-card border border-border shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => {
              const prev = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
              if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setViewMonth(prev);
            }}
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-secondary disabled:opacity-30"
            disabled={viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth()}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="font-display font-bold text-lg">
            {viewMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </div>
          <button
            type="button"
            onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const past = d < today;
            const selected = date && d.getTime() === date.getTime();
            return (
              <button
                key={i}
                type="button"
                disabled={past}
                onClick={() => setDate(d)}
                className={`aspect-square rounded-xl text-sm font-semibold transition-all ${past ? "text-muted-foreground/30 cursor-not-allowed" : selected ? "gradient-kenya text-white shadow-soft scale-105" : "hover:bg-secondary"}`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {date && (
        <div className="rounded-3xl bg-card border border-border shadow-card p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-kenya-green" />
            <h3 className="font-display font-bold">Available time slots</h3>
            <span className="ml-auto text-xs text-muted-foreground">{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`h-12 rounded-xl border-2 font-semibold text-sm transition ${time === t ? "border-kenya-green bg-kenya-green text-white" : "border-border bg-card hover:border-kenya-green/40"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode */}
      <div className="rounded-3xl bg-card border border-border shadow-card p-6">
        <h3 className="font-display font-bold mb-4">Preferred interview mode</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { v: "physical" as const, icon: MapPin, t: "Physical", d: "Visit our office in person" },
            { v: "online" as const, icon: Video, t: "Online", d: "Google Meet or Zoom call" },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setMode(o.v)}
              className={`relative p-4 rounded-2xl border-2 text-left transition flex items-center gap-3 ${mode === o.v ? "border-kenya-green bg-kenya-green/5" : "border-border bg-card hover:border-kenya-green/40"}`}
            >
              <div className={`h-10 w-10 rounded-xl grid place-items-center ${mode === o.v ? "bg-kenya-green text-white" : "bg-secondary text-foreground"}`}>
                <o.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold">{o.t}</div>
                <div className="text-xs text-muted-foreground">{o.d}</div>
              </div>
              {mode === o.v && <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-kenya-green" />}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!canSubmit}
        onClick={() => date && onSubmit({ date, time, mode, contact: "whatsapp" })}
        className="w-full h-14 rounded-2xl gradient-kenya text-white font-bold shadow-glow hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Continue to Payment →
      </button>
    </div>
  );
}
