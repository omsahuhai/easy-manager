"use client";

import { useState } from "react";
import {
  IndianRupee,
  Droplet,
  TrendingUp,
  ReceiptText,
  Lock,
  Calendar,
  Fuel,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function HeroProductPreview() {
  const [fuelType, setFuelType] = useState<"MS" | "HSD">("MS");
  
  // Real nozzle state for interactive demo - stored cleanly by fuel type
  const [closings, setClosings] = useState<{ MS: string; HSD: string }>({
    MS: "129620.80",
    HSD: "85658.30",
  });

  // Locked baselines
  const msOpening = 128450.2;
  const hsdOpening = 84210.5;
  const testMeasure = 5.0; // Standard 5L testing measure

  // Rates & commissions
  const msRate = 104.2;
  const msMargin = 3.3;
  const hsdRate = 87.54;
  const hsdMargin = 3.15;

  // Active calculations
  const isMs = fuelType === "MS";
  const activeOpening = isMs ? msOpening : hsdOpening;
  const activeClosingStr = closings[fuelType];
  const parsedClosing = parseFloat(activeClosingStr);
  const activeClosing = isNaN(parsedClosing) ? activeOpening : parsedClosing;
  const activeRate = isMs ? msRate : hsdRate;
  const activeMargin = isMs ? msMargin : hsdMargin;

  const grossVolume = Math.max(0, activeClosing - activeOpening);
  const netVolume = Math.max(0, grossVolume - testMeasure);
  const activeSales = netVolume * activeRate;
  const activeProfit = netVolume * activeMargin;

  // Combined day stats
  const parsedMsClosing = parseFloat(closings.MS);
  const validMsClosing = isNaN(parsedMsClosing) ? msOpening : parsedMsClosing;
  const parsedHsdClosing = parseFloat(closings.HSD);
  const validHsdClosing = isNaN(parsedHsdClosing) ? hsdOpening : parsedHsdClosing;

  const totalMsGross = Math.max(0, validMsClosing - msOpening);
  const totalMsNet = Math.max(0, totalMsGross - testMeasure);
  const totalHsdGross = Math.max(0, validHsdClosing - hsdOpening);
  const totalHsdNet = Math.max(0, totalHsdGross - testMeasure);

  const totalDayVolume = totalMsNet + totalHsdNet;
  const totalDaySales = totalMsNet * msRate + totalHsdNet * hsdRate;
  const totalDayProfit = totalMsNet * msMargin + totalHsdNet * hsdMargin;

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* App Window Shell */}
      <div className="rounded-xl border border-border/80 bg-card shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden text-left transition-all">
        {/* Workspace Topbar */}
        <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-3.5 py-2.5 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-2xs">
              <Fuel className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  Kisan Petroleum
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  IOCL Outlet 241098
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>Today (IST)</span>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-medium hidden xs:inline-flex"
            >
              Calculated
            </Badge>
          </div>
        </div>

        {/* Dashboard 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-background/50 border-b border-border/60">
          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">Today&apos;s Sales</span>
              <IndianRupee className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="mt-1 text-base sm:text-lg font-bold tracking-tight text-foreground font-mono">
              ₹{totalDaySales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Auto-calculated</p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">Fuel Dispensed</span>
              <Droplet className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <div className="mt-1 text-base sm:text-lg font-bold tracking-tight text-foreground font-mono">
              {totalDayVolume.toFixed(2)} L
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Net after 5L testing</p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">RO Gross Margin</span>
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 text-base sm:text-lg font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
              ₹{totalDayProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Dealer commission</p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">Month Expenses</span>
              <ReceiptText className="h-3.5 w-3.5 text-rose-500" />
            </div>
            <div className="mt-1 text-base sm:text-lg font-bold tracking-tight text-foreground font-mono">
              ₹54,200.00
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Staff, power & genset</p>
          </div>
        </div>

        {/* Interactive Nozzle Register Demo */}
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                Interactive Forecourt Register
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Edit closing readings below to see real-time calculation.
              </p>
            </div>

            {/* Fuel Tab Switcher */}
            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 self-start sm:self-auto">
              <button
                type="button"
                id="hero-fuel-ms"
                onClick={() => setFuelType("MS")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  fuelType === "MS"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                MS (Petrol)
              </button>
              <button
                type="button"
                id="hero-fuel-hsd"
                onClick={() => setFuelType("HSD")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  fuelType === "HSD"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                HSD (Diesel)
              </button>
            </div>
          </div>

          {/* Active Nozzle Input Strip */}
          <div className="rounded-lg border border-border bg-background p-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${fuelType === "MS" ? "bg-amber-500" : "bg-blue-500"}`} />
                <span className="font-semibold text-foreground">
                  {fuelType === "MS" ? "Nozzle 01 · Motor Spirit" : "Nozzle 02 · High Speed Diesel"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Rate: <strong className="text-foreground">₹{activeRate.toFixed(2)}/L</strong> · Margin: <strong className="text-emerald-600 dark:text-emerald-400">₹{activeMargin.toFixed(2)}/L</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {/* Opening Reading (Auto-Locked) */}
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                  Opening <Lock className="h-2.5 w-2.5 text-primary" />
                </span>
                <div id="hero-opening" className="h-8 px-2.5 flex items-center rounded-md border border-border bg-muted/40 font-mono text-xs font-medium text-foreground">
                  {activeOpening.toFixed(2)}
                </div>
                <span className="text-[9px] text-muted-foreground mt-0.5 block">Locked baseline</span>
              </div>

              {/* Closing Reading (Editable Input) */}
              <div>
                <label htmlFor="hero-closing" className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                  Closing Reading
                </label>
                <Input
                  id="hero-closing"
                  name="closingReading"
                  type="number"
                  step="0.1"
                  value={activeClosingStr}
                  onChange={(e) => {
                    const str = e.target.value;
                    setClosings((prev) => ({ ...prev, [fuelType]: str }));
                  }}
                  className="h-8 font-mono text-xs font-semibold text-foreground bg-background"
                />
                <span className="text-[9px] text-primary mt-0.5 block font-medium">Editable by operator</span>
              </div>

              {/* 5L Testing jar */}
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                  Testing Jar
                </span>
                <div id="hero-testing" className="h-8 px-2.5 flex items-center rounded-md border border-border bg-muted/40 font-mono text-xs text-muted-foreground">
                  -5.00 L
                </div>
                <span className="text-[9px] text-muted-foreground mt-0.5 block">Standard morning test</span>
              </div>

              {/* Net Dispensed Litres */}
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                  Net Litres
                </span>
                <div id="hero-net" className="h-8 px-2.5 flex items-center rounded-md border border-primary/30 bg-primary/5 font-mono text-xs font-bold text-foreground">
                  {netVolume.toFixed(2)} L
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5 block font-medium">Automatic result</span>
              </div>
            </div>

            {/* Live Financial Outcome Ribbon */}
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Sequential shift chain verified</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span>
                  Turnover: <strong className="text-foreground font-semibold">₹{activeSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </span>
                <span>
                  RO Profit: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹{activeProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
