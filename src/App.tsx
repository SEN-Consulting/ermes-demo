import React, { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Bell,
  BookOpen,
  Bot,
  Boxes,
  ChevronRight,
  ClipboardList,
  Cpu,
  Database,
  FileText,
  Filter,
  FlaskConical,
  Globe2,
  LayoutDashboard,
  Newspaper,
  Search,
  Settings2,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Textarea } from './components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

const FEEM_LOGO = 'https://feem-media.s3.eu-central-1.amazonaws.com/wp-content/uploads/feem_logo.svg';

const techs = [
  {
    id: 'pv',
    name: 'Fotovoltaico',
    family: 'Rinnovabili',
    maturity: 'Alta',
    market: 'Globale',
    pvs: 'Alto',
    policy: 89,
    competitiveness: 92,
    sustainability: 84,
    score: 90,
    summary: 'Tecnologia matura, scalabile e molto adatta a uso utility scale, C&I, residenziale e mini-grid.',
    sectors: ['Elettricità', 'Edifici', 'Industria'],
  },
  {
    id: 'wind',
    name: 'Eolico',
    family: 'Rinnovabili',
    maturity: 'Alta',
    market: 'Paesi sviluppati',
    pvs: 'Medio',
    policy: 82,
    competitiveness: 84,
    sustainability: 79,
    score: 84,
    summary: 'Tecnologia consolidata, forte su scala sistema ma più esposta a permitting, rete e pianificazione territoriale.',
    sectors: ['Elettricità', 'Industria'],
  },
  {
    id: 'h2',
    name: 'Idrogeno verde',
    family: 'Vettori innovativi',
    maturity: 'Media',
    market: 'Selettivo',
    pvs: 'Medio-Alto',
    policy: 74,
    competitiveness: 53,
    sustainability: 80,
    score: 68,
    summary: 'Vettore strategico per hard-to-abate, ancora frenato da costi, domanda e infrastrutture.',
    sectors: ['Industria', 'Trasporti', 'Energia'],
  },
  {
    id: 'nuclear',
    name: 'Nucleare avanzato',
    family: 'Basse emissioni',
    maturity: 'Media-Alta',
    market: 'Paesi sviluppati',
    pvs: 'Basso-Medio',
    policy: 58,
    competitiveness: 46,
    sustainability: 63,
    score: 57,
    summary: 'Tecnologia strategica ma con forte dipendenza da regolazione, capitale e tempi autorizzativi.',
    sectors: ['Elettricità', 'Calore di processo'],
  },
  {
    id: 'geo',
    name: 'Geotermico',
    family: 'Rinnovabili',
    maturity: 'Media-Alta',
    market: 'Territoriale',
    pvs: 'Medio',
    policy: 69,
    competitiveness: 61,
    sustainability: 77,
    score: 69,
    summary: 'Fonte programmabile con buon valore di sistema, ma fortemente dipendente da risorsa e contesto locale.',
    sectors: ['Elettricità', 'Calore', 'Industria'],
  },
  {
    id: 'biomass',
    name: 'Biomasse',
    family: 'Rinnovabili',
    maturity: 'Media-Alta',
    market: 'Contestuale',
    pvs: 'Medio-Alto',
    policy: 57,
    competitiveness: 60,
    sustainability: 52,
    score: 58,
    summary: 'Tecnologia utile in nicchie precise, da leggere sempre insieme a sostenibilità di filiera e uso del suolo.',
    sectors: ['Calore', 'Industria', 'Trasporti'],
  },
] as const;

const sourceRows = [
  { name: 'IEA', type: 'Istituzionale', strategy: 'feed + search', priority: 'Alta', last: '2 ore fa', status: 'Attiva' },
  { name: 'JRC', type: 'Istituzionale', strategy: 'search', priority: 'Alta', last: 'ieri', status: 'Attiva' },
  { name: 'Cleantechnica', type: 'Media', strategy: 'feed', priority: 'Media', last: '30 min fa', status: 'Attiva' },
  { name: 'MIT Technology Review', type: 'Media / analysis', strategy: 'search', priority: 'Media', last: '3 giorni fa', status: 'Attiva' },
  { name: 'World Nuclear News', type: 'Specialistica', strategy: 'feed + search', priority: 'Alta', last: '4 ore fa', status: 'Attiva' },
] as const;

