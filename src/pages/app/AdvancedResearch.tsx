import { Filter, Sparkles } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import { evidenceRows } from "../../data/mockData";
import { ResultsMode } from "../../types/app";

export function AdvancedResearch() {
  const [mode, setMode] = useState<ResultsMode>("fonti");
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Ricerca avanzata"
        title="La maschera chiave per l'analista che deve arricchire la piattaforma."
        text="Questa vista serve a lanciare ricerche, filtrare gli esiti, classificare le evidenze e trasformarle in contenuti o aggiornamenti di scheda."
        action={<Button className="rounded-2xl"><Sparkles className="mr-2 h-4 w-4" /> Ricerca assistita</Button>}
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <Select defaultValue="all-tech">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Tecnologia" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-tech">Tutte le tecnologie</SelectItem>
              <SelectItem value="pv">Fotovoltaico</SelectItem>
              <SelectItem value="wind">Eolico</SelectItem>
              <SelectItem value="h2">Idrogeno verde</SelectItem>
              <SelectItem value="nuclear">Nucleare avanzato</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="6m">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Periodo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Ultimo mese</SelectItem>
              <SelectItem value="6m">Ultimi 6 mesi</SelectItem>
              <SelectItem value="12m">Ultimi 12 mesi</SelectItem>
              <SelectItem value="36m">Ultimi 36 mesi</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="classified">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Fonti" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="classified">Fonti classificate</SelectItem>
              <SelectItem value="specific">Fonte specifica</SelectItem>
              <SelectItem value="hybrid">Ricerca ibrida</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="pvs-all">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Focus PVS" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pvs-all">Tutti i mercati</SelectItem>
              <SelectItem value="pvs-only">Solo PVS</SelectItem>
              <SelectItem value="developed">Solo Paesi sviluppati</SelectItem>
            </SelectContent>
          </Select>
          <Input className="rounded-2xl md:col-span-2 xl:col-span-4" defaultValue="novita tecnologiche, costi, policy, applicabilita nei Paesi in via di sviluppo" />
          <div className="flex flex-col gap-3 md:col-span-2 xl:col-span-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl">Lancia ricerca</Button>
              <Button variant="outline" className="rounded-2xl"><Filter className="mr-2 h-4 w-4" /> Query predefinite</Button>
            </div>
            <div className="text-sm text-slate-500">Maschera pensata per restare pulita anche in responsive.</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Risultati trovati</CardTitle>
                <CardDescription>Vista selezionabile per l'analista.</CardDescription>
              </div>
              <Tabs value={mode} onValueChange={(v) => setMode(v as ResultsMode)}>
                <TabsList className="rounded-2xl">
                  <TabsTrigger value="fonti">Per fonte</TabsTrigger>
                  <TabsTrigger value="contenuti">Per contenuto</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {evidenceRows.map((row) => (
              <div key={row.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{row.technology}</Badge>
                  <Badge variant="outline" className="rounded-full">{row.tag}</Badge>
                  <span>{row.source}</span>
                </div>
                <div className="mt-2 font-medium text-slate-950">{row.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-xl">Importa</Button>
                  <Button size="sm" variant="outline" className="rounded-xl">Aggiungi a scheda</Button>
                  <Button size="sm" variant="outline" className="rounded-xl">Crea articolo</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Classificazione rapida</CardTitle>
            <CardDescription>Il mockup fa vedere come un analista puo trasformare una ricerca in contenuto strutturato.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="policy">
              <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="policy">Categoria: policy</SelectItem>
                <SelectItem value="market">Categoria: mercato</SelectItem>
                <SelectItem value="cost">Categoria: costi e competitivita</SelectItem>
                <SelectItem value="watch">Categoria: technology watch</SelectItem>
              </SelectContent>
            </Select>
            <Textarea className="min-h-[160px] rounded-2xl" defaultValue="Sintesi umana dell'evidenza, pronta per essere salvata come aggiornamento, alimentare una scheda tecnologia o diventare la base di un articolo pubblico." />
            <div className="grid gap-3 md:grid-cols-2">
              <Button className="rounded-2xl">Salva come evidenza</Button>
              <Button variant="outline" className="rounded-2xl">Invia a workflow editoriale</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
