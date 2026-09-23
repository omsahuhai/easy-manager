export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Readings",
      desc: "Enter nozzle closing meters at shift wrap.",
    },
    {
      num: "02",
      title: "Rates",
      desc: "Keep daily selling prices and dealer margins current.",
    },
    {
      num: "03",
      title: "Calculations",
      desc: "Volume, sales, and gross margin calculate on save.",
    },
    {
      num: "04",
      title: "Expenses",
      desc: "Record generator fuel, power, and attendant wages.",
    },
    {
      num: "05",
      title: "Reports",
      desc: "Inspect consolidated sales and net profit statements.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Simple daily routine.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Five minutes at shift close replaces hours of manual paperwork.
          </p>
        </div>

        {/* Clean 5-Step Flow Line */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-lg border border-border bg-card p-4 space-y-1.5"
              >
                <span className="text-xs font-mono font-bold text-primary block">
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
