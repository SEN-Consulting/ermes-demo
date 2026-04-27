/* ──────────────────────────────────────────────────────────────
   ERMES – Newsletter draft & article extraction
   Replicates ermes_core.py generate_newsletter_draft +
   generate_article_extracts_df in TypeScript.
   ────────────────────────────────────────────────────────────── */

import type { SearchResult } from "./searchEngine";

/* ── Newsletter draft ──────────────────────────────────────── */

export function generateNewsletterDraft(
  results: SearchResult[],
  onlyPvs: boolean
): { title: string; text: string } {
  if (results.length === 0) {
    return {
      title: "ERMES | Aggiornamento tecnologie energetiche",
      text: "Nessun risultato disponibile nel batch corrente.",
    };
  }

  let filtered = [...results];
  if (onlyPvs) {
    const pvs = filtered.filter((r) => r.focusPvs.toLowerCase() === "sì");
    if (pvs.length > 0) filtered = pvs;
  }

  const techSet = [...new Set(filtered.map((r) => r.technology).filter(Boolean))];
  let scope = techSet.slice(0, 3).join(", ") || "tecnologie energetiche";
  if (techSet.length > 3) scope += " e altre";

  let title = `ERMES | Aggiornamento su ${scope}`;
  if (onlyPvs) title += " nei Paesi in via di sviluppo";

  const sourceCount = new Set(filtered.map((r) => r.sourceName).filter(Boolean)).size;
  let intro = `Nel periodo analizzato ERMES ha rilevato ${filtered.length} aggiornamenti da ${sourceCount} fonti.`;
  if (techSet.length > 0) intro += ` Le tecnologie toccate sono: ${techSet.slice(0, 6).join(", ")}.`;

  const lines = [title, "", intro, "", "Punti chiave:"];
  let bullets = 0;

  // Group by technology, then sort by date desc
  const ordered = [...filtered].sort((a, b) => {
    const tc = a.technology.localeCompare(b.technology);
    if (tc !== 0) return tc;
    return b.resultPublished.localeCompare(a.resultPublished);
  });

  const groups = new Map<string, SearchResult[]>();
  for (const r of ordered) {
    const key = r.technology || "Altro";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }

  for (const [, sub] of groups) {
    for (const row of sub.slice(0, 3)) {
      if (bullets >= 8) break;
      const tech = row.technology || "Tecnologia";
      const source = row.sourceName || row.resultSourceTitle || "fonte";
      const dateTxt = row.resultPublished || "data n.d.";
      const titleTxt = (row.resultTitle || "aggiornamento rilevato").trim();
      let snippet = (row.resultSnippet || "").trim();
      if (snippet.length > 170) snippet = snippet.slice(0, 167).replace(/\s+\S*$/, "") + "...";
      let bullet = `- ${tech}: ${titleTxt} (${source}, ${dateTxt}).`;
      if (snippet) bullet += ` ${snippet}`;
      lines.push(bullet);
      bullets++;
    }
    if (bullets >= 8) break;
  }

  lines.push("", "Indicazioni operative:");
  if (onlyPvs) {
    lines.push(
      "- Approfondire l'applicabilità nei Paesi in via di sviluppo, con attenzione a costo, bancabilità, requisiti di rete e modelli mini-grid/off-grid."
    );
  } else {
    lines.push(
      "- Verificare quali aggiornamenti meritano di essere riportati nei fogli tematici del database ERMES."
    );
  }
  lines.push(
    "- Trasformare i risultati ad alta rilevanza in nota analitica, policy brief o aggiornamento dashboard."
  );
  lines.push("- Validare i contenuti prima della pubblicazione esterna.");

  return { title, text: lines.join("\n") };
}

/* ── Article extracts ──────────────────────────────────────── */

export interface ArticleExtract {
  batchLabel: string;
  technology: string;
  sourceName: string;
  resultPublished: string;
  resultTitle: string;
  resultUrl: string;
  relevance: string;
  estratto: string;
  riassuntoOperativo: string;
  possibileUtilizzoErmes: string;
  daVerificare: string;
  creatoIl: string;
}

function shortenText(text: string, max: number): string {
  if (!text || text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function buildOperationalSummary(row: SearchResult): string {
  const tech = row.technology || "la tecnologia";
  const title = row.resultTitle || "un aggiornamento";
  const source = row.sourceName || "una fonte";
  const date = row.resultPublished || "data non disponibile";
  let snippet = (row.resultSnippet || "").trim();
  if (snippet.length > 200) snippet = snippet.slice(0, 197).replace(/\s+\S*$/, "") + "...";
  const main = snippet || "estratto non disponibile";
  return `Per ${tech}, il risultato segnala: ${title}. Fonte: ${source}, data: ${date}. Elemento informativo principale: ${main}`;
}

function buildErmesUse(row: SearchResult): string {
  const blob = `${row.queryLabel} ${row.resultTitle} ${row.resultSnippet}`.toLowerCase();
  if (["cost", "capex", "opex", "lcoe", "lcos", "efficiency", "performance"].some((k) => blob.includes(k)))
    return "Aggiornare le sezioni costi, performance o competitività della tecnologia.";
  if (["policy", "regulation", "incentive", "auction", "permitting", "taxonomy"].some((k) => blob.includes(k)))
    return "Aggiornare il quadro policy/regolatorio e valutare impatti su mercato e bancabilità.";
  if (["pilot", "demonstration", "prototype", "project", "plant", "deployment"].some((k) => blob.includes(k)))
    return "Valutare inserimento come caso applicativo, milestone o best practice.";
  if (["developing", "emerging", "global south", "mini-grid", "off-grid", "rural"].some((k) => blob.includes(k)))
    return "Valutare implicazioni per PVS, accesso all'energia, mini-grid/off-grid e condizioni abilitanti.";
  if (["company", "startup", "investment", "funding", "partnership", "utility"].some((k) => blob.includes(k)))
    return "Aggiornare attori, investimenti, partnership o dinamiche industriali.";
  return "Valutare se il risultato merita aggiornamento nei fogli tematici del database ERMES.";
}

export function generateArticleExtracts(
  results: SearchResult[],
  maxRows?: number
): ArticleExtract[] {
  if (results.length === 0) return [];

  let sorted = [...results].sort((a, b) => {
    const tc = a.technology.localeCompare(b.technology);
    if (tc !== 0) return tc;
    return b.resultPublished.localeCompare(a.resultPublished);
  });

  if (maxRows && maxRows > 0) sorted = sorted.slice(0, maxRows);

  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  return sorted.map((row) => ({
    batchLabel: row.batchLabel,
    technology: row.technology,
    sourceName: row.sourceName,
    resultPublished: row.resultPublished,
    resultTitle: row.resultTitle,
    resultUrl: row.resultUrl,
    relevance: row.relevance,
    estratto:
      shortenText(row.resultSnippet, 900) ||
      "Estratto non disponibile dal motore di ricerca: aprire il link per la lettura integrale.",
    riassuntoOperativo: buildOperationalSummary(row),
    possibileUtilizzoErmes: buildErmesUse(row),
    daVerificare: "Sì - sintesi automatica basata su titolo/snippet/link",
    creatoIl: now,
  }));
}

export function extractsToCsv(rows: ArticleExtract[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]) as (keyof ArticleExtract)[];
  const escape = (v: string) => {
    if (v.includes(",") || v.includes('"') || v.includes("\n")) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(String(r[h] ?? ""))).join(",")),
  ].join("\n");
}
