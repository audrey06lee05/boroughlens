/**
 * sources.ts
 * Defines the shape of the data-freshness info: one entry per data
 * source (crime, rent, prices, mortgage rates), with dates used to
 * show "Up to date" or "Stale" in the UI.
 */

import { z } from "zod";

export const SourceStatusSchema = z.object({
  id: z.enum(["crime", "rent", "price", "rates"]),
  label: z.string(),
  dataTo: z.string(),
  publishedAt: z.string(),
  lastImportFailedAt: z.string().nullable(),
});

export const SourcesResponseSchema = z.array(SourceStatusSchema);
export type SourceStatus = z.infer<typeof SourceStatusSchema>;
