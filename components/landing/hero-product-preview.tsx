import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroProductPreview() {
  return (
    <div className="relative w-full max-w-2xl lg:max-w-none">
      {/* Subtle outer glow highlight */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-md opacity-60" />

      {/* Main product card frame */}
      <div className="relative rounded-xl border border-border/80 bg-card text-card-foreground shadow-lg shadow-black/5 dark:shadow-black/25">
        {/* Forecourt Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-3.5 py-2.5 bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground tracking-tight">
                Kisan Petroleum
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                IOCL RO #241098
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>16 Sep (Today)</span>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0 font-medium"
            >
              Reconciled
            </Badge>
          </div>
        </div>

        {/* 3 KPI Summary Ribbon */}
        <div className="grid grid-cols-3 divide-x divide-border/60 border-b border-border/60 bg-muted/10 text-center py-2 px-1">
          <div className="px-2">
            <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground block">
              Today&apos;s Sales
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground font-mono tabular-nums block mt-0.5">
              ₹2,47,755.23
            </span>
          </div>
          <div className="px-2">
            <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground block">
              Volume Dispensed
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground font-mono tabular-nums block mt-0.5">
              2,608.40 L
            </span>
          </div>
          <div className="px-2">
            <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground block">
              RO Gross Profit
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums block mt-0.5">
              ₹8,391.30
            </span>
          </div>
        </div>

        {/* Dual Nozzle Register Details */}
        <div className="p-3 space-y-2.5">
          {/* Nozzle 01: MS Petrol */}
          <div className="rounded-lg border border-border/70 bg-background/60 p-2.5 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-foreground text-xs">
                  Nozzle 01 · MS (Petrol)
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Rate: <strong className="text-foreground">₹104.20</strong> · Margin: <strong className="text-emerald-600 dark:text-emerald-400">₹3.30/L</strong>
              </span>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">Opening</span>
                <span className="text-[11px] font-medium text-foreground flex items-center justify-center gap-0.5">
                  <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                  128,450.20
                </span>
              </div>
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">Closing</span>
                <span className="text-[11px] font-medium text-foreground">
                  129,620.80
                </span>
              </div>
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">5L Test</span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  -5.00 L
                </span>
              </div>
              <div className="rounded bg-amber-500/10 dark:bg-amber-500/15 p-1 border border-amber-500/20">
                <span className="text-[9px] uppercase font-sans text-amber-700 dark:text-amber-400 font-medium block">Net Litres</span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  1,165.60 L
                </span>
              </div>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Sales: <strong className="text-foreground font-mono">₹1,21,455.52</strong></span>
              <span>RO Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">₹3,846.48</strong></span>
            </div>
          </div>

          {/* Nozzle 02: HSD Diesel */}
          <div className="rounded-lg border border-border/70 bg-background/60 p-2.5 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-semibold text-foreground text-xs">
                  Nozzle 02 · HSD (Diesel)
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Rate: <strong className="text-foreground">₹87.54</strong> · Margin: <strong className="text-emerald-600 dark:text-emerald-400">₹3.15/L</strong>
              </span>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">Opening</span>
                <span className="text-[11px] font-medium text-foreground flex items-center justify-center gap-0.5">
                  <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                  84,210.50
                </span>
              </div>
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">Closing</span>
                <span className="text-[11px] font-medium text-foreground">
                  85,658.30
                </span>
              </div>
              <div className="rounded bg-muted/40 p-1">
                <span className="text-[9px] uppercase font-sans text-muted-foreground block">5L Test</span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  -5.00 L
                </span>
              </div>
              <div className="rounded bg-blue-500/10 dark:bg-blue-500/15 p-1 border border-blue-500/20">
                <span className="text-[9px] uppercase font-sans text-blue-700 dark:text-blue-400 font-medium block">Net Litres</span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">
                  1,442.80 L
                </span>
              </div>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Sales: <strong className="text-foreground font-mono">₹1,26,299.71</strong></span>
              <span>RO Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">₹4,544.82</strong></span>
            </div>
          </div>
        </div>

        {/* Verification Guard Strip */}
        <div className="border-t border-border/60 bg-muted/20 px-3 py-2 rounded-b-xl flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Sequential opening locked from 15 Sep (Zero mismatch)</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span>PostgreSQL Multi-Tenant RLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
