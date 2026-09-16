"use client";

import { useState } from "react";
import {
  Gauge,
  TrendingUp,
  Lock,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"readings" | "rates" | "reports">("readings");

  return (
    <section id="product" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Real Product Interface
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            The software you will actually use.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Take a look inside Easy Manager. Every view is stripped of ERP bloat and engineered exclusively for fuel station workflows.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex flex-wrap justify-center rounded-xl border border-border bg-card p-1 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("readings")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === "readings"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gauge className="h-3.5 w-3.5" />
              <span>Daily Meter Register</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rates")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === "rates"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Rates & Margins</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reports")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === "reports"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Monthly Profit Reports</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="mt-10 max-w-5xl mx-auto">
          {/* TAB 1: DAILY METER REGISTER */}
          {activeTab === "readings" && (
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-md animate-in fade-in-50 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      Daily Meter Register · New Reading Entry
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Nozzle totalizer entries for today&apos;s shift closing.
                  </p>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Station: Kisan Petroleum
                </Badge>
              </div>

              {/* Simulated Form UI */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form fields */}
                <div className="lg:col-span-6 space-y-4 rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-2 text-center text-xs font-semibold text-amber-700 dark:text-amber-400">
                      MS (Petrol)
                    </div>
                    <div className="rounded-md border border-border bg-muted/40 p-2 text-center text-xs font-medium text-muted-foreground">
                      HSD (Diesel)
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Reading Date
                    </label>
                    <div className="rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-mono text-foreground">
                      2026-09-16 (Today)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
                        <span>Opening (L)</span>
                        <span className="text-[10px] text-primary flex items-center gap-0.5">
                          <Lock className="h-2.5 w-2.5" /> Auto-filled
                        </span>
                      </label>
                      <div className="rounded-md border border-border bg-muted/70 px-3 py-1.5 font-mono text-xs text-muted-foreground font-semibold">
                        128450.20
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        Closing (L)
                      </label>
                      <div className="rounded-md border border-primary/50 bg-background px-3 py-1.5 font-mono text-xs font-bold text-foreground ring-1 ring-primary/30">
                        129620.80
                      </div>
                    </div>
                  </div>

                  {/* UX Preview Banner */}
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs flex items-center justify-between">
                    <span className="text-muted-foreground">Calculated Volume:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      1,170.60 Litres
                    </span>
                  </div>

                  <div className="rounded-md bg-primary text-primary-foreground text-center py-2 text-xs font-semibold shadow-xs">
                    Save Meter Reading
                  </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="text-xs font-bold text-foreground">
                    Recent Register Logs
                  </span>
                  <div className="overflow-x-auto rounded-xl border border-border/70">
                    <table className="w-full text-left text-[11px] font-mono">
                      <thead className="bg-muted/50 text-[10px] text-muted-foreground uppercase font-sans border-b border-border/60">
                        <tr>
                          <th className="p-2">Date</th>
                          <th className="p-2">Fuel</th>
                          <th className="p-2">Volume</th>
                          <th className="p-2">Sales</th>
                          <th className="p-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        <tr>
                          <td className="p-2 font-sans">16 Sep</td>
                          <td className="p-2 text-amber-600 font-semibold">MS</td>
                          <td className="p-2 font-bold">1,170.60 L</td>
                          <td className="p-2">₹1,21,976.52</td>
                          <td className="p-2 text-right font-sans">
                            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                              Saved
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-sans">16 Sep</td>
                          <td className="p-2 text-blue-600 font-semibold">HSD</td>
                          <td className="p-2 font-bold">1,447.80 L</td>
                          <td className="p-2">₹1,26,743.98</td>
                          <td className="p-2 text-right font-sans">
                            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                              Saved
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-sans">15 Sep</td>
                          <td className="p-2 text-amber-600 font-semibold">MS</td>
                          <td className="p-2 font-bold">1,350.20 L</td>
                          <td className="p-2">₹1,40,690.84</td>
                          <td className="p-2 text-right font-sans">
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                              Verified
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-sans">15 Sep</td>
                          <td className="p-2 text-blue-600 font-semibold">HSD</td>
                          <td className="p-2 font-bold">1,510.40 L</td>
                          <td className="p-2">₹1,32,220.42</td>
                          <td className="p-2 text-right font-sans">
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                              Verified
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

          {/* TAB 2: RATES & MARGINS */}
          {activeTab === "rates" && (
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-md animate-in fade-in-50 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      Fuel Rates & Margin Register
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Selling rates and dealer commission tracked with historical effective dates.
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Active Price Rule
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Active Rates */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.03] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">MS (Petrol) Active</span>
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      Effective: 01 Sep 2026
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-muted-foreground text-[11px]">Selling Rate:</span>
                      <p className="text-base font-bold font-mono text-foreground mt-0.5">
                        ₹104.20 <span className="text-xs font-normal text-muted-foreground">/ L</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px]">RO Dealer Margin:</span>
                      <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ₹3.30 <span className="text-xs font-normal text-muted-foreground">/ L</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.03] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">HSD (Diesel) Active</span>
                    <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-700 dark:text-blue-400">
                      Effective: 01 Sep 2026
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-muted-foreground text-[11px]">Selling Rate:</span>
                      <p className="text-base font-bold font-mono text-foreground mt-0.5">
                        ₹87.54 <span className="text-xs font-normal text-muted-foreground">/ L</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px]">RO Dealer Margin:</span>
                      <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ₹3.15 <span className="text-xs font-normal text-muted-foreground">/ L</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border/70 bg-muted/20 p-4">
                <span className="text-xs font-bold text-foreground block mb-2">
                  Historical Price Changes Logged Automatically
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When oil marketing companies announce 06:00 AM price revisions, enter the new effective date. Easy Manager automatically applies previous rates to earlier reading dates and new rates onward.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: MONTHLY PROFIT REPORTS */}
          {activeTab === "reports" && (
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-md animate-in fade-in-50 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      Monthly Profit Register & Reports
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Aggregated volume, sales turnover, gross commission, and expenses.
                  </p>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Financial Year 2026-27
                </Badge>
              </div>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border/70">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-muted/60 text-[10px] text-muted-foreground uppercase font-sans border-b border-border/60">
                    <tr>
                      <th className="p-3">Month</th>
                      <th className="p-3">Days</th>
                      <th className="p-3">Fuel Sales</th>
                      <th className="p-3">RO Margin</th>
                      <th className="p-3">Expenses</th>
                      <th className="p-3 text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-sans font-bold text-foreground">August 2026</td>
                      <td className="p-3 font-sans text-muted-foreground">31 days</td>
                      <td className="p-3">₹68,45,200.00</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                        ₹2,32,450.00
                      </td>
                      <td className="p-3 text-rose-500">₹1,10,000.00</td>
                      <td className="p-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        ₹1,22,450.00
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-sans font-bold text-foreground">July 2026</td>
                      <td className="p-3 font-sans text-muted-foreground">31 days</td>
                      <td className="p-3">₹71,20,400.00</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                        ₹2,41,800.00
                      </td>
                      <td className="p-3 text-rose-500">₹1,05,500.00</td>
                      <td className="p-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        ₹1,36,300.00
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-sans font-bold text-foreground">June 2026</td>
                      <td className="p-3 font-sans text-muted-foreground">30 days</td>
                      <td className="p-3">₹65,80,100.00</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                        ₹2,24,100.00
                      </td>
                      <td className="p-3 text-rose-500">₹98,000.00</td>
                      <td className="p-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        ₹1,26,100.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-2">
                <span>Calculations executed directly in PostgreSQL views with security_invoker</span>
                <span className="text-primary font-semibold">Zero spreadsheets required</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
