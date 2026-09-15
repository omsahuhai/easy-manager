import Link from "next/link";
import { Button } from "./ui/button";

import { LayoutDashboard, ArrowRight } from "lucide-react";

interface HeroProps {
  user?: {
    email?: string;
    [key: string]: unknown;
  } | null;
}

export function Hero({ user }: HeroProps = {}) {
  return (
    <div className="flex flex-col gap-8 items-center pt-16 pb-8">
      {user && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Logged in as {user.email}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-center">
          Manage your petrol pump <span className="text-primary">with ease.</span>
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl text-center">
          The all-in-one mobile-first accounting solution for petrol pump owners. Track sales, expenses, and analytics securely.
        </p>
      </div>
      
      <div className="flex gap-4 mt-4">
        {user ? (
          <Button asChild size="lg" className="px-8 gap-2 shadow-lg shadow-primary/20">
            <Link href="/protected/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild size="lg" className="px-8">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/auth/login">Login</Link>
            </Button>
          </>
        )}
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-16" />
    </div>
  );
}
