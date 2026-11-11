/**
 * overview.ts
 * Defines the shape of the "At a glance" data (one card per borough)
 * using Zod, and exports matching TypeScript types for the rest of the app.
 */

import { z } from "zod";

// one row on a Borough card
export const MetricSchema = z.object({
  value: z.number(),
  annualChange: z.number().nullable(),
  period: z.string(),
  publishedAt: z.string(),
});

// Borough Card
export const BoroughOverviewSchema = z.object({
  code: z.string(),
  name: z.string(),
  population: z.number(),
  crimePer1000: MetricSchema,
  averageRent: MetricSchema,
  averagePrice: MetricSchema,
});

export const OverviewResponseSchema = z.array(BoroughOverviewSchema);

export type Metric = z.infer<typeof MetricSchema>;
export type BoroughOverview = z.infer<typeof BoroughOverviewSchema>;
