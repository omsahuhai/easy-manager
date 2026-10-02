import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/supabase/auth";
import { getCurrentUserProfile } from "@/lib/queries/profile";
import { ProfileForm } from "@/components/profile-form";
import { UserRound } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { user } = await getAuthUser();
  if (!user) redirect("/auth/login");
  const profile = await getCurrentUserProfile();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><UserRound className="h-5 w-5" /></div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your personal account separately from your petrol pump businesses.</p>
        </div>
      </div>
      <ProfileForm
        userId={user.id}
        email={user.email ?? ""}
        emailConfirmed={Boolean(user.email_confirmed_at)}
        fullName={profile?.full_name ?? ""}
        phone={profile?.phone ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
        avatarPath={profile?.avatar_path ?? null}
      />
    </div>
  );
}
