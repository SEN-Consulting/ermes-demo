import React from "react";

type Variant = "default" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  const variantClass = variant === "outline" ? "border border-slate-300 bg-white text-slate-700" : "bg-slate-900 text-white";
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${variantClass} ${className}`.trim()} {...props} />;
}
