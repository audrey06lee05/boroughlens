/**
 * OverviewCard.tsx
 * One "At a glance" card for a single borough: name, GSS code,
 * population, and the crime / rent / house price rows.
 */

import type { BoroughOverview, Metric } from "../types/overview";
import { formatGBP, formatChange, formatPeriod } from "../utils/format";
import "./OverviewCard.css";

type Props = { borough: BoroughOverview; colour: string };

function MetricRow({
  label,
  metric,
  money,
}: {
  label: string;
  metric: Metric;
  money: boolean;
}) {
  return (
    <div className="metric">
      <div className="metric-label">
        {label} · {formatPeriod(metric.period)}
      </div>
      <div className="metric-value">
        {money ? formatGBP(metric.value) : metric.value}
        {metric.annualChange !== null && (
          <span
            className={`metric-change ${metric.annualChange > 0 ? "up" : "down"}`}
          >
            {formatChange(metric.annualChange)} yr
          </span>
        )}
      </div>
    </div>
  );
}

export default function OverviewCard({ borough, colour }: Props) {
  return (
    <article
      className="card"
      style={{ "--card-colour": colour } as React.CSSProperties}
    >
      <h3>{borough.name}</h3>
      <p className="card-meta">
        {borough.code} · population {borough.population.toLocaleString("en-GB")}{" "}
        (Census 2021)
      </p>
      <MetricRow
        label="Crimes per 1,000 residents"
        metric={borough.crimePer1000}
        money={false}
      />
      <MetricRow
        label="Average monthly rent"
        metric={borough.averageRent}
        money={true}
      />
      <MetricRow
        label="Average house price"
        metric={borough.averagePrice}
        money={true}
      />
    </article>
  );
}
