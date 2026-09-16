"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Fuel, Menu, X, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface LandingNavbarProps {
  user?: {
    email?: string;
    [key: string]: unknown;
  } | null;
}

export function LandingNavbar({ user }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Daily Closing", href: "#workflow" },
    { name: "Calculations", href: "#calculations" },
    { name: "Security", href: "#security" },
    { name: "For Owners", href: "#for-owners" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-border/80 bg-background/95 backdrop-blur-md shadow-xs"
          : "border-b border-border/40 bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold text-base tracking-tight transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Fuel className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
              Easy Manager
            </span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
              Petrol Pump Register
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground hover:bg-muted/50"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Auth & Theme Switcher */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeSwitcher />

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="gap-1.5 shadow-xs font-medium">
                <Link href="/protected/dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Open Dashboard</span>
                </Link>
              </Button>
              <form action="/auth/logout" method="post">
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="font-medium text-xs">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="gap-1.5 shadow-xs font-medium text-xs">
                <Link href="/auth/sign-up">
                  <span>Get started</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile / Tablet menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background p-1 text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/98 px-4 pt-2 pb-6 backdrop-blur-lg lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {user ? (
              <Button asChild className="w-full justify-center gap-2 shadow-xs">
                <Link href="/protected/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Open Dashboard</span>
                </Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild className="w-full justify-center gap-1.5 shadow-xs">
                  <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <span>Get started</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
