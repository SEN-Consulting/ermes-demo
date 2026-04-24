import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { techs } from "../../data/mockData";

type PublicTechProps = {
  onOpenTech?: (techSlug: string) => void;
};

export function PublicTech({ onOpenTech }: PublicTechProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return techs;
    return techs.filter((t) => [t.name, t.family, t.summary].join(" ").toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Tecnologie"
        title="Una stessa tecnologia, tre livelli di lettura."
        text="Sintesi per decisori, analisi per utenti tecnici, evidenze per chi vuole andare fino al dettaglio."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl pl-9"
              placeholder="Cerca tecnologia, famiglia o mercato"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Filtri base</Badge>
            <Badge variant="outline" className="rounded-full">Filtri avanzati</Badge>
            <Badge variant="outline" className="rounded-full">Vista card / tabellare</Badge>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        {filtered.map((t) => (
          <Card key={t.id} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  <CardDescription>{t.family} • Score {t.score}/100</CardDescription>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.semaforo === 'VERDE' ? 'bg-emerald-100 text-emerald-800' : t.semaforo === 'GIALLO' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{t.semaforo}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-slate-600">{t.summary}</p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Score</div><div className="mt-2 text-lg font-semibold">{t.score}/100</div></div>
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Ranking</div><div className="mt-2 text-lg font-semibold">#{t.rank}</div></div>
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Posizionamento</div><div className="mt-2 text-lg font-semibold">{t.posizionamento}</div></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.sectors.map((sector) => (
                  <Badge key={sector} className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{sector}</Badge>
                ))}
              </div>
              <Button
                className="rounded-2xl"
                onClick={() => {
                  if (onOpenTech) {
                    onOpenTech(t.slug);
                    window.location.hash = `tech/${encodeURIComponent(t.slug)}`;
                  }
                }}
              >
                Apri scheda tecnologia
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
