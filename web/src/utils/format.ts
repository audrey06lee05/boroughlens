/**
 * format.ts
 * Small helpers that turn raw numbers and dates into display text,
 * so components don't each repeat the same formatting logic.
 */

export function formatGBP(value: number): string {
  return "£" + Math.round(value).toLocaleString("en-GB");
}

export function formatChange(change: number): string {
  const sign = change > 0 ? "+" : "";
  return `${sign}${(change * 100).toFixed(1)}%`;
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

// Data > 90 days old = stale
export function isStale(dataTo: string, today: Date = new Date()): boolean {
  const [year, month] = dataTo.split("-").map(Number);
  const endOfMonth = new Date(year, month, 0);
  const ageInDays = (today.getTime() - endOfMonth.getTime()) / 86_400_000;
  return ageInDays > 90;
}
