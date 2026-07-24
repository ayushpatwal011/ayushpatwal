import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function LeetCodeStats({ username = "ayushpatwal" }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}/solved`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) {
    return (
      <div className="mt-8 px-2 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">LeetCode</h2>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
          Couldn't load LeetCode stats ({error}).
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mt-8 px-2 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">LeetCode</h2>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
          Loading LeetCode stats…
        </div>
      </div>
    );
  }

  const {
    solvedProblem = 0,
    easySolved = 0,
    mediumSolved = 0,
    hardSolved = 0,
  } = stats;

  const total = solvedProblem || (easySolved + mediumSolved + hardSolved) || 1;
  const easyPct = Math.round((easySolved / total) * 100);
  const medPct = Math.round((mediumSolved / total) * 100);
  const hardPct = Math.round((hardSolved / total) * 100);

  // SVG Donut calculation
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.72
  const easyStroke = (easySolved / total) * circumference;
  const medStroke = (mediumSolved / total) * circumference;
  const hardStroke = (hardSolved / total) * circumference;

  return (
    <div className="mt-8 px-2 py-4">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold ">LeetCode</h2>
        </div>
        {username && (
          <a
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-200 bg-white hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center shadow-xs"
            aria-label="View LeetCode Profile"
          >
            <Icon name="ArrowUpRight" className="w-4 h-4 text-gray-700" />
          </a>
        )}
      </div>

      {/* Main card container */}
      <div className="bg-gray-100 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Main Total Solved Donut Circle */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Track background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Easy Segment */}
                {easySolved > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-emerald-400 transition-all duration-700"
                    strokeWidth="10"
                    strokeDasharray={`${easyStroke} ${circumference}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                )}
                {/* Medium Segment */}
                {mediumSolved > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-amber-400 transition-all duration-700"
                    strokeWidth="10"
                    strokeDasharray={`${medStroke} ${circumference}`}
                    strokeDashoffset={-easyStroke}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                )}
                {/* Hard Segment */}
                {hardSolved > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-rose-400 transition-all duration-700"
                    strokeWidth="10"
                    strokeDasharray={`${hardStroke} ${circumference}`}
                    strokeDashoffset={-(easyStroke + medStroke)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                )}
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-gray-900 leading-none">
                  {solvedProblem}
                </span>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1">
                  Solved
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty Circle Cards */}
          <div className="flex-1 w-full grid grid-cols-3 gap-3 sm:gap-4">
            {/* Easy Circle */}
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200/70 shadow-xs flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-emerald-500/20 bg-emerald-50/50 flex flex-col items-center justify-center mb-2">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                  {easySolved}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-800">Easy</span>
              <span className="text-[11px] font-medium text-emerald-600 mt-0.5">
                {easyPct}% of total
              </span>
            </div>

            {/* Medium Circle */}
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200/70 shadow-xs flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-500/20 bg-amber-50/50 flex flex-col items-center justify-center mb-2">
                <span className="text-xl sm:text-2xl font-bold text-amber-600">
                  {mediumSolved}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-800">Medium</span>
              <span className="text-[11px] font-medium text-amber-600 mt-0.5">
                {medPct}% of total
              </span>
            </div>

            {/* Hard Circle */}
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200/70 shadow-xs flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-rose-500/20 bg-rose-50/50 flex flex-col items-center justify-center mb-2">
                <span className="text-xl sm:text-2xl font-bold text-rose-600">
                  {hardSolved}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-800">Hard</span>
              <span className="text-[11px] font-medium text-rose-600 mt-0.5">
                {hardPct}% of total
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}