import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBusinessById, getBusinessesForUser } from "@/lib/queries/businesses";
import { BusinessSwitcher } from "@/components/dashboard/business-switcher";
import { WorkspaceNav } from "@/components/dashboard/workspace-nav";
import { getFormattedTodayIST } from "@/lib/date";

export default async function BusinessWorkspaceLayout(props: {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const businessId = params.businessId;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [currentBusiness, businesses] = await Promise.all([
    getBusinessById(businessId),
    getBusinessesForUser(),
  ]);

  if (!currentBusiness) {
    notFound();
  }

  const todayDisplay = getFormattedTodayIST();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Business Workspace Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{currentBusiness.name}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
              {currentBusiness.type.replace("_", " ")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{todayDisplay}</p>
        </div>

        {businesses.length > 0 && (
          <BusinessSwitcher businesses={businesses} currentBusinessId={currentBusiness.id} />
        )}
      </div>

      {/* Workspace Navigation Tabs */}
      <WorkspaceNav businessId={currentBusiness.id} />

      {/* Subpage content */}
      <div className="pt-2">{children}</div>
    </div>
  );
}
