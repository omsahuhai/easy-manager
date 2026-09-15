"use client";

import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentMonthIST } from "@/lib/date";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthFilterProps {
  currentMonth: string; // YYYY-MM-01
  recordedMonths?: string[];
}

export function MonthFilter({ currentMonth }: MonthFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive "YYYY-MM" for input[type="month"]
  const monthValue = currentMonth.slice(0, 7);

  const [yearStr, monthStr] = currentMonth.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  const handlePrevMonth = () => {
    const prevDate = new Date(year, month - 2, 1);
    const prevY = prevDate.getFullYear();
    const prevM = String(prevDate.getMonth() + 1).padStart(2, "0");
    router.push(`${pathname}?month=${prevY}-${prevM}-01`);
  };

  const handleNextMonth = () => {
    const nextDate = new Date(year, month, 1);
    const nextY = nextDate.getFullYear();
    const nextM = String(nextDate.getMonth() + 1).padStart(2, "0");
    router.push(`${pathname}?month=${nextY}-${nextM}-01`);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // "YYYY-MM"
    if (val) {
      router.push(`${pathname}?month=${val}-01`);
    }
  };

  const thisMonth = getCurrentMonthIST();
  const isCurrentMonth = currentMonth === thisMonth;

  const handleResetThisMonth = () => {
    router.push(`${pathname}?month=${thisMonth}`);
  };

  const openCalendar = () => {
    if (inputRef.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        try {
          inputRef.current.showPicker();
        } catch {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {!isCurrentMonth && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleResetThisMonth}
          className="text-xs h-9 px-2.5 hidden sm:inline-flex shadow-sm"
          title="Return to current month"
        >
          This Month
        </Button>
      )}

      <div className="flex items-center rounded-md border border-input bg-background shadow-sm hover:border-foreground/30 transition-colors">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handlePrevMonth}
          className="h-9 w-8 rounded-r-none border-r border-input text-muted-foreground hover:text-foreground"
          title="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          role="button"
          tabIndex={0}
          onClick={openCalendar}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openCalendar();
            }
          }}
          className="relative flex items-center cursor-pointer px-2.5 py-1 gap-2 select-none"
        >
          <Calendar className="h-4 w-4 text-muted-foreground pointer-events-none shrink-0" />
          <input
            ref={inputRef}
            type="month"
            value={monthValue}
            onChange={handleMonthChange}
            className="h-7 bg-transparent text-sm font-medium focus-visible:outline-none cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          className="h-9 w-8 rounded-l-none border-l border-input text-muted-foreground hover:text-foreground"
          title="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
