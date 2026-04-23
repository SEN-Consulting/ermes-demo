import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { publicArticles } from "../../data/mockData";

type PublicBlogDetailProps = {
  articleSlug: string | null;
  onBack: () => void;
};

export function PublicBlogDetail({ articleSlug, onBack }: PublicBlogDetailProps) {
  const article = publicArticles.find((item) => item.slug === articleSlug);

  if (!article) {
    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Blog pubblico"
          title="Articolo non trovato"
          text="L'articolo richiesto non e disponibile. Torna all'elenco per selezionare un contenuto valido."
          action={<Button variant="outline" className="rounded-2xl" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Torna al blog</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Dettaglio articolo"
        title={article.title}
        text={article.excerpt}
        action={<Button variant="outline" className="rounded-2xl" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Torna al blog</Button>}
      />

      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{article.type}</Badge>
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
