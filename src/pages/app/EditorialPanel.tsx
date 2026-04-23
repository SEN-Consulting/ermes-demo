import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { publicArticles } from "../../data/mockData";

type BlogEditorMode = "list" | "create" | "edit";

type ManagedArticle = {
  id: string;
  slug: string;
  title: string;
  type: string;
  audience: string;
  topic: string;
  excerpt: string;
  date: string;
  readTime: string;
  keyPoints: string[];
  content: string[];
};

type ArticleForm = {
  title: string;
  slug: string;
  type: string;
  audience: string;
  topic: string;
  excerpt: string;
  date: string;
  readTime: string;
  keyPointsText: string;
  contentText: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formFromArticle(article: ManagedArticle): ArticleForm {
  return {
    title: article.title,
    slug: article.slug,
    type: article.type,
    audience: article.audience,
    topic: article.topic,
    excerpt: article.excerpt,
    date: article.date,
    readTime: article.readTime,
    keyPointsText: article.keyPoints.join("\n"),
    contentText: article.content.join("\n\n"),
  };
}

function emptyForm(): ArticleForm {
  return {
    title: "",
    slug: "",
    type: "Articolo",
    audience: "Pubblico informato",
    topic: "Osservatorio delle tecnologie",
    excerpt: "",
    date: "23 Apr 2026",
    readTime: "6 min",
    keyPointsText: "",
    contentText: "",
  };
}

export function EditorialPanel() {
  const [mode, setMode] = useState<BlogEditorMode>("list");
  const [articles, setArticles] = useState<ManagedArticle[]>(() =>
    publicArticles.map((article) => ({
      ...article,
      keyPoints: [...article.keyPoints],
      content: [...article.content],
    }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm());
  const [aiPrompt, setAiPrompt] = useState("Scrivi una bozza chiara e orientata ai decisori su trend tecnologici, policy e implicazioni operative.");

  const totalPublished = useMemo(() => articles.length, [articles]);

  const startCreate = () => {
    setMode("create");
    setSelectedId(null);
    setForm(emptyForm());
  };

  const startEdit = (article: ManagedArticle) => {
    setMode("edit");
    setSelectedId(article.id);
    setForm(formFromArticle(article));
  };

  const saveForm = () => {
    const slug = form.slug.trim() || slugify(form.title);
    const keyPoints = form.keyPointsText.split("\n").map((line) => line.trim()).filter(Boolean);
    const content = form.contentText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

    if (!form.title.trim() || !slug || !form.excerpt.trim() || keyPoints.length === 0 || content.length === 0) {
      return;
    }

    if (mode === "create") {
      const newArticle: ManagedArticle = {
        id: `local-${Date.now()}`,
        slug,
        title: form.title.trim(),
        type: form.type.trim(),
        audience: form.audience.trim(),
        topic: form.topic.trim(),
        excerpt: form.excerpt.trim(),
        date: form.date.trim(),
        readTime: form.readTime.trim(),
        keyPoints,
        content,
      };
      setArticles((prev) => [newArticle, ...prev]);
    } else if (mode === "edit" && selectedId) {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === selectedId
            ? {
                ...article,
                slug,
                title: form.title.trim(),
                type: form.type.trim(),
                audience: form.audience.trim(),
                topic: form.topic.trim(),
                excerpt: form.excerpt.trim(),
                date: form.date.trim(),
                readTime: form.readTime.trim(),
                keyPoints,
                content,
              }
            : article
        )
      );
    }

    setMode("list");
    setSelectedId(null);
    setForm(emptyForm());
  };

  const generateWithAi = () => {
    const title = form.title.trim() || "Bozza articolo su transizione energetica";
    const topic = form.topic.trim() || "Osservatorio delle tecnologie";

    setForm((prev) => ({
      ...prev,
      excerpt: `Contenuto generato in anteprima: una sintesi su ${title.toLowerCase()} con focus ${topic.toLowerCase()} e implicazioni per decisori e stakeholder.`,
      keyPointsText: [
        "Segnali di mercato e policy da monitorare nel breve periodo.",
        "Impatto su competitivita, tempi di deployment e rischio operativo.",
        "Indicazioni pratiche per priorita di investimento e governance.",
      ].join("\n"),
      contentText: [
        `Bozza AI: ${aiPrompt}`,
        "La lettura proposta evidenzia i driver principali che stanno accelerando l'adozione delle tecnologie e i vincoli che ne limitano la scalabilita in contesti differenti.",
        "Dal punto di vista operativo, la combinazione tra stabilita regolatoria, capacita industriale e accesso al capitale resta il fattore che distingue i progetti replicabili da quelli episodici.",
      ].join("\n\n"),
      slug: prev.slug || slugify(title),
    }));
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Blog"
        title="Gestione articoli pubblicati e creazione di nuovi contenuti"
        text="In questa sezione puoi vedere gli articoli pubblicati, aprire la maschera di modifica e creare nuovi articoli con supporto AI nella fase di creazione."
      />

      {mode === "list" ? (
        <div className="space-y-6">
          <Card className="rounded-[28px] shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Articoli pubblicati</p>
                <p className="text-3xl font-semibold tracking-tight text-slate-950">{totalPublished}</p>
              </div>
              <Button className="rounded-2xl" onClick={startCreate}>Crea nuovo articolo</Button>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle>Lista articoli pubblicati</CardTitle>
              <CardDescription>Ogni articolo puo essere aperto in modifica per aggiornare titolo, slug, estratto e contenuto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {articles.map((article) => (
                <div key={article.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{article.type}</Badge>
                    <Badge variant="outline" className="rounded-full">{article.topic}</Badge>
                    <span>{article.date}</span>
                    <span>�</span>
                    <span>{article.readTime}</span>
                    <span>�</span>
                    <span>/{article.slug}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{article.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{article.excerpt}</p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" className="rounded-xl" onClick={() => startEdit(article)}>Modifica articolo</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>{mode === "create" ? "Nuovo articolo" : "Modifica articolo"}</CardTitle>
            <CardDescription>
              {mode === "create"
                ? "Compila i campi del nuovo articolo. La generazione AI e disponibile solo in creazione."
                : "Aggiorna i campi dell'articolo selezionato e salva le modifiche."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                className="rounded-2xl"
                placeholder="Titolo"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value, slug: prev.slug || slugify(e.target.value) }))}
              />
              <Input
                className="rounded-2xl"
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
              />
              <Input className="rounded-2xl" placeholder="Tipo" value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} />
              <Input className="rounded-2xl" placeholder="Audience" value={form.audience} onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))} />
              <Input className="rounded-2xl" placeholder="Topic" value={form.topic} onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <Input className="rounded-2xl" placeholder="Data" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
                <Input className="rounded-2xl" placeholder="Read time" value={form.readTime} onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))} />
              </div>
            </div>

            <Textarea
              className="min-h-[100px] rounded-2xl"
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Textarea
                className="min-h-[150px] rounded-2xl"
                placeholder="Punti chiave (uno per riga)"
                value={form.keyPointsText}
                onChange={(e) => setForm((prev) => ({ ...prev, keyPointsText: e.target.value }))}
              />
              <Textarea
                className="min-h-[150px] rounded-2xl"
                placeholder="Contenuto articolo (paragrafi separati da riga vuota)"
                value={form.contentText}
                onChange={(e) => setForm((prev) => ({ ...prev, contentText: e.target.value }))}
              />
            </div>

            {mode === "create" && (
              <Card className="rounded-2xl border border-slate-200 bg-slate-50/70">
                <CardHeader>
                  <CardTitle className="text-base">Generazione articolo con AI</CardTitle>
                  <CardDescription>Definisci un prompt e genera una bozza iniziale direttamente nella maschera di creazione.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    className="min-h-[100px] rounded-2xl"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button className="rounded-2xl" onClick={generateWithAi}><Sparkles className="mr-2 h-4 w-4" /> Genera bozza con AI</Button>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl" onClick={saveForm}>Salva articolo</Button>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => {
                  setMode("list");
                  setSelectedId(null);
                  setForm(emptyForm());
                }}
              >
                Annulla
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
