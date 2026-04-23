import {
  Boxes,
  ClipboardList,
  Database,
  Globe2,
  LayoutDashboard,
  Newspaper,
  Search,
  Settings2,
} from "lucide-react";

export const FEEM_LOGO = "https://feem-media.s3.eu-central-1.amazonaws.com/wp-content/uploads/feem_logo.svg";

export const techs = [
  {
    id: "pv",
    name: "Fotovoltaico",
    family: "Rinnovabili",
    maturity: "Alta",
    market: "Globale",
    pvs: "Alto",
    policy: 89,
    competitiveness: 92,
    sustainability: 84,
    score: 90,
    summary: "Tecnologia matura, scalabile e molto adatta a uso utility scale, C&I, residenziale e mini-grid.",
    sectors: ["Elettricita", "Edifici", "Industria"],
  },
  {
    id: "wind",
    name: "Eolico",
    family: "Rinnovabili",
    maturity: "Alta",
    market: "Paesi sviluppati",
    pvs: "Medio",
    policy: 82,
    competitiveness: 84,
    sustainability: 79,
    score: 84,
    summary: "Tecnologia consolidata, forte su scala sistema ma piu esposta a permitting, rete e pianificazione territoriale.",
    sectors: ["Elettricita", "Industria"],
  },
  {
    id: "h2",
    name: "Idrogeno verde",
    family: "Vettori innovativi",
    maturity: "Media",
    market: "Selettivo",
    pvs: "Medio-Alto",
    policy: 74,
    competitiveness: 53,
    sustainability: 80,
    score: 68,
    summary: "Vettore strategico per hard-to-abate, ancora frenato da costi, domanda e infrastrutture.",
    sectors: ["Industria", "Trasporti", "Energia"],
  },
  {
    id: "nuclear",
    name: "Nucleare avanzato",
    family: "Basse emissioni",
    maturity: "Media-Alta",
    market: "Paesi sviluppati",
    pvs: "Basso-Medio",
    policy: 58,
    competitiveness: 46,
    sustainability: 63,
    score: 57,
    summary: "Tecnologia strategica ma con forte dipendenza da regolazione, capitale e tempi autorizzativi.",
    sectors: ["Elettricita", "Calore di processo"],
  },
  {
    id: "geo",
    name: "Geotermico",
    family: "Rinnovabili",
    maturity: "Media-Alta",
    market: "Territoriale",
    pvs: "Medio",
    policy: 69,
    competitiveness: 61,
    sustainability: 77,
    score: 69,
    summary: "Fonte programmabile con buon valore di sistema, ma fortemente dipendente da risorsa e contesto locale.",
    sectors: ["Elettricita", "Calore", "Industria"],
  },
  {
    id: "biomass",
    name: "Biomasse",
    family: "Rinnovabili",
    maturity: "Media-Alta",
    market: "Contestuale",
    pvs: "Medio-Alto",
    policy: 57,
    competitiveness: 60,
    sustainability: 52,
    score: 58,
    summary: "Tecnologia utile in nicchie precise, da leggere sempre insieme a sostenibilita di filiera e uso del suolo.",
    sectors: ["Calore", "Industria", "Trasporti"],
  },
] as const;

export const sourceRows = [
  { name: "IEA", type: "Istituzionale", strategy: "feed + search", priority: "Alta", last: "2 ore fa", status: "Attiva" },
  { name: "JRC", type: "Istituzionale", strategy: "search", priority: "Alta", last: "ieri", status: "Attiva" },
  { name: "Cleantechnica", type: "Media", strategy: "feed", priority: "Media", last: "30 min fa", status: "Attiva" },
  { name: "MIT Technology Review", type: "Media / analysis", strategy: "search", priority: "Media", last: "3 giorni fa", status: "Attiva" },
  { name: "World Nuclear News", type: "Specialistica", strategy: "feed + search", priority: "Alta", last: "4 ore fa", status: "Attiva" },
] as const;

export const evidenceRows = [
  { title: "Nuove pipeline su e-fuels e SAF", technology: "Idrogeno verde", source: "Cleantechnica", status: "Da validare", tag: "Mercato" },
  { title: "Aggiornamento costi e supply chain clean tech", technology: "Fotovoltaico", source: "IEA", status: "Validato", tag: "Competitivita" },
  { title: "Permitting eolico e nuove gare", technology: "Eolico", source: "JRC", status: "Pubblicabile", tag: "Policy" },
  { title: "SMR e approcci avanzati", technology: "Nucleare avanzato", source: "World Nuclear News", status: "In revisione", tag: "Technology watch" },
] as const;

