import { ChevronLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { componenti, trlRecords, costiRecords, prestazioniRecords } from "../../data/analyticalData";
import { techs } from "../../data/mockData";

type AppComponenteDetailProps = {
  compId: string;
  onBack: () => void;
  onOpenTech?: (techId: string) => void;
  onOpenComponente?: (compId: string) => void;
};

const statoBg = (stato: string) => {
  if (stato.includes("diffusa")) return "bg-emerald-100 text-emerald-700";
  if (stato.includes("iniziale")) return "bg-blue-100 text-blue-700";
  if (stato.includes("Pilota") || stato.includes("dimostratore")) return "bg-amber-100 text-amber-700";
  if (stato.includes("pre-commerciale") || stato.includes("FOAK") || stato.includes("Pre-commerciale")) return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export function AppComponenteDetail({ compId, onBack, onOpenTech, onOpenComponente }: AppComponenteDetailProps) {
  const comp = useMemo(() => componenti.find((c) => c.compId === compId), [compId]);

  const tech = useMemo(() => {
    if (!comp) return null;
    return techs.find((t) => t.id === comp.techId);
  }, [comp]);

  const trl = useMemo(() => {
    if (!comp) return null;
    return trlRecords.find((r) => r.compId === comp.compId) || null;
  }, [comp]);

  const relatedTRL = useMemo(() => {
    if (!comp) return [];
    return trlRecords.filter((r) => r.techId === comp.techId);
  }, [comp]);

  const relatedCosti = useMemo(() => {
    if (!comp) return [];
    return costiRecords.filter((r) => r.techId === comp.techId);
  }, [comp]);

  const relatedPrestazioni = useMemo(() => {
    if (!comp) return [];
    return prestazioniRecords.filter((r) => r.techId === comp.techId);
  }, [comp]);

  const siblingComponents = useMemo(() => {
    if (!comp) return [];
    return componenti.filter((c) => c.techId === comp.techId && c.compId !== comp.compId);
  }, [comp]);

  if (!comp) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="px-0 text-slate-700 hover:bg-transparent" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Torna ai componenti
        </Button>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-8 text-center"><p className="text-slate-600">Componente non trovato</p></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" className="px-0 text-slate-700 hover:bg-transparent" onClick={onBack}>
        <ChevronLeft className="mr-1 h-4 w-4" /> Torna ai componenti
      </Button>

      {/* Header */}
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className={`rounded-full ${statoBg(comp.stato)}`}>{comp.stato}</Badge>
          <Badge variant="outline" className="rounded-full">{comp.compId}</Badge>
          <Badge variant="outline" className="rounded-full">{comp.macrocomponente}</Badge>
          {trl && (
            <Badge className={`rounded-full ${trl.trl >= 8 ? 'bg-emerald-100 text-emerald-800' : trl.trl >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
              TRL {trl.trl}
            </Badge>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">{comp.nome}</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">{comp.descrizione}</p>
      </div>

      {/* Main info grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Anagrafica componente</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Comp_ID</div>
              <div className="mt-1 text-slate-900 font-mono text-sm">{comp.compId}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Tecnologia di riferimento</div>
              <div className="mt-1 text-slate-900">
                {tech && onOpenTech ? (
                  <button
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={() => onOpenTech(tech.id)}
                  >
                    {comp.tecnologia} <ExternalLink className="h-3 w-3" />
                  </button>
                ) : comp.tecnologia}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Tech_ID</div>
              <div className="mt-1 text-slate-900 font-mono text-sm">{comp.techId}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Macrocomponente</div>
              <div className="mt-1 text-slate-900">{comp.macrocomponente}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Funzione</div>
              <div className="mt-1 text-slate-900">{comp.funzione}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Stato componente</div>
              <Badge className={`mt-1 rounded-full ${statoBg(comp.stato)}`}>{comp.stato}</Badge>
            </div>
            {comp.ultimoAggiornamento && (
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Ultimo aggiornamento</div>
                <div className="mt-1 text-slate-900">{comp.ultimoAggiornamento}</div>
              </div>
            )}
            {comp.note && (
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Note</div>
                <div className="mt-1 text-sm text-slate-600">{comp.note}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Descrizione dettagliata</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-7 text-slate-700">{comp.descrizione}</p>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Funzione nel sistema</div>
              <div className="font-medium text-slate-900">{comp.funzione}</div>
            </div>
            {trl && (
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">TRL (Technology Readiness Level)</div>
                  <div className="text-3xl font-bold">{trl.trl} <span className="text-sm font-normal text-slate-500">/ 9</span></div>
                  <div className="mt-1 text-sm text-slate-600">{trl.contesto}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Evidenza TRL</div>
                  <div className="text-sm text-slate-700">{trl.evidenza}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Technology context */}
      {tech && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Contesto tecnologia: {tech.name}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
              {([
                ["Score", tech.score],
                ["Maturita", tech.maturity],
                ["Readiness", tech.readiness],
                ["Competitivita", tech.competitiveness],
                ["Sostenibilita", tech.sustainability],
                ["Ranking", `#${tech.rank}`],
              ] as [string, string | number][]).map(([label, val]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-3 text-center">
                  <div className="text-xs uppercase tracking-widest text-slate-400">{label}</div>
                  <div className="mt-1 text-lg font-bold">{val}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">{tech.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Related TRL for this technology */}
      {relatedTRL.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">TRL componenti della stessa tecnologia</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="p-4 font-semibold text-slate-500">Componente</th>
                  <th className="p-4 font-semibold text-slate-500 text-center">TRL</th>
                  <th className="p-4 font-semibold text-slate-500">Contesto</th>
                  <th className="p-4 font-semibold text-slate-500">Evidenza</th>
                </tr>
              </thead>
              <tbody>
                {relatedTRL.map((r, i) => (
                  <tr key={i} className={`border-b border-slate-100 ${r.compId === comp.compId ? 'bg-blue-50' : ''}`}>
                    <td className="p-4 font-medium text-slate-950">
                      {r.componente}
                      {r.compId === comp.compId && <span className="ml-2 text-xs text-blue-600">(questo)</span>}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={`rounded-full ${r.trl >= 8 ? 'bg-emerald-100 text-emerald-800' : r.trl >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                        {r.trl}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600">{r.contesto}</td>
                    <td className="p-4 text-slate-600">{r.evidenza}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Related costs */}
      {relatedCosti.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Costi e competitivita — {comp.tecnologia}</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="p-4 font-semibold text-slate-500">Metrica</th>
                  <th className="p-4 font-semibold text-slate-500 text-right">Valore</th>
                  <th className="p-4 font-semibold text-slate-500">Unita</th>
                  <th className="p-4 font-semibold text-slate-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {relatedCosti.map((c, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-950">{c.metrica}</td>
                    <td className="p-4 text-right font-bold tabular-nums">{c.valore}</td>
                    <td className="p-4 text-slate-600">{c.unita}</td>
                    <td className="p-4 text-slate-500 text-sm">{c.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Related performance KPIs */}
      {relatedPrestazioni.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Prestazioni tecniche — {comp.tecnologia}</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="p-4 font-semibold text-slate-500">KPI</th>
                  <th className="p-4 font-semibold text-slate-500 text-right">Valore</th>
                  <th className="p-4 font-semibold text-slate-500">Unita</th>
                  <th className="p-4 font-semibold text-slate-500">Benchmark</th>
                </tr>
              </thead>
              <tbody>
                {relatedPrestazioni.map((p, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-950">{p.kpi}</td>
                    <td className="p-4 text-right font-bold tabular-nums">{p.valore}</td>
                    <td className="p-4 text-slate-600">{p.unita}</td>
                    <td className="p-4 text-slate-500 text-sm">{p.benchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Sibling components */}
      {siblingComponents.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Altri componenti di {comp.tecnologia}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {siblingComponents.map((s) => (
              <div key={s.compId} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">
                    {onOpenComponente ? (
                      <button className="hover:text-blue-700 hover:underline text-left" onClick={() => onOpenComponente(s.compId)}>{s.nome}</button>
                    ) : s.nome}
                  </div>
                  <div className="text-sm text-slate-500">{s.macrocomponente} • {s.stato}</div>
                </div>
                <Badge className={`rounded-full ${statoBg(s.stato)}`}>{s.stato}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
