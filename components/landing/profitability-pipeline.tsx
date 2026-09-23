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
    <section className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            See the month clearly.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Sales, RO profit and expenses come together in one report.
          </p>

          {/* Month Switcher */}
          <div className="mt-8 inline-flex rounded-lg border border-border bg-card p-1 shadow-2xs">
            <button
              type="button"
              id="report-month-aug"
              onClick={() => setSelectedMonth("aug")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedMonth === "aug"
                  ? "bg-primary text-primary-foreground shadow-2xs"
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
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              July 2026
            </button>
          </div>
        </div>

        {/* Real Monthly Statement UI */}
        <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-border/80 bg-card p-4 sm:p-7 shadow-xs">
          {/* Statement Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground text-sm">Monthly Performance Summary</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground font-mono">{data.label}</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {data.shifts}
            </span>
          </div>

          {/* Clean Ledger Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border/60 text-[11px] text-muted-foreground uppercase font-sans">
                  <th className="pb-3 font-semibold">Fuel Product</th>
                  <th className="pb-3 font-semibold">Volume</th>
                  <th className="pb-3 font-semibold">Turnover</th>
                  <th className="pb-3 font-semibold text-right">RO Gross Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="py-3 font-sans font-medium text-foreground">MS (Petrol)</td>
                  <td className="py-3">{data.msVol}</td>
                  <td className="py-3">{data.msTurnover}</td>
                  <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                    {data.msMargin}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-sans font-medium text-foreground">HSD (Diesel)</td>
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
          <div className="mt-6 pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/30 p-3">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Total RO Gross Margin
              </span>
              <span className="mt-1 text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 block">
                {data.totalGross}
              </span>
              <span className="text-[10px] text-muted-foreground">From {data.totalLitres}</span>
            </div>

            <div className="rounded-lg bg-muted/30 p-3">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Operating Expenses
              </span>
              <span className="mt-1 text-base font-bold font-mono text-rose-600 dark:text-rose-400 block">
                {data.expenses}
              </span>
              <span className="text-[10px] text-muted-foreground">Salaries, power & genset</span>
            </div>

            <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
              <span className="text-[10px] uppercase font-semibold text-primary block">
                Net Station Profit
              </span>
              <span className="mt-1 text-lg font-extrabold font-mono text-foreground block">
                {data.netProfit}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Take-home earnings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
