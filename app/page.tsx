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

      {/* HERO COCKPIT SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        {/* Subtle background ambient mesh */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb,0,0,0),0.05),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Core Proposition & CTAs */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-2xs">
                <Droplet className="h-3 w-3 text-primary" />
                <span>Forecourt SaaS · Built for Indian Petrol Pumps</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] text-balance">
                The digital operating register for your petrol pump.
              </h1>

              {/* Subheading */}
              <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                Log daily MS and HSD meter totalizers, lock sequential opening readings automatically, and reconcile daily sales, dealer margins, and monthly profit without manual spreadsheet errors.
              </p>

              {/* Call to Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {user ? (
                  <Button asChild size="default" className="w-full sm:w-auto gap-2 px-6 shadow-xs font-semibold">
                    <Link href="/protected/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Open Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="default" className="flex-1 sm:flex-initial gap-2 px-6 shadow-xs font-semibold">
                      <Link href="/auth/sign-up">
                        <span>Get started free</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="default" variant="outline" className="flex-1 sm:flex-initial px-5 font-semibold">
                      <Link href="/auth/login">
                        Sign in
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Forecourt Credentials */}
              <div className="mt-6 pt-5 border-t border-border/60 w-full flex flex-col gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 font-medium text-foreground text-[11px]">
                  <span>Supported Oil Marketing Networks:</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    IOCL
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    BPCL
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    HPCL
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    Nayara &amp; Jio-bp
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Forecourt Terminal Preview */}
            <div className="lg:col-span-7">
              <HeroProductPreview />
            </div>
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
