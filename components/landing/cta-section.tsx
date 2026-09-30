import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  user?: unknown | null;
}

export function CtaSection({ user }: CtaSectionProps) {
  return (
    <section className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto rounded-3xl border border-border/80 bg-card p-6 sm:p-12 text-center shadow-md shadow-black/5 dark:shadow-black/20 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-medium text-foreground shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready for your next shift</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
            Make the daily closing simpler.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Keep your meter readings, fuel rates, and station profits connected in one focused workspace.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {user ? (
              <Button asChild size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-7 text-sm sm:text-base gap-2 font-semibold shadow-xs">
                <Link href="/protected/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Open Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-8 text-sm sm:text-base gap-2 font-semibold shadow-xs">
                <Link href="/auth/sign-up">
                  <span>Get started free</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
