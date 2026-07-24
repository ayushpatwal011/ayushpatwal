import { useEffect, useState } from "react";
import Icon from "./Icon";

/**
 * GitHub-style contributions heatmap.
 * Data source: https://github-contributions-api.jogruber.de/v4/{username}
 */

const LEVEL_CLASSES = [
  "bg-gray-200 border border-gray-400", // 0 - no contributions
  "bg-gray-500 border border-gray-800", // 1 - low contributions
  "bg-gray-700 border border-gray-900", // 2 - medium contributions
  "bg-gray-800 border border-gray-900", // 3 - high contributions
  "bg-black", // 4 - maximum contributions
];

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = null;

  weeks.forEach((week, weekIndex) => {
    const firstDayWithDate = week.find((d) => d && d.date);
    if (!firstDayWithDate) return;
    const month = new Date(firstDayWithDate.date).toLocaleString("en-US", {
      month: "short",
    });

    if (month !== lastMonth) {
      labels.push({ month, weekIndex });
      lastMonth = month;
    }
  });

  return labels.filter((label, idx, arr) => {
    if (idx === 0) return true;
    return label.weekIndex - arr[idx - 1].weekIndex >= 2;
  });
}

function chunkIntoWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export default function ContributionsCalendar({ username = "ayushpatwal011", year = "last" }) {
  const [days, setDays] = useState(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        setDays(data.contributions);
        const totalCount =
          typeof data.total === "object"
            ? Object.values(data.total).reduce((a, b) => a + b, 0)
            : data.total;
        setTotal(totalCount);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, [username, year]);

  const cellSize = 11; // px
  const cellGap = 3;   // px

  if (error || !days) {
    return (
      <div className="mt-8 px-2 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Contributions</h2>
          {username && (
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-200 bg-white hover:bg-gray-100 rounded-lg transition-colors text-gray-700 flex items-center justify-center"
              aria-label="View on GitHub"
            >
              <Icon name="ArrowUpRight" className="w-4 h-4" />
            </a>
          )}
        </div>
        <div className="bg-[#efeff1] rounded-lg p-6 text-sm text-gray-500 min-h-[160px] flex items-center justify-center">
          {error ? `Couldn't load contributions (${error})` : "Loading contributions…"}
        </div>
      </div>
    );
  }

  const weeks = chunkIntoWeeks(days);
  const monthLabels = getMonthLabels(weeks);

  return (
    <div className="mt-8 px-2 py-4">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Contributions</h2>
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-200 bg-white hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center shadow-xs"
            aria-label="View on GitHub"
          >
            <Icon name="ArrowUpRight" className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Main card container */}
      <div className="bg-gray-100 rounded-lg p-6 sm:p-7 overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="relative h-5 mb-2 text-[12px] font-medium select-none">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${label.weekIndex * (cellSize + cellGap)}px` }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Grid of days */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                    className={`h-[11px] w-[11px] rounded-[3px] transition-colors ${
                      LEVEL_CLASSES[day.level] || LEVEL_CLASSES[0]
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer stats & legend */}
          <div className="mt-5 flex items-center justify-between text-[12px] font-medium select-none">
            <span>{total} contributions in the last year</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {LEVEL_CLASSES.map((cls, i) => (
                <div key={i} className={`h-[11px] w-[11px] rounded-[3px] ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}