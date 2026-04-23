import React, { createContext, useContext } from "react";

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <TabsContext.Provider value={{ value, onValueChange }}>{children}</TabsContext.Provider>;
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-flex items-center gap-1 rounded-md bg-slate-100 p-1 ${className}`.trim()} {...props} />;
}

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function TabsTrigger({ value, className = "", children, type = "button", ...props }: TabsTriggerProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  const active = ctx.value === value;
  return (
    <button
      type={type}
      onClick={() => ctx.onValueChange(value)}
      className={`h-9 rounded-md px-3 text-sm transition ${active ? "bg-slate-900 text-white" : "bg-transparent text-slate-700 hover:bg-slate-200"} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
