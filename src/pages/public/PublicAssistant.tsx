import { Bot } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ChatMode } from "../../types/app";

export function PublicAssistant() {
  const [mode, setMode] = useState<ChatMode>("semplice");
  const [prompt, setPrompt] = useState("Quali tecnologie sono piu adatte ai Paesi in via di sviluppo?");

  const answer = useMemo(() => {
    if (!prompt) return "";
    if (prompt.toLowerCase().includes("paesi in via di sviluppo")) {
      return mode === "semplice"
        ? "Nel mockup ERMES, fotovoltaico e mini-grid ibride emergono come opzioni molto interessanti per i Paesi in via di sviluppo, soprattutto dove contano modularita, costi e rapidita di deployment."
        : "Lettura analitica simulata: fotovoltaico, mini-grid ibride e alcune filiere biomassa sostenibile mostrano il miglior fit nei PVS. I driver sono modularita, minore dipendenza da grandi infrastrutture, possibilita di deployment distribuito e migliore adattabilita a contesti con rete fragile. L'idrogeno verde appare rilevante solo in casi selettivi, con risorse rinnovabili abbondanti, domanda industriale e capacita di export.";
    }
    return mode === "semplice"
      ? "ERMES sintetizza i contenuti in modo leggibile e orienta l'utente verso schede, aggiornamenti e pubblicazioni."
      : "ERMES puo spiegare, confrontare, sintetizzare aggiornamenti recenti e suggerire fonti o pubblicazioni collegate. In questo mockup la risposta e simulata, ma l'interfaccia e gia pensata per una futura AI reale.";
  }, [prompt, mode]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Chatbot ERMES"
        title="AI simulata, ma resa in modo credibile per la presentazione."
        text="Nessun backend complesso: solo una UX pulita che fa percepire come potra funzionare l'assistente nella piattaforma definitiva."
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Prompt guidati</CardTitle>
            <CardDescription>Perfetti per mostrare subito il valore della piattaforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Spiegami il nucleare di IV generazione",
              "Confronta eolico e geotermico",
              "Quali novita negli ultimi 6 mesi sull'idrogeno verde?",
              "Quali tecnologie sono piu adatte ai Paesi in via di sviluppo?",
              "Fammi una sintesi per decisori",
            ].map((item) => (
              <button key={item} onClick={() => setPrompt(item)} className="w-full rounded-2xl border border-slate-200 p-4 text-left text-sm leading-6 hover:bg-slate-50">
                {item}
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Assistente simulato</CardTitle>
                <CardDescription>Modalita semplice e modalita analitica.</CardDescription>
              </div>
              <Tabs value={mode} onValueChange={(v) => setMode(v as ChatMode)}>
                <TabsList className="rounded-2xl">
                  <TabsTrigger value="semplice">Semplice</TabsTrigger>
                  <TabsTrigger value="analitica">Analitica</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="rounded-2xl" />
            <div className="rounded-3xl border border-dashed border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-950"><Bot className="h-4 w-4" /> Risposta ERMES</div>
              <p className="text-sm leading-7 text-slate-600">{answer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">AI simulata</Badge>
                <Badge variant="outline" className="rounded-full">UX pronta per presentazione</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
