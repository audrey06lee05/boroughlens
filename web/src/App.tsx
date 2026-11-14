/**
 * App.tsx
 * Root component. Loads the overview data and renders one
 * OverviewCard per borough.
 */

import { useEffect, useState } from "react";
import { fetchOverview } from "./api/client";
import type { BoroughOverview } from "./types/overview";
import OverviewCard from "./components/OverviewCard";
import SiteHeader from "./components/SiteHeader";

const COLOURS = ["var(--b0)", "var(--b1)", "var(--b2)"];

export default function App() {
  const [data, setData] = useState<BoroughOverview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOverview()
      .then(setData)
      .catch((e) => setError(String(e)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        {isLoading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <>
            <h2>At a glance</h2>
            <div className="card-grid">
              {data.map((b, i) => (
                <OverviewCard key={b.code} borough={b} colour={COLOURS[i]} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
