"use client";

import { useState } from "react";
import { Lock, ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DailyClosingStory() {
  const [closingStr, setClosingStr] = useState<string>("129620.80");
  const lockedOpening = 128450.2;
  const testLitre = 5.0;
  const parsed = parseFloat(closingStr);
  const closingReading = isNaN(parsed) ? lockedOpening : parsed;
  const volume = Math.max(0, closingReading - lockedOpening - testLitre);

  return (
    <section id="workflow" className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Start with the daily closing.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Yesterday&apos;s closing number automatically becomes today&apos;s opening reading. You only enter one number.
          </p>
        </div>

        {/* Clean Shift Continuity Product UI */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-border/60 text-xs">
            <span className="font-semibold text-foreground">Nozzle 1 · Petrol</span>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Opening locked automatically</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Yesterday */}
            <div className="md:col-span-5 space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Yesterday&apos;s Closing Reading
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground tracking-tight">
                128,450.20
              </div>
              <p className="text-[11px] text-muted-foreground">Saved from previous shift</p>
            </div>

            {/* Seamless transition indicator */}
            <div className="md:col-span-2 flex justify-center py-1 md:py-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <span className="md:hidden">Becomes opening</span>
                <ArrowDown className="h-4 w-4 text-primary md:hidden" />
                <ArrowRight className="h-4 w-4 text-primary hidden md:block" />
              </div>
            </div>

            {/* Today's Entry */}
            <div className="md:col-span-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    Opening <Lock className="h-3 w-3 text-primary" />
                  </span>
                  <div className="h-10 px-3 flex items-center rounded-lg border border-border/80 bg-muted/50 font-mono text-xs font-semibold text-muted-foreground">
                    128,450.20
                  </div>
                  <span className="text-[11px] text-muted-foreground">Locked</span>
                </div>

                <div className="space-y-1">
                  <label htmlFor="daily-closing-input" className="text-xs font-semibold text-foreground block">
                    Closing Reading
                  </label>
                  <Input
                    id="daily-closing-input"
                    name="closingReading"
                    aria-label="Closing meter reading"
                    type="number"
                    step="0.1"
                    value={closingStr}
                    onChange={(e) => setClosingStr(e.target.value)}
                    className="h-10 font-mono text-xs font-bold text-foreground bg-background border-primary/40 focus-visible:ring-primary shadow-2xs"
                  />
                  <span className="text-[11px] text-primary font-medium">Type new reading</span>
                </div>
              </div>

              {/* Immediate Result */}
              <div className="pt-2.5 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Litres Sold:</span>
                <span className="font-extrabold font-mono text-foreground text-sm sm:text-base">
                  {volume.toFixed(2)} Litres
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
