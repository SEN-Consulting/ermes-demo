import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Save,
  Search,
  Sparkles,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { sourceRows, techs } from "../../data/mockData";
import { queryLibrary } from "../../data/queryLibrary";
import {
  addEvidenze,
  searchResultToEvidenza,
} from "../../lib/evidenzeStore";
import {
  downloadCsv,
  resultsToCsv,
  runSearch,
  type DiagnosticRow,
  type SearchResult,
} from "../../lib/searchEngine";

/* ── Constants & helpers ──────────────────────────────────── */

const STEPS = [
  { id: 1, label: "Impostazioni", icon: Search },
  { id: 2, label: "Risultati", icon: FileText },
  { id: 3, label: "Analisi", icon: Brain },
  { id: 4, label: "Salvataggio", icon: Save },
] as const;

type Step = 1 | 2 | 3 | 4;

function periodToDays(p: string): number {
  return { "1m": 30, "3m": 90, "6m": 180, "12m": 365, "24m": 730, "36m": 1095 }[p] ?? 180;
}

const selectCls =
  "h-10 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-slate-500 focus:outline-none";

/* ── AI analysis logic ────────────────────────────────────── */

interface AnalysisVerdict {
  relevant: boolean;
  reason: string;
  category: string;
  priority: "Alta" | "Media" | "Bassa";
}

function analyzeResult(r: SearchResult): AnalysisVerdict {
  const blob = `${r.resultTitle} ${r.resultSnippet} ${r.queryLabel}`.toLowerCase();
  const tech = r.technology.toLowerCase();

  const energyKw = [
    "energy", "power", "solar", "wind", "nuclear", "hydrogen", "geotherm",
    "biomass", "hydro", "battery", "storage", "grid", "renewable", "clean",
    "carbon", "emission", "climate", "transition", "fotovoltaic", "eolico",
    "idrogeno", "nucleare", "geotermico", "biomasse", "idroelettrico",
    "rinnovabil", "solare", "termico", "carbone", "gas naturale", "olio",
    "fissione", "reactor", "turbine", "electrolyz", "fuel cell", "lcoe",
    "capex", "capacity", "mw", "gw", "kwh", "mwh",
  ];
  const policyKw = [
    "policy", "regulation", "directive", "incentive", "subsidy", "auction",
    "permitting", "taxonomy", "eu ", "european commission", "pniec",
    "repowereu", "net zero", "green deal",
  ];
  const marketKw = [
    "investment", "funding", "cost", "price", "market", "deploy", "project",
    "pilot", "demonstration", "startup", "partnership", "supply chain",
    "manufacturing", "gigafactory",
  ];
  const pvsKw = [
    "developing", "emerging", "global south", "mini-grid", "off-grid",
    "rural", "electrification", "access", "africa", "asia", "latin america",
  ];

  const hasEnergy = energyKw.some((k) => blob.includes(k));
  const hasPolicy = policyKw.some((k) => blob.includes(k));
  const hasMarket = marketKw.some((k) => blob.includes(k));
  const hasPvs = pvsKw.some((k) => blob.includes(k));
  const hasTechMatch = tech.length > 2 && blob.includes(tech);

  // Noise keywords — results dominated by these without substance are likely irrelevant
  const noiseKw = ["award", "recipe", "restaurant", "fashion", "celebrity", "sport",
    "entertainment", "movie", "music", "album", "tour", "concert", "horoscope"];
  const hasNoise = noiseKw.some((k) => blob.includes(k));

  // Count how many strong signal dimensions match
  const signals = [hasTechMatch, hasPolicy, hasMarket, hasPvs].filter(Boolean).length;

  // Not relevant: no signals at all, or only generic energy match with noise
  if (signals === 0 && !hasEnergy) {
    return { relevant: false, reason: "Il risultato non riguarda tecnologie energetiche, policy o mercati rilevanti per ERMES.", category: "Non pertinente", priority: "Bassa" };
  }
  if (signals === 0 && hasEnergy && hasNoise) {
    return { relevant: false, reason: "Il risultato contiene riferimenti energetici generici ma il contesto non è pertinente all'osservatorio.", category: "Non pertinente", priority: "Bassa" };
  }
  // Only generic energy match, no specific signals — mark as low relevance / not pertinent
  if (signals === 0 && hasEnergy && !hasTechMatch) {
    return { relevant: false, reason: "Il risultato menziona temi energetici generici senza un collegamento specifico a tecnologie, policy o mercati monitorati da ERMES.", category: "Non pertinente", priority: "Bassa" };
  }

  let category = "Aggiornamento generale";
  if (hasPolicy) category = "Policy e regolazione";
  else if (hasMarket) category = "Mercato e investimenti";
  else if (hasPvs) category = "PVS e accesso all'energia";
  else if (hasTechMatch) category = "Technology watch";

  let score = 0;
  if (hasTechMatch) score += 2;
  if (hasEnergy) score += 1;
  if (hasPolicy) score += 1;
  if (hasMarket) score += 1;
  if (hasPvs) score += 1;
  if (r.relevance === "Alta") score += 2;
  else if (r.relevance === "Media") score += 1;

  const priority: "Alta" | "Media" | "Bassa" = score >= 5 ? "Alta" : score >= 3 ? "Media" : "Bassa";

  const reasons: string[] = [];
  if (hasTechMatch) reasons.push(`menziona direttamente la tecnologia ${r.technology}`);
  if (hasPolicy) reasons.push("contiene riferimenti a policy o regolazione");
  if (hasMarket) reasons.push("riporta dati su mercato, costi o investimenti");
  if (hasPvs) reasons.push("rilevante per Paesi in via di sviluppo");
  if (hasEnergy && !hasTechMatch) reasons.push("riguarda il settore energetico");

  return {
    relevant: true,
    reason: reasons.length > 0
      ? `Risultato pertinente: ${reasons.join("; ")}.`
      : "Risultato potenzialmente rilevante per l'osservatorio ERMES.",
    category,
    priority,
  };
}

