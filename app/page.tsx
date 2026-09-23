import Link from "next/link";
import { ArrowRight, AlertTriangle, LayoutDashboard } from "lucide-react";
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
      // Keep public landing page functional if auth is offline
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Navigation Header */}
      <LandingNavbar user={user} />

      {/* Environment Notice if unconfigured */}
      {!hasEnvVars && (
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">Supabase configuration required</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Create <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.local</code> using <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.example</code> to enable authentication and database persistence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Context tag badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-2xs mb-6 sm:mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Designed for Indian Petrol Pumps</span>
            </div>

            {/* Simple, confident headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance">
              Petrol pump accounting, made simple.
            </h1>

            {/* Exactly one supporting sentence */}
            <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Enter your daily readings. Easy Manager turns them into sales, RO profit, and clear reports.
            </p>

            {/* Clean call to action with generous spacing */}
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              {user ? (
                <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base gap-2 font-semibold shadow-sm">
                  <Link href="/protected/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Open Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base gap-2 font-semibold shadow-sm">
                    <Link href="/auth/sign-up">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold">
                    <Link href="/auth/login">
                      Sign in
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Authentic interactive product preview with generous top margin */}
          <div className="mt-14 sm:mt-20 lg:mt-24">
            <HeroProductPreview />
          </div>
        </div>
      </section>

      {/* 01. DAILY CLOSING */}
      <DailyClosingStory />

      {/* 02. CALCULATIONS */}
      <CalculationVisualizer />

      {/* 03. PROFITABILITY */}
      <ProfitabilityPipeline />

      {/* 04. OPERATIONAL CHECKS */}
      <OperationalChecks />

      {/* 05. PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* 06. HOW IT WORKS */}
      <HowItWorks />

      {/* 07. SECURITY & TRUST */}
      <TrustSecurity />

      {/* 08. TARGET AUDIENCE */}
      <TargetAudience />

      {/* 09. FINAL CTA */}
      <CtaSection user={user} />

      {/* 10. FOOTER */}
      <LandingFooter />
    </div>
  );
}
