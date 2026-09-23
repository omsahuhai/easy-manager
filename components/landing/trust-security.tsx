import { Database, Lock, ShieldCheck, FileCheck, Layers, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrustSecurity() {
  const pillars = [
    {
      icon: Database,
      title: "PostgreSQL Row Level Security",
      description:
        "Multi-tenant isolation enforced directly at the database engine. Every query is filtered through Supabase RLS policies tied to your authenticated business identifier.",
    },
    {
      icon: Server,
      title: "Database-Level Reporting Views",
      description:
        "Sales, volumes, and margins are computed in PostgreSQL views using security_invoker = true. Calculations remain centralized and mathematically consistent.",
    },
    {
      icon: FileCheck,
      title: "Server-Side Zod Validation",
      description:
        "Every mutation is validated with strict server schemas before reaching the database. Invalid numbers or future dates are rejected before execution.",
    },
    {
      icon: Lock,
      title: "Secure Session Authentication",
      description:
        "Authentication handled via Supabase Auth with HTTP-only, secure cookies. Service role credentials remain strictly secret on the server.",
    },
    {
      icon: Layers,
      title: "Workspace Tenant Isolation",
      description:
        "Operational records for Station A cannot be accessed by Station B, even within the same owner account. Clear boundaries for multi-pump operators.",
    },
    {
      icon: ShieldCheck,
      title: "Data Ownership & Integrity",
      description:
        "Your operational register data is your property. No unauthorized third-party sharing, no tracking cookies, and no ad networks.",
    },
  ];

  return (
    <section id="security" className="py-16 sm:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
          >
            Technical Architecture
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            A database-first security model.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Easy Manager does not rely on marketing claims. We enforce tenant isolation, data validation, and calculation accuracy directly at the database layer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-border transition-colors"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm sm:text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
