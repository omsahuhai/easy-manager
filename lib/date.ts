/**
 * Indian Standard Time (Asia/Kolkata) date helpers.
 * Ensures consistent business calendar calculations regardless of server deployment timezone.
 */

const IST_TIMEZONE = "Asia/Kolkata";

/**
 * Returns today's date formatted as YYYY-MM-DD in Asia/Kolkata.
 */
export function getTodayIST(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now);
}

/**
 * Returns today's formatted readable string (e.g. "Monday, 24 August 2026") in Asia/Kolkata.
 */
export function getFormattedTodayIST(): string {
  const now = new Date();
  return now.toLocaleDateString("en-IN", {
    timeZone: IST_TIMEZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a YYYY-MM-DD string to a readable date in en-IN (e.g. "24 Aug 2026").
 */
export function formatDateIST(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Normalizes year and month into the canonical expense_month date string "YYYY-MM-01".
 */
export function toMonthStartIST(year: number, month: number): string {
  const mm = String(month).padStart(2, "0");
  return `${year}-${mm}-01`;
}

/**
 * Formats a YYYY-MM-01 string to a readable month string (e.g. "August 2026").
 */
export function formatMonthIST(monthDateStr: string): string {
  if (!monthDateStr) return "";
  const [year, month] = monthDateStr.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Checks whether a given YYYY-MM-DD date string is strictly in the future compared to today in IST.
 */
export function isFutureDateIST(dateStr: string): boolean {
  const todayIST = getTodayIST();
  return dateStr > todayIST;
}
