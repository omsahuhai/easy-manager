import { AlertTriangle, ShieldCheck, Clock, Ban, Shield } from "lucide-react";

export function OperationalChecks() {
  const guards = [
    {
      title: "Missing Fuel Rate Detection",
      badge: "Financial Guard",
      icon: AlertTriangle,
      accent: "amber",
      description:
        "Meter readings without an active selling rate produce distorted financial summaries. Easy Manager automatically detects rate gaps and pauses turnover calculations until prices are verified.",
      alert: {
        type: "warning",
        title: "Rate Warning",
        text: "3 reading days in August lack applicable selling rates. Volume recorded; sales calculation held to protect report accuracy.",
      },
    },
    {
      title: "Opening Meter Continuity Lock",
      badge: "Totalizer Guard",
      icon: ShieldCheck,
      accent: "emerald",
      description:
        "Guards against shift-end discrepancies where an opening reading differs from yesterday's recorded close. Eliminates undetected fuel gaps, unauthorized back-edits, or typing errors.",
      alert: {
        type: "info",
        title: "Totalizer Lock",
        text: "Opening meter 128,450.20 locked to 15 Sep close. Manual override disabled to maintain unbroken forecourt audit chain.",
      },
    },
    {
      title: "Invalid Mechanical Reading Prevention",
      badge: "Integrity Guard",
      icon: Ban,
      accent: "rose",
      description:
        "Physical pump totalizers only count forward. Any closing reading lower than the opening reading is blocked at both client and database levels before corrupting the register.",
      alert: {
        type: "error",
        title: "Validation Rejection",
        text: "Closing reading (128,100.00) cannot be lower than opening reading (128,450.20). Entry blocked at schema validation.",
      },
    },
    {
      title: "Strict IST Business Date Enforcement",
      badge: "Timezone Guard",
      icon: Clock,
      accent: "blue",
      description:
        "Fuel pump operational days are anchored to the Asia/Kolkata timezone. Prevents future-dated entries, accidental double closes, or device clock manipulations.",
      alert: {
        type: "info",
        title: "IST Calendar Guard",
        text: "Shift date validated against Asia/Kolkata calendar day. Future-dated entries are rejected.",
      },
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <Shield className="h-3 w-3 text-primary" />
            <span>04 · Forecourt Defensive Guards</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Catch problems before they affect your numbers.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager does more than store data — it actively protects your records from the clerical and totalizer mistakes most common on Indian forecourts.
          </p>
        </div>

        {/* 2x2 Clean Forecourt Guard Cards with Real In-App Alert Banners */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {guards.map((guard) => {
            const Icon = guard.icon;
            return (
              <div
                key={guard.title}
                className="rounded-xl border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">
                        {guard.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {guard.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {guard.description}
                  </p>
                </div>

                {/* Real Forecourt UI Alert Banner */}
                <div className="mt-4 rounded-lg border border-border/70 bg-muted/40 p-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] font-bold text-foreground shrink-0 uppercase tracking-wider bg-background px-1.5 py-0.5 rounded border border-border/60">
                      {guard.alert.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      {guard.alert.text}
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
