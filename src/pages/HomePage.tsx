import { ArrowRight, Sparkles, Users, MapPin, Heart, ShieldCheck, TrendingUp, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { JOBS } from "@/data/jobs";
import heroTeam from "@/assets/hero-team.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-7 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-kenya-green opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-green" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-foreground">Now hiring · 11 open roles · Across Kenya</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
              Build your career
              <br />
              with <span className="gradient-text">Cleanshelf</span>
              <span className="inline-block ml-2 align-middle text-3xl">🇰🇪</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Join thousands of proud Kenyans powering the country's most loved supermarket chain.
              Competitive monthly salary, medical allowance, and a real path to grow.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#positions" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-semibold hover:bg-kenya-green transition-colors group">
                See open positions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#benefits" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border bg-card font-semibold hover:bg-muted transition">
                Why Cleanshelf?
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {[
                { icon: Users, value: "5,000+", label: "Employees" },
                { icon: MapPin, value: "47", label: "Counties" },
                { icon: Sparkles, value: "11", label: "Open roles" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center">
                    <s.icon className="h-5 w-5 text-kenya-green" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl leading-none">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-scale-in">
            <div className="absolute -inset-4 gradient-kenya rounded-[2rem] blur-2xl opacity-20" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-glow border-4 border-white">
              <img src={heroTeam} alt="Cleanshelf Kenya team members" width={1920} height={1280} className="w-full h-auto" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-kenya-green to-kenya-red" />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold leading-tight">Join the Cleanshelf family</div>
                  <div className="text-xs text-muted-foreground">128 hires this month</div>
                </div>
                <div className="text-2xl">🎉</div>
              </div>
            </div>
            {/* floating badges */}
            <div className="hidden md:flex absolute -top-4 -left-4 items-center gap-2 px-3 py-2 rounded-2xl bg-white shadow-card animate-float">
              <Heart className="h-4 w-4 text-kenya-red" />
              <span className="text-xs font-semibold">Medical Cover</span>
            </div>
            <div className="hidden md:flex absolute -bottom-4 -right-2 items-center gap-2 px-3 py-2 rounded-2xl bg-white shadow-card animate-float" style={{ animationDelay: "1.5s" }}>
              <TrendingUp className="h-4 w-4 text-kenya-green" />
              <span className="text-xs font-semibold">Career Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONS */}
      <section id="positions" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-kenya-green mb-2">Open Positions</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">Find your role</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">11 active vacancies across Kenya. Apply once, get matched fast.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-kenya-green animate-pulse" />
            Hiring this week
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOBS.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-kenya-green mb-2">Why Cleanshelf</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">More than a paycheck</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Heart, title: "Medical allowance", desc: "Healthcare support for you and your family from day one.", color: "text-kenya-red", bg: "bg-kenya-red/10" },
            { icon: TrendingUp, title: "Career growth", desc: "Promotion paths from entry-level to management roles.", color: "text-kenya-green", bg: "bg-kenya-green/10" },
            { icon: ShieldCheck, title: "Job security", desc: "A trusted Kenyan employer with stable long-term contracts.", color: "text-foreground", bg: "bg-secondary" },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-card transition">
              <div className={`h-11 w-11 rounded-xl ${b.bg} grid place-items-center mb-4`}>
                <b.icon className={`h-5 w-5 ${b.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-foreground text-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-kenya-green mb-2">How it works</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">Apply in 3 simple steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Submit application", d: "Fill the form. Takes under 3 minutes." },
              { n: "02", t: "Get qualified", d: "Instant review. We tell you if you qualify." },
              { n: "03", t: "Book interview", d: "Pick your time and mode. Done." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 p-6">
                <div className="font-display font-bold text-5xl gradient-text">{s.n}</div>
                <h3 className="font-display font-bold text-xl mt-4">{s.t}</h3>
                <p className="text-sm text-white/60 mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl gradient-mesh border border-border p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-kenya-green mb-2">Contact us</div>
            <h2 className="font-display font-bold text-4xl">Got questions about a role?</h2>
            <p className="text-muted-foreground mt-3">Talk to our recruitment desk — we're here to help you join the Cleanshelf family.</p>
          </div>
          <div className="space-y-4">
            <a href="tel:+254798794653" className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-kenya-green transition group">
              <div className="h-12 w-12 rounded-xl bg-kenya-green grid place-items-center text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Call or WhatsApp</div>
                <div className="font-display font-bold text-lg group-hover:text-kenya-green transition">+254 798 794 653</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="h-12 w-12 rounded-xl bg-kenya-red grid place-items-center text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Head Office</div>
                <div className="font-display font-bold text-lg">Nairobi, Kenya · 00100</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cleanshelf Kenya. All rights reserved.</div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <a href="/terms" className="hover:text-foreground underline">Terms</a>
              <a href="/privacy" className="hover:text-foreground underline">Privacy</a>
              <a href="/refund-policy" className="hover:text-foreground underline">Refund Policy</a>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-4 bg-kenya-green rounded-sm" />
            <span className="h-2 w-4 bg-foreground rounded-sm" />
            <span className="h-2 w-4 bg-white border border-border rounded-sm" />
            <span className="h-2 w-4 bg-foreground rounded-sm" />
            <span className="h-2 w-4 bg-kenya-red rounded-sm" />
            <span className="ml-2 font-semibold">Proudly Kenyan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
