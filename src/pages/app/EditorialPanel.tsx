import { BookOpen, Check, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { publicArticles } from "../../data/mockData";
import { getEvidenze, removeEvidenza, type Evidenza } from "../../lib/evidenzeStore";

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

  /* evidenze */
  const [evidenze, setEvidenze] = useState<Evidenza[]>([]);
  const [selectedEvIds, setSelectedEvIds] = useState<Set<string>>(new Set());
  const [showEvidenze, setShowEvidenze] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { setEvidenze(getEvidenze()); }, [mode]);

  const toggleEv = (id: string) => setSelectedEvIds((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const deleteEv = (id: string) => { setEvidenze(removeEvidenza(id)); setSelectedEvIds((p) => { const n = new Set(p); n.delete(id); return n; }); };

  const totalPublished = useMemo(() => articles.length, [articles]);
  const evCount = evidenze.length;

  const startCreateFromEvidenze = () => {
    setMode("create");
    setSelectedId(null);
    setForm(emptyForm());
    setShowEvidenze(false);
    // pre-select all evidenze
    setSelectedEvIds(new Set(evidenze.map((e) => e.id)));
  };

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

  const generateWithAi = async () => {
    setGenerating(true);
    // Simulate AI processing time (1.5-3s)
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1500));
    const selected = evidenze.filter((e) => selectedEvIds.has(e.id));
    const title = form.title.trim() || "Bozza articolo su transizione energetica";
    const topic = form.topic.trim() || "Osservatorio delle tecnologie";

    if (selected.length > 0) {
      const techSet = [...new Set(selected.map((e) => e.technology).filter(Boolean))];
      const srcSet = [...new Set(selected.map((e) => e.sourceName).filter(Boolean))];

      const keyPoints = [
        `Analisi basata su ${selected.length} evidenze da ${srcSet.length} fonti classificate.`,
        ...(techSet.length > 0 ? [`Tecnologie coperte: ${techSet.join(", ")}.`] : []),
        ...selected.filter((e) => e.priority === "Alta").slice(0, 3).map((e) => `Segnale chiave: ${e.title.slice(0, 100)}.`),
        "Indicazioni operative per decisori e stakeholder.",
      ];

      const contentParagraphs = [
        `${aiPrompt}\n\nL'osservatorio ERMES ha identificato ${selected.length} evidenze rilevanti${techSet.length > 0 ? ` nel campo di ${techSet.slice(0, 3).join(", ")}` : ""}, raccolte da fonti istituzionali e di settore.`,
      ];
      for (const ev of selected.slice(0, 6)) {
        let para = `**${ev.title}**`;
        if (ev.sourceName) para += ` *(${ev.sourceName}${ev.published ? `, ${ev.published}` : ""})*`;
        para += "\n\n";
        if (ev.snippet) {
          const snip = ev.snippet.length > 300 ? ev.snippet.slice(0, 297) + "…" : ev.snippet;
          para += snip;
        }
        contentParagraphs.push(para);
      }
      contentParagraphs.push(
        "Dal punto di vista operativo, i segnali raccolti confermano la necessita di monitorare l'evoluzione regolatoria e di valutare i tempi di deployment delle soluzioni tecnologiche piu promettenti.",
        "*Articolo generato dall'osservatorio ERMES a partire dalle evidenze selezionate. Richiede revisione editoriale prima della pubblicazione.*"
      );

      setForm((prev) => ({
        ...prev,
        excerpt: `Sintesi basata su ${selected.length} evidenze da ${srcSet.length} fonti classificate: ${techSet.slice(0, 3).join(", ")}${techSet.length > 3 ? " e altre" : ""}.`,
        keyPointsText: keyPoints.join("\n"),
        contentText: contentParagraphs.join("\n\n"),
        slug: prev.slug || slugify(title),
      }));
    } else {
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
    }
    setGenerating(false);
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
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl" onClick={startCreate}>Crea nuovo articolo</Button>
                {evCount > 0 && (
                  <Button variant="outline" className="rounded-2xl" onClick={startCreateFromEvidenze}>
                    <Sparkles className="mr-2 h-4 w-4" /> Crea da evidenze
                    <Badge className="ml-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px]">{evCount}</Badge>
                  </Button>
                )}
              </div>
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
          <CardContent className="max-h-[calc(100vh-220px)] overflow-y-auto space-y-3">
            <div className="grid gap-2 md:grid-cols-2">
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
              <div className="grid grid-cols-2 gap-2">
                <Input className="rounded-2xl" placeholder="Data" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
                <Input className="rounded-2xl" placeholder="Read time" value={form.readTime} onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))} />
              </div>
            </div>

            <Input
              className="rounded-2xl text-sm"
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            />

            <div className="grid gap-3 md:grid-cols-2">
              <Textarea
                className="min-h-[60px] rounded-2xl text-sm"
                placeholder="Punti chiave (uno per riga)"
                value={form.keyPointsText}
                onChange={(e) => setForm((prev) => ({ ...prev, keyPointsText: e.target.value }))}
              />
              <Textarea
                className="min-h-[60px] rounded-2xl text-sm"
                placeholder="Contenuto articolo (paragrafi separati da riga vuota)"
                value={form.contentText}
                onChange={(e) => setForm((prev) => ({ ...prev, contentText: e.target.value }))}
              />
            </div>

            {mode === "create" && (
              <Card className="rounded-2xl border border-slate-200 bg-slate-50/70">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm">Generazione articolo con AI</CardTitle>
                  <CardDescription className="text-xs">Seleziona le evidenze e genera un articolo basato sul loro contenuto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pb-4">
                  {/* Evidence selector */}
                  {evidenze.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <button onClick={() => setShowEvidenze(!showEvidenze)} className="text-sm font-medium text-slate-700 hover:text-slate-900">
                          {showEvidenze ? "▾" : "▸"} Evidenze disponibili ({evidenze.length})
                          {selectedEvIds.size > 0 && <Badge className="ml-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px]">{selectedEvIds.size} selezionate</Badge>}
                        </button>
                        {evidenze.length > 0 && (
                          <button onClick={() => { const allIds = new Set(evidenze.map((e) => e.id)); setSelectedEvIds((p) => p.size === allIds.size ? new Set() : allIds); }} className="text-xs text-slate-500 hover:text-slate-700">
                            {selectedEvIds.size === evidenze.length ? "Deseleziona tutto" : "Seleziona tutto"}
                          </button>
                        )}
                      </div>
                      {showEvidenze && (
                        <div className="space-y-1.5 max-h-[200px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
                          {evidenze.map((ev) => (
                            <div key={ev.id} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 border transition ${selectedEvIds.has(ev.id) ? "border-blue-200 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"}`}>
                              <input type="checkbox" checked={selectedEvIds.has(ev.id)} onChange={() => toggleEv(ev.id)} className="h-3.5 w-3.5 rounded border-slate-300" />
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                  <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100 text-[10px] px-1.5 py-0">{ev.technology}</Badge>
                                  <Badge className={`rounded-full text-[10px] px-1.5 py-0 ${ev.priority === "Alta" ? "bg-emerald-100 text-emerald-700" : ev.priority === "Media" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"} hover:opacity-90`}>
                                    {ev.priority}
                                  </Badge>
                                  <span className="text-slate-400">{ev.sourceName}</span>
                                </div>
                                <p className="text-xs font-medium text-slate-900 truncate">{ev.title}</p>
                              </div>
                              <button onClick={() => deleteEv(ev.id)} className="shrink-0 p-1 text-slate-300 hover:text-red-500" title="Elimina evidenza">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-xs text-slate-500">
                      <BookOpen className="mx-auto mb-1 h-4 w-4 text-slate-400" />
                      Nessuna evidenza salvata. Usa la <strong>Ricerca avanzata</strong> per cercare, analizzare e salvare evidenze.
                    </div>
                  )}

                  <Textarea
                    className="min-h-[50px] rounded-2xl text-sm"
                    placeholder="Prompt AI: descrivi lo stile e il focus dell'articolo da generare..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button className="rounded-2xl" onClick={generateWithAi} disabled={generating}>
                    {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {generating ? "Generazione in corso…" : `Genera bozza con AI${selectedEvIds.size > 0 ? ` (${selectedEvIds.size} evidenze)` : ""}`}
                  </Button>
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
