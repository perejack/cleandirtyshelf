import { useState } from "react";
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Clock, DollarSign, CheckCircle2, Sparkles } from "lucide-react";
import type { Job } from "@/data/jobs";
import { LOCATIONS, EDUCATION, START_OPTIONS, JOBS } from "@/data/jobs";

export type FormData = {
  fullName: string;
  email: string;
  phone: string;
  preferredLocation: string;
  education: string;
  currentLocation: string;
  position: string;
  workType: "full" | "part";
  startWhen: string;
  willingToTrain: boolean;
  expectedSalary: number;
};

export function ApplicationForm({ job, onSubmit }: { job: Job; onSubmit: (data: FormData) => void }) {
  const [data, setData] = useState<FormData>({
    fullName: "", email: "", phone: "",
    preferredLocation: "", education: "", currentLocation: "",
    position: job.id, workType: "full", startWhen: "immediate",
    willingToTrain: true, expectedSalary: job.salary,
  });

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const required = data.fullName && data.email && data.phone && data.preferredLocation && data.education && data.currentLocation && data.position;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (required) onSubmit(data); }}
      className="space-y-6 animate-fade-in"
    >
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-bold uppercase tracking-wider text-kenya-green mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Step 1 of 3 · Application
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl">
          Apply for <span className="gradient-text">{job.title}</span>
        </h1>
        <p className="text-muted-foreground mt-2">Takes about 3 minutes. Your information is kept confidential.</p>
      </div>

      <Section icon={<User className="h-5 w-5" />} title="Personal Information" accent="green">
        <Field label="Full Name" required>
          <Input value={data.fullName} onChange={(v) => update("fullName", v)} placeholder="Enter your full name" />
        </Field>
        <Field label="Email Address" required>
          <Input type="email" value={data.email} onChange={(v) => update("email", v)} placeholder="your.email@example.com" icon={<Mail className="h-4 w-4" />} />
        </Field>
        <Field label="Phone Number" required>
          <Input type="tel" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+254 7XX XXX XXX" icon={<Phone className="h-4 w-4" />} />
        </Field>
      </Section>

      <Section icon={<MapPin className="h-5 w-5" />} title="Location & Education" accent="red">
        <Field label="Preferred Work Location" required>
          <Select value={data.preferredLocation} onChange={(v) => update("preferredLocation", v)} options={LOCATIONS} placeholder="Select preferred location" />
        </Field>
        <Field label="Level of Education" required>
          <Select value={data.education} onChange={(v) => update("education", v)} options={EDUCATION} placeholder="Select your education level" icon={<GraduationCap className="h-4 w-4" />} />
        </Field>
        <Field label="Current Location" required>
          <Input value={data.currentLocation} onChange={(v) => update("currentLocation", v)} placeholder="Where do you live now?" icon={<MapPin className="h-4 w-4" />} />
        </Field>
      </Section>

      <Section icon={<Briefcase className="h-5 w-5" />} title="Job Preferences" accent="green">
        <Field label="Position Applying For" required>
          <Select value={data.position} onChange={(v) => update("position", v)} options={JOBS.map((j) => j.title)} valueMap={JOBS.map((j) => j.id)} placeholder="Select a position" />
        </Field>

        <Field label="Work Type" required>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: "full", t: "Full Time", d: "40+ hours/week" },
              { v: "part", t: "Part Time", d: "<40 hours/week" },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => update("workType", o.v as "full" | "part")}
                className={`relative p-4 rounded-2xl border-2 text-left transition-all ${data.workType === o.v ? "border-kenya-green bg-kenya-green/5 shadow-soft" : "border-border bg-card hover:border-kenya-green/40"}`}
              >
                <div className="font-display font-bold">{o.t}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{o.d}</div>
                {data.workType === o.v && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-kenya-green" />
                )}
              </button>
            ))}
          </div>
        </Field>

        <Field label="When can you start?">
          <Select value={data.startWhen} onChange={(v) => update("startWhen", v)}
            options={START_OPTIONS.map((s) => s.label)}
            valueMap={START_OPTIONS.map((s) => s.value)}
            placeholder="Select start time"
            icon={<Clock className="h-4 w-4" />}
          />
        </Field>

        <Field label="Willing to undergo training?">
          <div className="flex items-center gap-3">
            {[true, false].map((b) => (
              <button
                key={String(b)}
                type="button"
                onClick={() => update("willingToTrain", b)}
                className={`flex-1 h-12 rounded-xl border-2 font-semibold transition-all ${data.willingToTrain === b ? "border-kenya-green bg-kenya-green text-white" : "border-border bg-card hover:border-kenya-green/40"}`}
              >
                {b ? "Yes, I'm ready" : "No"}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Expected Salary Range">
          <Select
            value={String(data.expectedSalary)}
            onChange={(v) => update("expectedSalary", Number(v))}
            options={[
              "KES 15,000 - 20,000",
              "KES 20,000 - 25,000",
              "KES 25,000 - 30,000",
              "KES 30,000 - 40,000",
              "KES 40,000 - 50,000",
              "KES 50,000 - 65,000",
              "KES 65,000 - 80,000",
            ]}
            valueMap={["17500", "22500", "27500", "35000", "45000", "57500", "72500"]}
            placeholder="Select expected salary range"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </Field>
      </Section>

      <button
        type="submit"
        disabled={!required}
        className="group relative w-full h-14 rounded-2xl gradient-kenya text-white font-bold text-base shadow-glow hover:shadow-soft transition disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          <DollarSign className="h-5 w-5" />
          Submit Application
        </span>
      </button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to our terms and privacy policy.
      </p>
    </form>
  );
}

function Section({ icon, title, accent, children }: { icon: React.ReactNode; title: string; accent: "green" | "red"; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dashed border-border">
        <div className={`h-10 w-10 rounded-xl grid place-items-center text-white ${accent === "green" ? "bg-kenya-green" : "bg-kenya-red"}`}>
          {icon}
        </div>
        <h2 className="font-display font-bold text-xl">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block sm:[&:has(input[type=range])]:col-span-2 [&:nth-last-child(1):nth-child(odd)]:sm:col-span-2">
      <span className="block text-sm font-semibold mb-1.5">
        {label} {required && <span className="text-kenya-red">*</span>}
      </span>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", icon }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">{icon}</div>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-12 rounded-xl bg-input/40 border border-border focus:border-kenya-green focus:ring-4 focus:ring-kenya-green/15 outline-none transition px-4 ${icon ? "pl-10" : ""} text-sm font-medium placeholder:text-muted-foreground/70`}
      />
    </div>
  );
}

function Select({ value, onChange, options, valueMap, placeholder, icon }: { value: string; onChange: (v: string) => void; options: string[]; valueMap?: string[]; placeholder?: string; icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">{icon}</div>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 rounded-xl bg-input/40 border border-border focus:border-kenya-green focus:ring-4 focus:ring-kenya-green/15 outline-none transition px-4 ${icon ? "pl-10" : ""} text-sm font-medium appearance-none cursor-pointer pr-10`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
      >
        <option value="">{placeholder}</option>
        {options.map((o, i) => (
          <option key={o} value={valueMap?.[i] ?? o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
