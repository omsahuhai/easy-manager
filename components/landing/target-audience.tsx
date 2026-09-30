import { UserCheck, Clock, Building2 } from "lucide-react";

export function TargetAudience() {
  const roles = [
    {
      role: "Pump Owners",
      icon: UserCheck,
      summary: "Know your daily margins and take-home net profit without waiting weeks for an accountant.",
    },
    {
      role: "Shift Managers",
      icon: Clock,
      summary: "Wrap up shift closings in two minutes with automatically carried-over opening readings.",
    },
    {
      role: "Multi-Pump Owners",
      icon: Building2,
      summary: "Manage multiple retail outlets across IOCL, BPCL, and HPCL from one single secure login.",
    },
  ];

  return (
    <section id="for-owners" className="py-12 sm:py-20 border-t border-border/70 bg-muted/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Built for the people who run the pump.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Designed around how Indian fuel stations actually operate on the forecourt.
          </p>
        </div>

        {/* 3 Focused Role Columns */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {roles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-2xs"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
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
