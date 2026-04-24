import { ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { sourceRows } from "../../data/mockData";

type PublicFontiProps = {
  onOpenSource?: (sourceSlug: string) => void;
};

export function PublicFonti({ onOpenSource }: PublicFontiProps) {
  const sources = sourceRows as unknown as Array<{
    id: string;
    slug: string;
    name: string;
    type: string;
    organizzazione: string;
    affidabilita: string;
    copertura: string;
    accesso: string;
    description: string;
    strategy: string;
    priority: string;
    last: string;
    status: string;
    url: string;
    focus: string[];
  }>;
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("Tutti");

  const types = useMemo(() => {
    const unique = Array.from(new Set(sources.map((s) => s.type)));
    return ["Tutti", ...unique];
  }, [sources]);

  const filtered = useMemo(() => {
    let result = sources;

    if (typeFilter !== "Tutti") {
      result = result.filter((s) => s.type === typeFilter);
    }

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter((s) =>
        [s.name, s.description, s.type, s.focus.join(" ")].join(" ").toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchTerm, typeFilter, sources]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Fonti di monitoraggio"
        title="Le fonti istituzionali, media e specialistiche monitorate da ERMES."
        text="Ogni fonte e configurata con una strategia di monitoraggio (feed, search, o combinata) e una priorita in base al valore informativo per il sistema energetico."
      />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Cerca fonte</label>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl"
              placeholder="Nome, descrizione, topic..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Filtra per tipo</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? "default" : "outline"}
                  size="sm"
                  className="rounded-2xl"
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((source) => (
          <Card key={source.id} className="rounded-[28px] shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-950">{source.name}</h3>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                      {source.type}
                    </Badge>
                    <Badge
                      className={`rounded-full ${
                        source.status === "Attiva"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {source.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{source.description}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-full text-xs">
                      {source.strategy}
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs">
                      Priorita {source.priority}
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs">
                      Aggiornato {source.last}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {source.focus.slice(0, 4).map((topic) => (
                      <Badge key={topic} variant="outline" className="rounded-full text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {source.focus.length > 4 && (
                      <Badge variant="outline" className="rounded-full text-xs">
                        +{source.focus.length - 4} altro
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {onOpenSource && (
                    <Button
                      onClick={() => {
                        onOpenSource(source.slug);
                        window.location.hash = `fonti/${encodeURIComponent(source.slug)}`;
                      }}
                      className="rounded-2xl"
                    >
                      Dettagli
                    </Button>
                  )}
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="rounded-2xl">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
