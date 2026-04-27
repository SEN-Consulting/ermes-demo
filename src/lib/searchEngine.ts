/* ──────────────────────────────────────────────────────────────
   ERMES – Browser-based search engine
   Replicates the Python ermes_core_base.py logic using:
     1. Google News RSS (via CORS proxy)
     2. Direct RSS/Atom feeds from classified sources (via CORS proxy)
   DuckDuckGo is omitted (no browser-compatible API).
   ────────────────────────────────────────────────────────────── */

import { sourceRows, techs } from "../data/mockData";
import { queryLibrary, type QueryTemplate } from "../data/queryLibrary";

/* ── Types ─────────────────────────────────────────────────── */

export interface SearchResult {
  batchLabel: string;
  batchTimestamp: string;
  queryId: string;
  queryLabel: string;
  searchMode: string;
  timeWindow: string;
  fromDate: string;
  toDate: string;
  techId: string;
  technology: string;
  sourceId: string;
  sourceName: string;
  sourceDomain: string;
  resultTitle: string;
  resultSourceTitle: string;
  resultPublished: string;
  resultUrl: string;
  searchQuery: string;
  resultSnippet: string;
  focusPvs: string;
  relevance: "Alta" | "Media" | "Bassa";
  retrievalChannel: string;
  matchType: string;
  importStatus: string;
}

export interface DiagnosticRow {
  queryId: string;
  technology: string;
  sourceId: string;
  sourceName: string;
  strategy: string;
  feedAttempts: number;
  directResults: number;
  broadResults: number;
  status: string;
  note: string;
}

export interface SearchConfig {
  selectedTechNames: string[];
  selectedQueryIds: string[];
  mode: "all" | "specific";
  selectedSourceId: string | null;
  dateFrom: Date;
  dateTo: Date;
  maxResults: number;
  includeExternal: boolean;
  searchDepth: "Rapida" | "Standard" | "Estesa";
  onlyPvs: boolean;
  customQuery: string;
  customQueryLabel: string;
  onProgress?: (msg: string) => void;
}

/* ── CORS proxy ─────────────────────────────────────────────── */

const CORS_PROXY = "https://api.allorigins.win/raw?url=";

async function fetchViaProxy(url: string, timeout = 6000): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const resp = await fetch(CORS_PROXY + encodeURIComponent(url), {
      signal: controller.signal,
    });
    if (!resp.ok) return null;
    return await resp.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ── Domain / URL helpers ──────────────────────────────────── */

export function normalizeDomain(url: string): string {
  if (!url) return "";
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    let host = parsed.hostname.toLowerCase();
    if (host.startsWith("www.")) host = host.slice(4);
    return host;
  } catch {
    return "";
  }
}

function normalizeUrlPrefix(url: string): string {
  if (!url) return "";
  try {
    const raw = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;
    const parsed = new URL(raw);
    let netloc = parsed.hostname.toLowerCase();
    if (netloc.startsWith("www.")) netloc = netloc.slice(4);
    const path = parsed.pathname.replace(/\/+$/, "");
    return `${parsed.protocol}//${netloc}${path}`;
  } catch {
    return "";
  }
}

function htmlToText(html: string): string {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
}

/* ── Date helpers ──────────────────────────────────────────── */

