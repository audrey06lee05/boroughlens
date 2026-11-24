/**
 * client.ts
 * Functions the UI uses to get data. For now they read mock JSON from
 * /public/mocks; later only the URLs change to point at the real API.
 */

import { OverviewResponseSchema } from "../types/overview";
import type { BoroughOverview } from "../types/overview";
import { SourcesResponseSchema } from "../types/sources";
import type { SourceStatus } from "../types/sources";

export async function fetchOverview(): Promise<BoroughOverview[]> {
  const res = await fetch("/mocks/overview.json");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return OverviewResponseSchema.parse(await res.json());
}

export async function fetchSources(): Promise<SourceStatus[]> {
  const res = await fetch("/mocks/sources.json");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return SourcesResponseSchema.parse(await res.json());
}
