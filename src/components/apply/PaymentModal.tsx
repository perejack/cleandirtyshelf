import { useState } from "react";
import { Smartphone, Shield, Loader2, CheckCircle2, RefreshCw, Lock, AlertCircle } from "lucide-react";
import { initiateSTKPush, pollTransactionStatus } from "@/lib/hashback-api";

type Stage = "form" | "stk" | "processing" | "done" | "error";

export function PaymentModal({ onComplete }: { onComplete: (refundCode: string) => void }) {
  const [stage, setStage] = useState<Stage>("form");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidPhone = /^(?:\+?254|0)?[17]\d{8}$/.test(phone.replace(/\s/g, ""));

  const submitPhone = async () => {
    if (!isValidPhone) return;

    setStage("stk");
    setErrorMessage("");

    try {
      const reference = `CSF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const response = await initiateSTKPush("139", phone, reference);

      if (response.CheckoutRequestID) {
        setStage("processing");

        const pollResult = await pollTransactionStatus(response.CheckoutRequestID, 30, 3000);

        if (pollResult.ResultCode === "0") {
          const code = "CSF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
          onComplete(code);
        } else {
          throw new Error(pollResult.ResultDesc || "Payment was not completed");
        }
      } else {
        throw new Error(response.ResponseDescription || "Failed to initiate STK Push");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Payment failed. Please try again.");
      setStage("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 animate-fade-in">
      <div className="rounded-3xl bg-card border border-border shadow-glow overflow-hidden">
        {/* Header */}
        <div className="gradient-kenya p-6 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 0%, transparent 50%)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="h-3 w-3" /> Secure Payment
            </div>
            <div className="text-sm font-medium opacity-90">Interview Processing Fee</div>
            <div className="font-display font-extrabold text-5xl mt-1">KES 139</div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {stage === "form" && (
            <>
              <div className="rounded-2xl bg-secondary/60 border border-border p-4 text-sm">
                <p className="text-foreground/80 leading-relaxed">
                  This interview booking fee is required to <strong>guarantee your attendance</strong>.
                  It ensures commitment and helps us schedule interviews efficiently.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kenya-green/10 text-kenya-green text-xs font-bold">
                  <RefreshCw className="h-3.5 w-3.5" />
                  100% Refundable when you attend the interview
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">M-Pesa Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-kenya-green" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full h-14 rounded-xl bg-input/40 border border-border focus:border-kenya-green focus:ring-4 focus:ring-kenya-green/15 outline-none pl-11 pr-4 font-semibold text-lg tracking-wide"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">You'll receive an STK push to authorize KES 139.</p>
              </div>

              <button
                onClick={submitPhone}
                disabled={!isValidPhone}
                className="w-full h-14 rounded-2xl gradient-kenya text-white font-bold shadow-glow hover:scale-[1.01] disabled:opacity-50 transition inline-flex items-center justify-center gap-2"
              >
                <Smartphone className="h-5 w-5" /> Send STK Push
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" /> Powered by M-Pesa · Secured by Cleanshelf
              </div>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                By proceeding, you agree to our{" "}
                <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>,{" "}
                <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>, and{" "}
                <a href="/refund-policy" className="underline hover:text-foreground">Refund Policy</a>.
                Your M-Pesa number is used solely for payment processing.
              </p>
            </>
          )}

          {stage === "stk" && (
            <div className="text-center py-6 animate-fade-in">
              <div className="relative mx-auto h-24 w-24 mb-5">
                <div className="absolute inset-0 rounded-full bg-kenya-green/30 animate-pulse-ring" />
                <div className="relative h-24 w-24 rounded-full bg-kenya-green grid place-items-center shadow-glow">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl">Check your phone</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                We sent an M-Pesa STK push to <strong className="text-foreground">{phone}</strong>. Enter your PIN to complete payment of <strong>KES 139</strong>.
              </p>
            </div>
          )}

          {stage === "processing" && (
            <div className="text-center py-6 animate-fade-in">
              <Loader2 className="h-12 w-12 mx-auto text-kenya-green animate-spin mb-4" />
              <h3 className="font-display font-bold text-xl">Confirming payment…</h3>
              <p className="text-sm text-muted-foreground mt-2">Please wait while we verify your transaction.</p>
            </div>
          )}

          {stage === "done" && (
            <div className="text-center py-6">
              <CheckCircle2 className="h-14 w-14 mx-auto text-kenya-green" />
              <h3 className="font-display font-bold text-xl mt-3">Payment confirmed</h3>
            </div>
          )}

          {stage === "error" && (
            <div className="text-center py-6 animate-fade-in">
              <div className="relative mx-auto h-20 w-20 mb-5 rounded-full bg-red-100 grid place-items-center">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-display font-bold text-xl text-red-600">Payment failed</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">{errorMessage}</p>
              <button
                onClick={() => setStage("form")}
                className="mt-5 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition"
              >
                <RefreshCw className="h-4 w-4" /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
