import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function DashboardRoot() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch businesses for the user
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("id, name, type")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    return <div>Error loading businesses: {error.message}</div>;
  }

  if (!businesses || businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
        <Store className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No petrol pump added yet</h2>
        <p className="text-muted-foreground mb-6">Add your first business to start tracking operations, sales, and expenses.</p>
        <Button>Add Your First Business</Button>
      </div>
    );
  }

  // If exactly one business, redirect directly to its dashboard
  if (businesses.length === 1) {
    redirect(`/protected/dashboard/${businesses[0].id}`);
  }

  // If multiple businesses, show the overview/switcher
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Businesses</h1>
        <p className="text-muted-foreground">Select a business to view its dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Link href={`/protected/dashboard/${business.id}`} key={business.id}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full flex flex-col">
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription className="capitalize">{business.type.replace('_', ' ')}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    View dashboard
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
