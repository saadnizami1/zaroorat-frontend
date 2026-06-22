// Shared formatting helpers for the Zaroorat UI.

export const formatPKR = (n = 0) => `PKR ${Math.round(n).toLocaleString("en-PK")}`;

export const formatNumber = (n = 0) => Math.round(n).toLocaleString("en-PK");

/** Compact large numbers: 14_300_000 -> "1.43 Cr" style isn't ideal for donors,
 *  so we use international compact: 14.3M, 482K. */
export const formatCompact = (n = 0) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${trim(n / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${trim(n / 1_000_000)}M`;
  if (abs >= 1_000) return `${trim(n / 1_000)}K`;
  return `${Math.round(n)}`;
};

const trim = (x) => {
  const v = Math.round(x * 10) / 10;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};

export const progressPercent = (raised = 0, goal = 0) => {
  if (!goal || goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
};
