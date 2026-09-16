import Link from "next/link";
import { ArrowRight, Check, AlertTriangle, LayoutDashboard, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { HeroProductPreview } from "@/components/landing/hero-product-preview";
import { DailyClosingStory } from "@/components/landing/daily-closing-story";
import { CalculationVisualizer } from "@/components/landing/calculation-visualizer";
import { ProfitabilityPipeline } from "@/components/landing/profitability-pipeline";
import { OperationalChecks } from "@/components/landing/operational-checks";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustSecurity } from "@/components/landing/trust-security";
import { TargetAudience } from "@/components/landing/target-audience";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export const instant = false;

export default async function Home() {
  let user = null;
  if (hasEnvVars) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getClaims();
      user = data?.claims ?? null;
    } catch {
      // Keep the public landing page available if auth is temporarily unavailable.
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Navigation Header */}
      <LandingNavbar user={user} />

      {/* Configuration Alert if Supabase Env is missing */}
      {!hasEnvVars && (
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">Supabase configuration required</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Create <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.local</code> using the values documented in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.example</code> to enable authentication and live database persistence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle decorative radial gradient */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb,0,0,0),0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-xs font-medium text-foreground shadow-2xs backdrop-blur-xs">
              <Droplet className="h-3.5 w-3.5 text-primary" />
              <span>The digital operating register for Indian petrol pumps</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] text-balance">
              The digital operating register for your petrol pump.
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Turn daily meter readings into clear sales, RO profit, and monthly reports — without rebuilding the numbers by hand.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {user ? (
                <Button asChild size="lg" className="w-full sm:w-auto gap-2 px-7 shadow-xs font-semibold">
                  <Link href="/protected/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Open Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="w-full sm:w-auto gap-2 px-7 shadow-xs font-semibold">
                    <Link href="/auth/sign-up">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-7 font-semibold">
                    <Link href="/auth/login">
                      Sign in
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Feature Checklist Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                MS &amp; HSD Nozzle Registers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                Sequential Opening Continuation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                RO Gross Profit Tracking
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                PostgreSQL RLS Security
              </span>
            </div>
          </div>

          {/* Hero Product Visual Preview */}
          <div className="mt-12 sm:mt-16">
            <HeroProductPreview />
          </div>
        </div>
      </section>

      {/* SECTION A: DAILY CLOSING WORKFLOW */}
      <DailyClosingStory />

      {/* SECTION B: CALCULATION ENGINE */}
      <CalculationVisualizer />

      {/* SECTION C: PROFITABILITY PIPELINE */}
      <ProfitabilityPipeline />

      {/* SECTION D: OPERATIONAL CHECKS */}
      <OperationalChecks />

      {/* SECTION E: PRODUCT UI SHOWCASE */}
      <ProductShowcase />

      {/* SECTION F: HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION G: TRUST & SECURITY */}
      <TrustSecurity />

      {/* SECTION H: TARGET AUDIENCE */}
      <TargetAudience />

      {/* SECTION I: FINAL CTA */}
      <CtaSection user={user} />

      {/* SECTION J: LANDING FOOTER */}
      <LandingFooter />
    </div>
  );
}