function parseDateSafe(value: string | undefined | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function fmtDMY(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/* ── Source classification ─────────────────────────────────── */

interface ClassifiedSource {
  id: string;
  name: string;
  domain: string;
  urlPrefix: string;
}

function buildSourceIndex(): ClassifiedSource[] {
  return sourceRows.map((s) => ({
    id: s.id,
    name: s.name,
    domain: normalizeDomain(s.url),
    urlPrefix: normalizeUrlPrefix(s.url),
  }));
}

function classifySource(
  resultUrl: string,
  sourceTitle: string,
  sources: ClassifiedSource[]
): { source: ClassifiedSource | null; matchType: string } {
  const norm = normalizeUrlPrefix(resultUrl);
  const domain = normalizeDomain(resultUrl);

  // Prefix match (longest first)
  const sorted = [...sources].sort((a, b) => b.urlPrefix.length - a.urlPrefix.length);
  for (const s of sorted) {
    if (norm && s.urlPrefix && norm.startsWith(s.urlPrefix)) {
      return { source: s, matchType: "prefix" };
    }
  }
  // Domain match
  if (domain) {
    for (const s of sources) {
      if (s.domain === domain) return { source: s, matchType: "domain" };
    }
  }
  // Title match
  const low = (sourceTitle || "").toLowerCase();
  if (low) {
    for (const s of sources) {
      if (s.name.toLowerCase().includes(low) || low.includes(s.name.toLowerCase())) {
        return { source: s, matchType: "title" };
      }
    }
  }
  return { source: null, matchType: "" };
}

/* ── Relevance ─────────────────────────────────────────────── */

function makeQueryTerms(query: string, technology?: string): string[] {
  const stop = new Set([
    "and", "the", "for", "with", "from", "into", "countries", "country",
    "energy", "technology", "technologies", "latest", "recent", "news",
    "updates", "developing", "economies", "global", "south", "after", "before",
  ]);
  let tokens = (query.toLowerCase().match(/[a-z0-9-]{3,}/g) || []).filter((t) => !stop.has(t));
  if (technology) {
    tokens = tokens.concat(
      (technology.toLowerCase().match(/[a-z0-9-]{3,}/g) || [])
    );
  }
  return [...new Set(tokens)].slice(0, 12);
}

function scoreRelevance(title: string, snippet: string, queryTerms: string[]): number {
  const blob = `${title} ${snippet}`.toLowerCase();
  return queryTerms.reduce((s, t) => s + (blob.includes(t) ? 1 : 0), 0);
}

function relevanceLabel(title: string, snippet: string, technology: string): "Alta" | "Media" | "Bassa" {
  const blob = `${title} ${snippet}`.toLowerCase();
  const tech = technology.toLowerCase();
  let score = 0;
  if (tech && blob.includes(tech)) score += 2;
  const keywords = ["pilot", "demonstration", "breakthrough", "policy", "cost", "deployment", "project", "reactor"];
  if (keywords.some((k) => blob.includes(k))) score += 1;
  if (score >= 3) return "Alta";
  if (score >= 1) return "Media";
  return "Bassa";
}

/* ── RSS XML parser (lightweight, no dependency) ──────────── */

interface FeedEntry {
  title: string;
  link: string;
  published: Date | null;
  summary: string;
  sourceTitle: string;
  sourceHref: string;
}

function parseRssXml(xml: string): FeedEntry[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const entries: FeedEntry[] = [];

  // RSS 2.0 <item>
  const items = doc.querySelectorAll("item");
  items.forEach((item) => {
    entries.push({
      title: htmlToText(item.querySelector("title")?.textContent || ""),
      link: item.querySelector("link")?.textContent?.trim() || "",
      published: parseDateSafe(
        item.querySelector("pubDate")?.textContent ||
          item.querySelector("date")?.textContent
      ),
      summary: htmlToText(
        item.querySelector("description")?.textContent || ""
      ),
      sourceTitle: item.querySelector("source")?.textContent || "",
      sourceHref: item.querySelector("source")?.getAttribute("url") || "",
    });
  });

  // Atom <entry>
  if (entries.length === 0) {
    doc.querySelectorAll("entry").forEach((entry) => {
      const linkEl = entry.querySelector("link");
      entries.push({
        title: htmlToText(entry.querySelector("title")?.textContent || ""),
        link: linkEl?.getAttribute("href") || linkEl?.textContent?.trim() || "",
        published: parseDateSafe(
          entry.querySelector("published")?.textContent ||
            entry.querySelector("updated")?.textContent
        ),
        summary: htmlToText(
          entry.querySelector("summary")?.textContent ||
            entry.querySelector("content")?.textContent ||
            ""
        ),
        sourceTitle: "",
        sourceHref: "",
      });
    });
  }

  return entries;
}

/* ── Google News RSS search ────────────────────────────────── */

async function googleNewsSearch(query: string, maxResults: number): Promise<FeedEntry[]> {
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const xml = await fetchViaProxy(rssUrl);
  if (!xml) return [];
  const entries = parseRssXml(xml);
  return entries.slice(0, maxResults).map((e) => ({
    ...e,
    sourceTitle: e.sourceTitle || "",
    sourceHref: e.sourceHref || "",
  }));
}

/* ── Direct source RSS feed search ─────────────────────────── */

const KNOWN_FEEDS: Record<string, string> = {
  cleantechnica: "https://cleantechnica.com/feed/",
  "world-nuclear-news": "https://www.world-nuclear-news.org/rss",
  ember: "https://ember-climate.org/feed/",
  windeurope: "https://windeurope.org/feed/",
  gwec: "https://gwec.net/feed/",
};

const COMMON_FEED_PATHS = ["feed", "rss", "rss.xml", "feed.xml"];

/* Feed URL + content cache: fetch each source feed ONCE per session */
const feedCache = new Map<string, { url: string | null; entries: FeedEntry[] }>();

async function discoverAndCacheFeed(
  sourceId: string,
  sourceUrl: string
): Promise<{ url: string | null; entries: FeedEntry[] }> {
  if (feedCache.has(sourceId)) return feedCache.get(sourceId)!;

  let feedUrl: string | null = KNOWN_FEEDS[sourceId] || null;

  // If no known feed, probe common paths (max 4, with short timeout)
  if (!feedUrl) {
    const base = normalizeUrlPrefix(sourceUrl);
    if (base) {
      for (const path of COMMON_FEED_PATHS) {
        const candidate = `${base}/${path}`;
        const xml = await fetchViaProxy(candidate, 5000);
        if (xml && (xml.includes("<rss") || xml.includes("<feed") || xml.includes("<channel"))) {
          feedUrl = candidate;
          // Already have XML, parse it right away
          const entries = parseRssXml(xml);
          const result = { url: feedUrl, entries };
          feedCache.set(sourceId, result);
          return result;
        }
      }
    }
  }

  if (!feedUrl) {
    const result = { url: null, entries: [] as FeedEntry[] };
    feedCache.set(sourceId, result);
    return result;
  }

  // Fetch and parse the feed
  const xml = await fetchViaProxy(feedUrl);
  const entries = xml ? parseRssXml(xml) : [];
  const result = { url: feedUrl, entries };
  feedCache.set(sourceId, result);
  return result;
}

function filterFeedEntries(
  allEntries: FeedEntry[],
  queryTerms: string[],
  dateFrom: Date,
  dateTo: Date,
  maxResults: number
): FeedEntry[] {
  const results: FeedEntry[] = [];
  for (const entry of allEntries) {
    if (entry.published) {
      if (entry.published < dateFrom || entry.published > dateTo) continue;
    }
    const score = scoreRelevance(entry.title, entry.summary, queryTerms);
    if (score <= 0) continue;
    results.push(entry);
    if (results.length >= maxResults) break;
  }
  return results;
}

/* ── Parallel batch helper ─────────────────────────────────── */

async function parallelBatch<T>(tasks: (() => Promise<T>)[], concurrency: number): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map((fn) => fn()));
    results.push(...batchResults);
  }
  return results;
}

