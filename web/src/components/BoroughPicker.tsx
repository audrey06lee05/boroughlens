/**
 * BoroughPicker.tsx
 * Lets the user choose 2–3 boroughs to compare. Shows the chosen ones
 * as coloured chips and a dropdown to add more. Doesn't store anything
 * itself: it tells its parent the new list through onChange.
 */

import type { BoroughOverview } from "../types/overview";
import "./BoroughPicker.css";

type Props = {
  options: BoroughOverview[];
  selected: string[];
  colours: string[];
  onChange: (codes: string[]) => void;
};

const MIN = 2;
const MAX = 3;

export default function BoroughPicker({
  options,
  selected,
  colours,
  onChange,
}: Props) {
  const nameOf = (code: string) =>
    options.find((b) => b.code === code)?.name ?? code;
  const available = options.filter((b) => !selected.includes(b.code));

  return (
    <div className="picker">
      {selected.map((code, i) => (
        <span key={code} className="chip">
          <span className="chip-dot" style={{ background: colours[i] }} />
          {nameOf(code)}
          {selected.length > MIN && (
            <button
              type="button"
              aria-label={`Remove ${nameOf(code)}`}
              onClick={() => onChange(selected.filter((c) => c !== code))}
            >
              ×
            </button>
          )}
        </span>
      ))}

      {selected.length < MAX ? (
        <select
          aria-label="Add a borough"
          value=""
          onChange={(e) => onChange([...selected, e.target.value])}
        >
          <option value="">+ Add a borough</option>
          {available.map((b) => (
            <option key={b.code} value={b.code}>
              {b.name}
            </option>
          ))}
        </select>
      ) : (
        <span className="picker-hint">Maximum of {MAX} boroughs</span>
      )}
    </div>
  );
}
