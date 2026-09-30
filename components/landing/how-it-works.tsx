export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Closing Readings",
      desc: "Enter nozzle meter values at the end of each shift.",
    },
    {
      num: "02",
      title: "Fuel Prices",
      desc: "Keep daily selling prices and your margin current.",
    },
    {
      num: "03",
      title: "Instant Totals",
      desc: "Litres sold, total sales, and margin calculate automatically.",
    },
    {
      num: "04",
      title: "Station Expenses",
      desc: "Log electricity bills, generator fuel, and staff wages.",
    },
    {
      num: "05",
      title: "Monthly Profit",
      desc: "View clear summaries of total sales and take-home profit.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 border-t border-border/70 bg-muted/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Simple daily routine.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Five minutes at shift close replaces hours of manual paperwork.
          </p>
        </div>

        {/* Clean Step Flow: Compact horizontal cards on mobile, 5-col grid on desktop */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto">
          {/* Mobile view: Compact list */}
          <div className="sm:hidden space-y-2.5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-border/80 bg-card shadow-2xs"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
                  {step.num}
                </div>
                <div className="space-y-0.5 pt-0.5">
                  <h3 className="text-xs font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-border/80 bg-card p-4 space-y-2 shadow-2xs"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-mono font-bold text-primary">
                  {step.num}
                </span>
                <h3 className="text-sm font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
