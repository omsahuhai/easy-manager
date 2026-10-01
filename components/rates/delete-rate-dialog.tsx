"use client";

import { useActionState, useEffect } from "react";
import { deleteFuelRateAction } from "@/app/actions/rates";
import { Button } from "@/components/ui/button";
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
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DeleteRateDialogProps {
  businessId: string;
  rate: EnrichedFuelRate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRateDialog({
  businessId,
  rate,
  open,
  onOpenChange,
}: DeleteRateDialogProps) {
  const [state, formAction, isPending] = useActionState(deleteFuelRateAction, null);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!rate) return null;

  const dateLabel = formatDateIST(rate.effective_date);
  const fuelName = rate.fuel_type === "MS" ? "Petrol" : "Diesel";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Delete Fuel Rate</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete the rate for{" "}
            <span className="font-semibold text-foreground">
              {rate.fuel_type} ({fuelName})
            </span>{" "}
            effective <span className="font-semibold text-foreground">{dateLabel}</span> (₹{rate.rate.toFixed(2)}/L)?
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">
          This will permanently remove this rate entry. Historical or current sales calculations
          associated with this date may fallback to the previous rate or show as rate pending.
        </p>

        {state?.error && (
          <div className="p-3 rounded-md bg-destructive/15 text-destructive text-xs font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <input type="hidden" name="rate_id" value={rate.id} />
          <input type="hidden" name="business_id" value={businessId} />

          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
              className="flex items-center gap-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Rate
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
