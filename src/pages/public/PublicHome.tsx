import { Boxes, Cpu, FileText, Globe2 } from "lucide-react";
import { techs, sourceRows, updates } from "../../data/mockData";
import { scoreColor } from "../../lib/scoreColor";
import { MetricCard } from "../../components/shared/MetricCard";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export function PublicHome() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Card className="overflow-hidden rounded-[32px] border-0 bg-slate-950 text-white shadow-2xl">
            <CardContent className="p-8 md:p-10">
              <Badge className="mb-6 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">Portale pubblico ERMES</Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                ERMES monitora, confronta e racconta l'evoluzione delle tecnologie energetiche.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Un sito informativo pensato sia per chi deve decidere sia per chi vuole capire meglio. Tecnologie, aggiornamenti, policy brief, blog e assistente conversazionale in un'unica esperienza pubblica.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100">Esplora in modo semplice</Button>
                <Button variant="outline" className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10">Analizza in modo avanzato</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle>Per chi e pensato</CardTitle>
            <CardDescription>Il tono e la struttura sono quelli di un portale informativo, non di una dashboard tecnica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Policy maker", "Confronti rapidi, messaggi chiave, policy brief e contenuti sintetici."],
              ["Utente informato", "Articoli, aggiornamenti, schede tecnologia e spiegazioni chiare."],
              ["Analista o esperto", "Accesso a sezioni piu dense come confronto, mercati, metodologia e chatbot in modalita analitica."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-950">{title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{text}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Tecnologie monitorate" value={`${techs.length}`} hint="portfolio ERMES completo" icon={Cpu} />
        <MetricCard label="Componenti / sottosistemi" value="44+" hint="mappati per tecnologia" icon={Boxes} />
        <MetricCard label="Fonti classificate" value={`${sourceRows.length}`} hint="istituzionali, media, database" icon={Globe2} />
        <MetricCard label="Output editoriali" value="Report • Brief • Newsletter" hint="disseminazione continua" icon={FileText} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Tecnologie in evidenza</CardTitle>
            <CardDescription>Card sintetiche leggibili anche da un utente non tecnico.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[...techs].sort((a, b) => a.rank - b.rank).slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.family} • #{t.rank}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.semaforo === 'VERDE' ? 'bg-emerald-100 text-emerald-800' : t.semaforo === 'GIALLO' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{t.score}/100</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{t.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Ultimi aggiornamenti</CardTitle>
            <CardDescription>La parte viva del sito pubblico, alimentata poi dal motore Python.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {updates.map((u) => (
              <div key={u.title} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Badge className="rounded-full bg-white text-slate-700 hover:bg-white">{u.tech}</Badge>
                  <span>{u.category}</span>
                  <span>•</span>
                  <span>{u.date}</span>
                </div>
                <div className="mt-2 font-medium text-slate-950">{u.title}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
