import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";
import { getTech360 } from "../../data/analyticalData";
import { scoreColor } from "../../lib/scoreColor";

type AppTecnologieDetailProps = {
  techId: string;
  onBack: () => void;
  onOpenComponente?: (compId: string) => void;
};

const semaforoColor = (s: string) => {
  if (s === "VERDE") return "bg-emerald-100 text-emerald-800";
  if (s === "GIALLO") return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

const statoBg = (stato: string) => {
  if (stato.includes("diffusa")) return "bg-emerald-100 text-emerald-700";
  if (stato.includes("iniziale")) return "bg-blue-100 text-blue-700";
  if (stato.includes("Pilota") || stato.includes("dimostratore")) return "bg-amber-100 text-amber-700";
  if (stato.includes("pre-commerciale") || stato.includes("FOAK") || stato.includes("Pre-commerciale")) return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export function AppTecnologieDetail({ techId, onBack, onOpenComponente }: AppTecnologieDetailProps) {
  const tech = useMemo(() => techs.find((t) => t.id === techId), [techId]);
  const data = useMemo(() => getTech360(techId), [techId]);

  if (!tech) {
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
    <div className="space-y-8">
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

      {/* Componenti */}
      {data.componenti.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Componenti chiave</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.componenti.map((c) => (
              <div key={c.compId} className="flex items-start justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">
                    {onOpenComponente ? (
                      <button className="hover:text-blue-700 hover:underline text-left" onClick={() => onOpenComponente(c.compId)}>{c.nome}</button>
                    ) : c.nome}
                  </div>
                  <div className="text-sm text-slate-500">{c.macrocomponente}</div>
                </div>
                <Badge className={`rounded-full ${statoBg(c.stato)}`}>{c.stato}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* TRL */}
      {data.trl.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">TRL — Technology Readiness Level</CardTitle></CardHeader>
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

      {/* Costi */}
      {data.costi.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Costi e competitivita</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200 text-left">
                <th className="p-4 font-semibold text-slate-500">Metrica</th>
                <th className="p-4 font-semibold text-slate-500 text-right">Valore</th>
                <th className="p-4 font-semibold text-slate-500">Unita</th>
                <th className="p-4 font-semibold text-slate-500">Anno</th>
                <th className="p-4 font-semibold text-slate-500">Trend</th>
                <th className="p-4 font-semibold text-slate-500">Driver</th>
              </tr></thead>
              <tbody>
                {data.costi.map((c, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-950">{c.metrica}</td>
                    <td className="p-4 text-right font-bold tabular-nums">{c.valore}</td>
                    <td className="p-4 text-slate-600">{c.unita}</td>
                    <td className="p-4 text-slate-600">{c.anno}</td>
                    <td className="p-4 text-slate-500 text-sm">{c.trend}</td>
                    <td className="p-4 text-slate-500 text-sm">{c.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Prestazioni */}
      {data.prestazioni.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Prestazioni tecniche</CardTitle></CardHeader>
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

      {/* Settori */}
      {data.settori.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Settori di impatto</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.settori.map((s, i) => (
              <div key={i} className="flex items-start justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">{s.settore}</div>
                  <div className="text-sm text-slate-600"><strong>Caso d'uso:</strong> {s.casoUso}</div>
                  <div className="text-sm text-slate-500">{s.tipoImpatto}</div>
                </div>
                <Badge variant="outline" className="rounded-full text-xs">{s.intensita}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sostenibilita */}
      {data.sostenibilita && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Sostenibilita</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Emissioni GHG lifecycle</div>
                <div className="text-2xl font-bold">{data.sostenibilita.emissioniGHG} <span className="text-sm font-normal text-slate-500">{data.sostenibilita.unitaGHG}</span></div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Tassonomia UE</div>
                <div className="text-lg font-semibold">{data.sostenibilita.tassonomiaUE}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">LCA disponibile</div>
                <div className="font-medium">{data.sostenibilita.lcaDisponibile}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Altri impatti</div>
                <div className="text-sm text-slate-600">{data.sostenibilita.altriImpatti}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Practices */}
      {data.bestPractices.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Best Practice</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {data.bestPractices.map((bp, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-2">
                  <div className="font-semibold text-slate-950">{bp.progetto}</div>
                  <div className="text-sm text-slate-500">{bp.organizzazione} • {bp.paese} • {bp.anno}</div>
                </div>
                <p className="text-sm text-slate-600 mb-2">{bp.descrizione}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3 text-sm"><strong className="text-slate-700">Perche rilevante:</strong> {bp.perche}</div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm"><strong className="text-slate-700">Risultati:</strong> {bp.risultati}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Policy */}
      {data.policy.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Policy e regolamentazione</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.policy.map((p, i) => (
              <div key={i} className="flex items-start justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">{p.titolo}</div>
                  <div className="text-xs text-slate-400">{p.giurisdizione} • {p.tipo}</div>
                  <p className="mt-1 text-sm text-slate-600">{p.impatto}</p>
                </div>
                <Badge variant="outline" className="rounded-full text-xs">{p.stato}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Barriere & Opportunita */}
      {data.barriere.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader><CardTitle className="text-sm font-semibold">Barriere</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {data.barriere.filter(b => b.tipo === "Barriera").map((b, i) => (
                <div key={i} className="rounded-2xl border border-red-100 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-medium text-slate-950">{b.titolo}</div>
                    <Badge className="rounded-full bg-red-100 text-red-700 text-xs">{b.severita}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{b.descrizione}</p>
                  <div className="text-xs text-slate-500"><strong>Mitigazione:</strong> {b.mitigazione}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader><CardTitle className="text-sm font-semibold">Opportunita</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {data.barriere.filter(b => b.tipo === "Opportunita").map((b, i) => (
                <div key={i} className="rounded-2xl border border-emerald-100 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-medium text-slate-950">{b.titolo}</div>
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 text-xs">{b.severita}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{b.descrizione}</p>
                  <div className="text-xs text-slate-500"><strong>Azione:</strong> {b.mitigazione}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Attori */}
      {data.attori.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Attori chiave</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.attori.map((a, i) => (
              <div key={i} className="flex items-start justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">{a.nome}</div>
                  <div className="text-xs text-slate-400">{a.tipo} • {a.paese}</div>
                  <p className="mt-1 text-sm text-slate-600">{a.ruolo}</p>
                </div>
                <Badge variant="outline" className="rounded-full text-xs">{a.rilevanza}</Badge>
              </div>
            ))}
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
    </div>
  );
}
