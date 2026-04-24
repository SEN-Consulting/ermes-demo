import { ChevronLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { componenti, trlRecords } from "../../data/analyticalData";
import { techs } from "../../data/mockData";

type PublicComponenteDetailProps = {
  compId?: string | null;
  onBack?: () => void;
};

const statoBg = (stato: string) => {
  if (stato.includes("diffusa")) return "bg-emerald-100 text-emerald-700";
  if (stato.includes("iniziale")) return "bg-blue-100 text-blue-700";
  if (stato.includes("Pilota") || stato.includes("dimostratore")) return "bg-amber-100 text-amber-700";
  if (stato.includes("pre-commerciale") || stato.includes("FOAK") || stato.includes("Pre-commerciale")) return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export function PublicComponenteDetail({ compId, onBack }: PublicComponenteDetailProps) {
  const comp = useMemo(() => {
    if (!compId) return null;
    return componenti.find((c) => c.compId === compId);
  }, [compId]);

  const tech = useMemo(() => {
    if (!comp) return null;
    return techs.find((t) => t.id === comp.techId);
  }, [comp]);

  const trl = useMemo(() => {
    if (!comp) return null;
    return trlRecords.find((r) => r.compId === comp.compId) || null;
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

      {/* Main info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Informazioni componente</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase">Tecnologia di riferimento</div>
              <div className="mt-1 text-slate-900">
                {tech ? (
                  <a href={`#tech/${tech.slug}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline">
                    {comp.tecnologia} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : comp.tecnologia}
              </div>
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
              <div className="text-xs font-medium text-slate-500 uppercase">Stato</div>
              <Badge className={`mt-1 rounded-full ${statoBg(comp.stato)}`}>{comp.stato}</Badge>
            </div>
            {comp.ultimoAggiornamento && (
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Ultimo aggiornamento</div>
                <div className="mt-1 text-slate-900">{comp.ultimoAggiornamento}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Dettaglio tecnico</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Funzione nel sistema</div>
              <div className="font-medium text-slate-900">{comp.funzione}</div>
            </div>
            {trl && (
              <>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">TRL</div>
                  <div className="text-3xl font-bold">{trl.trl} <span className="text-sm font-normal text-slate-500">/ 9</span></div>
                  <div className="mt-1 text-sm text-slate-600">{trl.contesto}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Evidenza</div>
                  <div className="text-sm text-slate-700">{trl.evidenza}</div>
                </div>
              </>
            )}
            {comp.note && (
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Note</div>
                <div className="text-sm text-slate-600">{comp.note}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sibling components */}
      {siblingComponents.length > 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader><CardTitle className="text-sm font-semibold">Altri componenti di {comp.tecnologia}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {siblingComponents.slice(0, 5).map((s) => (
              <div key={s.compId} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">
                    <a href={`#componenti/${encodeURIComponent(s.compId)}`} className="hover:text-blue-700 hover:underline">{s.nome}</a>
                  </div>
                  <div className="text-sm text-slate-500">{s.macrocomponente}</div>
                </div>
                <Badge className={`rounded-full ${statoBg(s.stato)}`}>{s.stato}</Badge>
              </div>
            ))}
            {siblingComponents.length > 5 && (
              <p className="text-sm text-slate-400 text-center">e altri {siblingComponents.length - 5} componenti...</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-slate-500">
          Per l'analisi completa — costi, prestazioni, benchmark e confronti —
          accedi alla <strong>Webapp utente</strong>.
        </p>
      </div>
    </div>
  );
}