export const publicArticles = [
  {
    id: "segnali-tecnologie-2026",
    slug: "cinque-segnali-tecnologie-energetiche-2026",
    title: "Cinque segnali da monitorare sulle tecnologie energetiche nel 2026",
    type: "Note rapide",
    audience: "Pubblico / decisori",
    topic: "Osservatorio delle tecnologie",
    excerpt: "Una lettura trasversale su costi, filiere, policy e nuove geografie industriali della transizione.",
    date: "23 Apr 2026",
    readTime: "6 min",
    keyPoints: [
      "La corsa alla filiera industriale conta quanto la performance tecnica.",
      "I tempi di permitting stanno diventando un vero fattore di competitivita.",
      "Nei mercati emergenti vincono le soluzioni modulari e distribuite.",
    ],
    content: [
      "Il 2026 si apre con un quadro in cui la competizione tra tecnologie non dipende piu soltanto dal costo livellato, ma dalla capacita di costruire filiere resilienti e rapide da scalare.",
      "Nel fotovoltaico si osserva una maturita di mercato elevata, ma anche una crescente attenzione a supply chain, provenienza dei componenti e integrazione di sistema. Nell'eolico, il tema chiave resta la velocita autorizzativa e la pianificazione territoriale.",
      "Per i decisori pubblici e privati, il messaggio e chiaro: leggere i segnali in anticipo aiuta a ridurre rischi di lock-in e a orientare meglio investimenti e policy industriali.",
    ],
  },
  {
    id: "tecnologie-paesi-via-sviluppo",
    slug: "tecnologie-paesi-via-di-sviluppo",
    title: "Quali tecnologie sono piu adatte ai Paesi in via di sviluppo?",
    type: "Policy brief",
    audience: "Cooperazione / policy",
    topic: "Osservatorio delle tecnologie",
    excerpt: "Non esiste una tecnologia migliore in assoluto: conta il contesto, la rete, il capitale e la capacita tecnica locale.",
    date: "20 Apr 2026",
    readTime: "8 min",
    keyPoints: [
      "Conta il contesto locale piu della tecnologia in astratto.",
      "Le mini-grid e le soluzioni modulari riducono tempi e rischio.",
      "Capacita tecnica locale e manutenzione sono elementi decisivi.",
    ],
    content: [
      "Nei Paesi in via di sviluppo la scelta tecnologica non puo prescindere da infrastrutture elettriche disponibili, accesso al capitale e disponibilita di competenze per installazione e O&M.",
      "Fotovoltaico distribuito, mini-grid ibride e alcune applicazioni di biomassa sostenibile mostrano spesso il miglior equilibrio tra costi iniziali, rapidita di deployment e impatto sociale.",
      "Una policy efficace deve accompagnare la tecnologia con strumenti per formazione, finanziamento e governance locale, evitando approcci standardizzati che ignorano le specificita territoriali.",
    ],
  },
  {
    id: "fotovoltaico-eolico-idrogeno-oltre-annunci",
    slug: "fotovoltaico-eolico-idrogeno-oltre-gli-annunci",
    title: "Fotovoltaico, eolico, idrogeno: cosa leggere davvero oltre gli annunci",
    type: "Newsletter",
    audience: "Stakeholder",
    topic: "Osservatorio delle tecnologie",
    excerpt: "Un formato editoriale pensato per sintetizzare i segnali rilevanti emersi dal monitoraggio delle fonti.",
    date: "18 Apr 2026",
    readTime: "5 min",
    keyPoints: [
      "Gli annunci vanno verificati su tempi, scala e capex reale.",
      "Le metriche di deployment contano piu delle roadmap marketing.",
      "Idrogeno: attenzione a domanda effettiva e infrastruttura.",
    ],
    content: [
      "Nel dibattito pubblico molte tecnologie sono raccontate con enfasi, ma la lettura utile richiede confronto tra obiettivi dichiarati e reali condizioni di implementazione.",
      "Nel fotovoltaico le economie di scala sono evidenti, nell'eolico pesano connessione e autorizzazioni, mentre per l'idrogeno verde il collo di bottiglia resta la creazione di domanda industriale stabile.",
      "Una comunicazione efficace verso stakeholder e decisori deve quindi separare segnali robusti da hype, offrendo indicatori comparabili e verificabili nel tempo.",
    ],
  },
  {
    id: "policy-industriale-cleantech-europa",
    slug: "policy-industriale-cleantech-europa",
    title: "Nuove traiettorie di policy industriale per clean tech in Europa",
    type: "Focus tematico",
    audience: "Policy maker",
    topic: "Osservatorio sulle Policy",
    excerpt: "Una lettura comparata delle scelte di policy che stanno influenzando competitivita, filiere e velocita di deployment.",
    date: "15 Apr 2026",
    readTime: "9 min",
    keyPoints: [
      "Le politiche industriali stanno riallineando investimenti e filiere.",
      "Il coordinamento tra stati membri resta una sfida chiave.",
      "Competitivita e sicurezza energetica sono sempre piu intrecciate.",
    ],
    content: [
      "In Europa si osserva una nuova stagione di policy industriale orientata a consolidare catene del valore locali e ridurre dipendenze strategiche nelle tecnologie clean tech.",
      "Le misure nazionali stanno accelerando investimenti, ma il quadro resta eterogeneo: incentivi, tempi autorizzativi e strumenti di procurement variano significativamente.",
      "Per le organizzazioni che operano su piu mercati, la capacita di leggere queste differenze e tradurle in scelte operative diventa un vantaggio competitivo diretto.",
    ],
  },
  {
    id: "direttive-ue-tecnologie-emergenti",
    slug: "direttive-europee-tecnologie-energetiche-emergenti",
    title: "Direttive europee e impatti sulle tecnologie energetiche emergenti",
    type: "Scheda decisore",
    audience: "Istituzioni / stakeholder",
    topic: "Osservatorio Direttive Europee",
    excerpt: "Come leggere obblighi, opportunita e implicazioni operative delle principali direttive UE per il sistema energetico.",
    date: "12 Apr 2026",
    readTime: "7 min",
    keyPoints: [
      "Le direttive UE ridefiniscono tempi e priorita di adozione.",
      "Compliance e competitivita devono essere lette insieme.",
      "Serve una traduzione operativa rapida per i decisori.",
    ],
    content: [
      "Le recenti direttive europee incidono non solo sugli obiettivi ambientali, ma anche su processi autorizzativi, trasparenza dati e obblighi di reporting lungo la catena energetica.",
      "Per tecnologie emergenti questo significa opportunita di accelerazione, ma anche necessita di adeguamento normativo e organizzativo in tempi brevi.",
      "Una scheda decisore efficace deve evidenziare in modo sintetico obblighi, finestre temporali e impatti attesi su investimenti, governance e competenze.",
    ],
  },
  {
    id: "tassonomia-permitting-mercato-regole",
    slug: "tassonomia-permitting-mercato-regole",
    title: "Tassonomia, permitting e mercato: dove stanno cambiando davvero le regole",
    type: "Articolo",
    audience: "Pubblico informato",
    topic: "Osservatorio sulle Policy",
    excerpt: "Un articolo divulgativo per capire quali leve regolatorie incidono di piu sull'adozione delle tecnologie.",
    date: "10 Apr 2026",
    readTime: "6 min",
    keyPoints: [
      "Tassonomia e permitting orientano il ritmo di deployment.",
      "Le regole di mercato influenzano il costo del capitale.",
      "Leva regolatoria e leva industriale devono muoversi insieme.",
    ],
    content: [
      "Negli ultimi mesi il cambiamento normativo piu rilevante riguarda l'interazione tra tassonomia finanziaria, procedure autorizzative e regole di mercato per gli operatori energetici.",
      "La riduzione dell'incertezza regolatoria tende a migliorare bancabilita dei progetti e accesso al credito, con impatti diretti su tempi e scala degli investimenti.",
      "Per il pubblico informato, comprendere queste dinamiche significa leggere meglio perche alcune tecnologie accelerano e altre restano in fase sperimentale nonostante l'attenzione mediatica.",
    ],
  },
] as const;

