"use client";

import { useState } from "react";
import { Fuel, Calculator } from "lucide-react";

export function CalculationVisualizer() {
  const [selectedFuel, setSelectedFuel] = useState<"MS" | "HSD">("MS");

  const fuelConfigs = {
    MS: {
      name: "MS (Petrol)",
      opening: 128450.2,
      closing: 129620.8,
      testing: 5.0,
      rate: 104.2,
      margin: 3.3,
    },
    HSD: {
      name: "HSD (Diesel)",
      opening: 84210.5,
      closing: 85658.3,
      testing: 5.0,
      rate: 87.54,
      margin: 3.15,
    },
  };

  const current = fuelConfigs[selectedFuel];
  const grossLitres = current.closing - current.opening;
  const netLitres = grossLitres - current.testing;
  const totalSales = netLitres * current.rate;
  const totalProfit = netLitres * current.margin;

  return (
    <section id="calculations" className="py-14 sm:py-20 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with fuel selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
              <Calculator className="h-3 w-3 text-primary" />
              <span>02 · Forecourt Arithmetic</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Your numbers calculate themselves.
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              No handheld pocket calculators. No broken Excel formulas. Easy Manager connects meter movement, selling rates, and dealer commission in a single continuous calculation.
            </p>
          </div>

          {/* Interactive Fuel Switcher */}
          <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-2xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedFuel("MS")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedFuel === "MS"
                  ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Fuel className="h-3.5 w-3.5" />
              <span>MS (Petrol)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFuel("HSD")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedFuel === "HSD"
                  ? "bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Fuel className="h-3.5 w-3.5" />
              <span>HSD (Diesel)</span>
            </button>
          </div>
        </div>

        {/* Continuous 3-Stage Arithmetic Ledger */}
        <div className="mt-8 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/70">
            {/* Stage 1: Volume Arithmetic */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                    Stage 01 · Dispensing
                  </span>
                  <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Totalizer Delta
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-foreground">
                  Net Litres Dispensed
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Totalizer difference minus mandatory 5-litre pump testing measure.
                </p>

                {/* Equation tape */}
                <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Closing Reading:</span>
                    <span className="text-foreground">{current.closing.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>– Opening Reading:</span>
                    <span className="text-foreground">{current.opening.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>– 5L Test Jar:</span>
                    <span className="text-foreground">-{current.testing.toFixed(2)}</span>
                  </div>
                  <div className="pt-1.5 border-t border-border/60 flex justify-between font-bold text-foreground">
                    <span>Net Volume:</span>
                    <span className="text-primary text-sm">{netLitres.toFixed(2)} L</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 text-[11px] text-muted-foreground">
                Mechanical pump calibration deducted.
              </div>
            </div>

            {/* Stage 2: Sales Revenue */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                    Stage 02 · Price Engine
                  </span>
                  <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    Effective Rate
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-foreground">
                  Sales Turnover
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Net volume multiplied by applicable selling price on shift date.
                </p>

                {/* Equation tape */}
                <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Net Volume:</span>
                    <span className="text-foreground">{netLitres.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>× Selling Rate:</span>
                    <span className="text-foreground">₹{current.rate.toFixed(2)} / L</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Price Rule:</span>
                    <span className="text-muted-foreground text-[10px]">Active revision</span>
                  </div>
                  <div className="pt-1.5 border-t border-border/60 flex justify-between font-bold text-foreground">
                    <span>Customer Sales:</span>
                    <span className="text-blue-600 dark:text-blue-400 text-sm">
                      ₹{totalSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 text-[11px] text-muted-foreground">
                Matched to daily effective retail price.
              </div>
            </div>

            {/* Stage 3: RO Gross Margin */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                    Stage 03 · Commission
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    RO Margin
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-foreground">
                  RO Gross Profit
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Net volume multiplied by dealer commission credited by oil company.
                </p>

                {/* Equation tape */}
                <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Net Volume:</span>
                    <span className="text-foreground">{netLitres.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>× Dealer Margin:</span>
                    <span className="text-foreground">₹{current.margin.toFixed(2)} / L</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Commission Rule:</span>
                    <span className="text-muted-foreground text-[10px]">Fixed dealer RO</span>
                  </div>
                  <div className="pt-1.5 border-t border-border/60 flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Gross Earnings:</span>
                    <span className="text-sm">
                      ₹{totalProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 text-[11px] text-muted-foreground">
                Independent of bank reconciliation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
