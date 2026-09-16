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
    <section className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card px-6 py-10 sm:px-12 sm:py-14 text-center shadow-xs">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full bg-primary/5 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Make the daily closing simpler.
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Keep meter readings, fuel rates, operating expenses, and dealer profitability connected in one focused workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
                  <Button asChild size="default" className="w-full sm:w-auto gap-2 px-6 shadow-xs font-semibold">
                    <Link href="/auth/sign-up">
                      <span>Get started free</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="default" variant="outline" className="w-full sm:w-auto px-6 font-semibold">
                    <Link href="/auth/login">
                      Sign in
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                MS &amp; HSD Support
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                Automatic Carry-Forward
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                Multi-Tenant Database Isolation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
