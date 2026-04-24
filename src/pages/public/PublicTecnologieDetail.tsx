import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
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

const tabs = [
  { id: "panoramica", label: "Panoramica" },
  { id: "componenti", label: "Componenti" },
  { id: "trl", label: "TRL" },
  { id: "costi", label: "Costi" },
  { id: "prestazioni", label: "Prestazioni" },
  { id: "settori", label: "Settori" },
  { id: "sostenibilita", label: "Sostenibilita" },
  { id: "bestpractice", label: "Best Practice" },
  { id: "policy", label: "Policy" },
  { id: "barriere", label: "Barriere & Opportunita" },
  { id: "attori", label: "Attori" },
] as const;

export function PublicTecnologieDetail({ techSlug, onBack }: PublicTecnologieDetailProps) {
  const [activeTab, setActiveTab] = useState<string>("panoramica");

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
          <Badge variant="outline" className="rounded-full">{tech.raccomandazione}</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">{tech.name}</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">{tech.summary}</p>
      </div>

      {/* Score pillars */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {[
          ["Maturita", tech.maturity],
          ["Readiness", tech.readiness],
          ["Competitivita", tech.competitiveness],
          ["Sostenibilita", tech.sustainability],
          ["Copertura", tech.coverage],
          ["Score", tech.score],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-slate-400">{label as string}</div>
            <div className={`mt-1 text-2xl font-bold ${scoreColor(val as number)}`}>{val as number}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "panoramica" && (
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
      )}

      {activeTab === "componenti" && (
        <div className="space-y-3">
          {data.componenti.length === 0 ? <p className="text-slate-500">Nessun componente disponibile.</p> : data.componenti.map((c) => (
            <Card key={c.compId} className="rounded-[20px] shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-medium text-slate-950">
                      <a href={`#componenti/${encodeURIComponent(c.compId)}`} className="hover:text-blue-700 hover:underline">{c.nome}</a>
                    </div>
                    <div className="text-xs text-slate-400">{c.macrocomponente}</div>
                  </div>
                  <Badge variant="outline" className="rounded-full text-xs">{c.stato}</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">{c.descrizione}</p>
                <div className="text-xs text-slate-500"><strong>Funzione:</strong> {c.funzione}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "trl" && (
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200 text-left">
                <th className="p-4 font-semibold text-slate-500">Componente</th>
                <th className="p-4 font-semibold text-slate-500 text-center">TRL</th>
                <th className="p-4 font-semibold text-slate-500">Contesto</th>
                <th className="p-4 font-semibold text-slate-500">Evidenza</th>
              </tr></thead>
              <tbody>
                {data.trl.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-950">{r.componente}</td>
                    <td className="p-4 text-center"><Badge className={`rounded-full ${r.trl >= 8 ? 'bg-emerald-100 text-emerald-800' : r.trl >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{r.trl}</Badge></td>
                    <td className="p-4 text-slate-600">{r.contesto}</td>
                    <td className="p-4 text-slate-600">{r.evidenza}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "costi" && (
        <div className="space-y-3">
          {data.costi.map((c, i) => (
            <Card key={i} className="rounded-[20px] shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-medium text-slate-950">{c.metrica}</div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-950">{c.valore} <span className="text-sm font-normal text-slate-400">{c.unita}</span></div>
                    <div className="text-xs text-slate-400">{c.anno}</div>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span><strong>Trend:</strong> {c.trend}</span>
                  <span><strong>Driver:</strong> {c.driver}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "prestazioni" && (
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200 text-left">
                <th className="p-4 font-semibold text-slate-500">KPI</th>
                <th className="p-4 font-semibold text-slate-500 text-right">Valore</th>
                <th className="p-4 font-semibold text-slate-500">Unita</th>
                <th className="p-4 font-semibold text-slate-500">Benchmark</th>
              </tr></thead>
              <tbody>
                {data.prestazioni.map((p, i) => (
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

      {activeTab === "settori" && (
        <div className="space-y-3">
          {data.settori.map((s, i) => (
            <Card key={i} className="rounded-[20px] shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="font-medium text-slate-950">{s.settore}</div>
                  <Badge variant="outline" className="rounded-full text-xs">{s.intensita}</Badge>
                </div>
                <div className="text-sm text-slate-600 mb-1"><strong>Caso d'uso:</strong> {s.casoUso}</div>
                <div className="text-sm text-slate-500">{s.tipoImpatto}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "sostenibilita" && data.sostenibilita && (
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Emissioni GHG lifecycle</div>
                <div className="text-2xl font-bold">{data.sostenibilita.emissioniGHG} <span className="text-sm font-normal text-slate-500">{data.sostenibilita.unitaGHG}</span></div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Tassonomia UE</div>
                <div className="text-lg font-semibold">{data.sostenibilita.tassonomiaUE}</div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">LCA disponibile</div>
              <div className="font-medium">{data.sostenibilita.lcaDisponibile}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Altri impatti</div>
              <div className="text-sm text-slate-600">{data.sostenibilita.altriImpatti}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "bestpractice" && (
        <div className="space-y-4">
          {data.bestPractices.map((bp, i) => (
            <Card key={i} className="rounded-[28px] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-semibold text-slate-950">{bp.progetto}</div>
                    <div className="text-sm text-slate-500">{bp.organizzazione} • {bp.paese} • {bp.anno}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2">{bp.descrizione}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3 text-sm"><strong className="text-slate-700">Perche rilevante:</strong> {bp.perche}</div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm"><strong className="text-slate-700">Risultati:</strong> {bp.risultati}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "policy" && (
        <div className="space-y-3">
          {data.policy.map((p, i) => (
            <Card key={i} className="rounded-[20px] shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-medium text-slate-950">{p.titolo}</div>
                    <div className="text-xs text-slate-400">{p.giurisdizione} • {p.tipo}</div>
                  </div>
                  <Badge variant="outline" className="rounded-full text-xs">{p.stato}</Badge>
                </div>
                <p className="text-sm text-slate-600">{p.impatto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "barriere" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-950">Barriere</h3>
            {data.barriere.filter(b => b.tipo === "Barriera").map((b, i) => (
              <Card key={i} className="rounded-[20px] shadow-sm border-red-100">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-medium text-slate-950">{b.titolo}</div>
                    <Badge className="rounded-full bg-red-100 text-red-700 text-xs">{b.severita}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{b.descrizione}</p>
                  <div className="text-xs text-slate-500"><strong>Mitigazione:</strong> {b.mitigazione}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-950">Opportunita</h3>
            {data.barriere.filter(b => b.tipo === "Opportunita").map((b, i) => (
              <Card key={i} className="rounded-[20px] shadow-sm border-emerald-100">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-medium text-slate-950">{b.titolo}</div>
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 text-xs">{b.severita}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{b.descrizione}</p>
                  <div className="text-xs text-slate-500"><strong>Azione:</strong> {b.mitigazione}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "attori" && (
        <div className="space-y-3">
          {data.attori.length === 0 ? <p className="text-slate-500">Nessun attore mappato per questa tecnologia.</p> : data.attori.map((a, i) => (
            <Card key={i} className="rounded-[20px] shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <div className="font-medium text-slate-950">{a.nome}</div>
                    <div className="text-xs text-slate-400">{a.tipo} • {a.paese}</div>
                  </div>
                  <Badge variant="outline" className="rounded-full text-xs">{a.rilevanza}</Badge>
                </div>
                <p className="text-sm text-slate-600">{a.ruolo}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
