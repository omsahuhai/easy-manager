import { Building2, Gauge, IndianRupee, TrendingUp, BarChart3, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Building2,
      title: "Set up your workspace",
      description:
        "Create your business profile. One owner account can house multiple station workspaces with full database isolation.",
    },
    {
      num: "02",
      icon: Gauge,
      title: "Enter daily meter readings",
      description:
        "Input MS and HSD closing totalizers. The opening meter is automatically locked and carried over from the prior close.",
    },
    {
      num: "03",
      icon: IndianRupee,
      title: "Keep fuel rates updated",
      description:
        "Store retail selling rates and your dealer margin per litre. Price revisions apply automatically from their effective dates.",
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Review daily closing sales",
      description:
        "Instantly view total litres dispensed, sales revenue, and earned RO gross profit without touching a calculator.",
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Understand monthly net profit",
      description:
        "Log station expenses (salaries, genset fuel, power). Easy Manager reconciles monthly margin against expenses for real net profit.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Simple Implementation
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            How Easy Manager works in practice.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            No 6-week enterprise onboarding. You can set up your fuel station and log your first shift close in less than 5 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-2xl border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-border transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-md">
                      {step.num}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-xs">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
