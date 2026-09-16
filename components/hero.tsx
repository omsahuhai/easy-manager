import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Droplet,
  Gauge,
  IndianRupee,
  LayoutDashboard,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  user?: {
    email?: string;
    [key: string]: unknown;
  } | null;
}

const features = [
  {
    icon: Gauge,
    title: "Daily meter readings",
    description: "Record MS and HSD opening and closing readings in a workflow built around daily closing.",
  },
  {
    icon: IndianRupee,
    title: "Automatic calculations",
    description: "Turn meter movement and applicable fuel rates into litres sold, sales and RO margin automatically.",
  },
  {
    icon: ReceiptText,
    title: "Expense tracking",
    description: "Keep monthly operating costs such as salaries, electricity and maintenance in one place.",
  },
  {
    icon: TrendingUp,
    title: "Profit reports",
    description: "Review daily performance and monthly profitability without rebuilding the numbers manually.",
  },
  {
    icon: ShieldCheck,
    title: "Operational checks",
    description: "Surface missing rates and meter continuity issues before they quietly affect your records.",
  },
  {
    icon: LockKeyhole,
    title: "Business-isolated data",
    description: "Each business workspace keeps its operational records separated with database-level access controls.",
  },
];

const workflow = [
  "Enter daily meter readings",
  "Apply the applicable fuel rate and margin",
  "Let Easy Manager calculate sales and RO profit",
  "Record monthly operating expenses",
  "Review daily and monthly reports",
];

export function Hero({ user }: HeroProps = {}) {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Droplet className="h-3.5 w-3.5 text-primary" />
              Built for Indian petrol pump operations
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              The digital operating register for your petrol pump.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Record daily meter readings, manage fuel rates and expenses, and turn your closing data into clear sales and profitability reports.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {user ? (
                <Button asChild size="lg" className="gap-2 px-6 shadow-lg shadow-primary/15">
                  <Link href="/protected/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Open Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="gap-2 px-6 shadow-lg shadow-primary/15">
                    <Link href="/auth/sign-up">
                      Get started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="px-6">
                    <Link href="/auth/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />MS & HSD</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />Daily & monthly reports</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />Multi-business workspaces</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" />
            <div className="relative rounded-2xl border bg-background p-3 shadow-2xl shadow-black/10">
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">Product preview</p>
                    <p className="mt-0.5 text-sm font-semibold">Latest Performance · Sample</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">Example</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MockStat label="Sales" value="₹1,98,450" icon={IndianRupee} />
                  <MockStat label="Fuel Sold" value="2,140 L" icon={Droplet} />
                  <MockStat label="RO Profit" value="₹6,240" icon={TrendingUp} />
                  <MockStat label="Expenses" value="₹42,000" icon={ReceiptText} />
                </div>

                <div className="mt-4 rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">Daily closing</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">MS Petrol · HSD Diesel</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Gauge className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <div className="h-12 flex-1 rounded-md bg-primary/10" />
                    <div className="h-16 flex-1 rounded-md bg-primary/15" />
                    <div className="h-20 flex-1 rounded-md bg-primary/20" />
                    <div className="h-14 flex-1 rounded-md bg-primary/15" />
                    <div className="h-24 flex-1 rounded-md bg-primary/25" />
                    <div className="h-28 flex-1 rounded-md bg-primary/30" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">Operational checks</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Rates · continuity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Built around the real workflow</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need for the daily close.</h2>
          <p className="mt-4 text-muted-foreground">
            Easy Manager focuses on the recurring operational work of a petrol pump instead of trying to become an oversized ERP.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border bg-muted/30 px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">One simple flow</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From meter reading to profit report.</h2>
            <p className="mt-4 text-muted-foreground">Enter the operational data you already collect. Easy Manager keeps the calculations and reporting connected.</p>
          </div>
          <div className="space-y-3">
            {workflow.map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-xl border bg-background px-4 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                <span className="text-sm font-medium">{item}</span>
                {index < workflow.length - 1 && <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Make the daily closing simpler.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Keep readings, rates, expenses and profitability connected in one focused workspace.
            </p>
            <div className="mt-8">
              {user ? (
                <Button asChild size="lg" variant="secondary" className="gap-2 px-7">
                  <Link href="/protected/dashboard">Open Easy Manager <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="secondary" className="gap-2 px-7">
                  <Link href="/auth/sign-up">Create your workspace <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MockStat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof IndianRupee }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="mt-2 text-sm font-bold tracking-tight">{value}</p>
    </div>
  );
}
