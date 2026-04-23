import React from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  text: string;
  action?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, text, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{text}</p>
      </div>
      {action}
    </div>
  );
}
