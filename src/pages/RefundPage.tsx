import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 prose prose-neutral dark:prose-invert">
        <h1>Refund Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>

        <h2>1. Interview Booking Fee</h2>
        <p>The interview booking fee of <strong>KES 139</strong> is a refundable deposit required to schedule an interview with Cleanshelf Supermarket Ltd. This fee is processed via M-Pesa at the time of booking.</p>

        <h2>2. Full Refund Conditions</h2>
        <p>You are entitled to a <strong>100% refund</strong> of the booking fee when:</p>
        <ul>
          <li>You attend the scheduled interview (in-person or online)</li>
          <li>The interview is conducted, regardless of the outcome</li>
          <li>You arrive within 15 minutes of the scheduled time</li>
        </ul>

        <h2>3. Refund Process</h2>
        <p>Upon attendance at your interview:</p>
        <ol>
          <li>Present your refund code (provided after payment) to the recruitment officer</li>
          <li>The officer will verify your attendance and initiate the refund</li>
          <li>The refund will be sent to the same M-Pesa number used for the original payment</li>
          <li>Refunds are typically processed within 24–48 hours</li>
        </ol>

        <h2>4. Non-Refundable Situations</h2>
        <p>The booking fee is <strong>not refundable</strong> if:</p>
        <ul>
          <li>You fail to attend the scheduled interview without prior rescheduling</li>
          <li>You arrive more than 15 minutes late without notification</li>
          <li>You provide false or misleading information in your application</li>
        </ul>

        <h2>5. Rescheduling</h2>
        <p>If you need to reschedule your interview, contact our recruitment desk at least 24 hours before the scheduled time. Your booking fee will be transferred to the new interview date at no additional cost.</p>

        <h2>6. Cancellation by Cleanshelf</h2>
        <p>If Cleanshelf cancels an interview for any reason, you will receive a full refund within 24 hours, no questions asked.</p>

        <h2>7. Disputes</h2>
        <p>If you believe a refund was incorrectly denied, contact our recruitment desk at <a href="tel:+254798794653" className="text-kenya-green underline">+254 798 794 653</a> with your refund code and interview details. We will review all disputes within 3 business days.</p>

        <h2>8. Related Policies</h2>
        <p>
          See also our <Link to="/terms" className="text-kenya-green underline">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="text-kenya-green underline">Privacy Policy</Link>.
        </p>
      </main>
    </div>
  );
}
