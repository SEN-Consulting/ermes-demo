import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { evidenceRows } from "../../data/mockData";

export function EvidencePanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Evidenze raccolte"
        title="Archivio operativo delle evidenze emerse dalle ricerche."
        text="Una sezione centrale per collegare il motore di ricerca, il database e la produzione editoriale."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-3 p-6">
          {evidenceRows.map((row) => (
            <div key={row.title} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.2fr_0.9fr_0.8fr_0.7fr_0.8fr] md:items-center">
              <div>
                <div className="font-medium text-slate-950">{row.title}</div>
                <div className="text-sm text-slate-500">{row.source}</div>
              </div>
              <div className="text-sm text-slate-600">{row.technology}</div>
              <div className="text-sm text-slate-600">{row.tag}</div>
              <div className="text-sm text-slate-600">{row.status}</div>
              <div className="flex gap-2">
                <Button size="sm" className="rounded-xl">Valida</Button>
                <Button size="sm" variant="outline" className="rounded-xl">Apri</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
