import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { JOBS } from "@/data/jobs";
import { ApplicationForm, type FormData } from "@/components/apply/ApplicationForm";
import { ProcessingLoader } from "@/components/apply/ProcessingLoader";
import { QualifiedScreen } from "@/components/apply/QualifiedScreen";
import { InterviewBooking } from "@/components/apply/InterviewBooking";
import { PaymentModal } from "@/components/apply/PaymentModal";
import { SuccessScreen } from "@/components/apply/SuccessScreen";

type Step = "form" | "processing" | "qualified" | "booking" | "payment" | "success";

export default function ApplyPage() {
  const { jobId } = useParams();
  const job = JOBS.find((j) => j.id === jobId) ?? JOBS[0];

  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [bookingData, setBookingData] = useState<{ date: Date; time: string; mode: string; contact: string } | null>(null);
  const [refundCode, setRefundCode] = useState("");

  return (
    <div className="min-h-screen gradient-mesh">
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Back to jobs
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-kenya grid place-items-center text-white font-bold text-sm">C</div>
            <span className="font-display font-bold">Cleanshelf</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {step === "form" && (
          <ApplicationForm
            job={job}
            onSubmit={(data) => {
              setFormData(data);
              setStep("processing");
            }}
          />
        )}
        {step === "processing" && (
          <ProcessingLoader onDone={() => setStep("qualified")} />
        )}
        {step === "qualified" && formData && (
          <QualifiedScreen job={job} name={formData.fullName} onBook={() => setStep("booking")} />
        )}
        {step === "booking" && (
          <InterviewBooking
            onSubmit={(data) => {
              setBookingData(data);
              setStep("payment");
            }}
          />
        )}
        {step === "payment" && bookingData && (
          <PaymentModal
            onComplete={(code) => {
              setRefundCode(code);
              setStep("success");
            }}
          />
        )}
        {step === "success" && bookingData && formData && (
          <SuccessScreen job={job} booking={bookingData} name={formData.fullName} refundCode={refundCode} />
        )}
      </main>
    </div>
  );
}
