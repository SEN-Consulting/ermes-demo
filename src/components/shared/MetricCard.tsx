import React from "react";
import { Card, CardContent } from "../ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function MetricCard({ label, value, hint, icon: Icon }: MetricCardProps) {
  return (
    <Card className="rounded-[24px] border-slate-200/70 shadow-sm">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{hint}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
}
