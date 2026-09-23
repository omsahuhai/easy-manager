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
    <section id="product" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Everything in one focused workspace.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Switch seamlessly between daily readings, fuel rates, and monthly performance.
          </p>

          {/* Clean Segmented Navigation */}
          <div className="mt-6 inline-flex rounded-lg border border-border bg-card p-1 shadow-2xs">
            <button
              type="button"
              id="showcase-tab-readings"
              onClick={() => setActiveTab("readings")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "readings"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gauge className="h-3.5 w-3.5" />
              <span>Daily Readings</span>
            </button>
            <button
              type="button"
              id="showcase-tab-rates"
              onClick={() => setActiveTab("rates")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "rates"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Fuel Rates</span>
            </button>
            <button
              type="button"
              id="showcase-tab-reports"
              onClick={() => setActiveTab("reports")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "reports"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Monthly Reports</span>
            </button>
          </div>
        </div>

        {/* Authentic Interactive Application View */}
        <div className="mt-10 max-w-5xl mx-auto rounded-xl border border-border/80 bg-card shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-border/70 bg-muted/30 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-foreground">
                Kisan Petroleum
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-xs text-muted-foreground font-mono">
                {activeTab === "readings" && "readings/daily-register"}
                {activeTab === "rates" && "rates/effective-pricing"}
                {activeTab === "reports" && "reports/monthly-pnl"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-muted-foreground">Live App Demo</span>
            </div>
          </div>

          {/* TAB 1: DAILY READINGS REGISTER */}
          {activeTab === "readings" && (
            <div className="p-4 sm:p-6 space-y-6 animate-in fade-in-50 duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Simulated Reading Entry Form */}
                <div className="lg:col-span-6 rounded-lg border border-border bg-background p-4 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-xs font-semibold text-foreground">Record Shift Reading</span>
                    <span className="text-[10px] text-muted-foreground font-mono">16 Sep 2026 (IST)</span>
                  </div>

                  {/* Fuel Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id="showcase-fuel-ms"
                      onClick={() => setReadingFuel("MS")}
                      className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-all ${
                        readingFuel === "MS"
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      MS (Petrol)
                    </button>
                    <button
                      type="button"
                      id="showcase-fuel-hsd"
                      onClick={() => setReadingFuel("HSD")}
                      className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-all ${
                        readingFuel === "HSD"
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-800 dark:text-blue-300"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      HSD (Diesel)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                        Opening <Lock className="h-2.5 w-2.5 text-primary" />
                      </span>
                      <div id="showcase-opening" className="h-8 px-2.5 flex items-center rounded-md border border-border bg-muted/40 font-mono text-xs font-medium text-foreground">
                        {demoOpening.toFixed(2)}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-0.5 block">Locked baseline</span>
                    </div>

                    <div>
                      <label htmlFor="showcase-closing" className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
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
                        className="h-8 font-mono text-xs font-semibold text-foreground bg-background"
                      />
                      <span className="text-[9px] text-primary mt-0.5 block font-medium">Type to calculate</span>
                    </div>
                  </div>

                  {/* Calculated Volume */}
                  <div className="rounded-md border border-primary/20 bg-primary/5 p-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Net Litres Sold:</span>
                    <span className="font-bold text-foreground text-sm">{demoNet.toFixed(2)} L</span>
                  </div>

                  <Button size="sm" className="w-full gap-1.5 text-xs font-semibold">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Save Shift Reading</span>
                  </Button>
                </div>

                {/* Recent Shift Entries Table */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Recent Shift Log</span>
                    <span className="text-[11px] text-muted-foreground">Latest 3 entries</span>
                  </div>

                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-muted/30 border-b border-border text-[10px] uppercase text-muted-foreground font-sans">
                        <tr>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-2">Fuel</th>
                          <th className="py-2 px-2">Net Vol</th>
                          <th className="py-2 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr>
                          <td className="py-2.5 px-3 font-sans">15 Sep</td>
                          <td className="py-2.5 px-2">MS-01</td>
                          <td className="py-2.5 px-2 font-bold">1,170.60 L</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              <CheckCircle2 className="h-3 w-3" /> Locked
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans">15 Sep</td>
                          <td className="py-2.5 px-2">HSD-01</td>
                          <td className="py-2.5 px-2 font-bold">1,447.80 L</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              <CheckCircle2 className="h-3 w-3" /> Locked
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans">14 Sep</td>
                          <td className="py-2.5 px-2">MS-01</td>
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
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.03] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Motor Spirit (MS Petrol)</span>
                    <Badge variant="outline" className="text-[10px]">Active Revision</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Selling Rate:</span>
                      <span className="text-base font-bold text-foreground">₹104.20 / L</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Dealer Margin:</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">₹3.30 / L</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                    Effective from 01 Sep 2026 06:00 IST
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/30 bg-blue-500/[0.03] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">High Speed Diesel (HSD)</span>
                    <Badge variant="outline" className="text-[10px]">Active Revision</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Selling Rate:</span>
                      <span className="text-base font-bold text-foreground">₹87.54 / L</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-sans">Dealer Margin:</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">₹3.15 / L</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                    Effective from 01 Sep 2026 06:00 IST
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MONTHLY PROFIT REPORTS */}
          {activeTab === "reports" && (
            <div className="p-4 sm:p-6 space-y-5 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
                <span className="font-semibold text-foreground">Monthly Statement: August 2026</span>
                <span className="font-mono text-muted-foreground">31 shifts consolidated</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <span className="text-[10px] text-muted-foreground uppercase font-sans block">Total Turnover</span>
                  <span className="text-base font-bold font-mono text-foreground mt-0.5 block">₹68,45,200.00</span>
                  <span className="text-[10px] text-muted-foreground">72,410 Litres sold</span>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <span className="text-[10px] text-muted-foreground uppercase font-sans block">RO Gross Margin</span>
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">₹2,32,450.00</span>
                  <span className="text-[10px] text-muted-foreground">Commission credited</span>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <span className="text-[10px] text-primary uppercase font-sans font-semibold block">Net Profit</span>
                  <span className="text-lg font-extrabold font-mono text-foreground mt-0.5 block">₹1,22,450.00</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">After all expenses</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