const evidenceRows = [
  { title: 'Nuove pipeline su e-fuels e SAF', technology: 'Idrogeno verde', source: 'Cleantechnica', status: 'Da validare', tag: 'Mercato' },
  { title: 'Aggiornamento costi e supply chain clean tech', technology: 'Fotovoltaico', source: 'IEA', status: 'Validato', tag: 'Competitività' },
  { title: 'Permitting eolico e nuove gare', technology: 'Eolico', source: 'JRC', status: 'Pubblicabile', tag: 'Policy' },
  { title: 'SMR e approcci avanzati', technology: 'Nucleare avanzato', source: 'World Nuclear News', status: 'In revisione', tag: 'Technology watch' },
] as const;

const publicArticles = [
  {
    title: 'Cinque segnali da monitorare sulle tecnologie energetiche nel 2026',
    type: 'Note rapide',
    audience: 'Pubblico / decisori',
    topic: 'Osservatorio delle tecnologie',
    excerpt: 'Una lettura trasversale su costi, filiere, policy e nuove geografie industriali della transizione.',
  },
  {
    title: 'Quali tecnologie sono più adatte ai Paesi in via di sviluppo?',
    type: 'Policy brief',
    audience: 'Cooperazione / policy',
    topic: 'Osservatorio delle tecnologie',
    excerpt: 'Non esiste una tecnologia migliore in assoluto: conta il contesto, la rete, il capitale e la capacità tecnica locale.',
  },
  {
    title: 'Fotovoltaico, eolico, idrogeno: cosa leggere davvero oltre gli annunci',
    type: 'Newsletter',
    audience: 'Stakeholder',
    topic: 'Osservatorio delle tecnologie',
    excerpt: 'Un formato editoriale pensato per sintetizzare i segnali rilevanti emersi dal monitoraggio delle fonti.',
  },
  {
    title: 'Nuove traiettorie di policy industriale per clean tech in Europa',
    type: 'Focus tematico',
    audience: 'Policy maker',
    topic: 'Osservatorio sulle Policy',
    excerpt: 'Una lettura comparata delle scelte di policy che stanno influenzando competitività, filiere e velocità di deployment.',
  },
  {
    title: 'Direttive europee e impatti sulle tecnologie energetiche emergenti',
    type: 'Scheda decisore',
    audience: 'Istituzioni / stakeholder',
    topic: 'Osservatorio Direttive Europee',
    excerpt: 'Come leggere obblighi, opportunità e implicazioni operative delle principali direttive UE per il sistema energetico.',
  },
  {
    title: 'Tassonomia, permitting e mercato: dove stanno cambiando davvero le regole',
    type: 'Articolo',
    audience: 'Pubblico informato',
    topic: 'Osservatorio sulle Policy',
    excerpt: 'Un articolo divulgativo per capire quali leve regolatorie incidono di più sull’adozione delle tecnologie.',
  },
] as const;

const updates = [
  { title: 'Nuove policy industriali per clean tech', category: 'Policy emergenti', tech: 'Fotovoltaico', date: 'Oggi' },
  { title: 'Segnali su nuovi impianti eolici offshore', category: 'Deployment', tech: 'Eolico', date: 'Ieri' },
  { title: 'Focus su idrogeno e usi hard-to-abate', category: 'Trend', tech: 'Idrogeno verde', date: '2 giorni fa' },
  { title: 'SMR e nuovi annunci di filiera', category: 'Technology watch', tech: 'Nucleare avanzato', date: '3 giorni fa' },
] as const;

const compareRadar = [
  { subject: 'Maturità', pv: 92, wind: 88, h2: 55 },
  { subject: 'Competitività', pv: 91, wind: 84, h2: 52 },
  { subject: 'PVS fit', pv: 90, wind: 63, h2: 68 },
  { subject: 'Policy fit', pv: 89, wind: 82, h2: 74 },
  { subject: 'Sostenibilità', pv: 84, wind: 79, h2: 80 },
] as const;

const timelineData = [
  { month: 'Nov', updates: 14 },
  { month: 'Dec', updates: 18 },
  { month: 'Jan', updates: 21 },
  { month: 'Feb', updates: 16 },
  { month: 'Mar', updates: 27 },
  { month: 'Apr', updates: 33 },
] as const;

const workflowData = [
  { name: 'Bozza', value: 14 },
  { name: 'Revisione', value: 9 },
  { name: 'Validato', value: 22 },
  { name: 'Pubblicato', value: 17 },
] as const;

const blogTopics = [
  'Tutti',
  'Osservatorio delle tecnologie',
  'Osservatorio sulle Policy',
  'Osservatorio Direttive Europee',
] as const;

