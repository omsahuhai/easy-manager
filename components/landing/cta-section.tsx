import Link from "next/link";
import { ArrowRight, LayoutDashboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  user?: {
    email?: string;
    [key: string]: unknown;
  } | null;
}

export function CtaSection({ user }: CtaSectionProps) {
  return (
    <section className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-linear-to-b from-card to-muted/30 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xs">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Make the daily closing simpler.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Keep readings, rates, expenses and profitability connected in one focused workspace.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {user ? (
                <Button asChild size="lg" className="w-full sm:w-auto gap-2 px-6 shadow-xs font-semibold">
                  <Link href="/protected/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Open Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="w-full sm:w-auto gap-2 px-6 shadow-xs font-semibold">
                    <Link href="/auth/sign-up">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-6 font-semibold">
                    <Link href="/auth/login">
                      Sign in
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                MS & HSD Support
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                Automatic Carry-Forward
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                Multi-Tenant Isolation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
