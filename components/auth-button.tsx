import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

import { hasEnvVars } from "@/lib/utils";

import { LayoutDashboard, ArrowRight } from "lucide-react";

interface AuthButtonProps {
  showDashboardLink?: boolean;
}

export async function AuthButton({ showDashboardLink = true }: AuthButtonProps = {}) {
  if (!hasEnvVars) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    return user ? (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
          Hey, {user.email?.split("@")[0]}!
        </span>
        {showDashboardLink && (
          <Button asChild size="sm" variant="default" className="gap-1.5 shadow-sm">
            <Link href="/protected/dashboard">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
            </Link>
          </Button>
        )}
        <LogoutButton />
      </div>
    ) : (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  } catch {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }
}
