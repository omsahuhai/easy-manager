export interface Business {
  id: string;
  owner_id: string;
  name: string;
  type: string;
  created_at: string;
}

export type FuelType = "MS" | "HSD";

export interface FuelRate {
  id: string;
  business_id: string;
  fuel_type: FuelType;
  effective_date: string;
  rate: number;
  margin: number;
  created_at: string;
}

export interface DailyMeterReading {
  id: string;
  business_id: string;
  fuel_type: FuelType;
  reading_date: string;
  opening_reading: number;
  closing_reading: number;
  created_at: string;
  updated_at: string;
}

export interface DailySalesRecord {
  reading_id: string;
  business_id: string;
  fuel_type: FuelType;
  reading_date: string;
  opening_reading: number;
  closing_reading: number;
  created_at: string;
  updated_at: string;
  litres: number;
  rate: number | null;
  margin: number | null;
  rate_missing: boolean;
  sales: number | null;
  profit: number | null;
}

export interface ReadingWithContinuity extends DailySalesRecord {
  previous_recorded_closing: number | null;
  previous_reading_date: string | null;
  has_opening_mismatch: boolean;
  expected_opening: number | null;
  is_first_reading: boolean;
}

export const EXPENSE_CATEGORIES = [
  "Electricity",
  "Salaries",
  "Generator",
  "Maintenance",
  "Miscellaneous",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  business_id: string;
  expense_month: string; // YYYY-MM-01
  category: string;
  amount: number;
  note: string | null;
  created_at: string;
}

export interface MonthlyProfitRecord {
  business_id: string;
  profit_month: string; // YYYY-MM-01
  total_fuel_sales: number | null;
  total_ro_profit: number | null;
  total_expenses: number;
  net_profit: number | null;
  total_reading_days: number;
  days_without_rate: number;
  has_missing_rates: boolean;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
