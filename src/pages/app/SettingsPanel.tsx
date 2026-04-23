import { SectionHeader } from "../../components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function SettingsPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Configurazione"
        title="Una vista semplice per query, tassonomie e parametri di piattaforma."
        text="Non serve implementare tutta la logica: basta una UX pulita che mostri come la piattaforma sara amministrabile nel progetto cloud finale."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Query predeterminate", "Gestione delle query base per technology watch, policy, costi, mercati e focus PVS."],
          ["Tassonomie", "Categorie tecnologie, componenti, mercati, tag editoriali e tipologie di output."],
          ["Semafori e ranking", "Regole di scoring e visualizzazione."],
          ["Canali editoriali", "Blog, newsletter, policy brief, archivio documentale."],
          ["Parametri ricerca", "Strategie feed/search, priorita fonti, intervalli temporali."],
          ["Branding", "Logo, palette, tone of voice e stile grafico della piattaforma."],
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
