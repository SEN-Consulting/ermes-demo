import { SectionHeader } from "../../components/shared/SectionHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";

export function PublicMarkets() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Mercati di riferimento"
        title="La sezione che rende ERMES piu utile di una semplice banca dati."
        text="Per ogni tecnologia, il portale distingue tra Paesi sviluppati, PVS e contesti misti, con attenzione a capitale, rete, competenze e prerequisiti locali."
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Vista per tecnologia</CardTitle>
            <CardDescription>Aiuta a capire subito la differenza fra tecnologie buone in generale e tecnologie adatte al contesto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {techs.slice(0, 5).map((t) => (
              <div key={t.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_0.9fr_0.8fr_1.2fr] md:items-center">
                <div>
                  <div className="font-medium text-slate-950">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.family}</div>
                </div>
                <div className="text-sm"><span className="font-medium text-slate-950">Mercato:</span> {t.market}</div>
                <div className="text-sm"><span className="font-medium text-slate-950">PVS:</span> {t.pvs}</div>
                <div className="text-sm leading-6 text-slate-600">Prerequisiti, intensita di capitale e capacita tecnica locale disponibili in scheda dettaglio.</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Use case rapidi</CardTitle>
            <CardDescription>Blocchi pronti da mostrare in riunione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Tecnologie piu adatte a contesti con rete fragile",
              "Tecnologie con miglior fit per accesso all'energia",
              "Tecnologie utili in paesi ricchi di rinnovabili ma con limitata capacita industriale",
            ].map((text) => (
              <div key={text} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{text}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
