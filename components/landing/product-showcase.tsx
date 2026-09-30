"use client";

import { useState } from "react";
import {
  Gauge,
  TrendingUp,
  FileText,
  Lock,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"readings" | "rates" | "reports">("readings");

  // Interactive reading form state
  const [readingFuel, setReadingFuel] = useState<"MS" | "HSD">("MS");
  const [demoClosings, setDemoClosings] = useState<{ MS: string; HSD: string }>({
    MS: "129620.80",
    HSD: "85658.30",
  });
  const demoOpening = readingFuel === "MS" ? 128450.2 : 84210.5;
  const demoTesting = 5.0;
  const demoClosingStr = demoClosings[readingFuel];
  const parsed = parseFloat(demoClosingStr);
  const demoClosing = isNaN(parsed) ? demoOpening : parsed;
  const demoNet = Math.max(0, demoClosing - demoOpening - demoTesting);

  return (
    <section id="product" className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Everything in one focused workspace.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Switch easily between daily readings, fuel rates, and monthly performance.
          </p>

          {/* Clean Segmented Navigation */}
          <div className="mt-5 grid grid-cols-3 max-w-sm sm:max-w-md mx-auto rounded-lg border border-border/80 bg-card p-1 shadow-2xs">
            <button
              type="button"
              id="showcase-tab-readings"
              onClick={() => setActiveTab("readings")}
              className={`flex items-center justify-center gap-1.5 rounded-md px-1.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold transition-all ${
                activeTab === "readings"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gauge className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Daily Readings</span>
            </button>
            <button
              type="button"
              id="showcase-tab-rates"
              onClick={() => setActiveTab("rates")}
              className={`flex items-center justify-center gap-1.5 rounded-md px-1.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold transition-all ${
                activeTab === "rates"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Fuel Rates</span>
            </button>
            <button
              type="button"
              id="showcase-tab-reports"
              onClick={() => setActiveTab("reports")}
              className={`flex items-center justify-center gap-1.5 rounded-md px-1.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold transition-all ${
                activeTab === "reports"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Reports</span>
            </button>
          </div>
        </div>

        {/* Interactive Application View */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card shadow-xl shadow-black/5 dark:shadow-black/25 overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-foreground">
                Kisan Petroleum
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">
                {activeTab === "readings" && "Daily Register"}
                {activeTab === "rates" && "Fuel Rates & Margins"}
                {activeTab === "reports" && "Monthly Report"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-muted-foreground hidden sm:inline">Active</span>
            </div>
          </div>

          {/* TAB 1: DAILY READINGS REGISTER */}
          {activeTab === "readings" && (
            <div className="p-4 sm:p-6 space-y-6 animate-in fade-in-50 duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Reading Entry Form */}
                <div className="lg:col-span-6 rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-xs font-semibold text-foreground">Record Reading</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>

                  {/* Fuel Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id="showcase-fuel-ms"
                      onClick={() => setReadingFuel("MS")}
                      className={`h-9 text-xs font-semibold rounded-lg border text-center transition-all ${
                        readingFuel === "MS"
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Petrol (MS)
                    </button>
                    <button
                      type="button"
                      id="showcase-fuel-hsd"
                      onClick={() => setReadingFuel("HSD")}
                      className={`h-9 text-xs font-semibold rounded-lg border text-center transition-all ${
                        readingFuel === "HSD"
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Diesel (HSD)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1 mb-1">
                        Opening <Lock className="h-2.5 w-2.5 text-primary" />
                      </span>
                      <div id="showcase-opening" className="h-10 px-3 flex items-center rounded-lg border border-border/80 bg-muted/60 font-mono text-xs font-semibold text-muted-foreground">
                        {demoOpening.toFixed(2)}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-0.5 block">From yesterday</span>
                    </div>

                    <div>
                      <label htmlFor="showcase-closing" className="text-[11px] font-medium text-muted-foreground block mb-1">
                        Closing
                      </label>
                      <Input
                        id="showcase-closing"
                        name="closingReading"
                        aria-label="Closing meter reading"
                        type="number"
                        step="0.1"
                        value={demoClosingStr}
                        onChange={(e) => {
                          const str = e.target.value;
                          setDemoClosings((prev) => ({ ...prev, [readingFuel]: str }));
                        }}
                        className="h-10 font-mono text-xs font-semibold text-foreground bg-background border-primary/40 focus-visible:ring-primary shadow-2xs"
                      />
                      <span className="text-[9px] text-primary mt-0.5 block font-medium">Tap to edit</span>
                    </div>
                  </div>

                  {/* Calculated Volume */}
                  <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-2.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Litres Sold:</span>
                    <span className="font-bold font-mono text-foreground text-sm">{demoNet.toFixed(2)} L</span>
                  </div>

                  <Button size="sm" className="w-full h-10 gap-1.5 text-xs font-semibold shadow-xs">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Save Reading</span>
                  </Button>
                </div>

                {/* Recent Shift Entries Table */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Recent Readings</span>
                    <span className="text-[11px] text-muted-foreground">Latest 3 entries</span>
                  </div>

                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-muted/30 border-b border-border text-[10px] uppercase text-muted-foreground font-sans">
                        <tr>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-2">Fuel</th>
                          <th className="py-2 px-2">Net Sold</th>
                          <th className="py-2 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr>
                          <td className="py-2.5 px-3 font-sans">15 Sep</td>
                          <td className="py-2.5 px-2">Petrol</td>
                          <td className="py-2.5 px-2 font-bold">1,170.60 L</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              <CheckCircle2 className="h-3 w-3" /> Locked
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans">15 Sep</td>
                          <td className="py-2.5 px-2">Diesel</td>
                          <td className="py-2.5 px-2 font-bold">1,447.80 L</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              <CheckCircle2 className="h-3 w-3" /> Locked
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans">14 Sep</td>
                          <td className="py-2.5 px-2">Petrol</td>
                          <td className="py-2.5 px-2 font-bold">1,185.20 L</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              <CheckCircle2 className="h-3 w-3" /> Locked
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FUEL RATES & MARGINS */}
          {activeTab === "rates" && (
            <div className="p-4 sm:p-6 space-y-6 animate-in fade-in-50 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Petrol (MS)</span>
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Selling Price:</span>
                      <span className="text-base font-bold text-foreground font-mono">₹104.20 / L</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Your Margin:</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">₹3.30 / L</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border/50">
                    Updated 01 Sep 2026
                  </div>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.05] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Diesel (HSD)</span>
                    <Badge variant="outline" className="text-[10px] bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Selling Price:</span>
                      <span className="text-base font-bold text-foreground font-mono">₹87.54 / L</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Your Margin:</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">₹3.15 / L</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border/50">
                    Updated 01 Sep 2026
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MONTHLY PROFIT REPORTS */}
          {activeTab === "reports" && (
            <div className="p-4 sm:p-6 space-y-5 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs">
                <span className="font-semibold text-foreground">August 2026 Statement</span>
                <span className="text-muted-foreground">31 Days Recorded</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border/70 bg-muted/25 p-3.5 space-y-1">
                  <span className="text-xs font-medium text-muted-foreground block">Total Sales</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-foreground mt-0.5 block">₹68,45,200.00</span>
                  <span className="text-[10px] text-muted-foreground block">72,410 Litres sold</span>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/25 p-3.5 space-y-1">
                  <span className="text-xs font-medium text-muted-foreground block">Your Margin</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">₹2,32,450.00</span>
                  <span className="text-[10px] text-muted-foreground block">Gross commission</span>
                </div>
                <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-3.5 space-y-1">
                  <span className="text-xs font-semibold text-primary block">Take-Home Profit</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-foreground mt-0.5 block">₹1,22,450.00</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">After all expenses</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
