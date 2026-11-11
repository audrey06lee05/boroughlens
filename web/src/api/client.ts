/**
 * client.ts
 * Functions the UI uses to get data. For now they read mock JSON from
 * /public/mocks; later only the URLs change to point at the real API.
 */

import { OverviewResponseSchema } from "../types/overview";
import type { BoroughOverview } from "../types/overview";

export async function fetchOverview(): Promise<BoroughOverview[]> {
  const res = await fetch("/mocks/overview.json");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return OverviewResponseSchema.parse(await res.json());
}