const navPublic = [
  { id: 'home', label: 'Home' },
  { id: 'tech', label: 'Tecnologie' },
  { id: 'compare', label: 'Confronta' },
  { id: 'markets', label: 'Mercati di riferimento' },
  { id: 'publications', label: 'Pubblicazioni' },
  { id: 'blog', label: 'Blog pubblico' },
  { id: 'assistant', label: 'Chatbot ERMES' },
  { id: 'method', label: 'Metodologia' },
] as const;

const navApp = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'research', label: 'Ricerca avanzata', icon: Search },
  { id: 'sources', label: 'Fonti', icon: Globe2 },
  { id: 'technologies', label: 'Tecnologie', icon: Database },
  { id: 'components', label: 'Componenti', icon: Boxes },
  { id: 'evidence', label: 'Evidenze', icon: ClipboardList },
  { id: 'editorial', label: 'Workflow editoriale', icon: Newspaper },
  { id: 'settings', label: 'Configurazione', icon: Settings2 },
] as const;

type PublicPage = (typeof navPublic)[number]['id'];
type AppPage = (typeof navApp)[number]['id'];
type Surface = 'public' | 'app';
type ChatMode = 'semplice' | 'analitica';
type ResultsMode = 'fonti' | 'contenuti';
type BlogTopic = (typeof blogTopics)[number];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  text: string;
  action?: React.ReactNode;
};

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
};