export const updates = [
  { title: "Nuove policy industriali per clean tech", category: "Policy emergenti", tech: "Fotovoltaico", date: "Oggi" },
  { title: "Segnali su nuovi impianti eolici offshore", category: "Deployment", tech: "Eolico", date: "Ieri" },
  { title: "Focus su idrogeno e usi hard-to-abate", category: "Trend", tech: "Idrogeno verde", date: "2 giorni fa" },
  { title: "SMR e nuovi annunci di filiera", category: "Technology watch", tech: "Nucleare avanzato", date: "3 giorni fa" },
] as const;

export const compareRadar = [
  { subject: "Maturita", pv: 92, wind: 88, h2: 55 },
  { subject: "Competitivita", pv: 91, wind: 84, h2: 52 },
  { subject: "PVS fit", pv: 90, wind: 63, h2: 68 },
  { subject: "Policy fit", pv: 89, wind: 82, h2: 74 },
  { subject: "Sostenibilita", pv: 84, wind: 79, h2: 80 },
] as const;

export const workflowData = [
  { name: "Bozza", value: 14 },
  { name: "Revisione", value: 9 },
  { name: "Validato", value: 22 },
  { name: "Pubblicato", value: 17 },
] as const;

export const blogTopics = [
  "Tutti",
  "Osservatorio delle tecnologie",
  "Osservatorio sulle Policy",
  "Osservatorio Direttive Europee",
] as const;

export const navPublic = [
  { id: "home", label: "Home" },
  { id: "tech", label: "Tecnologie" },
  { id: "compare", label: "Confronta" },
  { id: "markets", label: "Mercati di riferimento" },
  { id: "publications", label: "Pubblicazioni" },
  { id: "blog", label: "Blog pubblico" },
  { id: "assistant", label: "Chatbot ERMES" },
  { id: "method", label: "Metodologia" },
] as const;

export const navApp = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "research", label: "Ricerca avanzata", icon: Search },
  { id: "sources", label: "Fonti", icon: Globe2 },
  { id: "technologies", label: "Tecnologie", icon: Database },
  { id: "components", label: "Componenti", icon: Boxes },
  { id: "evidence", label: "Evidenze", icon: ClipboardList },
  { id: "editorial", label: "Blog", icon: Newspaper },
  { id: "settings", label: "Configurazione", icon: Settings2 },
] as const;
