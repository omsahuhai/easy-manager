"use client";

import { useActionState, useEffect, useState } from "react";
import { updateExpenseAction } from "@/app/actions/expenses";
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
import { Expense, EXPENSE_CATEGORIES } from "@/lib/types";
import { getAvailableExpenseMonthsIST } from "@/lib/date";
import { Loader2, AlertCircle } from "lucide-react";

interface EditExpenseDialogProps {
  businessId: string;
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditExpenseDialog({
  businessId,
  expense,
  open,
  onOpenChange,
}: EditExpenseDialogProps) {
  const [state, formAction, isPending] = useActionState(updateExpenseAction, null);
  const [monthVal, setMonthVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");
  const [amountVal, setAmountVal] = useState("");
  const [noteVal, setNoteVal] = useState("");

  const availableMonths = getAvailableExpenseMonthsIST(12, 1);

  useEffect(() => {
    if (expense) {
      setMonthVal(expense.expense_month);
      setCategoryVal(expense.category);
      setAmountVal(expense.amount.toString());
      setNoteVal(expense.note || "");
    }
  }, [expense]);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update details for this {expense.category} expense entry.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-1">
          <input type="hidden" name="expense_id" value={expense.id} />
          <input type="hidden" name="business_id" value={businessId} />

          {/* Month Selector */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-expense-month" className="text-xs font-semibold">
              Expense Month
            </Label>
            <select
              id="edit-expense-month"
              name="expense_month"
              value={monthVal}
              onChange={(e) => setMonthVal(e.target.value)}
              disabled={isPending}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              {availableMonths.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {state?.fieldErrors?.expense_month && (
              <p className="text-xs text-destructive">{state.fieldErrors.expense_month[0]}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-category" className="text-xs font-semibold">
              Category
            </Label>
            <select
              id="edit-category"
              name="category"
              value={categoryVal}
              onChange={(e) => setCategoryVal(e.target.value)}
              disabled={isPending}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {state?.fieldErrors?.category && (
              <p className="text-xs text-destructive">{state.fieldErrors.category[0]}</p>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-amount" className="text-xs font-semibold">
              Amount (₹)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
              <Input
                id="edit-amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amountVal}
                onChange={(e) => setAmountVal(e.target.value)}
                required
                disabled={isPending}
                className="pl-7 text-sm font-medium"
              />
            </div>
            {state?.fieldErrors?.amount && (
              <p className="text-xs text-destructive">{state.fieldErrors.amount[0]}</p>
            )}
          </div>

          {/* Note Input */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-note" className="text-xs font-semibold">
              Optional Note
            </Label>
            <Input
              id="edit-note"
              name="note"
              type="text"
              value={noteVal}
              onChange={(e) => setNoteVal(e.target.value)}
              maxLength={500}
              disabled={isPending}
              className="text-sm"
            />
            {state?.fieldErrors?.note && (
              <p className="text-xs text-destructive">{state.fieldErrors.note[0]}</p>
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
                  Updating...
                </>
              ) : (
                "Update Expense"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
