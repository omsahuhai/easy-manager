"use client";

import { useState } from "react";
import { Expense } from "@/lib/types";
import { formatMonthIST } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditExpenseDialog } from "@/components/expenses/edit-expense-dialog";
import { DeleteExpenseDialog } from "@/components/expenses/delete-expense-dialog";
import { Receipt, Pencil, Trash2, Tag, FileText } from "lucide-react";

interface ExpenseListProps {
  businessId: string;
  selectedMonth: string; // YYYY-MM-01
  expenses: Expense[];
}

export function ExpenseList({
  businessId,
  selectedMonth,
  expenses,
}: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const monthLabel = formatMonthIST(selectedMonth);

  const totalMonthlyExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setDeleteOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Monthly Summary Banner */}
        <Card className="bg-primary/5 border-primary/20 shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {monthLabel} Total Expenses
              </div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
                ₹{totalMonthlyExpenses.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full border">
              {expenses.length} {expenses.length === 1 ? "expense entry" : "expense entries"}
            </span>
          </CardContent>
        </Card>

        {/* Expenses Register List */}
        {expenses.length === 0 ? (
          <Card className="shadow-sm border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{monthLabel} Expenses</CardTitle>
              </div>
              <CardDescription className="text-xs">
                No expense entries recorded for {monthLabel}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-sm text-muted-foreground">
                No expenses logged for {monthLabel}. Add operational expenses like Electricity, Salaries, or Maintenance above.
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{monthLabel} Expenses</CardTitle>
                    <CardDescription className="text-xs">
                      All logged operational expenses for {monthLabel}.
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              {/* Mobile Card List (< 640px) */}
              <div className="divide-y sm:hidden">
                {expenses.map((expense) => (
                  <div key={expense.id} className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-foreground">
                        <Tag className="h-3 w-3 text-primary" />
                        {expense.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(expense)}
                          className="h-8 px-2 text-xs"
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(expense)}
                          className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div className="text-lg font-bold text-foreground">
                        ₹{expense.amount.toFixed(2)}
                      </div>
                    </div>

                    {expense.note && (
                      <div className="text-xs text-muted-foreground flex items-start gap-1 bg-muted/40 p-2 rounded">
                        <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{expense.note}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table (>= 640px) */}
              <div className="hidden sm:block overflow-x-auto rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/60 text-muted-foreground border-b">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Amount</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Description / Note</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-foreground">
                            <Tag className="h-3 w-3 text-primary" />
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap font-bold text-foreground">
                          ₹{expense.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-muted-foreground text-xs max-w-xs truncate">
                          {expense.note || <span className="text-muted-foreground/50 italic">—</span>}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(expense)}
                              className="h-8 px-2.5 text-xs"
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(expense)}
                              className="h-8 px-2.5 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <EditExpenseDialog
        businessId={businessId}
        expense={selectedExpense}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteExpenseDialog
        businessId={businessId}
        expense={selectedExpense}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
