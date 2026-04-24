import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";
import { componenti } from "../../data/analyticalData";

export function TechnologiesPanel({ onOpenTech360, onOpenComponente }: { onOpenTech360?: (techId: string) => void; onOpenComponente?: (compId: string) => void }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Tecnologie e componenti"
        title="Gestione catalogo tecnologia, componenti, mercati e attributi chiave."
        text="Questa vista mostra che la piattaforma non e solo editoriale ma anche gestionale: l'analista puo curare il portafoglio e mantenerlo coerente."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Registro tecnologie</CardTitle>
            <CardDescription>Elenco amministrabile delle tecnologie monitorate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {techs.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.family} • {t.posizionamento}</div>
                </div>
                <Button variant="outline" className="rounded-xl" onClick={() => onOpenTech360?.(t.id)}>Apri 360°</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Componenti chiave</CardTitle>
            <CardDescription>Vista utile per far capire la profondita tecnica futura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {componenti.slice(0, 8).map((c) => (
              <div key={c.compId} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <span className="font-medium text-slate-900">
                  {onOpenComponente ? (
                    <button className="hover:text-blue-700 hover:underline text-left" onClick={() => onOpenComponente(c.compId)}>{c.nome}</button>
                  ) : c.nome}
                </span> — {c.macrocomponente}
                <div className="text-xs text-slate-400 mt-1">{c.funzione} • {c.stato}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
