import {
  IndianRupee,
  Droplet,
  TrendingUp,
  ReceiptText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Glow highlight */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-xl opacity-70" />

      {/* Main product card preview frame */}
      <div className="relative rounded-2xl border border-border/80 bg-card p-2 sm:p-4 shadow-xl shadow-black/5 dark:shadow-black/20 ring-1 ring-border/50">
        {/* Window Chrome / Status bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-border/70 pb-3 px-2 sm:px-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                  Kisan Petroleum
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-muted-foreground hidden xs:inline">
                  RO 241098
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                IOCL Dealer Outlet · Retail Register
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] font-medium text-foreground">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>Today&apos;s Closing</span>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0.5"
            >
              Calculated
            </Badge>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-3">
          {/* Sales */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-3 sm:p-3.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">Today&apos;s Sales</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <IndianRupee className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2 text-sm sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              ₹2,48,720.50
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Auto-derived</span> from 2 nozzles
            </p>
          </div>

          {/* Fuel Sold */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-3 sm:p-3.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">Fuel Dispensed</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Droplet className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2 text-sm sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              2,618.40 L
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              MS: 1,170.6 L · HSD: 1,447.8 L
            </p>
          </div>

          {/* RO Profit */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-3 sm:p-3.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">RO Gross Margin</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2 text-sm sm:text-lg font-bold tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
              ₹8,426.00
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Litres × Dealer margin
            </p>
          </div>

          {/* Monthly Expenses */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-3 sm:p-3.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">Month Expenses</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <ReceiptText className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2 text-sm sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              ₹54,200.00
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Salaries, genset, power
            </p>
          </div>
        </div>

        {/* Dual Fuel Meter Operational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2 sm:px-3 pb-2 sm:pb-3">
          {/* MS Petrol */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  MS (Petrol) · Nozzle 01
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 text-[10px] px-2 py-0"
              >
                ₹104.20/L · Margin ₹3.30/L
              </Badge>
            </div>

            {/* Meter Reading Flow */}
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-background/90 p-2.5 border border-border/60 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  Opening <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                </span>
                <span className="font-mono font-semibold text-foreground text-[11px] sm:text-xs block mt-0.5">
                  128,450.20
                </span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground">Closing</span>
                <span className="font-mono font-semibold text-foreground text-[11px] sm:text-xs block mt-0.5">
                  129,620.80
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground">Volume Sold</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs block mt-0.5">
                  1,170.60 L
                </span>
              </div>
            </div>

            {/* Calculated Output */}
            <div className="flex items-center justify-between text-[11px] pt-0.5 px-0.5">
              <span className="text-muted-foreground">
                Revenue: <strong className="text-foreground font-semibold">₹1,21,976.52</strong>
              </span>
              <span className="text-muted-foreground">
                RO Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">₹3,862.98</strong>
              </span>
            </div>
          </div>

          {/* HSD Diesel */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.03] dark:bg-blue-500/[0.05] p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  HSD (Diesel) · Nozzle 02
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 text-[10px] px-2 py-0"
              >
                ₹87.54/L · Margin ₹3.15/L
              </Badge>
            </div>

            {/* Meter Reading Flow */}
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-background/90 p-2.5 border border-border/60 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  Opening <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                </span>
                <span className="font-mono font-semibold text-foreground text-[11px] sm:text-xs block mt-0.5">
                  84,210.50
                </span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground">Closing</span>
                <span className="font-mono font-semibold text-foreground text-[11px] sm:text-xs block mt-0.5">
                  85,658.30
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground">Volume Sold</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-[11px] sm:text-xs block mt-0.5">
                  1,447.80 L
                </span>
              </div>
            </div>

            {/* Calculated Output */}
            <div className="flex items-center justify-between text-[11px] pt-0.5 px-0.5">
              <span className="text-muted-foreground">
                Revenue: <strong className="text-foreground font-semibold">₹1,26,743.98</strong>
              </span>
              <span className="text-muted-foreground">
                RO Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">₹4,563.02</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Operational Guard Footer */}
        <div className="border-t border-border/60 bg-muted/30 px-3 py-2.5 rounded-b-xl flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Meter continuity verified: 0 mismatches</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-primary" />
              PostgreSQL RLS Isolated
            </span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-foreground font-semibold">
              Live Demo Preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
