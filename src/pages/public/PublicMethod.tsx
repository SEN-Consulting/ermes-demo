import { SectionHeader } from "../../components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function PublicMethod() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Metodologia"
        title="Una sezione fondamentale per rendere la piattaforma credibile agli occhi di partner e clienti."
        text="Qui si spiegano technology watch, horizon scanning, P-TEA, fonti, criteri di classificazione, semafori, ranking e limiti d'uso."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Come funziona ERMES", "Spiegazione semplice del motore dati e degli output."],
          ["Fonti informative", "Mappa delle fonti classificate e logiche di monitoraggio."],
          ["Criteri di classificazione", "Come sono lette maturita, competitivita, sostenibilita e mercati."],
          ["Aggiornamento dei dati", "Flusso di ricerca, selezione, validazione e pubblicazione."],
          ["Semafori e ranking", "Criteri di scoring e logiche di comparazione."],
          ["Limiti e avvertenze", "Cosa e benchmark, cosa e evidenza, cosa e interpretazione."],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
