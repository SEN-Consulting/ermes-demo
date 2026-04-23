import { SectionHeader } from "../../components/shared/SectionHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function PublicPublications() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Pubblicazioni"
        title="Report, brief, newsletter e articoli sono una parte centrale della proposta di valore."
        text="La sezione pubblica deve far percepire che ERMES non si limita a raccogliere dati, ma li trasforma in prodotti utili e leggibili."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Report", "Approfondimenti strutturati per analisti e stakeholder"],
          ["Policy brief", "Sintesi orientate a decisioni e regolazione"],
          ["Newsletter", "Aggiornamenti periodici da distribuire"],
          ["Schede decisore", "Letture ultra-sintetiche pronte per riunioni"],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
              <Button className="mt-4 w-full rounded-2xl">Apri archivio</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
