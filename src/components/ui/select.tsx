import React from "react";

export function Select({ children }: { children: React.ReactNode; defaultValue?: string }) {
  return <div className="space-y-2">{children}</div>;
}

export function SelectTrigger({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 ${className}`.trim()}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder ?? "Select"}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-1 rounded-md border border-slate-200 bg-slate-50 p-2">{children}</div>;
}

export function SelectItem({ children }: { value: string; children: React.ReactNode }) {
  return <div className="rounded-md bg-white px-3 py-2 text-sm text-slate-700">{children}</div>;
}