function scoreColor(value: number) {
  if (value >= 75) return 'bg-emerald-100 text-emerald-700';
  if (value >= 55) return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

function SectionHeader({ eyebrow, title, text, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{text}</p>
      </div>
      {action}
    </div>
  );
}

function MetricCard({ label, value, hint, icon: Icon }: MetricCardProps) {
  return (
    <Card className="rounded-[24px] border-slate-200/70 shadow-sm">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{hint}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
}

function PublicTopNav({
  publicPage,
  setPublicPage,
}: {
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage) => void;
}) {
  return (
    <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 md:px-6">
        {navPublic.map((item) => (
          <Button
            key={item.id}
            variant={publicPage === item.id ? 'default' : 'ghost'}
            className="rounded-2xl"
            onClick={() => setPublicPage(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function PublicHome() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Card className="overflow-hidden rounded-[32px] border-0 bg-slate-950 text-white shadow-2xl">
            <CardContent className="p-8 md:p-10">
              <Badge className="mb-6 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">Portale pubblico ERMES</Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                ERMES monitora, confronta e racconta l’evoluzione delle tecnologie energetiche.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Un sito informativo pensato sia per chi deve decidere sia per chi vuole capire meglio. Tecnologie, aggiornamenti, policy brief, blog e assistente conversazionale in un’unica esperienza pubblica.
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
            <CardTitle>Per chi è pensato</CardTitle>
            <CardDescription>Il tono e la struttura sono quelli di un portale informativo, non di una dashboard tecnica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ['Policy maker', 'Confronti rapidi, messaggi chiave, policy brief e contenuti sintetici.'],
              ['Utente informato', 'Articoli, aggiornamenti, schede tecnologia e spiegazioni chiare.'],
              ['Analista o esperto', 'Accesso a sezioni più dense come confronto, mercati, metodologia e chatbot in modalità analitica.'],
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
        <MetricCard label="Tecnologie monitorate" value="11+" hint="portfolio base ERMES" icon={Cpu} />
        <MetricCard label="Componenti / sottosistemi" value="40+" hint="mappati per tecnologia" icon={Boxes} />
        <MetricCard label="Fonti classificate" value="30+" hint="istituzionali, media, database" icon={Globe2} />
        <MetricCard label="Output editoriali" value="Report • Brief • Newsletter" hint="disseminazione continua" icon={FileText} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Tecnologie in evidenza</CardTitle>
            <CardDescription>Card sintetiche leggibili anche da un utente non tecnico.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {techs.slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.family}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreColor(t.score)}`}>{t.score}/100</span>
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

function PublicTech() {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return techs;
    return techs.filter((t) => [t.name, t.family, t.market, t.summary].join(' ').toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Tecnologie"
        title="Una stessa tecnologia, tre livelli di lettura."
        text="Sintesi per decisori, analisi per utenti tecnici, evidenze per chi vuole andare fino al dettaglio."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl pl-9"
              placeholder="Cerca tecnologia, famiglia o mercato"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Filtri base</Badge>
            <Badge variant="outline" className="rounded-full">Filtri avanzati</Badge>
            <Badge variant="outline" className="rounded-full">Vista card / tabellare</Badge>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        {filtered.map((t) => (
          <Card key={t.id} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  <CardDescription>{t.family} • {t.market}</CardDescription>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreColor(t.score)}`}>{t.score}/100</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-slate-600">{t.summary}</p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Maturità</div><div className="mt-2 text-lg font-semibold">{t.maturity}</div></div>
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Applicabilità PVS</div><div className="mt-2 text-lg font-semibold">{t.pvs}</div></div>
                <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">Policy fit</div><div className="mt-2 text-lg font-semibold">{t.policy}/100</div></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.sectors.map((sector) => (
                  <Badge key={sector} className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{sector}</Badge>
                ))}
              </div>
              <Button className="rounded-2xl">Apri scheda tecnologia</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PublicCompare() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Confronta"
        title="Uno strumento pensato per convincere un decisore in pochi minuti."
        text="Radar chart, tabella comparativa, semafori e sintesi finale: tutto in una singola vista pulita."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Confronto rapido</CardTitle>
            <CardDescription>Fotovoltaico, eolico e idrogeno verde.</CardDescription>
          </CardHeader>
          <CardContent className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[...compareRadar]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar dataKey="pv" stroke="#0f172a" fill="#0f172a" fillOpacity={0.15} />
                <Radar dataKey="wind" stroke="#475569" fill="#475569" fillOpacity={0.12} />
                <Radar dataKey="h2" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.12} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Chi vince su cosa</CardTitle>
            <CardDescription>Box sintetico molto utile per una presentazione istituzionale.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ['Competitività', 'Fotovoltaico'],
              ['Maturità industriale', 'Fotovoltaico / Eolico'],
              ['Applicabilità PVS', 'Fotovoltaico'],
              ['Flessibilità per hard-to-abate', 'Idrogeno verde'],
              ['Tempi e semplicità di deployment', 'Fotovoltaico'],
            ].map(([metric, winner]) => (
              <div key={metric} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                <span className="text-slate-600">{metric}</span>
                <span className="font-medium text-slate-950">{winner}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PublicMarkets() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Mercati di riferimento"
        title="La sezione che rende ERMES più utile di una semplice banca dati."
        text="Per ogni tecnologia, il portale distingue tra Paesi sviluppati, PVS e contesti misti, con attenzione a capitale, rete, competenze e prerequisiti locali."
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Vista per tecnologia</CardTitle>
            <CardDescription>Aiuta a capire subito la differenza fra tecnologie buone in generale e tecnologie adatte al contesto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {techs.slice(0, 5).map((t) => (
              <div key={t.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_0.9fr_0.8fr_1.2fr] md:items-center">
                <div>
                  <div className="font-medium text-slate-950">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.family}</div>
                </div>
                <div className="text-sm"><span className="font-medium text-slate-950">Mercato:</span> {t.market}</div>
                <div className="text-sm"><span className="font-medium text-slate-950">PVS:</span> {t.pvs}</div>
                <div className="text-sm leading-6 text-slate-600">Prerequisiti, intensità di capitale e capacità tecnica locale disponibili in scheda dettaglio.</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Use case rapidi</CardTitle>
            <CardDescription>Blocchi pronti da mostrare in riunione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              'Tecnologie più adatte a contesti con rete fragile',
              'Tecnologie con miglior fit per accesso all’energia',
              'Tecnologie utili in paesi ricchi di rinnovabili ma con limitata capacità industriale',
            ].map((text) => (
              <div key={text} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{text}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PublicPublications() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Pubblicazioni"
        title="Report, brief, newsletter e articoli sono una parte centrale della proposta di valore."
        text="La sezione pubblica deve far percepire che ERMES non si limita a raccogliere dati, ma li trasforma in prodotti utili e leggibili."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Report', 'Approfondimenti strutturati per analisti e stakeholder'],
          ['Policy brief', 'Sintesi orientate a decisioni e regolazione'],
          ['Newsletter', 'Aggiornamenti periodici da distribuire'],
          ['Schede decisore', 'Letture ultra-sintetiche pronte per riunioni'],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
              <Button className="mt-4 w-full rounded-2xl">Apri archivio</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PublicBlog() {
  const [topic, setTopic] = useState<BlogTopic>('Tutti');
  const filteredArticles = useMemo(() => {
    if (topic === 'Tutti') return publicArticles;
    return publicArticles.filter((article) => article.topic === topic);
  }, [topic]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Blog pubblico"
        title="Una sezione editoriale filtrabile per osservatorio, utile sia per il pubblico sia per i decisori."
        text="Gli articoli possono essere generati o assistiti dall’AI, ma pubblicati come contenuti editoriali curati, leggibili e organizzati per topic."
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
                variant={topic === item ? 'default' : 'outline'}
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
              <Button variant="ghost" className="mt-4 rounded-2xl px-0 text-slate-950 hover:bg-transparent">Leggi l’articolo <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PublicAssistant() {
  const [mode, setMode] = useState<ChatMode>('semplice');
  const [prompt, setPrompt] = useState('Quali tecnologie sono più adatte ai Paesi in via di sviluppo?');

  const answer = useMemo(() => {
    if (!prompt) return '';
    if (prompt.toLowerCase().includes('paesi in via di sviluppo')) {
      return mode === 'semplice'
        ? 'Nel mockup ERMES, fotovoltaico e mini-grid ibride emergono come opzioni molto interessanti per i Paesi in via di sviluppo, soprattutto dove contano modularità, costi e rapidità di deployment.'
        : 'Lettura analitica simulata: fotovoltaico, mini-grid ibride e alcune filiere biomassa sostenibile mostrano il miglior fit nei PVS. I driver sono modularità, minore dipendenza da grandi infrastrutture, possibilità di deployment distribuito e migliore adattabilità a contesti con rete fragile. L’idrogeno verde appare rilevante solo in casi selettivi, con risorse rinnovabili abbondanti, domanda industriale e capacità di export.';
    }
    return mode === 'semplice'
      ? 'ERMES sintetizza i contenuti in modo leggibile e orienta l’utente verso schede, aggiornamenti e pubblicazioni.'
      : 'ERMES può spiegare, confrontare, sintetizzare aggiornamenti recenti e suggerire fonti o pubblicazioni collegate. In questo mockup la risposta è simulata, ma l’interfaccia è già pensata per una futura AI reale.';
  }, [prompt, mode]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Chatbot ERMES"
        title="AI simulata, ma resa in modo credibile per la presentazione."
        text="Nessun backend complesso: solo una UX pulita che fa percepire come potrà funzionare l’assistente nella piattaforma definitiva."
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Prompt guidati</CardTitle>
            <CardDescription>Perfetti per mostrare subito il valore della piattaforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Spiegami il nucleare di IV generazione',
              'Confronta eolico e geotermico',
              'Quali novità negli ultimi 6 mesi sull’idrogeno verde?',
              'Quali tecnologie sono più adatte ai Paesi in via di sviluppo?',
              'Fammi una sintesi per decisori',
            ].map((item) => (
              <button key={item} onClick={() => setPrompt(item)} className="w-full rounded-2xl border border-slate-200 p-4 text-left text-sm leading-6 hover:bg-slate-50">
                {item}
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Assistente simulato</CardTitle>
                <CardDescription>Modalità semplice e modalità analitica.</CardDescription>
              </div>
              <Tabs value={mode} onValueChange={(v) => setMode(v as ChatMode)}>
                <TabsList className="rounded-2xl">
                  <TabsTrigger value="semplice">Semplice</TabsTrigger>
                  <TabsTrigger value="analitica">Analitica</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="rounded-2xl" />
            <div className="rounded-3xl border border-dashed border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-950"><Bot className="h-4 w-4" /> Risposta ERMES</div>
              <p className="text-sm leading-7 text-slate-600">{answer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">AI simulata</Badge>
                <Badge variant="outline" className="rounded-full">UX pronta per presentazione</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PublicMethod() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Metodologia"
        title="Una sezione fondamentale per rendere la piattaforma credibile agli occhi di partner e clienti."
        text="Qui si spiegano technology watch, horizon scanning, P-TEA, fonti, criteri di classificazione, semafori, ranking e limiti d’uso."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['Come funziona ERMES', 'Spiegazione semplice del motore dati e degli output.'],
          ['Fonti informative', 'Mappa delle fonti classificate e logiche di monitoraggio.'],
          ['Criteri di classificazione', 'Come sono lette maturità, competitività, sostenibilità e mercati.'],
          ['Aggiornamento dei dati', 'Flusso di ricerca, selezione, validazione e pubblicazione.'],
          ['Semafori e ranking', 'Criteri di scoring e logiche di comparazione.'],
          ['Limiti e avvertenze', 'Cosa è benchmark, cosa è evidenza, cosa è interpretazione.'],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AppDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Webapp analista"
        title="Una dashboard leggera ma credibile per gestire la piattaforma."
        text="Qui non serve backend reale: serve far vedere bene il cockpit di monitoraggio, aggiornamento e produzione contenuti."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Aggiornamenti da validare" value="18" hint="priorità di oggi" icon={Bell} />
        <MetricCard label="Fonti attive" value="27" hint="strategie differenziate" icon={Globe2} />
        <MetricCard label="Schede complete" value="11/11" hint="copertura portafoglio" icon={Database} />
        <MetricCard label="Contenuti in workflow" value="31" hint="blog, brief, newsletter" icon={Newspaper} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Pipeline editoriale</CardTitle>
            <CardDescription>Molto utile per mostrare che la piattaforma non è solo archivio ma motore di disseminazione.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...workflowData]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Cose da fare oggi</CardTitle>
            <CardDescription>Una colonna operativa molto efficace in presentazione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Validare gli aggiornamenti su nucleare avanzato e idrogeno verde.',
              'Rivedere la strategia di 3 fonti istituzionali poco produttive.',
              'Trasformare 2 evidenze in articolo pubblico e 1 in policy brief.',
              'Chiudere la bozza newsletter del mese.',
            ].map((todo) => (
              <div key={todo} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{todo}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdvancedResearch() {
  const [mode, setMode] = useState<ResultsMode>('fonti');
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Ricerca avanzata"
        title="La maschera chiave per l’analista che deve arricchire la piattaforma."
        text="Questa vista serve a lanciare ricerche, filtrare gli esiti, classificare le evidenze e trasformarle in contenuti o aggiornamenti di scheda."
        action={<Button className="rounded-2xl"><Sparkles className="mr-2 h-4 w-4" /> Ricerca assistita</Button>}
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <Select defaultValue="all-tech">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Tecnologia" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-tech">Tutte le tecnologie</SelectItem>
              <SelectItem value="pv">Fotovoltaico</SelectItem>
              <SelectItem value="wind">Eolico</SelectItem>
              <SelectItem value="h2">Idrogeno verde</SelectItem>
              <SelectItem value="nuclear">Nucleare avanzato</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="6m">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Periodo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Ultimo mese</SelectItem>
              <SelectItem value="6m">Ultimi 6 mesi</SelectItem>
              <SelectItem value="12m">Ultimi 12 mesi</SelectItem>
              <SelectItem value="36m">Ultimi 36 mesi</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="classified">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Fonti" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="classified">Fonti classificate</SelectItem>
              <SelectItem value="specific">Fonte specifica</SelectItem>
              <SelectItem value="hybrid">Ricerca ibrida</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="pvs-all">
            <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Focus PVS" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pvs-all">Tutti i mercati</SelectItem>
              <SelectItem value="pvs-only">Solo PVS</SelectItem>
              <SelectItem value="developed">Solo Paesi sviluppati</SelectItem>
            </SelectContent>
          </Select>
          <Input className="rounded-2xl md:col-span-2 xl:col-span-4" defaultValue="novità tecnologiche, costi, policy, applicabilità nei Paesi in via di sviluppo" />
          <div className="flex flex-col gap-3 md:col-span-2 xl:col-span-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl">Lancia ricerca</Button>
              <Button variant="outline" className="rounded-2xl"><Filter className="mr-2 h-4 w-4" /> Query predefinite</Button>
            </div>
            <div className="text-sm text-slate-500">Maschera pensata per restare pulita anche in responsive.</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Risultati trovati</CardTitle>
                <CardDescription>Vista selezionabile per l’analista.</CardDescription>
              </div>
              <Tabs value={mode} onValueChange={(v) => setMode(v as ResultsMode)}>
                <TabsList className="rounded-2xl">
                  <TabsTrigger value="fonti">Per fonte</TabsTrigger>
                  <TabsTrigger value="contenuti">Per contenuto</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {evidenceRows.map((row) => (
              <div key={row.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{row.technology}</Badge>
                  <Badge variant="outline" className="rounded-full">{row.tag}</Badge>
                  <span>{row.source}</span>
                </div>
                <div className="mt-2 font-medium text-slate-950">{row.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-xl">Importa</Button>
                  <Button size="sm" variant="outline" className="rounded-xl">Aggiungi a scheda</Button>
                  <Button size="sm" variant="outline" className="rounded-xl">Crea articolo</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Classificazione rapida</CardTitle>
            <CardDescription>Il mockup fa vedere come un analista può trasformare una ricerca in contenuto strutturato.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="policy">
              <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="policy">Categoria: policy</SelectItem>
                <SelectItem value="market">Categoria: mercato</SelectItem>
                <SelectItem value="cost">Categoria: costi e competitività</SelectItem>
                <SelectItem value="watch">Categoria: technology watch</SelectItem>
              </SelectContent>
            </Select>
            <Textarea className="min-h-[160px] rounded-2xl" defaultValue="Sintesi umana dell’evidenza, pronta per essere salvata come aggiornamento, alimentare una scheda tecnologia o diventare la base di un articolo pubblico." />
            <div className="grid gap-3 md:grid-cols-2">
              <Button className="rounded-2xl">Salva come evidenza</Button>
              <Button variant="outline" className="rounded-2xl">Invia a workflow editoriale</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SourcesPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Fonti"
        title="Gestione delle fonti informative e delle strategie di ricerca."
        text="Una sezione visiva e ordinata che fa capire subito come la piattaforma governa fonti classificate, priorità e metodi di interrogazione."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-3 p-6">
          {sourceRows.map((row) => (
            <div key={row.name} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.1fr_0.8fr_0.8fr_0.7fr_0.7fr_0.6fr] md:items-center">
              <div>
                <div className="font-medium text-slate-950">{row.name}</div>
                <div className="text-sm text-slate-500">{row.type}</div>
              </div>
              <div className="text-sm text-slate-600">{row.strategy}</div>
              <div className="text-sm text-slate-600">Priorità {row.priority}</div>
              <div className="text-sm text-slate-600">{row.last}</div>
              <div className="text-sm text-slate-600">{row.status}</div>
              <Button variant="outline" className="rounded-xl">Modifica</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TechnologiesPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Tecnologie e componenti"
        title="Gestione catalogo tecnologia, componenti, mercati e attributi chiave."
        text="Questa vista mostra che la piattaforma non è solo editoriale ma anche gestionale: l’analista può curare il portafoglio e mantenerlo coerente."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Registro tecnologie</CardTitle>
            <CardDescription>Elenco amministrabile delle tecnologie monitorate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {techs.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-medium text-slate-950">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.family} • {t.market}</div>
                </div>
                <Button variant="outline" className="rounded-xl">Apri</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Componenti chiave</CardTitle>
            <CardDescription>Vista utile per far capire la profondità tecnica futura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Moduli, inverter e BOS – fotovoltaico',
              'Turbine, fondazioni e rete – eolico',
              'Elettrolizzatori, storage e trasporto – idrogeno',
              'Reattore, BOP e supply chain – nucleare avanzato',
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EvidencePanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Evidenze raccolte"
        title="Archivio operativo delle evidenze emerse dalle ricerche."
        text="Una sezione centrale per collegare il motore di ricerca, il database e la produzione editoriale."
      />
      <Card className="rounded-[28px] shadow-sm">
        <CardContent className="space-y-3 p-6">
          {evidenceRows.map((row) => (
            <div key={row.title} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.2fr_0.9fr_0.8fr_0.7fr_0.8fr] md:items-center">
              <div>
                <div className="font-medium text-slate-950">{row.title}</div>
                <div className="text-sm text-slate-500">{row.source}</div>
              </div>
              <div className="text-sm text-slate-600">{row.technology}</div>
              <div className="text-sm text-slate-600">{row.tag}</div>
              <div className="text-sm text-slate-600">{row.status}</div>
              <div className="flex gap-2">
                <Button size="sm" className="rounded-xl">Valida</Button>
                <Button size="sm" variant="outline" className="rounded-xl">Apri</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function EditorialPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Workflow editoriale"
        title="Dal dato all’articolo, dalla ricerca alla newsletter."
        text="Questa è la parte che rende il mockup vendibile: mostra il percorso completo da evidenza a contenuto pubblico."
      />
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Stati del workflow</CardTitle>
            <CardDescription>Bozza, revisione, validato, pubblicabile, pubblicato.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ['Bozza', 'Evidenza importata dal motore di ricerca'],
              ['In revisione', 'Sintesi analista e controllo coerenza'],
              ['Validato', 'Contenuto approvato internamente'],
              ['Pubblicabile', 'Pronto per blog, brief o newsletter'],
              ['Pubblicato', 'Visibile nella sezione pubblica'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-950">{title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{text}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Generatore contenuti</CardTitle>
            <CardDescription>AI solo simulata, ma resa bene per la presentazione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="article">
              <SelectTrigger className="rounded-2xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Articolo blog</SelectItem>
                <SelectItem value="brief">Policy brief</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="decision-maker">Scheda decisore</SelectItem>
              </SelectContent>
            </Select>
            <Textarea className="min-h-[180px] rounded-2xl" defaultValue="Prompt editoriale simulato: trasforma le evidenze validate in un contenuto chiaro, leggibile e coerente con il tone of voice dell’Osservatorio ERMES." />
            <div className="grid gap-3 md:grid-cols-2">
              <Button className="rounded-2xl"><Sparkles className="mr-2 h-4 w-4" /> Genera bozza</Button>
              <Button variant="outline" className="rounded-2xl">Invia al blog pubblico</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Configurazione"
        title="Una vista semplice per query, tassonomie e parametri di piattaforma."
        text="Non serve implementare tutta la logica: basta una UX pulita che mostri come la piattaforma sarà amministrabile nel progetto cloud finale."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['Query predeterminate', 'Gestione delle query base per technology watch, policy, costi, mercati e focus PVS.'],
          ['Tassonomie', 'Categorie tecnologie, componenti, mercati, tag editoriali e tipologie di output.'],
          ['Semafori e ranking', 'Regole di scoring e visualizzazione.'],
          ['Canali editoriali', 'Blog, newsletter, policy brief, archivio documentale.'],
          ['Parametri ricerca', 'Strategie feed/search, priorità fonti, intervalli temporali.'],
          ['Branding', 'Logo, palette, tone of voice e stile grafico della piattaforma.'],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ERMESCloudDemoMockup() {
  const [surface, setSurface] = useState<Surface>('public');
  const [publicPage, setPublicPage] = useState<PublicPage>('home');
  const [appPage, setAppPage] = useState<AppPage>('dashboard');

  const renderPublic = () => {
    if (publicPage === 'home') return <PublicHome />;
    if (publicPage === 'tech') return <PublicTech />;
    if (publicPage === 'compare') return <PublicCompare />;
    if (publicPage === 'markets') return <PublicMarkets />;
    if (publicPage === 'publications') return <PublicPublications />;
    if (publicPage === 'blog') return <PublicBlog />;
    if (publicPage === 'assistant') return <PublicAssistant />;
    return <PublicMethod />;
  };

  const renderApp = () => {
    if (appPage === 'dashboard') return <AppDashboard />;
    if (appPage === 'research') return <AdvancedResearch />;
    if (appPage === 'sources') return <SourcesPanel />;
    if (appPage === 'technologies' || appPage === 'components') return <TechnologiesPanel />;
    if (appPage === 'evidence') return <EvidencePanel />;
    if (appPage === 'editorial') return <EditorialPanel />;
    return <SettingsPanel />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              <img src={FEEM_LOGO} alt="Fondazione Eni Enrico Mattei" className="h-8 w-auto" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Fondazione Eni Enrico Mattei</div>
              <div className="text-xl font-semibold tracking-tight text-slate-950">Mockup ERMES</div>
            </div>
          </div>
          <Tabs value={surface} onValueChange={(v) => setSurface(v as Surface)}>
            <TabsList className="rounded-2xl bg-slate-100 p-1">
              <TabsTrigger value="public" className="rounded-xl">Sito pubblico</TabsTrigger>
              <TabsTrigger value="app" className="rounded-xl">Webapp utente</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {surface === 'public' ? (
        <>
          <PublicTopNav publicPage={publicPage} setPublicPage={setPublicPage} />
          <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">{renderPublic()}</main>
        </>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 xl:grid-cols-[260px_1fr]">
          <aside className="rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-sm">
            <div className="mb-4 rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-950">Navigazione analista</div>
              <div className="mt-1 text-sm leading-6 text-slate-600">
                Dashboard di monitoraggio e gestione della piattaforma con ricerca avanzata, fonti, evidenze, workflow editoriale e configurazione.
              </div>
            </div>
            <div className="space-y-2">
              {navApp.map((item) => {
                const Icon = item.icon;
                const active = appPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAppPage(item.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${active ? 'bg-slate-950 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="space-y-6">{renderApp()}</main>
        </div>
      )}
    </div>
  );
}
