import { ArrowRight, Lock, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DailyClosingStory() {
  return (
    <section id="workflow" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Core Operational Workflow
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Built around the daily closing.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Petrol pump accounting does not begin with invoices or bank statements. It begins at the pump nozzle totalizer when the shift ends.
          </p>
        </div>

        {/* Narrative Comparison & Flow */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: The Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Sequential meter continuation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yesterday&apos;s closing reading automatically becomes today&apos;s opening reading. The opening value is safely locked to prevent accidental overwrites and keep your totalizer chain unbroken.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                    Zero manual transcription
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    No copying previous numbers from yesterday&apos;s physical diary or phone photos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                    Locked opening values
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Operators can only enter the closing reading, preventing unauthorized adjustments to yesterday&apos;s closing baseline.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                    Immediate mismatch alerts
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    If an opening number is manually modified or desynchronized, Easy Manager flags it instantly across all reports.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Visual Diagram */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    Continuous Totalizer Chain
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  Consecutive Shift Sequence
                </span>
              </div>

              {/* Step 1: Yesterday's Closing */}
              <div className="relative rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Yesterday (15 Sep) · Night Close
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Saved & Sealed
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground">Opening Meter:</span>
                    <p className="font-mono font-medium text-foreground">127,100.00 L</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold text-primary">
                      Closing Meter (Final):
                    </span>
                    <p className="font-mono font-bold text-foreground text-sm">128,450.20 L</p>
                  </div>
                </div>
              </div>

              {/* Arrow transition */}
              <div className="flex items-center justify-center -my-2 relative z-10">
                <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-background px-3 py-1 shadow-xs text-xs font-medium text-primary">
                  <span>Automatic carry forward</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Step 2: Today's Opening & Closing */}
              <div className="rounded-xl border border-primary/40 bg-primary/[0.02] p-4 space-y-3 ring-1 ring-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Today (16 Sep) · Active Register
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Opening Auto-filled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border border-border/80 bg-background p-2.5">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                      Opening (Locked) <Lock className="h-3 w-3 text-primary" />
                    </span>
                    <p className="font-mono font-bold text-foreground text-sm mt-0.5">
                      128,450.20
                    </p>
                    <span className="text-[9px] text-muted-foreground mt-0.5 block">
                      Matches yesterday&apos;s close
                    </span>
                  </div>

                  <div className="rounded-lg border border-border/80 bg-background p-2.5">
                    <span className="text-[10px] text-muted-foreground font-medium">
                      Today&apos;s Closing
                    </span>
                    <p className="font-mono font-bold text-foreground text-sm mt-0.5">
                      129,620.80
                    </p>
                    <span className="text-[9px] text-muted-foreground mt-0.5 block">
                      Entered by operator
                    </span>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-2.5">
                    <span className="text-[10px] text-primary font-semibold">
                      Calculated Volume
                    </span>
                    <p className="font-mono font-extrabold text-primary text-sm mt-0.5">
                      1,170.60 L
                    </p>
                    <span className="text-[9px] text-muted-foreground mt-0.5 block">
                      Net litres sold
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
