import React from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "default", size = "default", className = "", type = "button", ...props }: ButtonProps) {
  const hasBg = className.includes("bg-");
  const hasText = className.includes("text-");
  const hasHover = className.includes("hover:");

  const variantBg =
    variant === "outline" ? "bg-white"
    : variant === "ghost" ? "bg-transparent"
    : "bg-slate-900";
  const variantText =
    variant === "outline" ? "text-slate-900"
    : variant === "ghost" ? "text-slate-900"
    : "text-white";
  const variantHover =
    variant === "outline" ? "hover:bg-slate-50"
    : variant === "ghost" ? "hover:bg-slate-100"
    : "hover:bg-slate-800";
  const variantBorder = variant === "outline" ? "border border-slate-300" : "";

  const sizeClass = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-sm";

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition",
    sizeClass,
    variantBorder,
    hasBg ? "" : variantBg,
    hasText ? "" : variantText,
    hasHover ? "" : variantHover,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props} />
  );
}
