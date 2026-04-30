import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Job } from "@/data/jobs";

export function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={job.image}
          alt={`Cleanshelf ${job.title}`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[11px] font-semibold uppercase tracking-wider text-kenya-green">
          <span className="h-1.5 w-1.5 rounded-full bg-kenya-green animate-pulse" />
          {job.category}
        </div>
        <div className="absolute top-3 right-3 h-11 w-11 rounded-2xl bg-white/95 backdrop-blur grid place-items-center text-2xl shadow-soft">
          {job.emoji}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-display font-bold text-2xl drop-shadow">{job.title}</h3>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">{job.description}</p>

        <div className="flex items-end justify-between gap-3 pt-2 border-t border-dashed border-border">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Monthly Salary</div>
            <div className="font-display font-bold text-2xl text-foreground">
              Ksh {job.salary.toLocaleString()}
            </div>
            <div className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-kenya-green">
              <BadgeCheck className="h-3.5 w-3.5" />
              + Ksh {job.allowance.toLocaleString()} medical
            </div>
          </div>
        </div>

        <Link
          to={`/apply/${job.id}`}
          className="group/btn relative flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-foreground text-background font-semibold text-sm hover:bg-kenya-green transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Apply for this Position</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
