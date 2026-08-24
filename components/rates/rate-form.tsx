"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createFuelRateAction } from "@/app/actions/rates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FuelType } from "@/lib/types";
import { getTodayIST } from "@/lib/date";
import { PlusCircle, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface RateFormProps {
  businessId: string;
}

export function RateForm({ businessId }: RateFormProps) {
  const [state, formAction, isPending] = useActionState(createFuelRateAction, null);
  const [fuelType, setFuelType] = useState<FuelType>("MS");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const defaultDate = getTodayIST();

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      formRef.current?.reset();
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Add New Fuel Rate</CardTitle>
            <CardDescription className="text-xs">
              Record selling price and RO dealer margin per litre.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <input type="hidden" name="business_id" value={businessId} />
          <input type="hidden" name="fuel_type" value={fuelType} />

          {/* Fuel Type Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Fuel Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFuelType("MS")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-md border text-sm font-medium transition-all ${
                  fuelType === "MS"
                    ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold ring-1 ring-amber-500"
                    : "border-border hover:bg-accent text-muted-foreground"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                MS (Petrol)
              </button>
              <button
                type="button"
                onClick={() => setFuelType("HSD")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-md border text-sm font-medium transition-all ${
                  fuelType === "HSD"
                    ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold ring-1 ring-blue-500"
                    : "border-border hover:bg-accent text-muted-foreground"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                HSD (Diesel)
              </button>
            </div>
          </div>

          {/* Rate & Margin Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="rate" className="text-xs font-semibold">
                Selling Price (₹ / Litre)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="e.g. 103.50"
                  required
                  disabled={isPending}
                  className="pl-7 text-sm"
                />
              </div>
              {state?.fieldErrors?.rate && (
                <p className="text-xs text-destructive">{state.fieldErrors.rate[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="margin" className="text-xs font-semibold">
                RO Margin (₹ / Litre)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
                <Input
                  id="margin"
                  name="margin"
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="e.g. 2.5000"
                  required
                  disabled={isPending}
                  className="pl-7 text-sm"
                />
              </div>
              {state?.fieldErrors?.margin && (
                <p className="text-xs text-destructive">{state.fieldErrors.margin[0]}</p>
              )}
            </div>
          </div>

          {/* Effective Date */}
          <div className="space-y-1.5">
            <Label htmlFor="effective_date" className="text-xs font-semibold">
              Effective Date
            </Label>
            <Input
              id="effective_date"
              name="effective_date"
              type="date"
              defaultValue={defaultDate}
              required
              disabled={isPending}
              className="text-sm"
            />
            <p className="text-[11px] text-muted-foreground">
              Rate becomes applicable for meter readings on or after this date.
            </p>
            {state?.fieldErrors?.effective_date && (
              <p className="text-xs text-destructive">{state.fieldErrors.effective_date[0]}</p>
            )}
          </div>

          {/* Feedback Messages */}
          {state?.error && (
            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-xs font-medium flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          {showSuccess && (
            <div className="p-3 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Fuel rate added successfully.</span>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-[140px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Rate...
              </>
            ) : (
              "Save Fuel Rate"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
