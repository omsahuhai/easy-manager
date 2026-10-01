"use client";

import { useActionState, useEffect } from "react";
import { deleteReadingAction } from "@/app/actions/readings";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReadingWithContinuity } from "@/lib/types";
import { formatDateIST } from "@/lib/date";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DeleteReadingDialogProps {
  businessId: string;
  reading: ReadingWithContinuity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteReadingDialog({
  businessId,
  reading,
  open,
  onOpenChange,
}: DeleteReadingDialogProps) {
  const [state, formAction, isPending] = useActionState(deleteReadingAction, null);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!reading) return null;

  const dateLabel = formatDateIST(reading.reading_date);
  const fuelName = reading.fuel_type === "MS" ? "Petrol" : "Diesel";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Delete Meter Reading</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete the reading for{" "}
            <span className="font-semibold text-foreground">
              {reading.fuel_type} ({fuelName})
            </span>{" "}
            on <span className="font-semibold text-foreground">{dateLabel}</span>?
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">
          This will remove the entry (Volume: {reading.litres.toFixed(2)} L) from the register.
          Subsequent readings will recompute continuity from the previous available entry.
        </p>

        {state?.error && (
          <div className="p-3 rounded-md bg-destructive/15 text-destructive text-xs font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <input type="hidden" name="reading_id" value={reading.reading_id} />
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
                  Delete Reading
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
