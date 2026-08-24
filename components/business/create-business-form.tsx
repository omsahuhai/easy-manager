"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBusinessAction } from "@/app/actions/businesses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CreateBusinessForm({ isFirstBusiness = false }: { isFirstBusiness?: boolean }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createBusinessAction, null);

  useEffect(() => {
    if (state?.success && state.data?.id) {
      router.push(`/protected/dashboard/${state.data.id}`);
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {isFirstBusiness ? "Set Up Your Petrol Pump" : "Add New Business"}
            </CardTitle>
            <CardDescription>
              {isFirstBusiness
                ? "Enter your retail outlet name to start managing daily sales and expenses."
                : "Add another retail outlet to your Easy Manager account."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Business / Retail Outlet Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Om Sai Filling Station"
              required
              disabled={isPending}
              autoFocus
              className={state?.fieldErrors?.name ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {state?.fieldErrors?.name && (
              <p className="text-sm font-medium text-destructive">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          {state?.error && !state?.fieldErrors?.name && (
            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium">
              {state.error}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-2">
            {!isFirstBusiness ? (
              <Button variant="ghost" asChild disabled={isPending}>
                <Link href="/protected/dashboard" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Cancel
                </Link>
              </Button>
            ) : (
              <div />
            )}
            <Button type="submit" disabled={isPending} className="ml-auto min-w-[140px]">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Business"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
