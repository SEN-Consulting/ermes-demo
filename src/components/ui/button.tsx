import React from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "default", size = "default", className = "", type = "button", ...props }: ButtonProps) {
  const variantClass =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : variant === "ghost"
        ? "bg-transparent text-slate-900 hover:bg-slate-100"
        : "bg-slate-900 text-white hover:bg-slate-800";

  const sizeClass = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-sm";

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition ${sizeClass} ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}
