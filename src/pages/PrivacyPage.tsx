import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>

        <h2>1. Information We Collect</h2>
        <p>When you use Cleanshelf Careers, we may collect the following information:</p>
        <ul>
          <li><strong>Personal identification:</strong> Full name, email address, phone number</li>
          <li><strong>Employment information:</strong> Work experience, qualifications, position preferences</li>
          <li><strong>Payment information:</strong> M-Pesa phone number for processing the interview booking fee. We do not store your M-Pesa PIN or account credentials.</li>
          <li><strong>Usage data:</strong> Pages visited, time spent, browser type (collected automatically via cookies)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used exclusively for the following purposes:</p>
        <ul>
          <li>Processing and evaluating your job application</li>
          <li>Scheduling and coordinating interviews</li>
          <li>Processing the refundable interview booking fee</li>
          <li>Communicating with you about your application status</li>
          <li>Improving our recruitment platform</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. Your data may be shared only with:</p>
        <ul>
          <li><strong>Payment processor:</strong> Your M-Pesa number is shared with our payment provider solely to process the booking fee transaction</li>
          <li><strong>Internal recruitment team:</strong> Your application details are shared with Cleanshelf's HR department for evaluation</li>
          <li><strong>Legal requirements:</strong> If required by Kenyan law or regulatory authorities</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data. Payment credentials are never stored on our servers. All payment processing is handled through secure, encrypted channels via M-Pesa's infrastructure.</p>

        <h2>5. Data Retention</h2>
        <p>Application data is retained for 12 months after submission. Payment records are retained for 24 months as required by Kenyan financial regulations. You may request deletion of your data at any time.</p>

        <h2>6. Your Rights</h2>
        <p>Under the Kenya Data Protection Act 2019, you have the right to:</p>
        <ul>
          <li>Access your personal data held by us</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>7. Cookies</h2>
        <p>We use essential cookies to ensure the proper functioning of the website. We do not use tracking cookies for advertising purposes.</p>

        <h2>8. Contact</h2>
        <p>For privacy-related inquiries, contact our Data Protection Officer at <a href="tel:+254798794653" className="text-kenya-green underline">+254 798 794 653</a>.</p>
      </main>
    </div>
  );
}
