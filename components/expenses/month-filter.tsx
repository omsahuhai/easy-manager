"use client";

import { useRouter, usePathname } from "next/navigation";
import { getAvailableExpenseMonthsIST } from "@/lib/date";
import { Calendar } from "lucide-react";

interface MonthFilterProps {
  currentMonth: string; // YYYY-MM-01
  recordedMonths: string[];
}

export function MonthFilter({ currentMonth, recordedMonths }: MonthFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const standardMonths = getAvailableExpenseMonthsIST(12, 1);

  // Combine standard recent months with any additional historical recorded months
  const allMonthsMap = new Map<string, string>();
  standardMonths.forEach((m) => allMonthsMap.set(m.value, m.label));

  recordedMonths.forEach((monthVal) => {
    if (!allMonthsMap.has(monthVal)) {
      const [y, m] = monthVal.split("-").map(Number);
      const d = new Date(y, m - 1, 1);
      const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
      allMonthsMap.set(monthVal, label);
    }
  });

  const monthOptions = Array.from(allMonthsMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => b.value.localeCompare(a.value)); // newest first

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    router.push(`${pathname}?month=${selectedMonth}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center">
        <Calendar className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <select
          value={currentMonth}
          onChange={handleMonthChange}
          className="h-10 pl-9 pr-8 rounded-md border border-input bg-background py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer shadow-sm"
        >
          {monthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
