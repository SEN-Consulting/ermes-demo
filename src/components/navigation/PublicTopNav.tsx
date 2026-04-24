import { navPublic } from "../../data/mockData";
import { PublicPage } from "../../types/app";

type PublicTopNavProps = {
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage) => void;
};

export function PublicTopNav({ publicPage, setPublicPage }: PublicTopNavProps) {
  return (
    <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 md:px-6">
        {navPublic.map((item) => {
          const active = publicPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPublicPage(item.id)}
              className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                active
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-slate-950" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
