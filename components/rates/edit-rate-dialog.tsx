"use client";

import { useActionState, useEffect, useState } from "react";
import { updateFuelRateAction } from "@/app/actions/rates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnrichedFuelRate } from "@/lib/queries/rates";
import { formatDateIST } from "@/lib/date";
import { Loader2, AlertCircle } from "lucide-react";

interface EditRateDialogProps {
  businessId: string;
  rate: EnrichedFuelRate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRateDialog({
  businessId,
  rate,
  open,
  onOpenChange,
}: EditRateDialogProps) {
  const [state, formAction, isPending] = useActionState(updateFuelRateAction, null);
  const [rateVal, setRateVal] = useState("");
  const [marginVal, setMarginVal] = useState("");

  useEffect(() => {
    if (rate) {
      setRateVal(rate.rate.toString());
      setMarginVal(rate.margin.toString());
    }
  }, [rate]);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!rate) return null;

  const formattedDate = formatDateIST(rate.effective_date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Fuel Rate</DialogTitle>
          <DialogDescription>
            Update rate values for{" "}
            <span className="font-semibold text-foreground">
              {rate.fuel_type} ({rate.fuel_type === "MS" ? "Petrol" : "Diesel"})
            </span>{" "}
            effective from <span className="font-semibold text-foreground">{formattedDate}</span>.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          <input type="hidden" name="rate_id" value={rate.id} />
          <input type="hidden" name="business_id" value={businessId} />

          <div className="space-y-1.5">
            <Label htmlFor="edit-rate" className="text-xs font-semibold">
              Selling Price (₹ / Litre)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
              <Input
                id="edit-rate"
                name="rate"
                type="number"
                step="0.01"
                min="0.01"
                value={rateVal}
                onChange={(e) => setRateVal(e.target.value)}
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
            <Label htmlFor="edit-margin" className="text-xs font-semibold">
              RO Margin (₹ / Litre)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
              <Input
                id="edit-margin"
                name="margin"
                type="number"
                step="0.0001"
                min="0"
                value={marginVal}
                onChange={(e) => setMarginVal(e.target.value)}
                required
                disabled={isPending}
                className="pl-7 text-sm"
              />
            </div>
            {state?.fieldErrors?.margin && (
              <p className="text-xs text-destructive">{state.fieldErrors.margin[0]}</p>
            )}
          </div>

          {state?.error && (
            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-xs font-medium flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Update Rate"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
