import {
  BarChart3,
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
    id: "T001", slug: "carbone", name: "Carbone", family: "Fossili", maturity: 100, readiness: 35, competitiveness: 40, sustainability: 10, coverage: 91.7, score: 52.8, rank: 10,
    semaforo: "ROSSO" as const, posizionamento: "Presidio" as const, raccomandazione: "PRESIDIARE-PHASE-OUT" as const,
    summary: "Tecnologia matura in declino strutturale, esposta a carbon pricing e phase-out progressivo. Valore residuo in regioni carbon-intensive.",
    description: "Il carbone resta una fonte rilevante in molti sistemi energetici ma e in fase di uscita progressiva nei paesi avanzati. CCS e repurposing dei siti rappresentano le principali traiettorie di gestione.",
    sectors: ["Elettricita", "Industria", "Siderurgia"],
  },
  {
    id: "T002", slug: "olio", name: "Olio", family: "Fossili", maturity: 100, readiness: 30, competitiveness: 25, sustainability: 10, coverage: 91.7, score: 46.1, rank: 11,
    semaforo: "ROSSO" as const, posizionamento: "Presidio" as const, raccomandazione: "PRESIDIARE-PHASE-OUT" as const,
    summary: "Filiera matura con ridotta prospettiva di crescita, esposta a rischi ambientali e reputazionali. Potenziale riconversione industriale.",
    description: "L'olio resta centrale per trasporti e petrolchimica ma il suo ruolo nella generazione elettrica e in contrazione. Le traiettorie di riconversione verso bioraffinerie e prodotti a minor impatto sono in fase iniziale.",
    sectors: ["Trasporti", "Industria", "Chimica"],
  },
  {
    id: "T003", slug: "gas-naturale", name: "Gas Naturale", family: "Fossili / Transizione", maturity: 100, readiness: 45, competitiveness: 65, sustainability: 40, coverage: 91.7, score: 65.3, rank: 7,
    semaforo: "GIALLO" as const, posizionamento: "Selettiva" as const, raccomandazione: "SELEZIONARE-PILOTARE" as const,
    summary: "Ruolo di flessibilita e backup nel transitorio, con rischio di lock-in carbonico. Traiettorie CCS-ready e H2-ready in sviluppo.",
    description: "Il gas naturale e un'opzione efficiente e flessibile per il bilanciamento dei sistemi ad alta penetrazione rinnovabile. Il rischio di lock-in limita pero l'orizzonte di nuovi asset.",
    sectors: ["Elettricita", "Industria", "Calore"],
  },
  {
    id: "T004", slug: "fotovoltaico", name: "Fotovoltaico", family: "Rinnovabili", maturity: 100, readiness: 90, competitiveness: 95, sustainability: 100, coverage: 91.7, score: 90.1, rank: 1,
    semaforo: "VERDE" as const, posizionamento: "Leader" as const, raccomandazione: "ACCELERARE" as const,
    summary: "Tecnologia matura, scalabile e molto adatta a uso utility scale, C&I, residenziale e mini-grid. Leader indiscusso del portfolio ERMES.",
    description: "Il fotovoltaico rappresenta la tecnologia rinnovabile piu matura e scalabile. Con costi in continua riduzione e capacita di deployment rapido, e adatto a molteplici applicazioni.",
    sectors: ["Elettricita", "Edifici", "Industria", "Agricoltura"],
  },
  {
    id: "T005", slug: "solare-termico", name: "Solare Termico", family: "Rinnovabili", maturity: 88.9, readiness: 55, competitiveness: 35, sustainability: 100, coverage: 91.7, score: 71.2, rank: 6,
    semaforo: "GIALLO" as const, posizionamento: "Selettiva" as const, raccomandazione: "SELEZIONARE-PILOTARE" as const,
    summary: "Dispatchable grazie a storage termico, ma con CAPEX elevato. Valore in aree ad alta DNI e per calore industriale.",
    description: "Il solare termico a concentrazione offre dispatchability tramite accumulo termico integrato. I costi restano significativamente superiori al FV ma il valore di sistema e rilevante in contesti specifici.",
    sectors: ["Elettricita", "Calore industriale", "District heating"],
  },
  {
    id: "T006", slug: "eolico", name: "Eolico", family: "Rinnovabili", maturity: 100, readiness: 90, competitiveness: 85, sustainability: 100, coverage: 91.7, score: 88.1, rank: 2,
    semaforo: "VERDE" as const, posizionamento: "Leader" as const, raccomandazione: "ACCELERARE" as const,
    summary: "Tecnologia consolidata con forte valore di sistema, sia onshore che offshore. Permitting e supply chain restano le sfide principali.",
    description: "L'eolico e una tecnologia consolidata con valore significativo per il sistema energetico. I tempi di permitting e la necessita di connessione di rete rimangono fattori limitanti in molti mercati.",
    sectors: ["Elettricita", "Industria", "Offshore"],
  },
  {
    id: "T007", slug: "idroelettrico", name: "Idroelettrico", family: "Rinnovabili", maturity: 100, readiness: 80, competitiveness: 78, sustainability: 90, coverage: 91.7, score: 83.2, rank: 3,
    semaforo: "VERDE" as const, posizionamento: "Core" as const, raccomandazione: "ACCELERARE" as const,
    summary: "Fonte programmabile e backbone del sistema elettrico. Il pumped storage e fondamentale per l'integrazione delle rinnovabili variabili.",
    description: "L'idroelettrico e una delle fonti rinnovabili piu mature e flessibili. Il potenziale principale risiede nel repowering dell'esistente e nello sviluppo di pompaggio idroelettrico.",
    sectors: ["Elettricita", "Storage", "Gestione acqua"],
  },
  {
    id: "T008", slug: "biomasse", name: "Biomasse", family: "Rinnovabili", maturity: 88.9, readiness: 65, competitiveness: 40, sustainability: 55, coverage: 91.7, score: 64.7, rank: 8,
    semaforo: "GIALLO" as const, posizionamento: "Selettiva" as const, raccomandazione: "SELEZIONARE-PILOTARE" as const,
    summary: "Tecnologia utile in nicchie precise, da leggere sempre insieme a sostenibilita di filiera e uso del suolo.",
    description: "Le biomasse possono svolgere un ruolo utile in nicchie specifiche dell'economia energetica. Devono essere valutate insieme a sostenibilita della filiera, uso del suolo e impatti ambientali.",
    sectors: ["Calore", "Gas rinnovabili", "Trasporti"],
  },
  {
    id: "T009", slug: "geotermico", name: "Geotermico", family: "Rinnovabili", maturity: 88.9, readiness: 65, competitiveness: 74, sustainability: 100, coverage: 91.7, score: 80.5, rank: 4,
    semaforo: "VERDE" as const, posizionamento: "Core" as const, raccomandazione: "ACCELERARE" as const,
    summary: "Fonte programmabile con buon valore di sistema. EGS e closed-loop aprono nuove prospettive geografiche.",
    description: "Il geotermico offre una fonte programmabile con valore significativo per il sistema energetico. Le tecnologie EGS e closed-loop stanno ampliando il potenziale oltre le aree vulcaniche tradizionali.",
    sectors: ["Elettricita", "Calore", "Teleriscaldamento"],
  },
  {
    id: "T010", slug: "nucleare-fissione", name: "Nucleare da fissione", family: "Basse emissioni", maturity: 88.9, readiness: 65, competitiveness: 40, sustainability: 55, coverage: 91.7, score: 64.7, rank: 9,
    semaforo: "GIALLO" as const, posizionamento: "Selettiva" as const, raccomandazione: "SELEZIONARE-PILOTARE" as const,
    summary: "Tecnologia strategica ma con forte dipendenza da regolazione, capitale e tempi di costruzione. SMR come opzione modulare emergente.",
    description: "Il nucleare da fissione offre potenziale significativo per decarbonizzazione baseload. Gli SMR rappresentano un'opzione modulare con tempi di deployment potenzialmente piu rapidi.",
    sectors: ["Elettricita", "Calore di processo"],
  },
  {
    id: "T011", slug: "idrogeno-verde", name: "Idrogeno verde", family: "Vettori innovativi", maturity: 83.3, readiness: 75, competitiveness: 60, sustainability: 80, coverage: 91.7, score: 77.3, rank: 5,
    semaforo: "GIALLO" as const, posizionamento: "Core" as const, raccomandazione: "SELEZIONARE-PILOTARE" as const,
    summary: "Vettore strategico per hard-to-abate, in rapida evoluzione ma ancora frenato da costi, domanda e infrastrutture.",
    description: "L'idrogeno verde e un vettore strategico per decarbonizzare settori hard-to-abate. Rimane frenato da costi di produzione, domanda industriale limitata e carenza di infrastrutture.",
    sectors: ["Industria", "Trasporti", "Energia", "Siderurgia"],
  },
] as const;

