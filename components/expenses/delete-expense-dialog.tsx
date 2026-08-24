"use client";

import { useActionState, useEffect } from "react";
import { deleteExpenseAction } from "@/app/actions/expenses";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Expense } from "@/lib/types";
import { formatMonthIST } from "@/lib/date";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DeleteExpenseDialogProps {
  businessId: string;
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteExpenseDialog({
  businessId,
  expense,
  open,
  onOpenChange,
}: DeleteExpenseDialogProps) {
  const [state, formAction, isPending] = useActionState(deleteExpenseAction, null);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  if (!expense) return null;

  const monthLabel = formatMonthIST(expense.expense_month);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Delete Expense Entry</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this{" "}
            <span className="font-semibold text-foreground">{expense.category}</span> expense of{" "}
            <span className="font-semibold text-foreground">₹{expense.amount.toFixed(2)}</span> for{" "}
            <span className="font-semibold text-foreground">{monthLabel}</span>?
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">
          This will permanently remove this expense record from the {monthLabel} register. This action cannot be undone.
        </p>

        {state?.error && (
          <div className="p-3 rounded-md bg-destructive/15 text-destructive text-xs font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <input type="hidden" name="expense_id" value={expense.id} />
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
            <Button type="submit" variant="destructive" disabled={isPending} className="flex items-center gap-1">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Expense
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
