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