/* ── Component ─────────────────────────────────────────────── */

export function AdvancedResearch() {
  const [step, setStep] = useState<Step>(1);

  /* search params */
  const [techScope, setTechScope] = useState("all");
  const [singleTech, setSingleTech] = useState<string>(techs[3].name);
  const [period, setPeriod] = useState("6m");
  const [sourceMode, setSourceMode] = useState<"all" | "specific">("all");
  const [selectedSourceId, setSelectedSourceId] = useState<string>(sourceRows[0].id);
  const [pvsFocus, setPvsFocus] = useState("all");
  const [depth, setDepth] = useState<"Rapida" | "Standard" | "Estesa">("Standard");
  const [queryMode, setQueryMode] = useState<"library" | "free">("library");
  const [selectedQueryIds, setSelectedQueryIds] = useState<string[]>(["Q001", "Q003"]);
  const [freeQuery, setFreeQuery] = useState('"Generation IV" nuclear reactor OR Gen IV reactor OR molten salt reactor');
  const [freeQueryLabel, setFreeQueryLabel] = useState("Query libera");
  const [maxResults, setMaxResults] = useState(10);
  const [includeExternal, setIncludeExternal] = useState(false);

  /* results */
  const [results, setResults] = useState<SearchResult[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const abortRef = useRef(false);

  /* analysis */
  const [analysisMap, setAnalysisMap] = useState<Map<number, AnalysisVerdict>>(new Map());
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [analysisRun, setAnalysisRun] = useState(false);

  /* save */
  const [saved, setSaved] = useState(false);
  const [saveNote, setSaveNote] = useState("");

  /* toggles */
  const [showDiag, setShowDiag] = useState(false);
  const [showQueryLib, setShowQueryLib] = useState(false);

  const onlyPvs = pvsFocus === "pvs-only";
  const availableQueries = useMemo(() => (onlyPvs ? queryLibrary.filter((q) => q.focusPvs) : queryLibrary), [onlyPvs]);

  /* ── search handler ─────────────────────────────────────── */
  const handleSearch = useCallback(async () => {
    abortRef.current = false;
    setSearching(true);
    setProgressMsg("Preparazione ricerca…");
    setResults([]); setDiagnostics([]); setAnalysisMap(new Map()); setSelectedIndices(new Set()); setAnalysisRun(false); setSaved(false); setSaveNote("");

    const now = new Date();
    const dateTo = now;
    const dateFrom = new Date(now.getTime() - periodToDays(period) * 86_400_000);
    const selectedTechs = techScope === "all" ? techs.map((t) => t.name) : techScope === "single" ? [singleTech] : [];

    try {
      const { results: res, diagnostics: diag } = await runSearch({
        selectedTechNames: selectedTechs,
        selectedQueryIds: queryMode === "library" ? selectedQueryIds : [],
        mode: sourceMode,
        selectedSourceId: sourceMode === "specific" ? selectedSourceId : null,
        dateFrom, dateTo, maxResults, includeExternal,
        searchDepth: depth, onlyPvs,
        customQuery: queryMode === "free" ? freeQuery : "",
        customQueryLabel: queryMode === "free" ? freeQueryLabel : "",
        onProgress: (msg) => setProgressMsg(msg),
      });
      if (abortRef.current) return;
      setResults(res); setDiagnostics(diag);
      setProgressMsg("");
      setStep(2);
    } catch (e) { setProgressMsg(`Errore: ${String(e)}`); } finally { setSearching(false); }
  }, [techScope, singleTech, period, sourceMode, selectedSourceId, pvsFocus, depth, queryMode, selectedQueryIds, freeQuery, freeQueryLabel, maxResults, includeExternal, onlyPvs]);

  /* ── AI analysis ────────────────────────────────────────── */
  const runAnalysis = useCallback(() => {
    const map = new Map<number, AnalysisVerdict>();
    const sel = new Set<number>();
    results.forEach((r, i) => { const v = analyzeResult(r); map.set(i, v); if (v.relevant) sel.add(i); });
    setAnalysisMap(map); setSelectedIndices(sel); setAnalysisRun(true);
  }, [results]);

  const handleSaveEvidenze = useCallback(() => {
    const sel = results.filter((_, i) => selectedIndices.has(i));
    const evidenze = sel.map((r) => {
      const v = analysisMap.get(results.indexOf(r));
      return searchResultToEvidenza(r, v?.category || "Aggiornamento", v?.priority || "Media", saveNote);
    });
    addEvidenze(evidenze);
    setSaved(true);
  }, [results, selectedIndices, analysisMap, saveNote]);

  const toggleQuery = (qid: string) => setSelectedQueryIds((p) => p.includes(qid) ? p.filter((x) => x !== qid) : [...p, qid]);
  const toggleResult = (idx: number) => setSelectedIndices((p) => { const n = new Set(p); if (n.has(idx)) n.delete(idx); else n.add(idx); return n; });
  const selectAllRelevant = () => { const n = new Set<number>(); analysisMap.forEach((v, i) => { if (v.relevant) n.add(i); }); setSelectedIndices(n); };

  const techCount = new Set(results.map((r) => r.technology).filter(Boolean)).size;
  const srcCount = new Set(results.map((r) => r.sourceName).filter(Boolean)).size;
  const pvsCount = results.filter((r) => r.focusPvs.toLowerCase() === "sì").length;

  /* ══════════════════════════════════════════════════════════ */
  return (
    <div className="space-y-8">
      {/* ── Step indicator ──────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-[28px] border border-slate-200 bg-white p-2 shadow-sm">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = step > s.id;
          const clickable = s.id === 1 || (s.id === 2 && results.length > 0) || (s.id === 3 && results.length > 0) || (s.id === 4 && selectedIndices.size > 0);
          return (
            <button key={s.id} onClick={() => clickable && setStep(s.id as Step)} className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-slate-900 text-white" : done ? "text-emerald-700" : clickable ? "text-slate-500 hover:bg-slate-50" : "text-slate-300 cursor-default"}`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-white text-slate-900" : done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                {done ? <Check className="h-3.5 w-3.5" /> : s.id}
              </span>
              <Icon className="hidden h-4 w-4 sm:block" />
              <span className="hidden md:inline">{s.label}</span>
              {idx < STEPS.length - 1 && <span className="ml-auto hidden text-slate-300 xl:block">›</span>}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════ STEP 1: Settings ═══════════════════ */}
      {step === 1 && (
        <>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Impostazioni ricerca</h2>
            <p className="text-sm text-slate-500">Configura i parametri e lancia la ricerca sulle fonti classificate.</p>
          </div>

          <Card className="rounded-[28px] shadow-sm">
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Tecnologia</span>
                  <select className={selectCls} value={techScope} onChange={(e) => setTechScope(e.target.value)}>
                    <option value="all">Tutte le tecnologie</option><option value="single">Solo una tecnologia</option>
                  </select>
                </label>
                {techScope === "single" && (
                  <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Seleziona tecnologia</span>
                    <select className={selectCls} value={singleTech} onChange={(e) => setSingleTech(e.target.value)}>
                      {techs.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </label>
                )}
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Periodo</span>
                  <select className={selectCls} value={period} onChange={(e) => setPeriod(e.target.value)}>
                    <option value="1m">Ultimo mese</option><option value="3m">Ultimi 3 mesi</option><option value="6m">Ultimi 6 mesi</option><option value="12m">Ultimi 12 mesi</option><option value="24m">Ultimi 24 mesi</option><option value="36m">Ultimi 36 mesi</option>
                  </select>
                </label>
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Fonti</span>
                  <select className={selectCls} value={sourceMode} onChange={(e) => setSourceMode(e.target.value as "all" | "specific")}>
                    <option value="all">Tutte le fonti classificate</option><option value="specific">Fonte specifica</option>
                  </select>
                </label>
                {sourceMode === "specific" && (
                  <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Seleziona fonte</span>
                    <select className={selectCls} value={selectedSourceId} onChange={(e) => setSelectedSourceId(e.target.value)}>
                      {sourceRows.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </label>
                )}
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Focus PVS</span>
                  <select className={selectCls} value={pvsFocus} onChange={(e) => setPvsFocus(e.target.value)}>
                    <option value="all">Tutti i mercati</option><option value="pvs-only">Solo PVS</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Profondità</span>
                  <select className={selectCls} value={depth} onChange={(e) => setDepth(e.target.value as typeof depth)}>
                    <option value="Rapida">Rapida (solo priorità alta)</option><option value="Standard">Standard</option><option value="Estesa">Estesa</option>
                  </select>
                </label>
                <label className="space-y-1.5"><span className="text-xs font-medium text-slate-500">Max risultati / query</span>
                  <select className={selectCls} value={maxResults} onChange={(e) => setMaxResults(+e.target.value)}>
                    {[5, 8, 10, 15, 20, 30].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <label className="flex items-center gap-2 pt-6 text-sm text-slate-700">
                  <input type="checkbox" checked={includeExternal} onChange={(e) => setIncludeExternal(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                  Includi fonti esterne
                </label>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">Modalità query:</span>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name="qmode" checked={queryMode === "library"} onChange={() => setQueryMode("library")} /> Libreria query ({availableQueries.length})</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="radio" name="qmode" checked={queryMode === "free"} onChange={() => setQueryMode("free")} /> Query libera</label>
                </div>
                {queryMode === "library" && (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {availableQueries.map((q) => (
                      <label key={q.queryId} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-slate-400">
                        <input type="checkbox" checked={selectedQueryIds.includes(q.queryId)} onChange={() => toggleQuery(q.queryId)} className="mt-0.5 h-4 w-4 rounded border-slate-300" />
                        <div>
                          <span className="font-medium text-slate-800">{q.queryId}</span><span className="ml-1 text-slate-600">| {q.nome}</span>
                          {q.focusPvs && <Badge className="ml-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">PVS</Badge>}
                          <div className="mt-0.5 text-xs text-slate-400">{q.uso}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                {queryMode === "free" && (
                  <div className="space-y-3">
                    <input type="text" value={freeQueryLabel} onChange={(e) => setFreeQueryLabel(e.target.value)} placeholder="Nome della query" className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-slate-500 focus:outline-none sm:w-1/2" />
                    <textarea value={freeQuery} onChange={(e) => setFreeQuery(e.target.value)} rows={3} placeholder='Es: "Generation IV" nuclear reactor OR Gen IV reactor' className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-700 focus:border-slate-500 focus:outline-none" />
                    <p className="text-xs text-slate-400">Placeholder <code className="rounded bg-slate-100 px-1">{"{technology}"}</code> per iterare su tutte le tecnologie.</p>
                  </div>
                )}
              </div>

              {searching && (
                <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
                  <Loader2 className="h-4 w-4 animate-spin" /> {progressMsg}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button onClick={() => setShowQueryLib(!showQueryLib)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
                  {showQueryLib ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Libreria query completa
                </button>
                <Button className="rounded-2xl px-8" onClick={handleSearch} disabled={searching}>
                  {searching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {searching ? "Ricerca in corso…" : "Lancia ricerca"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {showQueryLib && (
            <Card className="overflow-x-auto rounded-[28px] shadow-sm">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium text-slate-500"><th className="p-3">ID</th><th className="p-3">Categoria</th><th className="p-3">Nome</th><th className="p-3 max-w-md">Template</th><th className="p-3">PVS</th></tr></thead>
                  <tbody>
                    {queryLibrary.map((q) => (
                      <tr key={q.queryId} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-mono text-xs">{q.queryId}</td><td className="p-3">{q.categoria}</td><td className="p-3 font-medium text-slate-800">{q.nome}</td>
                        <td className="p-3 max-w-md truncate text-xs text-slate-500">{q.template}</td><td className="p-3">{q.focusPvs ? <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">Sì</Badge> : "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* ═══════════════════ STEP 2: Results ════════════════════ */}
      {step === 2 && (
        <>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Risultati della ricerca</h2>
              <p className="text-sm text-slate-500">Esamina i risultati trovati, poi passa all'analisi AI per filtrare quelli rilevanti.</p>
            </div>
            <Button variant="outline" className="rounded-2xl" onClick={() => downloadCsv(resultsToCsv(results), "ERMES_risultati.csv")}>
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Risultati trovati", value: results.length },
              { label: "Tecnologie coperte", value: techCount },
              { label: "Fonti coperte", value: srcCount },
              { label: "Risultati PVS", value: pvsCount },
            ].map((m) => (
              <Card key={m.label} className="rounded-[28px] shadow-sm">
                <CardContent className="p-5">
                  <div className="text-sm text-slate-500">{m.label}</div>
                  <div className="mt-1 text-3xl font-semibold text-slate-950">{m.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {results.length === 0 ? (
            <Card className="rounded-[28px] shadow-sm"><CardContent className="flex items-center gap-3 p-6 text-amber-700"><AlertTriangle className="h-5 w-5" /> Nessun risultato. Torna alle impostazioni e modifica i filtri.</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {results.map((r, i) => (
                <Card key={i} className="rounded-[28px] shadow-sm">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{r.technology || "—"}</Badge>
                      <Badge className={`rounded-full ${r.relevance === "Alta" ? "bg-emerald-100 text-emerald-700" : r.relevance === "Media" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"} hover:opacity-90`}>{r.relevance}</Badge>
                      <span className="text-slate-400">{r.sourceName}</span>
                      {r.resultPublished && <span className="text-slate-400">· {r.resultPublished}</span>}
                      <Badge variant="outline" className="rounded-full text-[10px]">{r.retrievalChannel}</Badge>
                    </div>
                    <a href={r.resultUrl} target="_blank" rel="noopener noreferrer" className="block font-medium text-slate-950 hover:text-blue-700">
                      {r.resultTitle} <ExternalLink className="ml-1 inline h-3 w-3" />
                    </a>
                    {r.resultSnippet && <p className="text-sm leading-relaxed text-slate-500">{r.resultSnippet.length > 250 ? r.resultSnippet.slice(0, 247) + "…" : r.resultSnippet}</p>}
                    <div className="text-xs text-slate-400">Query: {r.queryId} · {r.matchType || "—"}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {diagnostics.length > 0 && (
            <>
              <button onClick={() => setShowDiag(!showDiag)} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
                {showDiag ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Diagnostica ({diagnostics.length})
              </button>
              {showDiag && (
                <Card className="overflow-x-auto rounded-[28px] shadow-sm">
                  <CardContent className="p-0">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium text-slate-500"><th className="p-3">Query</th><th className="p-3">Tecnologia</th><th className="p-3">Fonte</th><th className="p-3">Strategia</th><th className="p-3">Feed</th><th className="p-3">Diretti</th><th className="p-3">Stato</th><th className="p-3">Note</th></tr></thead>
                      <tbody>{diagnostics.map((d, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${d.status === "Errore" ? "bg-red-50" : "hover:bg-slate-50"}`}>
                          <td className="p-3 font-mono text-xs">{d.queryId}</td><td className="p-3">{d.technology}</td><td className="p-3">{d.sourceName}</td><td className="p-3 text-xs">{d.strategy}</td>
                          <td className="p-3 text-center">{d.feedAttempts}</td><td className="p-3 text-center">{d.directResults}</td>
                          <td className="p-3"><Badge className={`rounded-full text-[10px] ${d.status === "Errore" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"} hover:opacity-90`}>{d.status}</Badge></td>
                          <td className="p-3 max-w-xs truncate text-xs text-slate-400">{d.note}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="rounded-2xl" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Modifica ricerca</Button>
            {results.length > 0 && (
              <Button className="rounded-2xl" onClick={() => { if (!analysisRun) runAnalysis(); setStep(3); }}>
                <Brain className="mr-2 h-4 w-4" /> Analisi AI <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════ STEP 3: Analysis ═══════════════════ */}
      {step === 3 && (
        <>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Analisi AI</h2>
              <p className="text-sm text-slate-500">L'analista AI valuta ogni risultato in base a pertinenza energetica, valore policy, rilevanza di mercato e focus PVS.</p>
            </div>
            <div className="flex gap-2">
              {!analysisRun && <Button className="rounded-2xl" onClick={runAnalysis}><Sparkles className="mr-2 h-4 w-4" /> Avvia analisi</Button>}
              {analysisRun && <Button variant="outline" className="rounded-2xl" onClick={selectAllRelevant}><Check className="mr-2 h-4 w-4" /> Seleziona tutti pertinenti</Button>}
            </div>
          </div>

          {analysisRun && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="rounded-[28px] border-emerald-200 bg-emerald-50 shadow-sm"><CardContent className="p-5"><div className="text-sm text-emerald-600">Pertinenti</div><div className="mt-1 text-3xl font-semibold text-emerald-800">{[...analysisMap.values()].filter((v) => v.relevant).length}</div></CardContent></Card>
              <Card className="rounded-[28px] border-red-200 bg-red-50 shadow-sm"><CardContent className="p-5"><div className="text-sm text-red-600">Non pertinenti</div><div className="mt-1 text-3xl font-semibold text-red-800">{[...analysisMap.values()].filter((v) => !v.relevant).length}</div></CardContent></Card>
              <Card className="rounded-[28px] border-blue-200 bg-blue-50 shadow-sm"><CardContent className="p-5"><div className="text-sm text-blue-600">Selezionati</div><div className="mt-1 text-3xl font-semibold text-blue-800">{selectedIndices.size}</div></CardContent></Card>
            </div>
          )}

          <div className="space-y-3">
            {results.map((r, i) => {
              const v = analysisMap.get(i);
              const sel = selectedIndices.has(i);
              return (
                <Card key={i} className={`rounded-[28px] shadow-sm transition-all ${v && !v.relevant ? "border-red-200 bg-red-50/30 opacity-60" : sel ? "border-emerald-300 bg-emerald-50/30 ring-1 ring-emerald-200" : ""}`}>
                  <CardContent className="flex gap-4 p-5">
                    <div className="pt-1"><input type="checkbox" checked={sel} onChange={() => toggleResult(i)} className="h-5 w-5 rounded border-slate-300" /></div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{r.technology || "—"}</Badge>
                        <Badge className={`rounded-full ${r.relevance === "Alta" ? "bg-emerald-100 text-emerald-700" : r.relevance === "Media" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"} hover:opacity-90`}>{r.relevance}</Badge>
                        {v && <Badge className={`rounded-full text-[10px] ${v.relevant ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"} hover:opacity-90`}>{v.relevant ? "Pertinente" : "Non pertinente"}</Badge>}
                        {v?.relevant && <Badge variant="outline" className="rounded-full text-[10px]">{v.category}</Badge>}
                        <span className="text-slate-400">{r.sourceName}</span>
                        {r.resultPublished && <span className="text-slate-400">· {r.resultPublished}</span>}
                      </div>
                      <a href={r.resultUrl} target="_blank" rel="noopener noreferrer" className="block font-medium text-slate-950 hover:text-blue-700">
                        {r.resultTitle} <ExternalLink className="ml-1 inline h-3 w-3" />
                      </a>
                      {r.resultSnippet && <p className="text-sm leading-relaxed text-slate-500">{r.resultSnippet.length > 200 ? r.resultSnippet.slice(0, 197) + "…" : r.resultSnippet}</p>}
                      {v && (
                        <div className={`mt-2 rounded-xl p-3 text-sm ${v.relevant ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-700"}`}>
                          <Sparkles className="mr-1 inline h-3 w-3" /> {v.reason}{v.relevant && <span className="ml-2 font-medium">Priorità: {v.priority}</span>}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="rounded-2xl" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Torna ai risultati</Button>
            {selectedIndices.size > 0 && (
              <Button className="rounded-2xl" onClick={() => setStep(4)}>
                <Save className="mr-2 h-4 w-4" /> Salva evidenze ({selectedIndices.size}) <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════ STEP 4: Save ════════════════════ */}
      {step === 4 && (
        <>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Validazione e salvataggio</h2>
            <p className="text-sm text-slate-500">Rivedi i {selectedIndices.size} risultati selezionati e salvali come evidenze per l'osservatorio.</p>
          </div>

          <Card className="rounded-[28px] shadow-sm">
            <CardContent className="space-y-4 p-6">
              <label className="space-y-1.5">
                <span className="text-xs font-medium text-slate-500">Note per il salvataggio (opzionale)</span>
                <textarea value={saveNote} onChange={(e) => setSaveNote(e.target.value)} rows={2} placeholder="Es: Batch ricerca aprile 2026 – focus eolico e solare" className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-700 focus:border-slate-500 focus:outline-none" />
              </label>

              <div className="space-y-2 max-h-[400px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                {results.filter((_, i) => selectedIndices.has(i)).map((r, j) => {
                  const v = analysisMap.get(results.indexOf(r));
                  return (
                    <div key={j} className="flex items-start gap-3 rounded-xl bg-white p-3 border border-slate-100">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100 text-[10px]">{r.technology}</Badge>
                          {v && <Badge className={`rounded-full text-[10px] ${v.priority === "Alta" ? "bg-emerald-100 text-emerald-700" : v.priority === "Media" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"} hover:opacity-90`}>Priorità {v.priority}</Badge>}
                          {v && <Badge variant="outline" className="rounded-full text-[10px]">{v.category}</Badge>}
                          <span className="text-slate-400">{r.sourceName}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-900 truncate">{r.resultTitle}</p>
                        {r.resultSnippet && <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{r.resultSnippet}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!saved ? (
                  <Button className="rounded-2xl" onClick={handleSaveEvidenze}>
                    <Save className="mr-2 h-4 w-4" /> Salva {selectedIndices.size} evidenze
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> {selectedIndices.size} evidenze salvate con successo
                  </div>
                )}
                <Button variant="outline" className="rounded-2xl" onClick={() => downloadCsv(resultsToCsv(results.filter((_, i) => selectedIndices.has(i))), "ERMES_evidenze.csv")}>
                  <Download className="mr-2 h-4 w-4" /> Esporta CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {saved && (
            <Card className="rounded-[28px] border-emerald-200 bg-emerald-50/50 shadow-sm">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-emerald-800">Prossimi passi</h3>
                <ul className="space-y-2 text-sm text-emerald-700">
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> Le evidenze sono ora disponibili nella sezione <strong>Blog</strong> per la creazione di articoli con AI.</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> Puoi selezionare le evidenze salvate e generare automaticamente un articolo editoriale.</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" /> Avvia una nuova ricerca per raccogliere ulteriori segnali.</li>
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="rounded-2xl" onClick={() => setStep(3)}><ArrowLeft className="mr-2 h-4 w-4" /> Torna all'analisi</Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => { setStep(1); setResults([]); setAnalysisMap(new Map()); setSelectedIndices(new Set()); setSaved(false); setSaveNote(""); setAnalysisRun(false); }}>
              <Search className="mr-2 h-4 w-4" /> Nuova ricerca
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

