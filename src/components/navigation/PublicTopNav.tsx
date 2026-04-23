import { navPublic } from "../../data/mockData";
import { PublicPage } from "../../types/app";
import { Button } from "../ui/button";

type PublicTopNavProps = {
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage) => void;
};

export function PublicTopNav({ publicPage, setPublicPage }: PublicTopNavProps) {
  return (
    <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 md:px-6">
        {navPublic.map((item) => (
          <Button
            key={item.id}
            variant={publicPage === item.id ? "default" : "ghost"}
            className="rounded-2xl"
            onClick={() => setPublicPage(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
