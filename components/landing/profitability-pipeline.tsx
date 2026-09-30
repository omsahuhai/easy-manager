"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

export function ProfitabilityPipeline() {
  const [selectedMonth, setSelectedMonth] = useState<"aug" | "jul">("aug");

  const monthlyData = {
    aug: {
      label: "August 2026",
      shifts: "31 Days Recorded",
      msVol: "32,150.00 L",
      msTurnover: "₹33,50,030.00",
      msMargin: "₹1,06,095.00",
      hsdVol: "40,260.00 L",
      hsdTurnover: "₹34,95,170.00",
      hsdMargin: "₹1,26,355.00",
      totalGross: "₹2,32,450.00",
      totalLitres: "72,410 Litres",
      expenses: "– ₹1,10,000.00",
      netProfit: "₹1,22,450.00",
    },
    jul: {
      label: "July 2026",
      shifts: "31 Days Recorded",
      msVol: "30,800.00 L",
      msTurnover: "₹32,09,360.00",
      msMargin: "₹1,01,640.00",
      hsdVol: "38,900.00 L",
      hsdTurnover: "₹33,76,520.00",
      hsdMargin: "₹1,22,535.00",
      totalGross: "₹2,24,175.00",
      totalLitres: "69,700 Litres",
      expenses: "– ₹1,08,500.00",
      netProfit: "₹1,15,675.00",
    },
  };

  const data = monthlyData[selectedMonth];

  return (
    <section className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            See the month clearly.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Sales, your margin, and expenses come together in one report.
          </p>

          {/* Month Switcher */}
          <div className="mt-5 inline-flex rounded-lg border border-border/80 bg-card p-1 shadow-2xs">
            <button
              type="button"
              id="report-month-aug"
              onClick={() => setSelectedMonth("aug")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedMonth === "aug"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              August 2026
            </button>
            <button
              type="button"
              id="report-month-jul"
              onClick={() => setSelectedMonth("jul")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedMonth === "jul"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              July 2026
            </button>
          </div>
        </div>

        {/* Monthly Statement UI */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-2xl border border-border/80 bg-card p-4 sm:p-7 shadow-xs">
          {/* Statement Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground text-sm">Monthly Summary</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{data.label}</span>
            </div>
            <span className="text-xs text-muted-foreground self-start sm:self-auto">
              {data.shifts}
            </span>
          </div>

          {/* Mobile Fuel Breakdown (Clean stack for phone screens without nested boxes) */}
          <div className="sm:hidden mt-4 space-y-3">
            <div className="rounded-xl bg-muted/30 p-3.5 space-y-2 border border-border/60">
              <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                <span className="font-bold text-xs text-foreground">Petrol (MS)</span>
                <span className="text-xs font-mono font-medium text-foreground">{data.msVol}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total Sales</span>
                <span className="font-mono font-medium text-foreground">{data.msTurnover}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
                <span className="text-muted-foreground">Your Margin</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{data.msMargin}</span>
              </div>
            </div>

            <div className="rounded-xl bg-muted/30 p-3.5 space-y-2 border border-border/60">
              <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                <span className="font-bold text-xs text-foreground">Diesel (HSD)</span>
                <span className="text-xs font-mono font-medium text-foreground">{data.hsdVol}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total Sales</span>
                <span className="font-mono font-medium text-foreground">{data.hsdTurnover}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
                <span className="text-muted-foreground">Your Margin</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{data.hsdMargin}</span>
              </div>
            </div>
          </div>

          {/* Desktop / Tablet Ledger Table */}
          <div className="hidden sm:block mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border/60 text-[11px] text-muted-foreground uppercase font-sans">
                  <th className="pb-3 font-semibold">Fuel Product</th>
                  <th className="pb-3 font-semibold">Volume</th>
                  <th className="pb-3 font-semibold">Total Sales</th>
                  <th className="pb-3 font-semibold text-right">Your Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="py-3 font-sans font-medium text-foreground">Petrol (MS)</td>
                  <td className="py-3">{data.msVol}</td>
                  <td className="py-3">{data.msTurnover}</td>
                  <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                    {data.msMargin}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-sans font-medium text-foreground">Diesel (HSD)</td>
                  <td className="py-3">{data.hsdVol}</td>
                  <td className="py-3">{data.hsdTurnover}</td>
                  <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                    {data.hsdMargin}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Totals Reconciliation Bar */}
          <div className="mt-5 pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border/70 bg-muted/25 p-3.5 space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Total Margin
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 block tracking-tight">
                {data.totalGross}
              </span>
              <span className="text-[10px] text-muted-foreground block">From {data.totalLitres}</span>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/25 p-3.5 space-y-1">
              <span className="text-xs font-medium text-muted-foreground block">
                Operating Expenses
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-rose-600 dark:text-rose-400 block tracking-tight">
                {data.expenses}
              </span>
              <span className="text-[10px] text-muted-foreground block">Salaries, power & genset</span>
            </div>

            <div className="rounded-xl bg-primary/[0.06] border border-primary/25 p-3.5 space-y-1">
              <span className="text-xs font-semibold text-primary block">
                Take-Home Profit
              </span>
              <span className="text-lg sm:text-xl font-extrabold font-mono text-foreground block tracking-tight">
                {data.netProfit}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">Net station earnings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
