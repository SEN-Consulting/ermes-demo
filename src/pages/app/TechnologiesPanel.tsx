import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { componenti } from "../../data/analyticalData";
import { techs } from "../../data/mockData";

const statoBg = (stato: string) => {
  if (stato.includes("diffusa")) return "bg-emerald-100 text-emerald-700";
  if (stato.includes("iniziale")) return "bg-blue-100 text-blue-700";
  if (stato.includes("Pilota") || stato.includes("dimostratore")) return "bg-amber-100 text-amber-700";
  if (stato.includes("pre-commerciale") || stato.includes("FOAK") || stato.includes("Pre-commerciale")) return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export function TechnologiesPanel({ onOpenTech360, onOpenComponente }: { onOpenTech360?: (techId: string) => void; onOpenComponente?: (compId: string) => void }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Gestione Componenti"
        title="Catalogo componenti chiave delle tecnologie energetiche monitorate."
        text="Naviga i componenti per tecnologia, macrocomponente e stato di maturita. Clicca sul nome per il dettaglio completo."
      />

      <div className="space-y-4">
        {componenti.map((c) => {
          const tech = techs.find((t) => t.id === c.techId);
          return (
            <Card key={c.compId} className="rounded-[28px] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {onOpenComponente ? (
                          <button className="hover:text-blue-700 hover:underline text-left" onClick={() => onOpenComponente(c.compId)}>{c.nome}</button>
                        ) : c.nome}
                      </h3>
                      <Badge className={`rounded-full ${statoBg(c.stato)}`}>{c.stato}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{c.descrizione}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="rounded-full text-xs">{c.macrocomponente}</Badge>
                      {tech && (
                        <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100 text-xs">
                          {onOpenTech360 ? (
                            <button className="hover:text-blue-700 hover:underline" onClick={() => onOpenTech360(tech.id)}>{tech.name}</button>
                          ) : tech.name}
                        </Badge>
                      )}
                      <Badge variant="outline" className="rounded-full text-xs">{c.funzione}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
