"use client";

import { useState } from "react";
import { Fuel } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CalculationVisualizer() {
  const [selectedFuel, setSelectedFuel] = useState<"MS" | "HSD">("MS");

  const fuelConfigs = {
    MS: {
      name: "MS (Petrol)",
      opening: 128450.2,
      closing: 129620.8,
      testing: 5.0, // 5 litre measure test
      rate: 104.2,
      margin: 3.3,
      accentColor: "amber",
    },
    HSD: {
      name: "HSD (Diesel)",
      opening: 84210.5,
      closing: 85658.3,
      testing: 5.0,
      rate: 87.54,
      margin: 3.15,
      accentColor: "blue",
    },
  };

  const current = fuelConfigs[selectedFuel];
  const grossLitres = current.closing - current.opening;
  const netLitres = grossLitres - current.testing;
  const totalSales = netLitres * current.rate;
  const totalProfit = netLitres * current.margin;

  return (
    <section id="calculations" className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Mathematical Engine
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Your numbers calculate themselves.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            No pocket calculators. No broken Excel formulas. Easy Manager connects meter movement, selling rates, and dealer commission in real time.
          </p>

          {/* Fuel switch toggle */}
          <div className="mt-8 inline-flex rounded-xl border border-border bg-card p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedFuel("MS")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                selectedFuel === "MS"
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/40 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Fuel className="h-3.5 w-3.5" />
              <span>MS (Petrol) Example</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFuel("HSD")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                selectedFuel === "HSD"
                  ? "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/40 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Fuel className="h-3.5 w-3.5" />
              <span>HSD (Diesel) Example</span>
            </button>
          </div>
        </div>

        {/* 3 Step Formula Breakdown */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Volume Calculation */}
          <div className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold text-muted-foreground">Step 1</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Meter Arithmetic
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground">
                Net Litres Dispensed
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Opening meter is subtracted from closing meter, deducting mandatory testing litres.
              </p>

              {/* Equation Box */}
              <div className="mt-5 rounded-xl border border-border/70 bg-muted/40 p-3.5 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Closing Meter:</span>
                  <span className="text-foreground font-semibold">{current.closing.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>– Opening Meter:</span>
                  <span className="text-foreground font-semibold">{current.opening.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>– Testing Jar:</span>
                  <span className="text-foreground font-semibold">{current.testing.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/60 pt-2 flex justify-between items-center font-bold">
                  <span className="text-primary font-sans">Net Litres:</span>
                  <span className="text-foreground text-sm">{netLitres.toFixed(2)} L</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>Automatic trigger</span>
              <span className="font-semibold text-foreground">Immediate</span>
            </div>
          </div>

          {/* Step 2: Sales Revenue Calculation */}
          <div className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold text-muted-foreground">Step 2</span>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  Rate Engine
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground">
                Sales Revenue
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Net dispensed litres multiplied by the applicable retail pump selling rate.
              </p>

              {/* Equation Box */}
              <div className="mt-5 rounded-xl border border-border/70 bg-muted/40 p-3.5 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Net Volume:</span>
                  <span className="text-foreground font-semibold">{netLitres.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>× Selling Rate:</span>
                  <span className="text-foreground font-semibold">₹{current.rate.toFixed(2)} / L</span>
                </div>
                <div className="text-[10px] text-muted-foreground italic">
                  *Matched by reading date in rate register
                </div>
                <div className="border-t border-border/60 pt-2 flex justify-between items-center font-bold">
                  <span className="text-primary font-sans">Gross Sales:</span>
                  <span className="text-foreground text-sm">
                    ₹{totalSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>Cash / Card collection</span>
              <span className="font-semibold text-foreground">Reconciled</span>
            </div>
          </div>

          {/* Step 3: RO Gross Profit Calculation */}
          <div className="relative rounded-2xl border border-primary/40 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between ring-1 ring-primary/20">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold text-primary">Step 3</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Dealer Earnings
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground">
                RO Gross Profit
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Net litres multiplied by your oil company dealer commission (RO margin).
              </p>

              {/* Equation Box */}
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06] p-3.5 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Net Volume:</span>
                  <span className="text-foreground font-semibold">{netLitres.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>× Dealer Margin:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    ₹{current.margin.toFixed(2)} / L
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground italic">
                  *Oil marketing company retail commission
                </div>
                <div className="border-t border-border/60 pt-2 flex justify-between items-center font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans">
                    RO Gross Profit:
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{totalProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>Carried to month-end</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Guaranteed Exact
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
