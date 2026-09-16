import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Logo } from "@/components/logo";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

export const instant = false;

export default async function Home() {
  let user = null;
  if (hasEnvVars) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getClaims();
      user = data?.claims ?? null;
    } catch {
      // Keep the public landing page available if auth is temporarily unavailable.
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6">
          <Logo />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>

      {!hasEnvVars && (
        <div className="mx-auto w-full max-w-6xl px-5 pt-5 sm:px-6">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Supabase configuration required</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Create <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.local</code> using the values documented in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">.env.example</code> to enable authentication and database operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <Hero user={user} />
      </div>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-medium text-foreground">Easy Manager</p>
            <p className="mt-1">The digital operating register for Indian petrol pump owners.</p>
          </div>
          <div className="flex items-center gap-3">
            <span>© 2026 Easy Manager</span>
            <ThemeSwitcher />
          </div>
        </div>
      </footer>
    </main>
  );
}
