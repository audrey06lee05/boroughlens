/**
 * App.tsx
 * Root component. Loads the overview data, keeps track of which
 * boroughs are selected, and renders the picker and one card each.
 */

import { useEffect, useState } from "react";
import { fetchOverview } from "./api/client";
import type { BoroughOverview } from "./types/overview";
import OverviewCard from "./components/OverviewCard";
import SiteHeader from "./components/SiteHeader";
import BoroughPicker from "./components/BoroughPicker";

const COLOURS = ["var(--b0)", "var(--b1)", "var(--b2)"];

export default function App() {
  const [data, setData] = useState<BoroughOverview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([
    "E09000012",
    "E09000007",
  ]); // ← start with Hackney + Camden
  const shown = selected.flatMap(
    (code) => data.find((b) => b.code === code) ?? [],
  );

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
            <h1>Compare London boroughs</h1>
            <BoroughPicker
              options={data}
              selected={selected}
              colours={COLOURS}
              onChange={setSelected}
            />
            <h2>At a glance</h2>
            <div className="card-grid">
              {shown.map((b, i) => (
                <OverviewCard key={b.code} borough={b} colour={COLOURS[i]} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
