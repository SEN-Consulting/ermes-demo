import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { compareRadar, techs } from "../../data/mockData";

const semaforoColor = (s: string) => {
  if (s === "VERDE") return "bg-emerald-100 text-emerald-800";
  if (s === "GIALLO") return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

const semaforoDot = (s: string) => {
  if (s === "VERDE") return "bg-emerald-500";
  if (s === "GIALLO") return "bg-amber-500";
  return "bg-red-500";
};

export function PublicExecutive() {
  const sorted = [...techs].sort((a, b) => a.rank - b.rank);
  const top3 = sorted.slice(0, 3);
  const bottom3 = sorted.slice(-3);
  const avgScore = (sorted.reduce((s, t) => s + t.score, 0) / sorted.length).toFixed(1);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Executive"
        title="Ranking e posizionamento delle tecnologie ERMES"
        text="Visione d'insieme del portafoglio tecnologico con score composito, semafori e raccomandazioni strategiche basate sul modello a 5 pilastri."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-slate-500 mb-1">Score medio portafoglio</div>
            <div className="text-4xl font-bold text-slate-950">{avgScore}</div>
            <div className="text-xs text-slate-400 mt-1">su 100</div>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm border-emerald-200">
          <CardContent className="p-6">
            <div className="text-sm text-slate-500 mb-3">Top 3</div>
            {top3.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-1">
                <span className="font-medium text-slate-950">#{t.rank} {t.name}</span>
                <span className="text-emerald-700 font-semibold">{t.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm border-red-200">
          <CardContent className="p-6">
            <div className="text-sm text-slate-500 mb-3">Bottom 3</div>
            {bottom3.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-1">
                <span className="font-medium text-slate-950">#{t.rank} {t.name}</span>
                <span className="text-red-700 font-semibold">{t.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Confronto rapido</CardTitle>
            <CardDescription>Fotovoltaico, eolico e idrogeno verde a confronto sui 5 pilastri.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[...compareRadar]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar dataKey="pv" stroke="#0f172a" fill="#0f172a" fillOpacity={0.15} />
                <Radar dataKey="wind" stroke="#475569" fill="#475569" fillOpacity={0.12} />
                <Radar dataKey="h2" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.12} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Chi vince su cosa</CardTitle>
            <CardDescription>Sintesi comparativa per decisori.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Competitivita", "Fotovoltaico (95)"],
              ["Maturita industriale", "Fotovoltaico / Eolico (100)"],
              ["Sostenibilita", "Fotovoltaico / Eolico (100)"],
              ["Flessibilita per hard-to-abate", "Idrogeno verde"],
              ["Score composito", "Fotovoltaico (90.1)"],
            ].map(([metric, winner]) => (
              <div key={metric} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                <span className="text-slate-600">{metric}</span>
                <span className="font-medium text-slate-950">{winner}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[28px] shadow-sm">
        <CardHeader>
          <CardTitle>Ranking completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-slate-500">#</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500">Tecnologia</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500">Semaforo</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Maturita</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Readiness</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Competitivita</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Sostenibilita</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Copertura</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500 text-right">Score</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-500">Posizionamento</th>
                  <th className="pb-3 font-semibold text-slate-500">Raccomandazione</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 pr-4 font-semibold text-slate-950">{t.rank}</td>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-slate-950">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.family}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${semaforoDot(t.semaforo)}`} />
                        <Badge className={`rounded-full text-xs ${semaforoColor(t.semaforo)}`}>{t.semaforo}</Badge>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums">{t.maturity}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{t.readiness}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{t.competitiveness}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{t.sustainability}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{t.coverage}</td>
                    <td className="py-3 pr-4 text-right font-bold tabular-nums">{t.score}</td>
                    <td className="py-3 pr-4">
                      <Badge variant="outline" className="rounded-full text-xs">{t.posizionamento}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline" className="rounded-full text-xs">{t.raccomandazione}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[28px] shadow-sm">
        <CardHeader>
          <CardTitle>Legenda modello di scoring</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Maturita", "Maturita tecnologica e completezza dell'analisi (TRL, componenti, descrizione)."],
            ["Readiness", "Prontezza di mercato e condizioni abilitanti (costi, infrastrutture, policy)."],
            ["Competitivita", "Posizionamento rispetto ad alternative e trend di costo."],
            ["Sostenibilita", "LCA, emissioni lifecycle, allineamento tassonomia UE."],
            ["Copertura", "Completezza dei dati nelle 11 aree analitiche di ERMES."],
            ["Score composito", "Media ponderata dei 5 pilastri (0-100). Determina ranking e semaforo."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl bg-slate-50 p-4">
              <div className="font-medium text-slate-950 mb-1">{title}</div>
              <div className="text-sm text-slate-600">{text}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
