/* ──────────────────────────────────────────────────────────────
   ERMES – Libreria query per ricerca automatica
   Replica della DEFAULT_QUERY_LIBRARY Python in TypeScript.
   ────────────────────────────────────────────────────────────── */

export interface QueryTemplate {
  queryId: string;
  categoria: string;
  nome: string;
  template: string;          // {technology} placeholder
  richiede_tecnologia: boolean;
  focusPvs: boolean;
  uso: string;
}

export const queryLibrary: QueryTemplate[] = [
  {
    queryId: "Q001",
    categoria: "Aggiornamento",
    nome: "Aggiornamenti generali sulla tecnologia",
    template: '"{technology}" latest news OR recent developments OR update',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per un primo aggiornamento ampio su qualsiasi tecnologia.",
  },
  {
    queryId: "Q002",
    categoria: "Milestone",
    nome: "Milestone e traguardi tecnologici",
    template: '"{technology}" breakthrough OR milestone OR record OR demonstration project',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per identificare avanzamenti tecnici significativi.",
  },
  {
    queryId: "Q003",
    categoria: "Costi",
    nome: "Costi e performance",
    template: '"{technology}" cost reduction OR LCOE OR CAPEX OR efficiency improvement OR cost benchmark',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per aggiornare le sezioni economiche e comparative.",
  },
  {
    queryId: "Q004",
    categoria: "Policy",
    nome: "Policy e regolazione",
    template: '"{technology}" policy OR regulation OR incentive OR subsidy OR auction OR permitting',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per monitorare il quadro normativo e di incentivazione.",
  },
  {
    queryId: "Q005",
    categoria: "Attori",
    nome: "Attori e investimenti",
    template: '"{technology}" investment OR funding OR partnership OR company OR startup OR utility',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per mappare attori, investimenti e dinamiche industriali.",
  },
  {
    queryId: "Q006",
    categoria: "Best practice",
    nome: "Best practice e casi applicativi",
    template: '"{technology}" best practice OR case study OR pilot project OR deployment OR application',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per arricchire le schede con casi applicativi reali.",
  },
  {
    queryId: "Q007",
    categoria: "PVS",
    nome: "Applicabilità nei Paesi in via di sviluppo",
    template: '"{technology}" developing countries OR emerging economies OR global south OR mini-grid OR off-grid',
    richiede_tecnologia: true,
    focusPvs: true,
    uso: "Per analisi mirate sui PVS, accesso all'energia e soluzioni distribuite.",
  },
  {
    queryId: "Q008",
    categoria: "PVS",
    nome: "Mini-grid e soluzioni off-grid",
    template: '"{technology}" mini-grid OR off-grid OR rural electrification OR energy access OR distributed energy',
    richiede_tecnologia: true,
    focusPvs: true,
    uso: "Per il tema specifico mini-grid, off-grid e accesso all'energia.",
  },
  {
    queryId: "Q009",
    categoria: "PVS",
    nome: "Barriere e condizioni abilitanti nei PVS",
    template: '"{technology}" barriers OR bankability OR affordability OR local capability OR grid readiness developing countries',
    richiede_tecnologia: true,
    focusPvs: true,
    uso: "Per capire limiti applicativi in economie emergenti.",
  },
  {
    queryId: "Q010",
    categoria: "PVS",
    nome: "Applicabilità industriale nei PVS",
    template: '"{technology}" industrial use OR local manufacturing OR supply chain OR workforce developing countries',
    richiede_tecnologia: true,
    focusPvs: true,
    uso: "Per leggere la tecnologia in chiave industriale e di filiera nei PVS.",
  },
  {
    queryId: "Q011",
    categoria: "Nucleare avanzato",
    nome: "Centrali nucleari di IV generazione",
    template: '"Generation IV" nuclear reactor OR Gen IV reactor OR molten salt reactor OR sodium fast reactor OR high-temperature gas reactor',
    richiede_tecnologia: false,
    focusPvs: false,
    uso: "Query dedicata al caso d'uso su nucleare di IV generazione.",
  },
  {
    queryId: "Q012",
    categoria: "Aggiornamento fonti",
    nome: "Aggiornamenti da fonti classificate",
    template: '"{technology}" latest developments OR updates OR recent news',
    richiede_tecnologia: true,
    focusPvs: false,
    uso: "Per domande del tipo: quali aggiornamenti ci sono dalle mie fonti classificate?",
  },
];
