import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";
import { getTech360 } from "../../data/analyticalData";
import { scoreColor } from "../../lib/scoreColor";

type PublicTecnologieDetailProps = {
  techSlug?: string | null;
  onBack?: () => void;
};

const semaforoColor = (s: string) => {
  if (s === "VERDE") return "bg-emerald-100 text-emerald-800";
  if (s === "GIALLO") return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

export function PublicTecnologieDetail({ techSlug, onBack }: PublicTecnologieDetailProps) {
  const tech = useMemo(() => {
    if (!techSlug) return null;
    return techs.find((t) => t.slug === techSlug);
  }, [techSlug]);

  const data = useMemo(() => {
    if (!tech) return null;
    return getTech360(tech.id);
  }, [tech]);

  if (!tech || !data) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="px-0 text-slate-700 hover:bg-transparent" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Torna alle tecnologie
        </Button>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-8 text-center"><p className="text-slate-600">Tecnologia non trovata</p></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="px-0 text-slate-700 hover:bg-transparent" onClick={onBack}>
        <ChevronLeft className="mr-1 h-4 w-4" /> Torna alle tecnologie
      </Button>

      {/* Header */}
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className={`rounded-full ${semaforoColor(tech.semaforo)}`}>{tech.semaforo}</Badge>
          <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{tech.family}</Badge>
          <Badge variant="outline" className="rounded-full">#{tech.rank} nel ranking</Badge>
          <Badge variant="outline" className="rounded-full">{tech.posizionamento}</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">{tech.name}</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">{tech.summary}</p>
      </div>

      {/* Score pillars */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {([
          ["Maturita", tech.maturity],
          ["Readiness", tech.readiness],
          ["Competitivita", tech.competitiveness],
          ["Sostenibilita", tech.sustainability],
          ["Copertura", tech.coverage],
          ["Score", tech.score],
        ] as [string, number][]).map(([label, val]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-slate-400">{label}</div>
            <div className={`mt-1 text-2xl font-bold ${scoreColor(val)}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* Description & Sectors */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Descrizione</CardTitle></CardHeader>
          <CardContent><p className="leading-7 text-slate-700">{tech.description}</p></CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Settori di applicazione</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tech.sectors.map((s) => <Badge key={s} variant="outline" className="rounded-full">{s}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-slate-950">{data.componenti.length}</div>
            <div className="mt-1 text-sm text-slate-500">Componenti chiave</div>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-slate-950">{data.settori.length}</div>
            <div className="mt-1 text-sm text-slate-500">Settori di impatto</div>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-slate-950">{data.bestPractices.length}</div>
            <div className="mt-1 text-sm text-slate-500">Best practice documentate</div>
          </CardContent>
        </Card>
      </div>

      {/* Componenti overview */}
      {data.componenti.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Componenti principali</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.componenti.slice(0, 5).map((c) => (
              <div key={c.compId} className="flex items-start justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">
                    <a href={`#componenti/${encodeURIComponent(c.compId)}`} className="hover:text-blue-700 hover:underline">{c.nome}</a>
                  </div>
                  <div className="text-sm text-slate-500">{c.macrocomponente}</div>
                </div>
                <Badge variant="outline" className="rounded-full text-xs">{c.stato}</Badge>
              </div>
            ))}
            {data.componenti.length > 5 && (
              <p className="text-sm text-slate-400 text-center">e altri {data.componenti.length - 5} componenti...</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Raccomandazione */}
      <Card className="rounded-[28px] shadow-sm bg-slate-50">
        <CardContent className="p-6">
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">Raccomandazione ERMES</div>
          <p className="text-lg font-medium text-slate-900">{tech.raccomandazione}</p>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-slate-500">
          Per l'analisi completa a 360° — TRL, costi, prestazioni, sostenibilita, policy, barriere e attori —
          accedi alla <strong>Webapp utente</strong>.
        </p>
      </div>
    </div>
  );
}
