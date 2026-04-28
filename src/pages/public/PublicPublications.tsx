import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  publicArticles,
  publicReports,
  publicationTypes,
  type PublicationType,
} from "../../data/mockData";

type PublicPublicationsProps = {
  onOpenPublication: (slug: string) => void;
};

const allPublications = [...publicArticles, ...publicReports].sort(
  (a, b) => new Date(b.date.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$2 $1, $3")).getTime() - new Date(a.date.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$2 $1, $3")).getTime()
);

const typeBadgeColor = (type: string) => {
  switch (type) {
    case "Report":
      return "bg-blue-100 text-blue-800";
    case "Policy brief":
      return "bg-violet-100 text-violet-800";
    case "Blog article":
      return "bg-emerald-100 text-emerald-800";
    case "Focus tematico":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export function PublicPublications({ onOpenPublication }: PublicPublicationsProps) {
  const [typeFilter, setTypeFilter] = useState<PublicationType>("Tutti");

  const filtered = useMemo(() => {
    if (typeFilter === "Tutti") return allPublications;
    return allPublications.filter((p) => p.type === typeFilter);
  }, [typeFilter]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of allPublications) {
      map[p.type] = (map[p.type] || 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Pubblicazioni"
        title="Report, policy brief e articoli dall'osservatorio ERMES"
        text="Una sezione che raccoglie le pubblicazioni curate dall'osservatorio: approfondimenti strutturati, brief di policy e articoli di analisi sulle tecnologie energetiche."
      />

      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-slate-950">
              Filtra per tipologia
            </div>
            <div className="mt-1 text-sm leading-6 text-slate-600">
              {filtered.length} pubblicazion{filtered.length === 1 ? "e" : "i"}{" "}
              {typeFilter !== "Tutti" && (
                <span>
                  di tipo <strong>{typeFilter}</strong>
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {publicationTypes
              .filter((t) => t === "Tutti" || counts[t])
              .map((item) => (
                <Button
                  key={item}
                  variant={typeFilter === item ? "default" : "outline"}
                  className="rounded-2xl"
                  onClick={() => setTypeFilter(item)}
                >
                  {item}
                  {item !== "Tutti" && counts[item] && (
                    <Badge
                      variant="outline"
                      className="ml-1.5 rounded-full text-[10px] px-1.5 py-0"
                    >
                      {counts[item]}
                    </Badge>
                  )}
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {filtered.map((pub) => (
          <Card key={pub.id} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`rounded-full ${typeBadgeColor(pub.type)} hover:opacity-90`}
                >
                  {pub.type}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {pub.audience}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {pub.topic}
                </Badge>
              </div>
              <CardTitle className="text-xl leading-8">{pub.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{pub.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {pub.date} · {pub.readTime}
                </span>
                <Button
                  variant="ghost"
                  className="rounded-2xl px-0 text-slate-950 hover:bg-transparent"
                  onClick={() => onOpenPublication(pub.slug)}
                >
                  Leggi <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="py-12 text-center text-sm text-slate-500">
            Nessuna pubblicazione di tipo{" "}
            <strong>{typeFilter}</strong> disponibile.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
