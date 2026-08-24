"use client";

import { useActionState, useEffect, useState } from "react";
import { updateReadingAction } from "@/app/actions/readings";
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
import { ReadingWithContinuity } from "@/lib/types";
import { formatDateIST } from "@/lib/date";
import { Loader2, AlertCircle, AlertTriangle, Sparkles } from "lucide-react";

interface EditReadingDialogProps {
  businessId: string;
  reading: ReadingWithContinuity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditReadingDialog({
  businessId,
  reading,
  open,
  onOpenChange,
}: EditReadingDialogProps) {
  const [state, formAction, isPending] = useActionState(updateReadingAction, null);
  const [openingVal, setOpeningVal] = useState("");
  const [closingVal, setClosingVal] = useState("");

  useEffect(() => {
    if (reading) {
      setOpeningVal(reading.opening_reading.toString());
      setClosingVal(reading.closing_reading.toString());
    }
  }, [reading]);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!reading) return null;

  const formattedDate = formatDateIST(reading.reading_date);
  const fuelName = reading.fuel_type === "MS" ? "Petrol" : "Diesel";

  const openingNum = Number(openingVal);
  const closingNum = Number(closingVal);
  const previewLitres =
    openingVal !== "" && closingVal !== "" && !isNaN(openingNum) && !isNaN(closingNum)
      ? Math.max(0, closingNum - openingNum)
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Meter Reading</DialogTitle>
          <DialogDescription>
            Correct reading values for{" "}
            <span className="font-semibold text-foreground">
              {reading.fuel_type} ({fuelName})
            </span>{" "}
            on <span className="font-semibold text-foreground">{formattedDate}</span>.
          </DialogDescription>
        </DialogHeader>

        {/* Continuity Mismatch Warning Box */}
        {reading.has_opening_mismatch && (
          <div className="p-3.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Continuity Mismatch:</span> The saved opening reading{" "}
                <span className="font-mono font-bold">({reading.opening_reading} L)</span> does not match the
                previous recorded closing reading{" "}
                <span className="font-mono font-bold">({reading.previous_recorded_closing} L)</span>.
              </div>
            </div>
            {reading.previous_recorded_closing !== null && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpeningVal(reading.previous_recorded_closing!.toString())}
                className="w-full text-xs bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-900 dark:text-amber-100 flex items-center justify-center gap-1.5 h-8 font-medium"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Fix: Set Opening to {reading.previous_recorded_closing} L
              </Button>
            )}
          </div>
        )}

        <form action={formAction} className="space-y-4 py-1">
          <input type="hidden" name="reading_id" value={reading.reading_id} />
          <input type="hidden" name="business_id" value={businessId} />

          <div className="space-y-1.5">
            <Label htmlFor="edit-opening" className="text-xs font-semibold">
              Opening Reading (L)
            </Label>
            <Input
              id="edit-opening"
              name="opening_reading"
              type="number"
              step="0.01"
              min="0"
              value={openingVal}
              onChange={(e) => setOpeningVal(e.target.value)}
              required
              disabled={isPending}
              className="text-sm"
            />
            {state?.fieldErrors?.opening_reading && (
              <p className="text-xs text-destructive">{state.fieldErrors.opening_reading[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-closing" className="text-xs font-semibold">
              Closing Reading (L)
            </Label>
            <Input
              id="edit-closing"
              name="closing_reading"
              type="number"
              step="0.01"
              min="0"
              value={closingVal}
              onChange={(e) => setClosingVal(e.target.value)}
              required
              disabled={isPending}
              className="text-sm"
            />
            {state?.fieldErrors?.closing_reading && (
              <p className="text-xs text-destructive">{state.fieldErrors.closing_reading[0]}</p>
            )}
          </div>

          {previewLitres !== null && (
            <div className="p-2.5 rounded-md bg-muted text-xs flex items-center justify-between">
              <span className="text-muted-foreground">New Calculated Volume:</span>
              <span className="font-semibold text-foreground">
                {previewLitres.toFixed(2)} Litres
                {closingNum < openingNum && (
                  <span className="text-destructive font-normal ml-2">
                    (Invalid: closing &lt; opening)
                  </span>
                )}
              </span>
            </div>
          )}

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
            <Button type="submit" disabled={isPending || (previewLitres !== null && closingNum < openingNum)}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Reading...
                </>
              ) : (
                "Update Reading"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
