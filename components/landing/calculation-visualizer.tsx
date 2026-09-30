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
    <section id="calculations" className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            From meter readings to money.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            The moment you type the closing reading, your fuel sales and commission calculate automatically.
          </p>

          {/* Clean Fuel Switcher */}
          <div className="mt-5 inline-flex rounded-lg border border-border/80 bg-card p-1 shadow-2xs">
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
              Petrol (MS)
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
              Diesel (HSD)
            </button>
          </div>
        </div>

        {/* Clean 4-Metric Grid — No nested cards, dominant numbers */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Metric 1 */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Closing Reading
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground tracking-tight">
                {fuel === "MS" ? "129,620.80" : "85,658.30"}
              </div>
              <p className="text-[11px] text-muted-foreground">Meter on pump</p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Litres Sold
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground tracking-tight">
                {litresSold.toFixed(2)} L
              </div>
              <p className="text-[11px] text-muted-foreground">After 5L morning test</p>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Today&apos;s Sale
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground tracking-tight">
                ₹{sales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-muted-foreground">Rate: ₹{rate.toFixed(2)}/L</p>
            </div>

            {/* Metric 4: Primary Outcome */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
                Your Commission
              </span>
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                ₹{profit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-muted-foreground">Margin: ₹{margin.toFixed(2)}/L</p>
            </div>
          </div>

          {/* Interactive Volume Slider */}
          <div className="mt-6 pt-5 border-t border-border/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <label htmlFor="calc-volume-slider" className="cursor-pointer font-medium">
                Try different litres to see profit change:
              </label>
              <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/60">
                {litresSold.toFixed(0)} L
              </span>
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
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary mt-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
