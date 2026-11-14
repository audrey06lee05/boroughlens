/**
 * App.tsx
 * Root component. Loads the overview data and renders one
 * OverviewCard per borough.
 */

import { useEffect, useState } from "react";
import { fetchOverview } from "./api/client";
import type { BoroughOverview } from "./types/overview";
import OverviewCard from "./components/OverviewCard";

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

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h2>At a glance</h2>
      {data.map((b) => (
        <OverviewCard key={b.code} borough={b} /> // ← one card per borough
      ))}
    </main>
  );
}
