import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getBusinessesForUser } from "@/lib/queries/businesses";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Store, ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function DashboardRoot() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch businesses using domain query layer
  const businesses = await getBusinessesForUser();

  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh] max-w-md mx-auto">
        <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
          <Store className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">No petrol pump added yet</h2>
        <p className="text-muted-foreground mb-6">
          Set up your first retail outlet to start recording meter readings, fuel rates, and monthly expenses.
        </p>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/protected/dashboard/create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Your First Business
          </Link>
        </Button>
      </div>
    );
  }

  // If exactly one business, direct directly to its dashboard
  if (businesses.length === 1) {
    redirect(`/protected/dashboard/${businesses[0].id}`);
  }

  // If multiple businesses, show overview switcher and option to add another
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Businesses</h1>
          <p className="text-muted-foreground">Select a business to view its register and dashboard.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/protected/dashboard/create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Another Business
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Link href={`/protected/dashboard/${business.id}`} key={business.id} className="block group">
            <Card className="hover:border-primary/50 transition-all hover:shadow-md cursor-pointer h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <CardTitle className="group-hover:text-primary transition-colors">{business.name}</CardTitle>
                </div>
                <CardDescription className="capitalize">{business.type.replace("_", " ")}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 border-t">
                <div className="flex items-center justify-between text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  <span>Open workspace</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
