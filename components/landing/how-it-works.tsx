import { Building2, Gauge, IndianRupee, TrendingUp, BarChart3, Clock } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Building2,
      title: "Set up station workspace",
      description:
        "Define your business profile and assign fuel tanks and nozzle registers with isolated database security.",
    },
    {
      num: "02",
      icon: Gauge,
      title: "Log shift closing meter",
      description:
        "Attendant inputs nozzle closing totalizers. Opening reading carries over automatically without manual copying.",
    },
    {
      num: "03",
      icon: IndianRupee,
      title: "Maintain daily rates",
      description:
        "Store retail selling rates and dealer commission per litre. Price revisions apply from effective shift dates.",
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Instant shift reconciliation",
      description:
        "Review auto-calculated net litres dispensed, customer sales revenue, and earned dealer RO margin immediately.",
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Inspect monthly P&L",
      description:
        "Track forecourt operating expenses (wages, genset, power) and reconcile gross commission against real costs.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <Clock className="h-3 w-3 text-primary" />
            <span>05 · Operational Implementation</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Live on your forecourt in under 5 minutes.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            No 6-week ERP implementation. Zero training barrier for forecourt staff. Setup takes minutes and aligns directly with your pump&apos;s daily shift closing.
          </p>
        </div>

        {/* Industrial Horizontal Process Ledger */}
        <div className="mt-8 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-5 flex flex-col justify-between hover:bg-muted/10 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                      <span className="font-mono text-xs font-bold text-primary">
                        STEP {step.num}
                      </span>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <h3 className="mt-3 text-xs sm:text-sm font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 text-[10px] font-mono text-muted-foreground">
                    Zero onboarding overhead
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
