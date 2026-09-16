import Link from "next/link";
import { ArrowLeft, Fuel, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata = {
  title: "Terms of Service | Easy Manager",
  description: "Terms of Service governing use of Easy Manager digital operating register.",
};

export default function TermsPage() {
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
            <FileText className="h-3.5 w-3.5" />
            Service Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: September 16, 2026 · Effective immediately
          </p>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or creating a workspace in Easy Manager, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a petroleum retail dealership, you represent that you have the authority to bind that entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Description of Service</h2>
            <p>
              Easy Manager is a vertical SaaS software platform providing digital operating register capabilities for petrol pump businesses. Features include recording daily meter readings, managing fuel selling rates and dealer margins, tracking monthly operational expenses, and calculating derived sales and profitability reports.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Ensure the accuracy of physical meter readings and fuel selling rates input into the system.</li>
              <li>Use the service in compliance with applicable Indian commercial and weights &amp; measures regulations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Workspace Boundaries &amp; Data Integrity</h2>
            <p>
              Each business workspace is maintained independently. You are responsible for ensuring authorized access within your dealership. Easy Manager provides validation checks (such as continuity mismatch detection), but final reconciliation with physical fuel stock and bank deposits remains the owner&apos;s responsibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Service Availability &amp; Modifications</h2>
            <p>
              We continually enhance the platform to better serve fuel station operations. While we strive for maximum uptime, we do not guarantee uninterrupted access. Scheduled maintenance will be performed during off-peak operational windows when possible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Termination</h2>
            <p>
              You may stop using the service or close your account at any time. We reserve the right to suspend or terminate accounts that violate system integrity, attempt unauthorized multi-tenant data access, or misuse platform resources.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
