import { BarChart3, CheckCircle2 } from "lucide-react";

export function ProfitabilityPipeline() {
  return (
    <section className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <BarChart3 className="h-3 w-3 text-primary" />
            <span>03 · Monthly Operating Reconciliation</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            From daily nozzle slips to real monthly take-home profit.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Turn fragmented shift entries into an audit-ready monthly profit-and-loss register. Understand your true take-home earnings after staff payroll, generator diesel, and forecourt electricity.
          </p>
        </div>

        {/* Unified Monthly Operating Statement */}
        <div className="mt-8 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs overflow-hidden">
          {/* Statement Header Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 sm:px-6 py-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-foreground">
                Monthly Profitability Statement
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs font-mono text-muted-foreground">
                August 2026 (31 Days Reconciled)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Zero Missing Rate Days</span>
            </div>
          </div>

          {/* 4 Summary Stat Cells */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60 border-b border-border/60 bg-muted/10 p-2 sm:p-3 text-center">
            <div className="p-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                Total Litres Sold
              </span>
              <span className="text-sm sm:text-base font-bold text-foreground font-mono mt-0.5 block">
                72,410.00 L
              </span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                Customer Turnover
              </span>
              <span className="text-sm sm:text-base font-bold text-foreground font-mono mt-0.5 block">
                ₹68,45,200.00
              </span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                RO Gross Margin
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">
                ₹2,32,450.00
              </span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                Net Station Profit
              </span>
              <span className="text-sm sm:text-base font-bold text-primary font-mono mt-0.5 block">
                ₹1,22,450.00
              </span>
            </div>
          </div>

          {/* Two-Column Financial Reconciliation Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/70">
            {/* Left: Fuel Sales by Grade */}
            <div className="lg:col-span-7 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Fuel Dispensing Register
                </span>
                <span className="text-[11px] text-muted-foreground">
                  By Product Grade
                </span>
              </div>

              <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[440px] text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border/50 text-[10px] text-muted-foreground text-left">
                      <th className="pb-2 font-sans font-medium">Fuel Grade</th>
                      <th className="pb-2 font-sans font-medium text-right">Volume (L)</th>
                      <th className="pb-2 font-sans font-medium text-right">Turnover</th>
                      <th className="pb-2 font-sans font-medium text-right text-emerald-600 dark:text-emerald-400">RO Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-foreground flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        MS (Petrol)
                      </td>
                      <td className="py-2.5 text-right text-foreground">32,150.00</td>
                      <td className="py-2.5 text-right text-foreground">₹33,50,030.00</td>
                      <td className="py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">₹1,06,095.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-foreground flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        HSD (Diesel)
                      </td>
                      <td className="py-2.5 text-right text-foreground">40,260.00</td>
                      <td className="py-2.5 text-right text-foreground">₹34,95,170.00</td>
                      <td className="py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">₹1,26,355.00</td>
                    </tr>
                    <tr className="border-t border-border/70 font-bold">
                      <td className="pt-2.5 font-sans text-foreground">Total Operational</td>
                      <td className="pt-2.5 text-right text-foreground">72,410.00 L</td>
                      <td className="pt-2.5 text-right text-foreground">₹68,45,200.00</td>
                      <td className="pt-2.5 text-right text-emerald-600 dark:text-emerald-400">₹2,32,450.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Operational Expense Deduction to Net Profit */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-muted/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Operating P&amp;L Reconciliation
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Net Take-Home
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="font-sans">RO Gross Commission:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+₹2,32,450.00</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="font-sans">Attendants &amp; Cashier Wages:</span>
                    <span className="text-destructive font-semibold">–₹52,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="font-sans">Generator Fuel &amp; Forecourt Power:</span>
                    <span className="text-destructive font-semibold">–₹38,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="font-sans">Forecourt Upkeep &amp; Maintenance:</span>
                    <span className="text-destructive font-semibold">–₹20,000.00</span>
                  </div>
                  <div className="pt-2 border-t border-border/60 flex justify-between items-center text-muted-foreground">
                    <span className="font-sans font-medium">Total Monthly Expenses:</span>
                    <span className="text-destructive font-bold">–₹1,10,000.00</span>
                  </div>
                </div>
              </div>

              {/* Bottom Line Box */}
              <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                    Net Operating Profit
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    Actual Station Earnings
                  </span>
                </div>
                <span className="text-base sm:text-lg font-bold text-primary font-mono">
                  ₹1,22,450.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
