export function scoreColor(value: number) {
  if (value >= 75) return "bg-emerald-100 text-emerald-700";
  if (value >= 55) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}
