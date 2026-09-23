import {
  TrendingUp,
  ReceiptText,
  IndianRupee,
  Gauge,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProfitabilityPipeline() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            End-to-End Accounting
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            From daily records to monthly profitability.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Turn fragmented daily shift slips into a clean, monthly profit-and-loss summary. Understand your real take-home margin after station operating costs.
          </p>
        </div>

        {/* The Pipeline Visualization */}
        <div className="mt-14 max-w-5xl mx-auto">
          {/* Step Progression Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative items-stretch">
            {/* Step 1: Daily Readings */}
            <div className="rounded-xl border border-border/80 bg-card p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    01. Input
                  </span>
                  <Gauge className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  Daily Meter Readings
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  Opening & closing logged for every nozzle each evening.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-muted/50 p-2 text-center border border-border/60">
                <span className="text-[10px] text-muted-foreground block">Monthly Volume</span>
                <span className="font-mono font-bold text-xs text-foreground">72,410 Litres</span>
              </div>
            </div>

            {/* Step 2: Fuel Sales */}
            <div className="rounded-xl border border-border/80 bg-card p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    02. Turnover
                  </span>
                  <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  Fuel Revenue
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  Litres multiplied by daily applicable selling rates.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-blue-500/10 p-2 text-center border border-blue-500/20">
                <span className="text-[10px] text-muted-foreground block">Customer Sales</span>
                <span className="font-mono font-bold text-xs text-blue-700 dark:text-blue-300">
                  ₹68,45,200
                </span>
              </div>
            </div>

            {/* Step 3: RO Margin */}
            <div className="rounded-xl border border-border/80 bg-card p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    03. Margin
                  </span>
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  RO Gross Profit
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  Dealer commission pool credited by oil marketing company.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-emerald-500/10 p-2 text-center border border-emerald-500/20">
                <span className="text-[10px] text-muted-foreground block">Gross Commission</span>
                <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                  ₹2,32,450
                </span>
              </div>
            </div>

            {/* Step 4: Expenses */}
            <div className="rounded-xl border border-border/80 bg-card p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    04. Costs
                  </span>
                  <ReceiptText className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  Station Expenses
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  Staff salaries, electricity, generator diesel, and upkeep.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-rose-500/10 p-2 text-center border border-rose-500/20">
                <span className="text-[10px] text-muted-foreground block">Operating Costs</span>
                <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
                  – ₹1,10,000
                </span>
              </div>
            </div>

            {/* Step 5: Net Profit */}
            <div className="rounded-xl border border-primary/40 bg-primary/[0.03] p-4 flex flex-col justify-between shadow-xs ring-1 ring-primary/20">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    05. Bottom Line
                  </span>
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  Net Station Profit
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                  Real operational earnings for the business owner.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-primary/10 p-2 text-center border border-primary/30">
                <span className="text-[10px] text-primary font-medium block">Net Profit</span>
                <span className="font-mono font-extrabold text-sm text-foreground">
                  ₹1,22,450
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Register Report Preview */}
          <div className="mt-8 rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  Monthly Profitability Statement (Sample View)
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Consolidated at the end of each calendar month
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                August 2026 · 31 Days Recorded
              </Badge>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] text-muted-foreground uppercase font-sans">
                    <th className="pb-2 font-semibold">Fuel Type</th>
                    <th className="pb-2 font-semibold">Volume</th>
                    <th className="pb-2 font-semibold">Turnover</th>
                    <th className="pb-2 font-semibold">RO Gross Margin</th>
                    <th className="pb-2 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-foreground">MS (Petrol)</td>
                    <td className="py-2.5">32,150.00 L</td>
                    <td className="py-2.5">₹33,50,030.00</td>
                    <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      ₹1,06,095.00
                    </td>
                    <td className="py-2.5 text-right font-sans">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        31/31 Days Reconciled
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-sans font-medium text-foreground">HSD (Diesel)</td>
                    <td className="py-2.5">40,260.00 L</td>
                    <td className="py-2.5">₹34,95,170.00</td>
                    <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      ₹1,26,355.00
                    </td>
                    <td className="py-2.5 text-right font-sans">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        31/31 Days Reconciled
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-muted/30 font-bold font-sans">
                    <td className="py-2.5 px-2 text-foreground">Total Operations</td>
                    <td className="py-2.5 font-mono">72,410.00 L</td>
                    <td className="py-2.5 font-mono">₹68,45,200.00</td>
                    <td className="py-2.5 font-mono text-emerald-600 dark:text-emerald-400">
                      ₹2,32,450.00
                    </td>
                    <td className="py-2.5 px-2 text-right text-foreground">
                      Net: ₹1,22,450.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
