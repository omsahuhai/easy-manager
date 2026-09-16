import { Users } from "lucide-react";

export function TargetAudience() {
  const personas = [
    {
      role: "Retail Outlet Owner",
      badge: "DEALER & PROPRIETOR",
      focus: "True net profit visibility",
      description:
        "Understand your exact daily RO margin and monthly net income after wages, power, and upkeep without waiting weeks for an accountant to balance spreadsheets.",
      feature: "Instant RO Margin & Monthly P&L",
    },
    {
      role: "Forecourt Shift Manager",
      badge: "STATION IN-CHARGE",
      focus: "Fast, dispute-free shift close",
      description:
        "Log nozzle readings at shift change in under 2 minutes. Automatic opening carry-forward eliminates morning totalizer disputes between attendants.",
      feature: "Locked Sequential Meter Totalizers",
    },
    {
      role: "Multi-Pump Operator",
      badge: "ENTERPRISE DEALER",
      focus: "Independent business workspaces",
      description:
        "Manage two, three, or more retail outlets across IOCL, BPCL, or HPCL under a single login with complete database tenant isolation between stations.",
      feature: "Multi-Tenant Business Switcher",
    },
  ];

  return (
    <section id="for-owners" className="py-14 sm:py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <Users className="h-3 w-3 text-primary" />
            <span>07 · Built For Forecourt Roles</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Engineered specifically for your workflow.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager is not a generic small-business accounting app retrofitted for petrol pumps. It was built around how Indian fuel stations actually operate on a day-to-day basis.
          </p>
        </div>

        {/* 3-Column Role Matrix */}
        <div className="mt-8 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
            {personas.map((item) => (
              <div
                key={item.role}
                className="p-5 sm:p-6 flex flex-col justify-between hover:bg-muted/10 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <span className="text-[10px] font-mono font-bold text-primary tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm sm:text-base font-bold text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-foreground/90">
                    {item.focus}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Key Tool:</span>
                  <span className="font-semibold text-foreground font-mono">
                    {item.feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
