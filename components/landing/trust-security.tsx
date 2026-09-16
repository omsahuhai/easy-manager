import { Database, Lock, ShieldCheck, FileCheck, Layers, Server, Shield } from "lucide-react";

export function TrustSecurity() {
  const pillars = [
    {
      icon: Database,
      spec: "DATABASE ENGINE",
      title: "PostgreSQL Row Level Security",
      description:
        "Multi-tenant isolation enforced directly at the Postgres kernel. Every table query is filtered through Supabase RLS policies tied to your authenticated business identifier.",
    },
    {
      icon: Server,
      spec: "ARITHMETIC LAYER",
      title: "Security-Invoker Reporting Views",
      description:
        "Sales, volumes, and margins are computed in database views using security_invoker = true. Calculations remain centralized and mathematically consistent across all reports.",
    },
    {
      icon: FileCheck,
      spec: "INPUT VALIDATION",
      title: "Server-Side Zod Schema Guards",
      description:
        "Every mutation is validated with strict server schemas before reaching the database. Negative volumes, out-of-sequence meters, or future dates are rejected before execution.",
    },
    {
      icon: Layers,
      spec: "MULTI-STATION",
      title: "Workspace Tenant Isolation",
      description:
        "Operational records for Station A cannot be accessed by Station B, even within the same owner account. Clean boundaries for multi-pump operators.",
    },
    {
      icon: Lock,
      spec: "AUTHENTICATION",
      title: "Secure Session Cookie Auth",
      description:
        "Authentication handled via Supabase Auth with HTTP-only, secure cookies. Service role credentials remain strictly secret on the server.",
    },
    {
      icon: ShieldCheck,
      spec: "DATA SOVEREIGNTY",
      title: "Zero Third-Party Tracking",
      description:
        "Your operational register data belongs to your dealership. No advertising pixels, no data selling, and no unauthorized third-party sharing.",
    },
  ];

  return (
    <section id="security" className="py-14 sm:py-20 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
            <Shield className="h-3 w-3 text-primary" />
            <span>06 · Technical Architecture</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            A database-first security model.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager does not rely on marketing claims. We enforce tenant isolation, data validation, and calculation accuracy directly at the database layer.
          </p>
        </div>

        {/* 2x3 Architecture Ledger */}
        <div className="mt-8 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 flex flex-col justify-between hover:bg-muted/10 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                      <span className="text-[10px] font-mono text-primary font-bold tracking-wider">
                        {item.spec}
                      </span>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <h3 className="mt-3 text-xs sm:text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 text-[10px] font-mono text-muted-foreground">
                    Enforced at database layer
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
