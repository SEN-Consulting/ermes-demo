import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";

export function TechnologiesPanel() {
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
                  <div className="text-sm text-slate-500">{t.family} • {t.market}</div>
                </div>
                <Button variant="outline" className="rounded-xl">Apri</Button>
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
            {[
              "Moduli, inverter e BOS - fotovoltaico",
              "Turbine, fondazioni e rete - eolico",
              "Elettrolizzatori, storage e trasporto - idrogeno",
              "Reattore, BOP e supply chain - nucleare avanzato",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
