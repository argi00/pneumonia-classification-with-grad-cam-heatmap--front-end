export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatPct(p, decimals = 1) {
  return `${(p * 100).toFixed(decimals)}%`;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
