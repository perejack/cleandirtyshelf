import { useState } from "react";
import { CheckCircle2, Calendar, Clock, MapPin, Video, Copy, Check, Sparkles, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "@/data/jobs";

export function SuccessScreen({ job, booking, name, refundCode }: {
  job: Job;
  booking: { date: Date; time: string; mode: string; contact: string };
  name: string;
  refundCode: string;
}) {
  const [copied, setCopied] = useState(false);
  const firstName = name.split(" ")[0] || "there";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(refundCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <div className="rounded-3xl bg-card border border-border shadow-glow overflow-hidden">
        {/* Header */}
        <div className="gradient-kenya p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {[...Array(15)].map((_, i) => (
              <span key={i} className="absolute h-1 w-1 rounded-full bg-white animate-float"
                style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%`, animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <div className="relative">
            <div className="mx-auto h-20 w-20 rounded-full bg-white/20 backdrop-blur grid place-items-center mb-3 animate-scale-in">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl">You're all set, {firstName}!</h1>
            <p className="opacity-95 mt-2">Your interview is booked and confirmed.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Refund code */}
          <div className="rounded-2xl border-2 border-dashed border-kenya-green bg-kenya-green/5 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kenya-green mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Your Refund Code
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 font-mono font-bold text-2xl text-foreground tracking-wider select-all">
                {refundCode}
              </div>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-kenya-green text-white text-sm font-semibold hover:bg-kenya-green/90 transition"
              >
                {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Show this code at your interview. Your <strong>KES 139</strong> will be refunded after attendance.
            </p>
          </div>

          {/* Interview details */}
          <div className="space-y-3">
            <h3 className="font-display font-bold">Interview Details</h3>
            <div className="rounded-2xl border border-border divide-y divide-border">
              <Row icon={<Sparkles className="h-4 w-4" />} label="Position" value={job.title} />
              <Row icon={<Calendar className="h-4 w-4" />} label="Date" value={booking.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} />
              <Row icon={<Clock className="h-4 w-4" />} label="Time" value={booking.time} />
              <Row
                icon={booking.mode === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                label="Mode"
                value={booking.mode === "online" ? "Online (link via " + booking.contact + ")" : "Physical at Cleanshelf HQ, Nairobi"}
              />
              <Row icon={<Sparkles className="h-4 w-4" />} label="Contact via" value={booking.contact.toUpperCase()} />
            </div>
          </div>

          <div className="rounded-2xl bg-secondary/60 p-4 text-sm">
            <p className="text-foreground/80">
              📩 A confirmation has been sent via <strong>{booking.contact}</strong>. Please arrive 10 minutes early with your national ID and refund code.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 h-12 rounded-xl border border-border bg-card font-semibold hover:bg-secondary transition inline-flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Save details
            </button>
            <Link
              to="/"
              className="flex-1 h-12 rounded-xl bg-foreground text-background font-semibold hover:bg-kenya-green transition inline-flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" /> Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="h-8 w-8 rounded-lg bg-kenya-green/10 text-kenya-green grid place-items-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">{label}</div>
        <div className="font-semibold text-sm truncate">{value}</div>
      </div>
    </div>
  );
}
