import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: DivProps) {
  return <div className={`border border-slate-200 bg-white ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`p-6 pb-0 ${className}`.trim()} {...props} />;
}

export function CardTitle({ className = "", ...props }: DivProps) {
  return <h3 className={`text-lg font-semibold text-slate-950 ${className}`.trim()} {...props} />;
}

export function CardDescription({ className = "", ...props }: DivProps) {
  return <p className={`mt-1 text-sm text-slate-500 ${className}`.trim()} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`p-6 ${className}`.trim()} {...props} />;
}