export const sourceRows = [
  { id: "iea", slug: "iea", name: "IEA", type: "Istituzionale", organizzazione: "International Energy Agency", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico / abbonamento", description: "International Energy Agency - leading source for energy statistics, analysis and recommendations.", strategy: "feed + search", priority: "Alta", last: "2 ore fa", status: "Attiva", url: "https://www.iea.org", focus: ["Energy efficiency", "Renewables", "Nuclear", "Hydrogen", "Oil", "Gas"] },
  { id: "irena", slug: "irena", name: "IRENA", type: "Istituzionale", organizzazione: "International Renewable Energy Agency", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "International Renewable Energy Agency - global intergovernmental organisation for renewable energy.", strategy: "feed + search", priority: "Alta", last: "4 ore fa", status: "Attiva", url: "https://www.irena.org", focus: ["Renewables", "Costs", "Policy", "Hydrogen"] },
  { id: "jrc", slug: "jrc", name: "JRC", type: "Istituzionale", organizzazione: "Joint Research Centre - European Commission", affidabilita: "Alta", copertura: "Europa", accesso: "Pubblico", description: "EU science hub providing support to EU energy and climate policies.", strategy: "search", priority: "Alta", last: "ieri", status: "Attiva", url: "https://ec.europa.eu/jrc", focus: ["Climate & Energy", "Technology assessment", "Sustainability"] },
  { id: "nrel", slug: "nrel", name: "NREL", type: "Istituzionale", organizzazione: "National Renewable Energy Laboratory", affidabilita: "Alta", copertura: "USA / Globale", accesso: "Pubblico", description: "US DOE laboratory for renewable energy and energy efficiency research.", strategy: "search", priority: "Alta", last: "3 ore fa", status: "Attiva", url: "https://www.nrel.gov", focus: ["Solar", "Wind", "Hydrogen", "Grid integration", "Costs"] },
  { id: "bnef", slug: "bnef", name: "BloombergNEF", type: "Analitica", organizzazione: "Bloomberg", affidabilita: "Alta", copertura: "Globale", accesso: "Abbonamento", description: "Strategic research provider covering clean energy, advanced transport, digital industry.", strategy: "search", priority: "Alta", last: "1 ora fa", status: "Attiva", url: "https://about.bnef.com", focus: ["Clean energy", "Markets", "Costs", "Investment"] },
  { id: "ember", slug: "ember", name: "Ember", type: "Think tank", organizzazione: "Ember Climate", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Independent energy think tank focused on accelerating the clean energy transition.", strategy: "feed", priority: "Alta", last: "30 min fa", status: "Attiva", url: "https://ember-climate.org", focus: ["Electricity", "Coal phase-out", "Renewables", "Policy"] },
  { id: "wnn", slug: "world-nuclear-news", name: "World Nuclear News", type: "Specialistica", organizzazione: "World Nuclear Association", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Authoritative source for nuclear energy news and analysis.", strategy: "feed + search", priority: "Alta", last: "4 ore fa", status: "Attiva", url: "https://www.world-nuclear-news.org", focus: ["Nuclear power", "SMR", "Advanced reactors", "Fuel cycle"] },
  { id: "iaea", slug: "iaea", name: "IAEA", type: "Istituzionale", organizzazione: "International Atomic Energy Agency", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Promotes safe, secure and peaceful use of nuclear technologies.", strategy: "search", priority: "Alta", last: "1 giorno fa", status: "Attiva", url: "https://www.iaea.org", focus: ["Nuclear safety", "SMR", "Nuclear innovation"] },
  { id: "cleantechnica", slug: "cleantechnica", name: "Cleantechnica", type: "Media", organizzazione: "Cleantechnica Inc.", affidabilita: "Media", copertura: "Globale", accesso: "Pubblico", description: "Leading voice in the clean technology world - news, analysis and opinions.", strategy: "feed", priority: "Media", last: "30 min fa", status: "Attiva", url: "https://cleantechnica.com", focus: ["Solar", "Wind", "EV", "Cleantech business"] },
  { id: "mit-tech-review", slug: "mit-technology-review", name: "MIT Technology Review", type: "Media / analysis", organizzazione: "MIT", affidabilita: "Alta", copertura: "Globale", accesso: "Abbonamento", description: "Trusted source for tech analysis covering energy transition and innovation.", strategy: "search", priority: "Media", last: "3 giorni fa", status: "Attiva", url: "https://www.technologyreview.com", focus: ["Innovation", "Energy", "Climate tech"] },
  { id: "ec-energy", slug: "ec-energy", name: "European Commission - Energy", type: "Istituzionale", organizzazione: "European Commission DG ENER", affidabilita: "Alta", copertura: "Europa", accesso: "Pubblico", description: "EU energy policy, regulations and strategy documents.", strategy: "search", priority: "Alta", last: "2 giorni fa", status: "Attiva", url: "https://energy.ec.europa.eu", focus: ["EU energy policy", "Directives", "Regulation", "REPowerEU"] },
  { id: "gse", slug: "gse", name: "GSE", type: "Istituzionale", organizzazione: "Gestore Servizi Energetici", affidabilita: "Alta", copertura: "Italia", accesso: "Pubblico", description: "Gestione incentivi e promozione energie rinnovabili in Italia.", strategy: "feed + search", priority: "Alta", last: "6 ore fa", status: "Attiva", url: "https://www.gse.it", focus: ["Incentivi FER", "Biometano", "CER", "Statistiche"] },
  { id: "mase", slug: "mase", name: "MASE", type: "Istituzionale", organizzazione: "Ministero dell'Ambiente e della Sicurezza Energetica", affidabilita: "Alta", copertura: "Italia", accesso: "Pubblico", description: "Ministero italiano per le politiche ambientali ed energetiche.", strategy: "search", priority: "Alta", last: "1 giorno fa", status: "Attiva", url: "https://www.mase.gov.it", focus: ["PNIEC", "PNRR", "FER", "Offshore"] },
  { id: "fraunhofer-ise", slug: "fraunhofer-ise", name: "Fraunhofer ISE", type: "Ricerca", organizzazione: "Fraunhofer-Gesellschaft", affidabilita: "Alta", copertura: "Europa / Globale", accesso: "Pubblico / report", description: "Istituto leader per la ricerca applicata in energia solare.", strategy: "search", priority: "Alta", last: "1 settimana fa", status: "Attiva", url: "https://www.ise.fraunhofer.de", focus: ["PV", "Agrivoltaico", "Tandem cells", "Power electronics"] },
  { id: "iha", slug: "iha", name: "IHA", type: "Associazione", organizzazione: "International Hydropower Association", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Global voice of hydropower, promoting sustainable development.", strategy: "search", priority: "Media", last: "2 giorni fa", status: "Attiva", url: "https://www.hydropower.org", focus: ["Hydropower", "Pumped storage", "Sustainability"] },
  { id: "hydrogen-council", slug: "hydrogen-council", name: "Hydrogen Council", type: "Associazione", organizzazione: "Hydrogen Council", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "CEO-led initiative for hydrogen in the global energy transition.", strategy: "feed + search", priority: "Alta", last: "5 ore fa", status: "Attiva", url: "https://hydrogencouncil.com", focus: ["Green hydrogen", "Blue hydrogen", "Infrastructure", "Policy"] },
  { id: "windeurope", slug: "windeurope", name: "WindEurope", type: "Associazione", organizzazione: "WindEurope", affidabilita: "Alta", copertura: "Europa", accesso: "Pubblico / membri", description: "European wind energy association - data, policy and advocacy.", strategy: "feed", priority: "Alta", last: "8 ore fa", status: "Attiva", url: "https://windeurope.org", focus: ["Onshore wind", "Offshore wind", "Floating", "Supply chain"] },
  { id: "solarpaces", slug: "solarpaces", name: "SolarPACES", type: "Ricerca / R&D", organizzazione: "IEA Technology Collaboration Programme", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "International network for concentrating solar power research.", strategy: "search", priority: "Media", last: "1 settimana fa", status: "Attiva", url: "https://www.solarpaces.org", focus: ["CSP", "Thermal storage", "Solar fuels"] },
  { id: "terna", slug: "terna", name: "Terna", type: "Operatore rete", organizzazione: "Terna S.p.A.", affidabilita: "Alta", copertura: "Italia", accesso: "Pubblico", description: "Operatore della rete di trasmissione italiana - dati di sistema.", strategy: "feed", priority: "Alta", last: "12 ore fa", status: "Attiva", url: "https://www.terna.it", focus: ["Grid data", "Balancing", "Capacity", "Demand"] },
  { id: "lazard", slug: "lazard", name: "Lazard LCOE", type: "Analitica", organizzazione: "Lazard", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Annual levelized cost of energy analysis - benchmark reference.", strategy: "search", priority: "Alta", last: "3 mesi fa", status: "Attiva", url: "https://www.lazard.com", focus: ["LCOE", "LCOS", "Cost benchmarks"] },
  { id: "weo", slug: "weo", name: "IEA WEO", type: "Report annuale", organizzazione: "International Energy Agency", affidabilita: "Alta", copertura: "Globale", accesso: "Abbonamento", description: "World Energy Outlook - scenario di riferimento annuale globale.", strategy: "search", priority: "Alta", last: "6 mesi fa", status: "Attiva", url: "https://www.iea.org/reports/world-energy-outlook-2024", focus: ["Scenari", "Domanda", "Offerta", "Investimenti"] },
  { id: "rts", slug: "rts", name: "RTS Corporation", type: "Specialistica", organizzazione: "RTS Corporation", affidabilita: "Alta", copertura: "Asia / Globale", accesso: "Abbonamento", description: "Market intelligence su filiera fotovoltaica e supply chain.", strategy: "search", priority: "Media", last: "2 settimane fa", status: "Attiva", url: "https://www.rts.co.jp", focus: ["PV supply chain", "Manufacturing", "Asia markets"] },
  { id: "enea", slug: "enea", name: "ENEA", type: "Ricerca", organizzazione: "Agenzia nazionale per le nuove tecnologie, l'energia e lo sviluppo economico sostenibile", affidabilita: "Alta", copertura: "Italia", accesso: "Pubblico", description: "Agenzia nazionale italiana per le nuove tecnologie energetiche.", strategy: "search", priority: "Media", last: "1 settimana fa", status: "Attiva", url: "https://www.enea.it", focus: ["Energia", "Efficienza", "Fusione", "Idrogeno"] },
  { id: "rse", slug: "rse", name: "RSE", type: "Ricerca", organizzazione: "Ricerca sul Sistema Energetico", affidabilita: "Alta", copertura: "Italia", accesso: "Pubblico / report", description: "Ricerca sul sistema energetico italiano - studi e analisi.", strategy: "search", priority: "Media", last: "2 settimane fa", status: "Attiva", url: "https://www.rse-web.it", focus: ["Rete", "Rinnovabili", "Storage", "Scenari"] },
  { id: "gwec", slug: "gwec", name: "GWEC", type: "Associazione", organizzazione: "Global Wind Energy Council", affidabilita: "Alta", copertura: "Globale", accesso: "Pubblico", description: "Global Wind Energy Council - market data and policy advocacy.", strategy: "feed", priority: "Alta", last: "1 giorno fa", status: "Attiva", url: "https://gwec.net", focus: ["Global wind market", "Offshore", "Supply chain", "Policy"] },
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
  { subject: "Maturita", pv: 100, wind: 100, h2: 83.3 },
  { subject: "Readiness", pv: 90, wind: 90, h2: 75 },
  { subject: "Competitivita", pv: 95, wind: 85, h2: 60 },
  { subject: "Sostenibilita", pv: 100, wind: 100, h2: 80 },
  { subject: "Copertura", pv: 91.7, wind: 91.7, h2: 91.7 },
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
  { id: "componenti", label: "Componenti" },
  { id: "compare", label: "Confronta" },
  { id: "markets", label: "Mercati di riferimento" },
  { id: "fonti", label: "Fonti" },
  { id: "publications", label: "Pubblicazioni" },
  { id: "blog", label: "Blog pubblico" },
  { id: "assistant", label: "Chatbot ERMES" },
  { id: "method", label: "Metodologia" },
] as const;

export const navApp = [
  { id: "executive", label: "Executive", icon: BarChart3 },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "executive", label: "Executive", icon: BarChart3 },
  { id: "research", label: "Ricerca avanzata", icon: Search },
  { id: "sources", label: "Fonti", icon: Globe2 },
  { id: "technologies", label: "Tecnologie", icon: Database },
  { id: "components", label: "Componenti", icon: Boxes },
  { id: "evidence", label: "Evidenze", icon: ClipboardList },
  { id: "editorial", label: "Blog", icon: Newspaper },
  { id: "settings", label: "Configurazione", icon: Settings2 },
] as const;
