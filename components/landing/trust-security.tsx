import { Database, ShieldCheck, Lock } from "lucide-react";

export function TrustSecurity() {
  return (
    <section id="security" className="py-12 sm:py-20 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Your business data stays private and secure.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every petrol pump&apos;s records are strictly isolated and protected with bank-grade security.
          </p>
        </div>

        {/* Security Highlights */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-xs">
            <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-sm">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Database className="h-4 w-4" />
                </div>
                <span>Strict Station Privacy</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Your records are completely private. No other station or user can ever see your readings, sales, or margins.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-sm">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>Built-In Protection</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Prevents accidental data corruption, duplicate entries, and impossible negative meter calculations automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-sm">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Lock className="h-4 w-4" />
                </div>
                <span>Zero Ads or Tracking</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Your pump register belongs solely to your station. No advertising trackers, no cookies, and zero data sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
