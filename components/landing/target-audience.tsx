import { UserCheck, Briefcase, Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TargetAudience() {
  const roles = [
    {
      icon: UserCheck,
      role: "Retail Outlet Owners",
      benefit: "True profitability visibility",
      description:
        "Understand your exact daily RO margin and monthly net income after operating costs without waiting for an accountant to balance spreadsheets.",
    },
    {
      icon: Briefcase,
      role: "Station Managers",
      benefit: "Fast, error-free shift close",
      description:
        "Log nozzle readings at shift change in under 2 minutes. Automatic opening carry-forward eliminates morning disputes about meter continuity.",
    },
    {
      icon: Building2,
      role: "Multi-Pump Operators",
      benefit: "Independent business workspaces",
      description:
        "Manage two, three, or more petrol pumps under a single login. Switch between station registers with complete database tenant isolation.",
    },
    {
      icon: Users,
      role: "Forecourt Supervisors",
      benefit: "Accurate testing & rate tracking",
      description:
        "Deduct mandatory 5-litre testing measures accurately and ensure new fuel rate revisions apply seamlessly from their effective dates.",
    },
  ];

  return (
    <section id="for-owners" className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Built for Fuel Retailing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Designed specifically for your workflow.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager is not a generic accounting tool retrofitted for petrol pumps. It was created from the ground up for how Indian fuel stations actually run.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-border transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-sm sm:text-base font-bold text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-primary">
                    {item.benefit}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
