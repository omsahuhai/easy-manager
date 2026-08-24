import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getFuelRatesForBusiness } from "@/lib/queries/rates";
import { notFound, redirect } from "next/navigation";
import { RateForm } from "@/components/rates/rate-form";
import { RateHistory } from "@/components/rates/rate-history";

export const instant = false;

export default async function FuelRatesPage(props: {
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

  const [business, rates] = await Promise.all([
    getBusinessById(businessId),
    getFuelRatesForBusiness(businessId),
  ]);

  if (!business) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Fuel Rates Management</h2>
        <p className="text-sm text-muted-foreground">
          Set selling rates and dealer commissions (RO margin) for MS (Petrol) and HSD (Diesel).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RateForm businessId={business.id} />
        </div>
        <div className="lg:col-span-2">
          <RateHistory businessId={business.id} rates={rates} />
        </div>
      </div>
    </div>
  );
}
