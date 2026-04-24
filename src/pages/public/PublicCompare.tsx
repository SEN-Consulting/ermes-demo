import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { compareRadar } from "../../data/mockData";

export function PublicCompare() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Confronta"
        title="Uno strumento pensato per convincere un decisore in pochi minuti."
        text="Radar chart, tabella comparativa, semafori e sintesi finale: tutto in una singola vista pulita."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Confronto rapido</CardTitle>
            <CardDescription>Fotovoltaico, eolico e idrogeno verde.</CardDescription>
          </CardHeader>
          <CardContent className="h-[360px]">
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
            <CardDescription>Box sintetico molto utile per una presentazione istituzionale.</CardDescription>
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
    </div>
  );
}
