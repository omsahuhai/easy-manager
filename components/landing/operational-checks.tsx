import { AlertTriangle, AlertCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function OperationalChecks() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Catch mistakes before they become numbers.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Automatic guards flag missing rates, out-of-sequence meters, and reversed readings instantly.
          </p>
        </div>

        {/* Authentic In-App Diagnostic Panel */}
        <div className="mt-12 max-w-3xl mx-auto rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Forecourt Integrity Monitor</span>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono text-amber-600 dark:text-amber-400 border-amber-500/30">
              Active Warnings
            </Badge>
          </div>

          {/* Continuity Mismatch Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-950 dark:text-amber-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <span className="font-semibold block">Meter Continuity Mismatch</span>
                <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                  Opening meter <span className="font-mono font-medium text-foreground">128,450.20</span> diverges from previous closing <span className="font-mono font-medium text-foreground">128,320.10</span> by +130.10 L.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/20 shrink-0 self-start sm:self-auto">
              Flagged for review
            </span>
          </div>

          {/* Missing Fuel Rate Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-950 dark:text-rose-200">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div>
                <span className="font-semibold block">Missing Fuel Rate</span>
                <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                  No active selling price found for MS on 16 Sep. Rate revision required before locking turnover.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase text-rose-700 dark:text-rose-300 font-semibold px-2 py-0.5 rounded bg-rose-500/20 shrink-0 self-start sm:self-auto">
              Calculation paused
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
