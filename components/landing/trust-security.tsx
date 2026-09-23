import { Database, ShieldCheck, Lock } from "lucide-react";

export function TrustSecurity() {
  return (
    <section id="security" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Your business data stays separate.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every pump register is isolated at the database layer with PostgreSQL Row Level Security.
          </p>
        </div>

        {/* Minimalist Database-First Architecture Visual */}
        <div className="mt-12 max-w-4xl mx-auto rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Database className="h-4 w-4 text-primary" />
                <span>PostgreSQL RLS</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Queries are scoped to your authenticated business identifier directly at the database engine.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Server-Side Schema Guards</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mutations are verified with Zod schemas before write operations, rejecting negative volumes and invalid dates.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Lock className="h-4 w-4 text-primary" />
                <span>Zero Tracking Pixels</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your pump register belongs to your dealership. No advertising cookies, no data sharing, and no third-party trackers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