/* ── Main search orchestrator ──────────────────────────────── */

export async function runSearch(
  config: SearchConfig
): Promise<{ results: SearchResult[]; diagnostics: DiagnosticRow[] }> {
  const {
    selectedTechNames,
    selectedQueryIds,
    mode,
    selectedSourceId,
    dateFrom,
    dateTo,
    maxResults,
    includeExternal,
    searchDepth,
    onlyPvs,
    customQuery,
    customQueryLabel,
    onProgress,
  } = config;

  const sourceIndex = buildSourceIndex();
  const techLookup = new Map(techs.map((t) => [t.name as string, t]));
  const windowLabel = `${fmtDMY(dateFrom)} - ${fmtDMY(dateTo)}`;
  const now = new Date();
  const batchLabel = `risultato ore ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} del giorno ${fmtDMY(now)}`;
  const batchTimestamp = now.toISOString().replace("T", " ").slice(0, 19);

  const rows: SearchResult[] = [];
  const diagnostics: DiagnosticRow[] = [];
  const seen = new Set<string>();

  // Build chosen queries
  const chosenQueries: {
    queryId: string;
    queryLabel: string;
    template: string;
    requiresTech: boolean;
    focusPvs: string;
  }[] = [];

  if (customQuery.trim()) {
    let q = customQuery.trim();
    if (onlyPvs && !["developing", "emerging", "paesi in via di sviluppo", "global south"].some((k) => q.toLowerCase().includes(k))) {
      q += ' AND ("developing countries" OR "emerging economies" OR "global south")';
    }
    chosenQueries.push({
      queryId: "FREE",
      queryLabel: customQueryLabel || "Query libera",
      template: q,
      requiresTech: q.includes("{technology}"),
      focusPvs: q.toLowerCase().includes("developing") ? "Sì" : "No",
    });
  } else {
    let filtered = queryLibrary.filter((q) => selectedQueryIds.includes(q.queryId));
    if (onlyPvs) filtered = filtered.filter((q) => q.focusPvs);
    for (const q of filtered) {
      chosenQueries.push({
        queryId: q.queryId,
        queryLabel: q.nome,
        template: q.template,
        requiresTech: q.richiede_tecnologia,
        focusPvs: q.focusPvs ? "Sì" : "No",
      });
    }
  }

  if (chosenQueries.length === 0) {
    return { results: [], diagnostics: [] };
  }

  // Effective tech names
  const effectiveTechs =
    selectedTechNames.length > 0 ? selectedTechNames : techs.map((t) => t.name);

  // Determine source scope
  const sourceScope = sourceRows.filter((s) => {
    if (mode === "specific" && s.id !== selectedSourceId) return false;
    if (mode === "all") {
      const p = s.priority.toLowerCase();
      if (searchDepth === "Rapida" && p !== "alta") return false;
      if (searchDepth === "Standard" && p !== "alta") return false;
    }
    return true;
  });

  // Process: first pre-fetch all source feeds in parallel, then run queries
  const feedSources = sourceScope.filter((s) => s.strategy.includes("feed"));
  if (feedSources.length > 0) {
    onProgress?.(`Pre-caricamento feed RSS (${feedSources.length} fonti)…`);
    await parallelBatch(
      feedSources.map((s) => () => discoverAndCacheFeed(s.id, s.url)),
      4
    );
  }

  // Build site: restriction from classified source domains
  const sourceDomains = sourceScope.map((s) => normalizeDomain(s.url)).filter(Boolean);
  // Google News RSS supports site: — we batch top domains to restrict results
  // Use up to 8 domains to keep query length reasonable
  const siteRestriction = !includeExternal && sourceDomains.length > 0
    ? " (" + sourceDomains.slice(0, 8).map((d) => `site:${d}`).join(" OR ") + ")"
    : "";

  // Build all query+tech combinations
  type QueryTechPair = {
    q: (typeof chosenQueries)[number];
    techName: string | null;
    techId: string;
    techLabel: string;
    searchQuery: string;
    queryTerms: string[];
  };
  const pairs: QueryTechPair[] = [];
  for (const q of chosenQueries) {
    const techNames = q.requiresTech ? effectiveTechs : [null as string | null];
    for (const techName of techNames) {
      const techData = techName ? techLookup.get(techName) : null;
      const techId = techData?.id || "";
      const techLabel = (techData?.name as string) || techName || "";
      let searchQuery = q.template;
      if (techName && searchQuery.includes("{technology}")) {
        searchQuery = searchQuery.replace(/{technology}/g, techName);
      }
      searchQuery += siteRestriction;
      searchQuery += ` after:${fmt(dateFrom)} before:${fmt(dateTo)}`;
      const queryTerms = makeQueryTerms(searchQuery, techName || undefined);
      pairs.push({ q, techName, techId, techLabel, searchQuery, queryTerms });
    }
  }

  // ─── Pass 1: Google News RSS (parallel, batches of 3) ───
  let completed = 0;
  const totalSteps = pairs.length;

  const googleTasks = pairs.map((p) => async () => {
    completed++;
    onProgress?.(`Google News ${completed}/${totalSteps}: ${p.q.queryLabel}${p.techName ? ` – ${p.techName}` : ""}`);
    try {
      return await googleNewsSearch(p.searchQuery, maxResults);
    } catch {
      return [] as FeedEntry[];
    }
  });

  const googleResults = await parallelBatch(googleTasks, 3);

  // Process Google News results
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    const broadEntries = googleResults[i];

    for (const item of broadEntries) {
      if (item.published && (item.published < dateFrom || item.published > dateTo)) continue;

      const { source: matched, matchType } = classifySource(
        item.link,
        item.sourceTitle,
        sourceIndex
      );

      if (mode === "specific" && selectedSourceId) {
        if (!matched || matched.id !== selectedSourceId) continue;
      } else if (mode === "all" && !matched && !includeExternal) {
        continue;
      }

      const dedupe = `${matched?.id || "EXT"}|${item.title}|${item.link}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);

      rows.push({
        batchLabel,
        batchTimestamp,
        queryId: p.q.queryId,
        queryLabel: p.q.queryLabel,
        searchMode: mode === "all" ? "Tutte le fonti" : "Fonte specifica",
        timeWindow: windowLabel,
        fromDate: fmt(dateFrom),
        toDate: fmt(dateTo),
        techId: p.techId,
        technology: p.techLabel,
        sourceId: matched?.id || "EXT",
        sourceName: matched?.name || item.sourceTitle || "Fonte esterna",
        sourceDomain: matched?.domain || normalizeDomain(item.link),
        resultTitle: item.title,
        resultSourceTitle: item.sourceTitle || "",
        resultPublished: item.published ? fmt(item.published) : "",
        resultUrl: item.link,
        searchQuery: p.searchQuery,
        resultSnippet: item.summary,
        focusPvs: p.q.focusPvs,
        relevance: relevanceLabel(item.title, item.summary, p.techLabel),
        retrievalChannel: "google_news_rss",
        matchType: matchType || (matched ? "classified" : "external"),
        importStatus: "Da verificare",
      });
    }
  }

  // ─── Pass 2: Source RSS feeds (already cached) ───
  onProgress?.(`Analisi feed classificati…`);
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];

    for (const source of sourceScope) {
      const diag: DiagnosticRow = {
        queryId: p.q.queryId,
        technology: p.techLabel,
        sourceId: source.id,
        sourceName: source.name,
        strategy: source.strategy,
        feedAttempts: 0,
        directResults: 0,
        broadResults: googleResults[i].length,
        status: "OK",
        note: "",
      };

      try {
        if (source.strategy.includes("feed")) {
          const cached = feedCache.get(source.id);
          if (cached && cached.entries.length > 0) {
            diag.feedAttempts = 1;
            const feedResults = filterFeedEntries(
              cached.entries,
              p.queryTerms,
              dateFrom,
              dateTo,
              maxResults
            );
            diag.directResults = feedResults.length;

            for (const item of feedResults) {
              const dedupe = `${source.id}|${item.title}|${item.link}`;
              if (seen.has(dedupe)) continue;
              seen.add(dedupe);

              rows.push({
                batchLabel,
                batchTimestamp,
                queryId: p.q.queryId,
                queryLabel: p.q.queryLabel,
                searchMode: mode === "all" ? "Tutte le fonti" : "Fonte specifica",
                timeWindow: windowLabel,
                fromDate: fmt(dateFrom),
                toDate: fmt(dateTo),
                techId: p.techId,
                technology: p.techLabel,
                sourceId: source.id,
                sourceName: source.name,
                sourceDomain: normalizeDomain(source.url),
                resultTitle: item.title,
                resultSourceTitle: source.name,
                resultPublished: item.published ? fmt(item.published) : "",
                resultUrl: item.link,
                searchQuery: p.searchQuery,
                resultSnippet: item.summary,
                focusPvs: p.q.focusPvs,
                relevance: relevanceLabel(item.title, item.summary, p.techLabel),
                retrievalChannel: "source_feed",
                matchType: "source_feed",
                importStatus: "Da verificare",
              });
            }
          } else {
            diag.note = cached?.url ? "Feed vuoto" : "Feed non trovato";
          }
        }
      } catch (e) {
        diag.status = "Errore";
        diag.note = String(e).slice(0, 120);
      }

      diagnostics.push(diag);
    }
  }

  // Sort: technology asc, published desc
  rows.sort((a, b) => {
    const tc = a.technology.localeCompare(b.technology);
    if (tc !== 0) return tc;
    return b.resultPublished.localeCompare(a.resultPublished);
  });

  return { results: rows, diagnostics };
}

/* ── CSV export helper ─────────────────────────────────────── */

export function resultsToCsv(rows: SearchResult[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]) as (keyof SearchResult)[];
  const escape = (v: string) => {
    if (v.includes(",") || v.includes('"') || v.includes("\n")) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(String(r[h] ?? ""))).join(",")),
  ];
  return lines.join("\n");
}

export function downloadCsv(content: string, filename: string) {
  const bom = "\uFEFF";
  const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
