import { AlertTriangle, AlertCircle, ShieldCheck } from "lucide-react";

export function OperationalChecks() {
  return (
    <section className="py-12 sm:py-20 border-t border-border/70 bg-muted/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Catch mistakes before they become numbers.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Automatic guards flag missing prices, mismatched opening readings, and typing errors instantly.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Automatic Checks</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Instant forecourt validation
            </span>
          </div>

          {/* Continuity Mismatch Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-3.5 sm:p-4 text-xs text-amber-950 dark:text-amber-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <span className="font-semibold block text-foreground">Meter Reading Mismatch</span>
                <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                  Opening reading <span className="font-mono font-semibold text-foreground">128,450.20</span> differs from yesterday&apos;s closing <span className="font-mono font-semibold text-foreground">128,320.10</span> by +130.10 L.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 shrink-0 self-start sm:self-auto border border-amber-500/30">
              Flagged for review
            </span>
          </div>

          {/* Missing Fuel Rate Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-3.5 sm:p-4 text-xs text-rose-950 dark:text-rose-200">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div>
                <span className="font-semibold block text-foreground">Missing Fuel Rate</span>
                <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                  No active selling price entered for Petrol (MS) today. Add today&apos;s rate to calculate sales.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold px-2.5 py-1 rounded-md bg-rose-500/20 shrink-0 self-start sm:self-auto border border-rose-500/30">
              Calculation paused
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
