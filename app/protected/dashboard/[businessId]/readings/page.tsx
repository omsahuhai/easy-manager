import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getReadingsWithContinuity, getLatestPreviousClosings } from "@/lib/queries/readings";
import { notFound, redirect } from "next/navigation";
import { ReadingForm } from "@/components/readings/reading-form";
import { ReadingHistory } from "@/components/readings/reading-history";
import { getTodayIST } from "@/lib/date";

export const instant = false;

export default async function DailyReadingsPage(props: {
  params: Promise<{ businessId: string }>;
}) {
  const params = await props.params;
  const businessId = params.businessId;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const todayIST = getTodayIST();

  const [business, readings, initialClosings] = await Promise.all([
    getBusinessById(businessId),
    getReadingsWithContinuity(businessId),
    getLatestPreviousClosings(businessId, todayIST),
  ]);

  if (!business) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Daily Meter Readings</h2>
        <p className="text-sm text-muted-foreground">
          Record opening and closing totalizer meter numbers for MS (Petrol) and HSD (Diesel).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReadingForm businessId={business.id} initialClosings={initialClosings} />
        </div>
        <div className="lg:col-span-2">
          <ReadingHistory businessId={business.id} readings={readings} />
        </div>
      </div>
    </div>
  );
}
