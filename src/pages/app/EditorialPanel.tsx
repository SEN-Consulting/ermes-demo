import { Sparkles } from "lucide-react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

export function EditorialPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Workflow editoriale"
        title="Dal dato all'articolo, dalla ricerca alla newsletter."
        text="Questa e la parte che rende il mockup vendibile: mostra il percorso completo da evidenza a contenuto pubblico."
      />
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Stati del workflow</CardTitle>
            <CardDescription>Bozza, revisione, validato, pubblicabile, pubblicato.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Bozza", "Evidenza importata dal motore di ricerca"],
              ["In revisione", "Sintesi analista e controllo coerenza"],
              ["Validato", "Contenuto approvato internamente"],
              ["Pubblicabile", "Pronto per blog, brief o newsletter"],
              ["Pubblicato", "Visibile nella sezione pubblica"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-950">{title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{text}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Generatore contenuti</CardTitle>
            <CardDescription>AI solo simulata, ma resa bene per la presentazione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="article">
              <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Articolo blog</SelectItem>
                <SelectItem value="brief">Policy brief</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="decision-maker">Scheda decisore</SelectItem>
              </SelectContent>
            </Select>
            <Textarea className="min-h-[180px] rounded-2xl" defaultValue="Prompt editoriale simulato: trasforma le evidenze validate in un contenuto chiaro, leggibile e coerente con il tone of voice dell'Osservatorio ERMES." />
            <div className="grid gap-3 md:grid-cols-2">
              <Button className="rounded-2xl"><Sparkles className="mr-2 h-4 w-4" /> Genera bozza</Button>
              <Button variant="outline" className="rounded-2xl">Invia al blog pubblico</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
