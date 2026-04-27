/**
 * Evidenze store – persists saved evidence to localStorage.
 * Each "evidenza" is a search result that has been validated and saved
 * through the research workflow.
 */

import type { SearchResult } from "./searchEngine";

export interface Evidenza {
  id: string;
  savedAt: string;
  technology: string;
  sourceName: string;
  title: string;
  url: string;
  snippet: string;
  published: string;
  relevance: "Alta" | "Media" | "Bassa";
  category: string;
  priority: "Alta" | "Media" | "Bassa";
  queryId: string;
  queryLabel: string;
  focusPvs: string;
  note: string;
}

const STORAGE_KEY = "ermes_evidenze";

function load(): Evidenza[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: Evidenza[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getEvidenze(): Evidenza[] {
  return load();
}

export function addEvidenze(items: Evidenza[]): Evidenza[] {
  const existing = load();
  const existingUrls = new Set(existing.map((e) => e.url));
  const newItems = items.filter((e) => !existingUrls.has(e.url));
  const merged = [...newItems, ...existing];
  save(merged);
  return merged;
}

export function removeEvidenza(id: string): Evidenza[] {
  const updated = load().filter((e) => e.id !== id);
  save(updated);
  return updated;
}

export function clearEvidenze(): Evidenza[] {
  save([]);
  return [];
}

export function searchResultToEvidenza(
  r: SearchResult,
  category: string,
  priority: "Alta" | "Media" | "Bassa",
  note: string
): Evidenza {
  return {
    id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
    technology: r.technology,
    sourceName: r.sourceName,
    title: r.resultTitle,
    url: r.resultUrl,
    snippet: r.resultSnippet,
    published: r.resultPublished,
    relevance: r.relevance,
    category,
    priority,
    queryId: r.queryId,
    queryLabel: r.queryLabel,
    focusPvs: r.focusPvs,
    note,
  };
}
