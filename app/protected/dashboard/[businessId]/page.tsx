import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { BusinessSwitcher } from "@/components/dashboard/business-switcher";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { IndianRupee, Droplet, TrendingUp, ReceiptText, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const instant = false;

export default async function BusinessDashboard(props: {
  params: Promise<{ businessId: string }>;
}) {
  await connection();
  const params = await props.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch all businesses for the switcher
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("id, name, type")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  if (error || !businesses) {
    return <div>Error loading businesses</div>;
  }

  const currentBusiness = businesses.find((b) => b.id === params.businessId);

  if (!currentBusiness) {
    // If the business doesn't exist or user doesn't own it, redirect back to dashboard
    redirect("/protected/dashboard");
  }

  // Formatting helpers
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentBusiness.name}</h1>
          <p className="text-muted-foreground">{today}</p>
        </div>
        {businesses.length > 1 && (
          <BusinessSwitcher businesses={businesses} currentBusinessId={currentBusiness.id} />
        )}
      </div>

      {/* Quick Actions */}
      <QuickActions businessId={currentBusiness.id} />

      {/* Today&apos;s Performance (Placeholders for Phase 4) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today&apos;s Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Today&apos;s Sales"
            value="₹0.00"
            icon={<IndianRupee className="h-4 w-4" />}
            description="Total sales amount"
          />
          <StatCard
            title="Fuel Sold"
            value="0 L"
            icon={<Droplet className="h-4 w-4" />}
            description="Total volume sold"
          />
          <StatCard
            title="RO Profit"
            value="₹0.00"
            icon={<TrendingUp className="h-4 w-4 text-green-500" />}
            description="Estimated RO profit"
          />
          <StatCard
            title="Expenses"
            value="₹0.00"
            icon={<ReceiptText className="h-4 w-4 text-red-500" />}
            description="Today&apos;s logged expenses"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fuel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fuel Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg text-orange-500">MS (Petrol)</div>
                  <div className="text-sm text-muted-foreground">0 Litres Sold</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">₹0.00</div>
                  <div className="text-sm text-muted-foreground">Sales</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg text-blue-500">HSD (Diesel)</div>
                  <div className="text-sm text-muted-foreground">0 Litres Sold</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">₹0.00</div>
                  <div className="text-sm text-muted-foreground">Sales</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              Today&apos;s sales and activities will appear after meter readings are added.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
