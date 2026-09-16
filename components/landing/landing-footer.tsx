import Link from "next/link";
import { Fuel } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Fuel className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
                  Easy Manager
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Digital Petrol Pump Register
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The digital operating register for Indian petrol pump owners. Record daily meter readings, track selling rates and expenses, and derive sales and RO profitability automatically.
            </p>
            <div className="pt-2 text-[11px] text-muted-foreground">
              Built for retail outlets of IOCL, BPCL, HPCL & independent operators.
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
              Product
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#product" className="hover:text-foreground transition-colors">
                  Overview & Register
                </Link>
              </li>
              <li>
                <Link href="#workflow" className="hover:text-foreground transition-colors">
                  Daily Closing Workflow
                </Link>
              </li>
              <li>
                <Link href="#calculations" className="hover:text-foreground transition-colors">
                  Calculation Engine
                </Link>
              </li>
              <li>
                <Link href="#for-owners" className="hover:text-foreground transition-colors">
                  For Fuel Station Owners
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform / Security Col */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
              Platform
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#security" className="hover:text-foreground transition-colors">
                  Database-First Security
                </Link>
              </li>
              <li>
                <Link href="#security" className="hover:text-foreground transition-colors">
                  PostgreSQL RLS Policies
                </Link>
              </li>
              <li>
                <Link href="#security" className="hover:text-foreground transition-colors">
                  Tenant Isolation
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:text-foreground transition-colors">
                  Multi-Business Workspaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Account Col */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
              Legal & Account
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                  Operational Disclaimer
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/auth/login" className="hover:text-foreground transition-colors font-medium text-foreground">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:text-foreground transition-colors font-medium text-primary">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 Easy Manager. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Designed for Indian Standard Time (Asia/Kolkata)</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
