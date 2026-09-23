import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  user?: unknown | null;
}

export function CtaSection({ user }: CtaSectionProps) {
  return (
    <section className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Make the daily closing simpler.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Keep your meter readings, fuel rates, and dealer profits connected in one focused workspace.
          </p>

          <div className="pt-2 flex justify-center">
            {user ? (
              <Button asChild size="lg" className="gap-2 px-8 font-semibold">
                <Link href="/protected/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Open Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="gap-2 px-8 font-semibold">
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
