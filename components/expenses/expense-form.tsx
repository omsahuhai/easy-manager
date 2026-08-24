"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createExpenseAction } from "@/app/actions/expenses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import { formatMonthIST } from "@/lib/date";
import { PlusCircle, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface ExpenseFormProps {
  businessId: string;
  selectedMonth: string; // YYYY-MM-01
}

export function ExpenseForm({ businessId, selectedMonth }: ExpenseFormProps) {
  const [state, formAction, isPending] = useActionState(createExpenseAction, null);
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const monthLabel = formatMonthIST(selectedMonth);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      setAmount("");
      setNote("");
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
            <CardTitle className="text-lg">Add {monthLabel} Expense</CardTitle>
            <CardDescription className="text-xs">
              Log operational expenses for {monthLabel}.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <input type="hidden" name="business_id" value={businessId} />
          <input type="hidden" name="expense_month" value={selectedMonth} />

          {/* Month Indicator (Readonly display) */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground">Expense Month</Label>
            <div className="text-sm font-semibold text-foreground px-3 py-2 rounded-md bg-muted/60 border">
              {monthLabel}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-xs font-semibold">
              Expense Category
            </Label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
            <Label htmlFor="amount" className="text-xs font-semibold">
              Amount (₹)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">₹</span>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000.00"
                required
                disabled={isPending}
                className="pl-7 text-sm font-medium"
              />
            </div>
            {state?.fieldErrors?.amount && (
              <p className="text-xs text-destructive">{state.fieldErrors.amount[0]}</p>
            )}
          </div>

          {/* Optional Note */}
          <div className="space-y-1.5">
            <Label htmlFor="note" className="text-xs font-semibold">
              Optional Note / Description
            </Label>
            <Input
              id="note"
              name="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. August staff salary or diesel for gen-set"
              maxLength={500}
              disabled={isPending}
              className="text-sm"
            />
            {state?.fieldErrors?.note && (
              <p className="text-xs text-destructive">{state.fieldErrors.note[0]}</p>
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
              <span>Expense logged successfully for {monthLabel}.</span>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-[140px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Expense...
              </>
            ) : (
              `Save Expense`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
