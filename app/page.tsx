import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Logo } from "@/components/logo";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { hasEnvVars } from "@/lib/utils";
import { AlertTriangle, Terminal } from "lucide-react";

async function AuthRedirect() {
  if (!hasEnvVars) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/protected/dashboard");
    }
  } catch {
    return null;
  }

  return null;
}

export const instant = false;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Suspense fallback={null}>
        <AuthRedirect />
      </Suspense>
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <Logo />
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </nav>

        {!hasEnvVars && (
          <div className="w-full max-w-3xl px-5">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-900 dark:text-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-sm">
                    Supabase Configuration Required
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To enable authentication and database operations, create a{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground font-semibold">
                      .env.local
                    </code>{" "}
                    file in the root of your project:
                  </p>
                  <pre className="rounded-lg bg-background/80 p-3 font-mono text-xs border border-border overflow-x-auto text-foreground">
                    <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key`}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    You can copy the provided template:{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground font-semibold">
                      cp .env.example .env.local
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
          <Hero />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <p className="text-muted-foreground">
            &copy; 2026 Easy Manager. All rights reserved.
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
