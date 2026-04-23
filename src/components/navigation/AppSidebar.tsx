import { ChevronRight } from "lucide-react";
import { navApp } from "../../data/mockData";
import { AppPage } from "../../types/app";

type AppSidebarProps = {
  appPage: AppPage;
  setAppPage: (page: AppPage) => void;
};

export function AppSidebar({ appPage, setAppPage }: AppSidebarProps) {
  return (
    <aside className="rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-sm">
      <div className="mb-4 rounded-2xl bg-slate-50 p-4">
        <div className="text-sm font-medium text-slate-950">Navigazione analista</div>
        <div className="mt-1 text-sm leading-6 text-slate-600">
          Dashboard di monitoraggio e gestione della piattaforma con ricerca avanzata, fonti, evidenze, blog e configurazione.
        </div>
      </div>
      <div className="space-y-2">
        {navApp.map((item) => {
          const Icon = item.icon;
          const active = appPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAppPage(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${active ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 opacity-70" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
