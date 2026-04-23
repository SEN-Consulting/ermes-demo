import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { blogTopics, publicArticles } from "../../data/mockData";
import { BlogTopic } from "../../types/app";

type PublicBlogProps = {
  onOpenArticle: (articleSlug: string) => void;
};

export function PublicBlog({ onOpenArticle }: PublicBlogProps) {
  const [topic, setTopic] = useState<BlogTopic>("Tutti");
  const filteredArticles = useMemo(() => {
    if (topic === "Tutti") return publicArticles;
    return publicArticles.filter((article) => article.topic === topic);
  }, [topic]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Blog pubblico"
        title="Una sezione editoriale filtrabile per osservatorio, utile sia per il pubblico sia per i decisori."
        text="Gli articoli possono essere generati o assistiti dall'AI, ma pubblicati come contenuti editoriali curati, leggibili e organizzati per topic."
      />

      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-slate-950">Filtra per osservatorio</div>
            <div className="mt-1 text-sm leading-6 text-slate-600">Topic editoriali disponibili per la sezione pubblica del blog.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {blogTopics.map((item) => (
              <Button
                key={item}
                variant={topic === item ? "default" : "outline"}
                className="rounded-2xl"
                onClick={() => setTopic(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{article.type}</Badge>
                <Badge variant="outline" className="rounded-full">{article.audience}</Badge>
                <Badge variant="outline" className="rounded-full">{article.topic}</Badge>
              </div>
              <CardTitle className="text-xl leading-8">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{article.excerpt}</p>
              <Button
                variant="ghost"
                className="mt-4 rounded-2xl px-0 text-slate-950 hover:bg-transparent"
                onClick={() => onOpenArticle(article.slug)}
              >
                Leggi l'articolo <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
