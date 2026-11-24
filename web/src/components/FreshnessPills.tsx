/**
 * FreshnessPills.tsx
 * "Data freshness" section: one box per data source showing how
 * recent its data is, and a warning if it's stale or the last import failed.
 */

import type { SourceStatus } from "../types/sources";
import { formatPeriod, isStale } from "../utils/format";
import "./FreshnessPills.css";

type Props = { sources: SourceStatus[] };

function formatDay(iso: string): string {
  // ← "2026-11-02" → "2 Nov 2026"
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FreshnessPills({ sources }: Props) {
  return (
    <section>
      <h2>Data freshness</h2>
      <p className="section-sub">
        Each dataset is published on its own schedule, so each one shows its own
        date.
      </p>
      <div className="pills">
        {sources.map((s) => {
          const stale = isStale(s.dataTo);
          return (
            <div key={s.id} className={`pill ${stale ? "stale" : "ok"}`}>
              <strong>{s.label}</strong>
              <div>Data to {formatPeriod(s.dataTo)}</div>
              <div className="pill-hint">
                {s.lastImportFailedAt
                  ? `Last import failed ${formatDay(s.lastImportFailedAt)}, showing previous release`
                  : `Published ${formatDay(s.publishedAt)}`}
              </div>
              <span className="pill-status">
                {stale ? "⚠ Stale" : "Up to date"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
