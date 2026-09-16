import Link from "next/link";
import { ArrowLeft, Fuel, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata = {
  title: "Privacy Policy | Easy Manager",
  description: "Privacy Policy and data protection standards for Easy Manager fuel station register.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mini header */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-xs sticky top-0 z-40">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Fuel className="h-3.5 w-3.5" />
            </div>
            <span>Easy Manager</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to home</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="space-y-4 border-b border-border/60 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Shield className="h-3.5 w-3.5" />
            Legal Documentation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: September 16, 2026 · Effective immediately
          </p>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Overview</h2>
            <p>
              Easy Manager (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides a digital operating register designed for Indian petrol pump owners and operators. This Privacy Policy describes how we collect, store, and protect your data when you use our web application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Data We Collect</h2>
            <p>We only collect data strictly necessary to operate your station register:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-foreground">Account Information:</strong> Email address and authentication credentials managed securely via Supabase Auth.
              </li>
              <li>
                <strong className="text-foreground">Business Profiles:</strong> Business workspace names and petrol pump station identifiers.
              </li>
              <li>
                <strong className="text-foreground">Operational Records:</strong> Fuel meter opening and closing totalizers, testing litres, applicable fuel rates, dealer margins, and categorized operating expenses.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Multi-Tenant Database Isolation</h2>
            <p>
              Your operational records are bound to your specific <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">business_id</code>. We enforce PostgreSQL Row Level Security (RLS) policies at the database engine to guarantee that records from one station workspace cannot be accessed by another workspace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. How We Use Your Data</h2>
            <p>
              Your data is used solely to calculate daily sales volumes, derive RO gross margins, reconcile monthly expenses, and render operational management reports. We do not sell your commercial data, share pump volume records with third parties, or run advertisement tracking scripts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Data Retention &amp; Security</h2>
            <p>
              All communication between your browser and our servers is encrypted in transit via standard TLS/HTTPS. Operational data is securely stored in a managed PostgreSQL environment with automated backups. You maintain ownership of all operational data entered into your workspaces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Contact</h2>
            <p>
              For inquiries regarding data privacy or workspace administration, contact the Easy Manager administration team through your workspace settings or system administrator.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
