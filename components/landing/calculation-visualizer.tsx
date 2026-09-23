"use client";

import { useState } from "react";

export function CalculationVisualizer() {
  const [fuel, setFuel] = useState<"MS" | "HSD">("MS");
  const [litresSold, setLitresSold] = useState<number>(1165.6);

  const rate = fuel === "MS" ? 104.2 : 87.54;
  const margin = fuel === "MS" ? 3.3 : 3.15;

  const sales = litresSold * rate;
  const profit = litresSold * margin;

  return (
    <section id="calculations" className="py-14 sm:py-20 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            From meter readings to money.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The numbers calculate themselves the moment you enter closing readings.
          </p>

          {/* Quick Fuel Toggle */}
          <div className="mt-8 inline-flex rounded-lg border border-border bg-card p-1 shadow-2xs">
            <button
              type="button"
              id="calc-fuel-ms"
              onClick={() => {
                setFuel("MS");
                setLitresSold(1165.6);
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                fuel === "MS"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              MS (Petrol)
            </button>
            <button
              type="button"
              id="calc-fuel-hsd"
              onClick={() => {
                setFuel("HSD");
                setLitresSold(1442.8);
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                fuel === "HSD"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              HSD (Diesel)
            </button>
          </div>
        </div>

        {/* 4-Step Interactive Calculation Cascade */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-7 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              {/* Step 1: Meter Reading */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  01 · Reading
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                  {fuel === "MS" ? "129,620.80" : "85,658.30"}
                </div>
                <p className="text-xs text-muted-foreground">Closing meter on nozzle</p>
              </div>

              {/* Step 2: Litres */}
              <div className="space-y-1 relative">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  02 · Net Litres
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                  {litresSold.toFixed(2)} L
                </div>
                <p className="text-xs text-muted-foreground">After 5L testing measure</p>
              </div>

              {/* Step 3: Sales */}
              <div className="space-y-1 relative">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  03 · Fuel Sales
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                  ₹{sales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">At ₹{rate.toFixed(2)}/L rate</p>
              </div>

              {/* Step 4: RO Profit */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  04 · RO Profit
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{profit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">At ₹{margin.toFixed(2)}/L commission</p>
              </div>
            </div>

            {/* Slider to interactively adjust volume */}
            <div className="mt-8 pt-5 border-t border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <label htmlFor="calc-volume-slider" className="cursor-pointer">
                  Drag slider to simulate dispensed litres:
                </label>
                <span className="font-mono font-semibold text-foreground">{litresSold.toFixed(0)} L</span>
              </div>
              <input
                id="calc-volume-slider"
                name="volumeSlider"
                type="range"
                min="200"
                max="3000"
                step="50"
                value={litresSold}
                aria-label="Dispensed volume in litres"
                onChange={(e) => setLitresSold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
