import { Lock, ArrowRight, XCircle, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

export function DailyClosingStory() {
  return (
    <section id="workflow" className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>01 · The Shift Handover</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Built around the 10 PM shift closing.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Petrol pump accounting does not begin with invoices or bank deposits. It begins at the mechanical nozzle totalizer when the forecourt attendant counts cash and hands over the shift.
          </p>
        </div>

        {/* Side-by-Side: The Forecourt Problem vs The Easy Manager Rule */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: The Traditional Forecourt Risk (Paper register) */}
          <div className="lg:col-span-6 rounded-xl border border-destructive/25 bg-destructive/[0.02] dark:bg-destructive/[0.04] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-destructive/20">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    Traditional Paper &amp; Spreadsheet Closing
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-destructive font-semibold">
                  Forecourt Risk
                </span>
              </div>

              {/* Simulated Paper Ledger with Mistakes */}
              <div className="mt-4 rounded-lg border border-border/70 bg-background/80 p-3.5 font-mono text-xs space-y-2">
                <div className="text-[11px] text-muted-foreground">
                  Night Attendant Notebook Slip:
                </div>
                <div className="flex justify-between text-muted-foreground line-through decoration-destructive">
                  <span>15 Sep Night Close:</span>
                  <span>128,450.20 L</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>16 Sep Morning Shift Opening:</span>
                  <span className="text-destructive font-bold">128,320.10 L (Mistyped)</span>
                </div>
                <div className="pt-1 text-[11px] text-destructive flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3 shrink-0" />
                  <span>130.10 Litres unaccounted between shifts</span>
                </div>
              </div>

              {/* Pain points */}
              <ul className="mt-5 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  <span>Morning attendant copies opening numbers from memory, paper slips, or WhatsApp photos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  <span>Typing 1 digit wrong distorts the day&apos;s sales, fuel volume, and cash collection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  <span>Discrepancies remain hidden until the monthly oil marketing company audit.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-destructive/15 text-[11px] text-muted-foreground">
              Outcome: Hours wasted reconciling broken numbers at the end of the month.
            </div>
          </div>

          {/* Right: The Easy Manager Solution (Cryptographic Sequential Continuity) */}
          <div className="lg:col-span-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    Easy Manager Sequential Totalizer Lock
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                  Zero Re-Entry
                </span>
              </div>

              {/* Simulated Easy Manager Sequential Lock */}
              <div className="mt-4 rounded-lg border border-emerald-500/25 bg-background/80 p-3.5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-[11px]">15 Sep Shift Closing (Recorded):</span>
                  <span className="font-semibold text-foreground">128,450.20 L</span>
                </div>

                <div className="flex items-center justify-center py-0.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                    <span>Immutably carried forward</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-center justify-between bg-emerald-500/10 dark:bg-emerald-500/15 p-1.5 rounded border border-emerald-500/20">
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium text-[11px] flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    16 Sep Shift Opening (Auto-Locked):
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">128,450.20 L</span>
                </div>
              </div>

              {/* System guarantees */}
              <ul className="mt-5 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.2" />
                  <span className="text-foreground font-medium">Locked opening values:</span>
                  <span>Operators only enter closing readings. Yesterday&apos;s baseline cannot be overwritten.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.2" />
                  <span className="text-foreground font-medium">Automatic volume arithmetic:</span>
                  <span>Net dispensed litres are calculated on save after deducting mandatory 5L testing jars.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.2" />
                  <span className="text-foreground font-medium">Instant audit assertions:</span>
                  <span>Any manual divergence flags a visible continuity mismatch across the register.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-emerald-500/15 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              Outcome: Perfect continuity between shifts with zero morning totalizer disputes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
