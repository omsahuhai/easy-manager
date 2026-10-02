import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";
import { ProfileMenu } from "@/components/profile-menu";
import { LayoutDashboard, ArrowRight } from "lucide-react";

interface AuthButtonProps { showDashboardLink?: boolean; }

export async function AuthButton({ showDashboardLink = true }: AuthButtonProps = {}) {
  if (!hasEnvVars) {
    return <div className="flex gap-2"><Button asChild size="sm" variant="outline"><Link href="/auth/login">Sign in</Link></Button><Button asChild size="sm"><Link href="/auth/sign-up">Sign up</Link></Button></div>;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      return <div className="flex gap-2"><Button asChild size="sm" variant="outline"><Link href="/auth/login">Sign in</Link></Button><Button asChild size="sm"><Link href="/auth/sign-up">Sign up</Link></Button></div>;
    }

    const { data: profile } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle();

    return (
      <div className="flex items-center gap-3">
        {showDashboardLink && (
          <Button asChild size="sm" className="gap-1.5 shadow-sm">
            <Link href="/protected/dashboard"><LayoutDashboard className="h-3.5 w-3.5" /><span>Dashboard</span><ArrowRight className="h-3.5 w-3.5 hidden sm:inline" /></Link>
          </Button>
        )}
        <ProfileMenu email={user.email ?? ""} fullName={profile?.full_name ?? null} avatarUrl={profile?.avatar_url ?? null} />
      </div>
    );
  } catch {
    return <div className="flex gap-2"><Button asChild size="sm" variant="outline"><Link href="/auth/login">Sign in</Link></Button><Button asChild size="sm"><Link href="/auth/sign-up">Sign up</Link></Button></div>;
  }
}
