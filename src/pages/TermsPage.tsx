import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the Cleanshelf Careers website (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

        <h2>2. Purpose of the Service</h2>
        <p>Cleanshelf Careers is a recruitment platform operated by Cleanshelf Supermarket Ltd. The Service allows job seekers to view open positions, submit applications, and schedule interviews with Cleanshelf's recruitment team.</p>

        <h2>3. Interview Booking Fee</h2>
        <p>A refundable interview booking fee of KES 139 is required to schedule an interview. This fee serves the following purposes:</p>
        <ul>
          <li>Ensures commitment and reduces no-shows for scheduled interviews</li>
          <li>Covers administrative costs of interview coordination</li>
          <li>Guarantees your interview slot in the recruitment calendar</li>
        </ul>
        <p>This fee is <strong>100% refundable</strong> upon attendance of the scheduled interview. See our <Link to="/refund-policy" className="text-kenya-green underline">Refund Policy</Link> for full details.</p>

        <h2>4. Payment Processing</h2>
        <p>Payments are processed through M-Pesa via a secure third-party payment provider. By initiating a payment, you authorize the specified amount to be charged to your M-Pesa account. Cleanshelf does not store your mobile money credentials.</p>

        <h2>5. User Information</h2>
        <p>When you apply for a position, you agree to provide accurate personal information including your name, phone number, and relevant employment details. This information is used solely for recruitment purposes. See our <Link to="/privacy" className="text-kenya-green underline">Privacy Policy</Link> for details on how we handle your data.</p>

        <h2>6. Eligibility</h2>
        <p>You must be at least 18 years of age and legally eligible to work in Kenya to use this Service. By applying, you confirm that all information provided is truthful and accurate.</p>

        <h2>7. Modifications</h2>
        <p>Cleanshelf reserves the right to modify these Terms at any time. Continued use of the Service after modifications constitutes acceptance of the updated Terms.</p>

        <h2>8. Contact</h2>
        <p>For questions about these Terms, contact our recruitment desk at <a href="tel:+254798794653" className="text-kenya-green underline">+254 798 794 653</a>.</p>
      </main>
    </div>
  );
}
