import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/supabase/auth";
import { getCurrentUserProfile } from "@/lib/queries/profile";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const { user } = await getAuthUser();
  if (!user) redirect("/auth/login");
  const profile = await getCurrentUserProfile();

  return (
    <div className="w-full max-w-2xl mx-auto py-2 sm:py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the personal information associated with your Easy Manager account.
        </p>
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
