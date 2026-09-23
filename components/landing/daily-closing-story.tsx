"use client";

import { useState } from "react";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DailyClosingStory() {
  const [closingStr, setClosingStr] = useState<string>("129620.80");
  const lockedOpening = 128450.2;
  const testLitre = 5.0;
  const parsed = parseFloat(closingStr);
  const closingReading = isNaN(parsed) ? lockedOpening : parsed;
  const volume = Math.max(0, closingReading - lockedOpening - testLitre);

  return (
    <section id="workflow" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Start with the daily closing.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Enter the readings you already record. Easy Manager takes care of the rest.
          </p>
        </div>

        {/* Clean Shift Continuity Product UI */}
        <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-border/80 bg-card p-4 sm:p-7 shadow-xs">
          {/* Shift handover sequence header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Shift Sequence Continuity</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground font-mono">Nozzle 01 (MS Petrol)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Opening locked automatically</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Yesterday's closing reading */}
            <div className="md:col-span-5 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Yesterday&apos;s Close</span>
                <span className="text-[10px] font-mono">15 Sep Shift</span>
              </div>
              <div className="text-lg font-bold font-mono text-foreground">
                128,450.20 L
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Saved at previous shift wrap
              </p>
            </div>

            {/* Seamless transition indicator */}
            <div className="md:col-span-2 flex justify-center py-1 md:py-0">
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground font-medium shadow-2xs">
                <span>Auto-fills</span>
                <ArrowRight className="h-3 w-3 text-primary" />
              </div>
            </div>

            {/* Today's active closing form */}
            <div className="md:col-span-5 rounded-lg border border-primary/30 bg-primary/[0.02] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Today&apos;s Entry</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">16 Sep Active</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                    Opening <Lock className="h-3 w-3 text-primary" />
                  </span>
                  <div id="daily-opening" className="h-8 px-2.5 flex items-center rounded-md border border-border bg-muted/50 font-mono text-xs font-semibold text-foreground">
                    128,450.20
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-0.5 block">Locked baseline</span>
                </div>

                <div>
                  <label htmlFor="daily-closing-input" className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                    Closing
                  </label>
                  <Input
                    id="daily-closing-input"
                    name="closingReading"
                    aria-label="Closing meter reading"
                    type="number"
                    step="0.1"
                    value={closingStr}
                    onChange={(e) => setClosingStr(e.target.value)}
                    className="h-8 font-mono text-xs font-semibold text-foreground bg-background"
                  />
                  <span className="text-[9px] text-primary mt-0.5 block font-medium">Only field to enter</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Net Volume Dispensed:</span>
                <span className="font-bold text-foreground">{volume.toFixed(2)} L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
