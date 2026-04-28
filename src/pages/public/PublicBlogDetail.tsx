import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { publicArticles, publicReports } from "../../data/mockData";

const allPublications = [...publicArticles, ...publicReports];

const typeBadgeColor = (type: string) => {
  switch (type) {
    case "Report": return "bg-blue-100 text-blue-800";
    case "Policy brief": return "bg-violet-100 text-violet-800";
    case "Blog article": return "bg-emerald-100 text-emerald-800";
    case "Focus tematico": return "bg-amber-100 text-amber-800";
    default: return "bg-slate-100 text-slate-700";
  }
};

type PublicBlogDetailProps = {
  articleSlug: string | null;
  onBack: () => void;
};

export function PublicBlogDetail({ articleSlug, onBack }: PublicBlogDetailProps) {
  const article = allPublications.find((item) => item.slug === articleSlug);

  if (!article) {
    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Pubblicazioni"
          title="Pubblicazione non trovata"
          text="Il contenuto richiesto non e disponibile. Torna all'elenco per selezionare una pubblicazione valida."
          action={<Button variant="outline" className="rounded-2xl" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Torna alle pubblicazioni</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Dettaglio pubblicazione"
        title={article.title}
        text={article.excerpt}
        action={<Button variant="outline" className="rounded-2xl" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Torna alle pubblicazioni</Button>}
      />

      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Badge className={`rounded-full ${typeBadgeColor(article.type)} hover:opacity-90`}>{article.type}</Badge>
            <Badge variant="outline" className="rounded-full">{article.audience}</Badge>
            <Badge variant="outline" className="rounded-full">{article.topic}</Badge>
            <span className="ml-2">{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-950">Punti chiave</h3>
            <ul className="space-y-2 text-sm leading-7 text-slate-600">
              {article.keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-6">
            {article.content.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-8 text-slate-700 md:text-base">{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
