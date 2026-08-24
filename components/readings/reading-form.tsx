"use client";

import { useActionState, useEffect, useState, useTransition, useCallback } from "react";
import { createReadingAction, fetchPreviousClosingAction } from "@/app/actions/readings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FuelType } from "@/lib/types";
import { getTodayIST } from "@/lib/date";
import { PlusCircle, Loader2, AlertCircle, CheckCircle2, Lock, Unlock, Info } from "lucide-react";

interface InitialClosings {
  MS: { previousClosing: number | null; previousDate: string | null; isFirstReading: boolean };
  HSD: { previousClosing: number | null; previousDate: string | null; isFirstReading: boolean };
}

interface ReadingFormProps {
  businessId: string;
  initialClosings: InitialClosings;
}

export function ReadingForm({ businessId, initialClosings }: ReadingFormProps) {
  const [state, formAction, isPending] = useActionState(createReadingAction, null);
  const [fuelType, setFuelType] = useState<FuelType>("MS");
  const [readingDate, setReadingDate] = useState(getTodayIST());

  const [openingReading, setOpeningReading] = useState<string>(
    initialClosings.MS.previousClosing !== null
      ? initialClosings.MS.previousClosing.toString()
      : ""
  );
  const [closingReading, setClosingReading] = useState<string>("");
  const [isFirstReading, setIsFirstReading] = useState(initialClosings.MS.isFirstReading);
  const [isOpeningLocked, setIsOpeningLocked] = useState(
    initialClosings.MS.previousClosing !== null
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [isFetchingPrev, startTransition] = useTransition();

  const todayIST = getTodayIST();

  // Re-fetch previous recorded closing when fuel type or date changes
  const handleFuelOrDateChange = useCallback(
    (newFuel: FuelType, newDate: string) => {
      startTransition(async () => {
        const prevData = await fetchPreviousClosingAction(businessId, newFuel, newDate);
        if (prevData.previousClosing !== null) {
          setOpeningReading(prevData.previousClosing.toString());
          setIsOpeningLocked(true);
          setIsFirstReading(false);
        } else {
          setOpeningReading("");
          setIsOpeningLocked(false);
          setIsFirstReading(prevData.isFirstReading);
        }
      });
    },
    [businessId]
  );

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      setClosingReading("");
      // Refresh previous closing for subsequent entry
      handleFuelOrDateChange(fuelType, readingDate);
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [state, fuelType, readingDate, handleFuelOrDateChange]);

  const openingNum = Number(openingReading);
  const closingNum = Number(closingReading);
  const hasValidNumbers =
    openingReading !== "" &&
    closingReading !== "" &&
    !isNaN(openingNum) &&
    !isNaN(closingNum);
  const previewLitres = hasValidNumbers ? Math.max(0, closingNum - openingNum) : null;

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Record Meter Reading</CardTitle>
            <CardDescription className="text-xs">
              Enter daily opening and closing totalizer numbers.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="business_id" value={businessId} />
          <input type="hidden" name="fuel_type" value={fuelType} />

          {/* Reading Date */}
          <div className="space-y-1.5">
            <Label htmlFor="reading_date" className="text-xs font-semibold">
              Reading Date
            </Label>
            <Input
              id="reading_date"
              name="reading_date"
              type="date"
              value={readingDate}
              max={todayIST}
              onChange={(e) => {
                const newDate = e.target.value;
                setReadingDate(newDate);
                handleFuelOrDateChange(fuelType, newDate);
              }}
              required
              disabled={isPending || isFetchingPrev}
              className="text-sm"
            />
            {state?.fieldErrors?.reading_date && (
              <p className="text-xs text-destructive">{state.fieldErrors.reading_date[0]}</p>
            )}
          </div>

          {/* Fuel Type Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Fuel Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFuelType("MS");
                  handleFuelOrDateChange("MS", readingDate);
                }}
                disabled={isPending || isFetchingPrev}
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
                onClick={() => {
                  setFuelType("HSD");
                  handleFuelOrDateChange("HSD", readingDate);
                }}
                disabled={isPending || isFetchingPrev}
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

          {/* First Reading Info Banner */}
          {isFirstReading && (
            <div className="p-3 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs flex items-start gap-2 border border-blue-500/20">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">First Reading:</span> No previous record found for{" "}
                {fuelType}. Please enter the starting meter opening reading manually.
              </div>
            </div>
          )}

          {/* Opening & Closing Readings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="opening_reading" className="text-xs font-semibold">
                  Opening Reading (L)
                </Label>
                {!isFirstReading && (
                  <button
                    type="button"
                    onClick={() => setIsOpeningLocked(!isOpeningLocked)}
                    className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {isOpeningLocked ? (
                      <>
                        <Lock className="h-3 w-3" /> Auto-filled
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3 w-3 text-amber-500" /> Editing
                      </>
                    )}
                  </button>
                )}
              </div>
              <Input
                id="opening_reading"
                name="opening_reading"
                type="number"
                step="0.01"
                min="0"
                value={openingReading}
                onChange={(e) => setOpeningReading(e.target.value)}
                readOnly={isOpeningLocked}
                placeholder="e.g. 1000.00"
                required
                disabled={isPending || isFetchingPrev}
                className={`text-sm ${
                  isOpeningLocked ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
                }`}
              />
              {state?.fieldErrors?.opening_reading && (
                <p className="text-xs text-destructive">{state.fieldErrors.opening_reading[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="closing_reading" className="text-xs font-semibold">
                Closing Reading (L)
              </Label>
              <Input
                id="closing_reading"
                name="closing_reading"
                type="number"
                step="0.01"
                min="0"
                value={closingReading}
                onChange={(e) => setClosingReading(e.target.value)}
                placeholder="e.g. 1250.00"
                required
                disabled={isPending || isFetchingPrev}
                className="text-sm"
              />
              {state?.fieldErrors?.closing_reading && (
                <p className="text-xs text-destructive">{state.fieldErrors.closing_reading[0]}</p>
              )}
            </div>
          </div>

          {/* UX Live Preview (Non-authoritative) */}
          {previewLitres !== null && (
            <div className="p-2.5 rounded-md bg-muted/70 text-xs flex items-center justify-between border">
              <span className="text-muted-foreground">Calculated Volume (UX Preview):</span>
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
              <span>Daily meter reading saved successfully.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending || isFetchingPrev || (previewLitres !== null && closingNum < openingNum)}
            className="w-full sm:w-auto min-w-[140px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Reading...
              </>
            ) : (
              "Save Meter Reading"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
