import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { sourceRows } from "../../data/mockData";

export function SourcesPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Fonti"
        title="Gestione delle fonti informative e delle strategie di ricerca."
        text="Una sezione visiva e ordinata che fa capire subito come la piattaforma governa fonti classificate, priorita e metodi di interrogazione."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-3 p-6">
          {sourceRows.map((row) => (
            <div key={row.name} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.1fr_0.8fr_0.8fr_0.7fr_0.7fr_0.6fr] md:items-center">
              <div>
                <div className="font-medium text-slate-950">{row.name}</div>
                <div className="text-sm text-slate-500">{row.type}</div>
              </div>
              <div className="text-sm text-slate-600">{row.strategy}</div>
              <div className="text-sm text-slate-600">Priorita {row.priority}</div>
              <div className="text-sm text-slate-600">{row.last}</div>
              <div className="text-sm text-slate-600">{row.status}</div>
              <Button variant="outline" className="rounded-xl">Modifica</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
