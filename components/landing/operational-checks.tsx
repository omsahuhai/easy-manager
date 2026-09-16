import { AlertTriangle, ShieldCheck, Clock, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function OperationalChecks() {
  const guards = [
    {
      title: "Missing Fuel Rate Detection",
      badge: "Financial Guard",
      badgeVariant: "amber",
      icon: AlertTriangle,
      description:
        "Meter readings without an active selling rate or RO margin produce incomplete financial numbers. Easy Manager immediately highlights affected days across all reports.",
      sample: {
        tag: "Warning",
        text: "3 reading days in August lack applicable selling rates. Sales calculations pending.",
      },
    },
    {
      title: "Meter Continuity Mismatch",
      badge: "Totalizer Guard",
      badgeVariant: "blue",
      icon: ShieldCheck,
      description:
        "Flags readings where today's opening reading diverges from yesterday's recorded closing. Prevents undetected gaps, unaccounted fuel dispensing, or typing errors.",
      sample: {
        tag: "Continuity Check",
        text: "Opening 128,450.20 differs from previous closing 128,320.10 by +130.10 L.",
      },
    },
    {
      title: "Invalid Meter Reading Prevention",
      badge: "Integrity Guard",
      badgeVariant: "rose",
      icon: Ban,
      description:
        "Mechanical and electronic totalizers only count forward. Closing readings lower than opening readings are blocked at both client and database levels.",
      sample: {
        tag: "Validation Block",
        text: "Closing meter (128,100) cannot be lower than opening meter (128,450). Entry rejected.",
      },
    },
    {
      title: "Strict IST Business Date Validation",
      badge: "Timezone Guard",
      badgeVariant: "purple",
      icon: Clock,
      description:
        "Fuel pump operational dates are validated against the Indian Standard Time (Asia/Kolkata) clock. Prevents future-dated entries or local device clock manipulation.",
      sample: {
        tag: "Timezone Sync",
        text: "Reading date strictly validated against Asia/Kolkata calendar day.",
      },
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
            Operational Safeguards
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Catch problems before they affect your numbers.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager does more than store data — it actively protects your records from the most common clerical mistakes made on petrol pump forecourts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {guards.map((guard) => {
            const Icon = guard.icon;
            return (
              <div
                key={guard.title}
                className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-border transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-semibold">
                      {guard.badge}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {guard.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {guard.description}
                  </p>
                </div>

                {/* Sample Alert Pill */}
                <div className="mt-5 rounded-xl border border-border/60 bg-muted/40 p-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="font-semibold text-primary">[{guard.sample.tag}]</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {guard.sample.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
