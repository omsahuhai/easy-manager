export function TargetAudience() {
  const roles = [
    {
      role: "Owners",
      summary: "True RO margin and take-home net profit without waiting weeks for an accountant.",
    },
    {
      role: "Managers",
      summary: "Close evening shifts in two minutes with locked sequential opening meters.",
    },
    {
      role: "Multi-Pump Operators",
      summary: "Manage multiple retail outlets across IOCL, BPCL, or HPCL from one login.",
    },
  ];

  return (
    <section id="for-owners" className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Built for the people who run the pump.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Designed around how Indian fuel stations actually operate on the forecourt.
          </p>
        </div>

        {/* 3 Focused Role Columns */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((item) => (
              <div
                key={item.role}
                className="rounded-lg border border-border bg-card p-5 space-y-2"
              >
                <h3 className="text-base font-bold text-foreground">
                  {item.role}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
