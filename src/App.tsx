import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RefundPage from "./pages/RefundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply/:jobId" element={<ApplyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund-policy" element={<RefundPage />} />
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center gradient-mesh px-4">
            <div className="max-w-md text-center">
              <h1 className="text-7xl font-display font-bold gradient-text">404</h1>
              <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This page doesn't exist. Let's get you back to opportunities.
              </p>
              <a
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
              >
                Browse jobs
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
