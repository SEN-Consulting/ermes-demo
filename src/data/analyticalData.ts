// ============================================================
// ERMES Analytical Data — Data from all 11 analytical areas
// mapped by Tech_ID. This is the "Technology 360" dataset.
// ============================================================

// ---------- COMPONENTI (04) ----------
export interface Componente {
  compId: string;
  techId: string;
  macrocomponente: string;
  nome: string;
  descrizione: string;
  funzione: string;
  stato: string;
}

export const componenti: Componente[] = [
  // Fotovoltaico
  { compId: "C-FV-001", techId: "T004", macrocomponente: "Generazione", nome: "Modulo FV", descrizione: "Elemento attivo composto da celle, vetro, encapsulante e frame; oggi dominano soluzioni bifacciali e n-type.", funzione: "Conversione della radiazione in corrente continua", stato: "Commerciale diffusa" },
  { compId: "C-FV-002", techId: "T004", macrocomponente: "Elettronica di potenza", nome: "Inverter", descrizione: "Converte la corrente continua in alternata e abilita controllo, protezione e servizi di rete.", funzione: "Conversione DC/AC, controllo e grid support", stato: "Commerciale diffusa" },
  { compId: "C-FV-003", techId: "T004", macrocomponente: "Accumulo / backup", nome: "Sistema di backup / accumulo", descrizione: "Batterie e PCS integrati con il FV per continuita, peak shaving e riduzione curtailment.", funzione: "Flessibilita, backup e ottimizzazione energetica", stato: "Commerciale iniziale" },
  { compId: "C-FV-004", techId: "T004", macrocomponente: "Inseguimento / BOS", nome: "Tracker monoassiale", descrizione: "Struttura mobile che aumenta la produzione seguendo il sole.", funzione: "Incremento resa energetica", stato: "Commerciale diffusa" },
  { compId: "C-FV-005", techId: "T004", macrocomponente: "BOS / connessione", nome: "Strutture e BOS", descrizione: "Cabling, quadri, trasformatori, protezioni e opere elettromeccaniche.", funzione: "Installazione, connessione e sicurezza", stato: "Commerciale diffusa" },
  { compId: "C-FV-006", techId: "T004", macrocomponente: "Modulo avanzato", nome: "Modulo tandem perovskite-silicio", descrizione: "Nuova generazione ad altissima efficienza, in fase di scale-up industriale iniziale.", funzione: "Aumento efficienza e riduzione impronta materiale per kWh", stato: "FOAK / pre-commerciale" },
  { compId: "C-FV-007", techId: "T004", macrocomponente: "Applicazione integrata", nome: "Sistema agrivoltaico", descrizione: "Configurazione integrata FV + attivita agricola con progettazione per dual land use.", funzione: "Co-produzione di energia e valore agricolo", stato: "Pilota / dimostratore" },
  // Eolico
  { compId: "C-WI-001", techId: "T006", macrocomponente: "Aerodinamica", nome: "Rotore e pale", descrizione: "Insieme pale-mozzo che cattura energia dal vento; trend verso pale piu lunghe.", funzione: "Conversione energia cinetica del vento in coppia meccanica", stato: "Commerciale diffusa" },
  { compId: "C-WI-002", techId: "T006", macrocomponente: "Conversione elettromeccanica", nome: "Nacelle e drivetrain", descrizione: "Gearbox/direct drive, generatore e sistemi ausiliari.", funzione: "Conversione meccanico-elettrica e affidabilita di sistema", stato: "Commerciale diffusa" },
  { compId: "C-WI-003", techId: "T006", macrocomponente: "Struttura", nome: "Torre e struttura di supporto", descrizione: "Torre tubolare o modulare che aumenta l'accesso a risorse migliori.", funzione: "Supporto strutturale e altezza mozzo", stato: "Commerciale diffusa" },
  { compId: "C-WI-004", techId: "T006", macrocomponente: "Offshore fisso", nome: "Fondazione fissa offshore", descrizione: "Monopile, jacket o altre soluzioni per acque basse.", funzione: "Ancoraggio e stabilita in ambiente marino", stato: "Commerciale diffusa" },
  { compId: "C-WI-005", techId: "T006", macrocomponente: "Offshore floating", nome: "Piattaforma floating", descrizione: "Sottostruttura galleggiante con sistemi di ancoraggio per acque profonde.", funzione: "Sostegno della turbina in acque profonde", stato: "Commerciale iniziale" },
  { compId: "C-WI-006", techId: "T006", macrocomponente: "Digitale / O&M", nome: "Sistemi di controllo e condition monitoring", descrizione: "Sensoristica, SCADA, digital twin e algoritmi per manutenzione predittiva.", funzione: "Ottimizzazione produzione, affidabilita e O&M", stato: "Commerciale diffusa" },
  { compId: "C-WI-007", techId: "T006", macrocomponente: "Grid connection", nome: "Sottostazione e connessione di rete", descrizione: "Trasformatori, sottostazioni e cavi HVAC/HVDC.", funzione: "Connessione alla rete e integrazione di sistema", stato: "Commerciale diffusa" },
  // Idrogeno verde
  { compId: "C-H2-001", techId: "T011", macrocomponente: "Produzione", nome: "Elettrolizzatore alcalino", descrizione: "Tecnologia matura con elettrolita liquido, adatta a grandi taglie e CAPEX contenuto.", funzione: "Scissione dell'acqua in H2 e O2", stato: "Commerciale diffusa" },
  { compId: "C-H2-002", techId: "T011", macrocomponente: "Produzione", nome: "Elettrolizzatore PEM", descrizione: "Tecnologia polimerica con buona flessibilita e rapido ramping.", funzione: "Produzione H2 con elevata dinamica operativa", stato: "Commerciale iniziale" },
  { compId: "C-H2-003", techId: "T011", macrocomponente: "Produzione avanzata", nome: "Elettrolizzatore SOEC", descrizione: "Tecnologia ad alta temperatura con potenziale di maggiore efficienza.", funzione: "Produzione H2 ad alta efficienza con input termico", stato: "Pre-commerciale" },
  { compId: "C-H2-004", techId: "T011", macrocomponente: "Balance of Plant", nome: "Rettificatori, acqua e ausiliari", descrizione: "Conversione elettrica, deionizzazione, raffreddamento, separazione gas.", funzione: "Supporto al funzionamento dello stack", stato: "Commerciale diffusa" },
  { compId: "C-H2-005", techId: "T011", macrocomponente: "Midstream", nome: "Compressione e stoccaggio H2", descrizione: "Compressori, serbatoi e sistemi di accumulo per buffer operativo.", funzione: "Condizionamento e disponibilita del vettore", stato: "Commerciale iniziale" },
  { compId: "C-H2-006", techId: "T011", macrocomponente: "Logistica", nome: "Trasporto e distribuzione", descrizione: "Tube trailer, pipeline, liquefazione o conversione in ammoniaca.", funzione: "Consegna del vettore ai siti di uso finale", stato: "Commerciale iniziale" },
  { compId: "C-H2-007", techId: "T011", macrocomponente: "Controllo sistema", nome: "Energy management e integrazione FER", descrizione: "EMS e logiche di dispatch che coordinano elettrolizzatore, rinnovabili, rete e stoccaggi.", funzione: "Ottimizzazione LCOH e flessibilita di esercizio", stato: "Commerciale iniziale" },
  // Carbone
  { compId: "C-CO-001", techId: "T001", macrocomponente: "Supply", nome: "Estrazione e preparazione", descrizione: "Mining, washing e handling del carbone.", funzione: "Fornitura combustibile", stato: "Commerciale diffusa" },
  { compId: "C-CO-002", techId: "T001", macrocomponente: "Combustione", nome: "Caldaia PC / USC", descrizione: "Boiler a polverino supercritical o ultrasupercritical.", funzione: "Generazione vapore ad alta temperatura e pressione", stato: "Commerciale diffusa" },
  { compId: "C-CO-003", techId: "T001", macrocomponente: "Turbina", nome: "Turbina a vapore e generatore", descrizione: "Isola convenzionale di conversione termoelettrica.", funzione: "Conversione meccanica ed elettrica", stato: "Commerciale diffusa" },
  { compId: "C-CO-004", techId: "T001", macrocomponente: "Controllo emissioni", nome: "FGD / SCR / ESP", descrizione: "Sistemi di abbattimento SOx, NOx, polveri e mercurio.", funzione: "Conformita ambientale", stato: "Commerciale diffusa" },
  { compId: "C-CO-005", techId: "T001", macrocomponente: "Decarbonizzazione", nome: "CCS retrofit", descrizione: "Cattura post-combustione e compressione CO2.", funzione: "Riduzione emissioni lifecycle e direct stack", stato: "FOAK / pre-commerciale" },
  // Olio
  { compId: "C-OI-001", techId: "T002", macrocomponente: "Upstream", nome: "Produzione ed estrazione", descrizione: "Pozzi, gathering e separazione primaria del greggio.", funzione: "Fornitura feedstock liquidi", stato: "Commerciale diffusa" },
  { compId: "C-OI-003", techId: "T002", macrocomponente: "Downstream", nome: "Raffinazione", descrizione: "Distillazione, cracking, hydrotreating e upgrading prodotti.", funzione: "Produzione carburanti e feedstock", stato: "Commerciale diffusa" },
  { compId: "C-OI-005", techId: "T002", macrocomponente: "Efficienza", nome: "Cogen e heat integration", descrizione: "Recuperi termici, cogenerazione e digital energy management.", funzione: "Riduzione consumi ed emissioni", stato: "Commerciale diffusa" },
  { compId: "C-OI-006", techId: "T002", macrocomponente: "Abatement", nome: "Flare and methane monitoring", descrizione: "Tecnologie LDAR, riduzione flaring e monitoraggio perdite.", funzione: "Riduzione emissioni fuggitive", stato: "Commerciale iniziale" },
  // Gas Naturale
  { compId: "C-GA-002", techId: "T003", macrocomponente: "Generazione", nome: "Turbina a gas simple cycle", descrizione: "Macchine flessibili per picco e servizi ancillari.", funzione: "Peak load e fast ramping", stato: "Commerciale diffusa" },
  { compId: "C-GA-003", techId: "T003", macrocomponente: "Generazione", nome: "CCGT H/F class", descrizione: "Cicli combinati ad alta efficienza per mid-merit e baseload flessibile.", funzione: "Generazione efficiente e modulabile", stato: "Commerciale diffusa" },
  { compId: "C-GA-005", techId: "T003", macrocomponente: "Decarbonizzazione", nome: "CCS-ready / post-combustion CCS", descrizione: "CCGT con cattura CO2 integrata.", funzione: "Decarbonizzazione dispatchable", stato: "FOAK / pre-commerciale" },
  { compId: "C-GA-006", techId: "T003", macrocomponente: "Transizione", nome: "Hydrogen-ready combustion", descrizione: "Turbine predisposte a blend H2 crescente.", funzione: "Transizione verso low-carbon gas", stato: "Commerciale iniziale" },
  // Solare Termico
  { compId: "C-ST-001", techId: "T005", macrocomponente: "Captazione solare", nome: "Campo collettori / eliostati", descrizione: "Superficie ottica che concentra o raccoglie la radiazione solare.", funzione: "Raccolta energia solare", stato: "Commerciale diffusa" },
  { compId: "C-ST-002", techId: "T005", macrocomponente: "Accumulo termico", nome: "Serbatoio / TES termico", descrizione: "Accumulo molten salt per spostare produzione nel tempo.", funzione: "Dispatchability e spostamento energetico", stato: "Commerciale diffusa" },
  { compId: "C-ST-003", techId: "T005", macrocomponente: "Conversione", nome: "Ricevitore e fluido termovettore", descrizione: "Receiver e HTF determinano temperatura e rendimento.", funzione: "Trasferimento calore", stato: "Commerciale diffusa" },
  { compId: "C-ST-004", techId: "T005", macrocomponente: "Power block", nome: "Steam cycle / ORC / chiller", descrizione: "Ottimizzazione del power block e integrazione con process heat.", funzione: "Conversione termoelettrica", stato: "Commerciale diffusa" },
  // Idroelettrico
  { compId: "C-HY-002", techId: "T007", macrocomponente: "Elettromeccanica", nome: "Turbina e generatore", descrizione: "Core technology matura con miglioramenti su efficienza e digital O&M.", funzione: "Conversione idraulico-elettrica", stato: "Commerciale diffusa" },
  { compId: "C-HY-004", techId: "T007", macrocomponente: "Storage", nome: "Pumped storage", descrizione: "PSH resta la principale tecnologia di storage a lunga durata su larga scala.", funzione: "Accumulo e bilanciamento di rete", stato: "Commerciale diffusa" },
  { compId: "C-HY-005", techId: "T007", macrocomponente: "Revamping", nome: "Repowering e upgrading", descrizione: "Incremento output su parco esistente.", funzione: "Ottimizzazione e ammodernamento", stato: "Commerciale diffusa" },
  // Biomasse
  { compId: "C-BM-001", techId: "T008", macrocomponente: "Feedstock", nome: "Biomassa solida e residui", descrizione: "Residui agricoli/forestali e coltivazioni energetiche.", funzione: "Approvvigionamento materia prima", stato: "Commerciale diffusa" },
  { compId: "C-BM-002", techId: "T008", macrocomponente: "Conversione", nome: "Digestione anaerobica / biogas", descrizione: "Produzione biogas da reflui, FORSU e residui.", funzione: "Valorizzazione organica", stato: "Commerciale diffusa" },
  { compId: "C-BM-003", techId: "T008", macrocomponente: "Upgrading", nome: "Biometano / bioLNG", descrizione: "Upgrading biogas a qualita rete o carburante.", funzione: "Gas rinnovabile", stato: "Commerciale iniziale" },
  // Geotermico
  { compId: "C-GEO-001", techId: "T009", macrocomponente: "Reservoir", nome: "Esplorazione e modellazione", descrizione: "Geofisica, geologia e reservoir simulation.", funzione: "Riduzione rischio geologico", stato: "Commerciale iniziale" },
  { compId: "C-GEO-002", techId: "T009", macrocomponente: "Produzione", nome: "Pozzi e completamenti", descrizione: "Pozzi profondi e stimolazione per accesso al calore.", funzione: "Estrazione calore dal sottosuolo", stato: "Commerciale diffusa" },
  { compId: "C-GEO-003", techId: "T009", macrocomponente: "Frontiera", nome: "EGS / closed-loop", descrizione: "Sistemi avanzati per geotermia di nuova generazione.", funzione: "Geotermia anywhere", stato: "Pilota / dimostratore" },
  // Nucleare
  { compId: "C-NUC-001", techId: "T010", macrocomponente: "Nuclear island", nome: "Reattore e vessel", descrizione: "Core, vessel e sistema nucleare principale.", funzione: "Fissione controllata e produzione calore", stato: "Commerciale diffusa" },
  { compId: "C-NUC-002", techId: "T010", macrocomponente: "SMR", nome: "Small Modular Reactor", descrizione: "Reattori modulari con potenziale di deployment piu rapido.", funzione: "Generazione flessibile e modulare", stato: "FOAK / pre-commerciale" },
];

// ---------- TRL / TLR (07) ----------
export interface TRLRecord {
  techId: string;
  compId?: string;
  componente: string;
  trl: number;
  contesto: string;
  evidenza: string;
}

export const trlRecords: TRLRecord[] = [
  // Fotovoltaico
  { techId: "T004", compId: "C-FV-001", componente: "Modulo FV", trl: 9, contesto: "Mercato", evidenza: "Tecnologia consolidata e bancabile su vasta scala" },
  { techId: "T004", compId: "C-FV-002", componente: "Inverter", trl: 9, contesto: "Mercato", evidenza: "Soluzione industriale consolidata" },
  { techId: "T004", compId: "C-FV-004", componente: "Tracker monoassiale", trl: 9, contesto: "Mercato", evidenza: "Standard in molti impianti utility-scale" },
  { techId: "T004", compId: "C-FV-003", componente: "Sistema di backup / accumulo", trl: 8, contesto: "Pilota / mercato", evidenza: "Soluzioni commerciali ma business model in evoluzione" },
  { techId: "T004", compId: "C-FV-007", componente: "Sistema agrivoltaico", trl: 7, contesto: "Pilota / dimostratore", evidenza: "Operativi ma non standardizzati universalmente" },
  { techId: "T004", compId: "C-FV-006", componente: "Modulo tandem perovskite-silicio", trl: 6, contesto: "Lab / pilota", evidenza: "Prestazioni elevate in lab, rischio tecnologico significativo" },
  // Eolico
  { techId: "T006", compId: "C-WI-001", componente: "Rotore e pale", trl: 9, contesto: "Mercato", evidenza: "Tecnologia consolidata su larga scala" },
  { techId: "T006", compId: "C-WI-002", componente: "Nacelle e drivetrain", trl: 9, contesto: "Mercato", evidenza: "Soluzioni mature geared e direct-drive" },
  { techId: "T006", compId: "C-WI-004", componente: "Fondazione fissa offshore", trl: 9, contesto: "Mercato", evidenza: "Standard industriale nei mercati maturi" },
  { techId: "T006", compId: "C-WI-005", componente: "Piattaforma floating", trl: 7, contesto: "Pilota / dimostratore", evidenza: "Primi progetti operativi, non pienamente standardizzata" },
  { techId: "T006", compId: "C-WI-006", componente: "Sistemi di controllo", trl: 9, contesto: "Mercato", evidenza: "Consolidata, con spazio miglioramento via analytics" },
  // Idrogeno verde
  { techId: "T011", compId: "C-H2-001", componente: "Elettrolizzatore alcalino", trl: 9, contesto: "Mercato", evidenza: "Tecnologia consolidata con ampia esperienza" },
  { techId: "T011", compId: "C-H2-002", componente: "Elettrolizzatore PEM", trl: 8, contesto: "Pilota / mercato", evidenza: "Commerciale ma in rapido scale-up" },
  { techId: "T011", compId: "C-H2-003", componente: "Elettrolizzatore SOEC", trl: 6, contesto: "Lab / pilota", evidenza: "Promettente ma rischio tecnologico rilevante" },
  { techId: "T011", compId: "C-H2-005", componente: "Compressione e stoccaggio H2", trl: 8, contesto: "Pilota / mercato", evidenza: "Scalabile ma standardizzazione in corso" },
  { techId: "T011", compId: "C-H2-006", componente: "Trasporto e distribuzione", trl: 7, contesto: "Pilota / mercato", evidenza: "Logistica su vasta scala in fase iniziale" },
  // Carbone
  { techId: "T001", componente: "Caldaia PC / USC", trl: 9, contesto: "Medio in calo", evidenza: "Commerciale ma nuovo mercato limitato" },
  { techId: "T001", componente: "FGD / SCR / ESP", trl: 9, contesto: "Maturo", evidenza: "Ampiamente diffuse" },
  { techId: "T001", componente: "CCS retrofit", trl: 7, contesto: "Basso", evidenza: "Dipendente da carbon price e infrastrutture CO2" },
  // Olio
  { techId: "T002", componente: "Raffinazione", trl: 9, contesto: "Stabile", evidenza: "Mercato legato a competitivita industriale" },
  { techId: "T002", componente: "Flare and methane monitoring", trl: 8, contesto: "In crescita", evidenza: "Spinto da regolazione methane abatement" },
  // Gas Naturale
  { techId: "T003", componente: "CCGT H/F class", trl: 9, contesto: "Stabile", evidenza: "Mercato forte come flessibilita e backup" },
  { techId: "T003", componente: "CCS-ready", trl: 7, contesto: "Medio", evidenza: "Serve carbon price e transport/storage CO2" },
  { techId: "T003", componente: "Hydrogen-ready combustion", trl: 8, contesto: "In crescita", evidenza: "Segmento in espansione in Europa e Giappone" },
  // Solare Termico
  { techId: "T005", componente: "Campo collettori / eliostati", trl: 8, contesto: "Medio", evidenza: "Migliori in aree ad alta DNI" },
  { techId: "T005", componente: "Serbatoio / TES termico", trl: 9, contesto: "Medio", evidenza: "Nucleo distintivo rispetto al FV" },
  // Idroelettrico
  { techId: "T007", componente: "Turbina e generatore", trl: 9, contesto: "Maturo", evidenza: "Mercato prevalentemente replacement/repowering" },
  { techId: "T007", componente: "Pumped storage", trl: 9, contesto: "In crescita", evidenza: "Domanda spinta da rinnovabili variabili" },
  // Biomasse
  { techId: "T008", componente: "Digestione anaerobica", trl: 9, contesto: "Stabile", evidenza: "Tecnologia matura per biogas" },
  { techId: "T008", componente: "Biometano upgrading", trl: 8, contesto: "In crescita", evidenza: "Spinto da regolazione gas rinnovabili" },
  // Geotermico
  { techId: "T009", componente: "Pozzi e completamenti", trl: 8, contesto: "Medio-alto", evidenza: "Tecnologia consolidata idrotermale" },
  { techId: "T009", componente: "EGS / closed-loop", trl: 6, contesto: "Pilota", evidenza: "Necessita dimostrazione su larga scala" },
  // Nucleare
  { techId: "T010", componente: "Reattore Gen III+", trl: 9, contesto: "Mercato", evidenza: "In esercizio (EPR, AP1000)" },
  { techId: "T010", componente: "SMR", trl: 7, contesto: "FOAK", evidenza: "Primi progetti dimostrativi in costruzione" },
];

// ---------- COSTI E COMPETITIVITA (08) ----------
export interface CostoRecord {
  techId: string;
  metrica: string;
  valore: string;
  unita: string;
  anno: string;
  trend: string;
  driver: string;
}

export const costiRecords: CostoRecord[] = [
  // Fotovoltaico
  { techId: "T004", metrica: "CAPEX utility-scale PV-only", valore: "1.12", unita: "USD/Wdc", anno: "2024", trend: "Strutturalmente in calo", driver: "Learning curve elevata" },
  { techId: "T004", metrica: "CAPEX residenziale PV-only", valore: "3.15", unita: "USD/Wdc", anno: "2024", trend: "In riduzione", driver: "Scala, permitting, soft costs" },
  { techId: "T004", metrica: "CAPEX utility PV+BESS (2,4h)", valore: "1.99", unita: "USD/Wdc", anno: "2024", trend: "In ottimizzazione", driver: "Arbitraggio, riduzione curtailment" },
  { techId: "T004", metrica: "Tariffa PPA record", valore: "1.32", unita: "US cent/kWh", anno: "2020", trend: "Record competitivo", driver: "Sito e scala ottimali (Al Dhafra)" },
  { techId: "T004", metrica: "LCOE agrivoltaico", valore: "0.07-0.12", unita: "EUR/kWh", anno: "2024", trend: "In calo", driver: "Dual land use, incentivi dedicati" },
  // Eolico
  { techId: "T006", metrica: "CAPEX land-based wind", valore: "1.6", unita: "USD/W", anno: "2024", trend: "Competitiva", driver: "Taglia turbine, altezza torre" },
  { techId: "T006", metrica: "CAPEX offshore fixed-bottom", valore: "4.8", unita: "USD/W", anno: "2024", trend: "In calo lungo termine", driver: "Fondazioni, cavi, porti" },
  { techId: "T006", metrica: "CAPEX offshore floating", valore: "6.6", unita: "USD/W", anno: "2024", trend: "Atteso in riduzione", driver: "Piattaforme, learning curve" },
  { techId: "T006", metrica: "OPEX land-based wind", valore: "44", unita: "USD/kW-anno", anno: "2024", trend: "Ottimizzabile", driver: "Condition monitoring e repowering" },
  // Idrogeno verde
  { techId: "T011", metrica: "CAPEX electrolyzer alkaline", valore: "700", unita: "USD/kW", anno: "2025", trend: "In calo con scala", driver: "Materiali, volumi, learning rate" },
  { techId: "T011", metrica: "CAPEX electrolyzer PEM", valore: "950", unita: "USD/kW", anno: "2025", trend: "Sopra alkaline", driver: "Iridio, produzione stack" },
  { techId: "T011", metrica: "LCOH green hydrogen", valore: "4.5", unita: "USD/kgH2", anno: "2025", trend: "Sensibile a costo elettricita", driver: "Prezzo energia, CAPEX, load factor" },
  { techId: "T011", metrica: "Target competitivita", valore: "1", unita: "USD/kgH2", anno: "2031", trend: "Target lungo termine", driver: "Hydrogen Shot DOE" },
  // Carbone
  { techId: "T001", metrica: "CAPEX", valore: "2500-4500", unita: "EUR/kW", anno: "2025", trend: "Stabile / in calo", driver: "New build di riferimento" },
  { techId: "T001", metrica: "LCOE", valore: "90-160", unita: "EUR/MWh", anno: "2025", trend: "Volatile / site-specific", driver: "Range techno-economic" },
  // Olio
  { techId: "T002", metrica: "LCOE", valore: "130-220", unita: "EUR/MWh", anno: "2025", trend: "Volatile / site-specific", driver: "Range techno-economic" },
  // Gas Naturale
  { techId: "T003", metrica: "CAPEX", valore: "800-1800", unita: "EUR/kW", anno: "2025", trend: "Stabile", driver: "New build di riferimento" },
  { techId: "T003", metrica: "LCOE", valore: "70-120", unita: "EUR/MWh", anno: "2025", trend: "Volatile / site-specific", driver: "Range techno-economic" },
  // Solare Termico
  { techId: "T005", metrica: "CAPEX", valore: "4500-9000", unita: "EUR/kW", anno: "2025", trend: "Stabile / in calo", driver: "New build di riferimento" },
  { techId: "T005", metrica: "LCOE", valore: "110-220", unita: "EUR/MWh", anno: "2025", trend: "Volatile / site-specific", driver: "Range techno-economic" },
  // Idroelettrico
  { techId: "T007", metrica: "CAPEX", valore: "3000-8000", unita: "EUR/kW", anno: "2025", trend: "Stabile", driver: "New build di riferimento" },
  { techId: "T007", metrica: "LCOE", valore: "40-120", unita: "EUR/MWh", anno: "2025", trend: "Site-specific", driver: "Dipende da idraulica e scala" },
  // Biomasse
  { techId: "T008", metrica: "LCOE", valore: "90-180", unita: "EUR/MWh", anno: "2025", trend: "Stabile", driver: "Feedstock e scala" },
  // Geotermico
  { techId: "T009", metrica: "LCOE", valore: "45-120", unita: "EUR/MWh", anno: "2025", trend: "Stabile", driver: "Risorse e pozzi" },
  // Nucleare
  { techId: "T010", metrica: "LCOE", valore: "90-180", unita: "EUR/MWh", anno: "2025", trend: "Stabile", driver: "Scala e regolazione" },
];

// ---------- BEST PRACTICE (11) ----------
export interface BestPractice {
  techId: string;
  paese: string;
  progetto: string;
  organizzazione: string;
  descrizione: string;
  perche: string;
  risultati: string;
  anno: string;
}

export const bestPractices: BestPractice[] = [
  // Fotovoltaico
  { techId: "T004", paese: "EAU", progetto: "Al Dhafra Solar PV", organizzazione: "EWEC / EDF / Jinko Power", descrizione: "Mega-impianto utility-scale da circa 2 GW con moduli bifacciali.", perche: "Scala, bancabilita e tariffa estremamente competitiva.", risultati: "Tariffa record 1,32 US cent/kWh; ~160.000 abitazioni.", anno: "2023" },
  { techId: "T004", paese: "Indonesia", progetto: "Cirata Floating PV", organizzazione: "PLN / Masdar", descrizione: "Impianto floating PV su bacino artificiale.", perche: "Integrazione FV su specchi d'acqua e scalabilita.", risultati: "145 MWac / 192 MWp; maggiore del Sud-Est asiatico.", anno: "2023" },
  { techId: "T004", paese: "Germania", progetto: "Heggelbach APV-RESOLA", organizzazione: "Fraunhofer ISE", descrizione: "Caso pilota agrivoltaico con coltivazioni e produzione elettrica.", perche: "Valore del dual land use e resilienza colture.", risultati: "LCOE 7-12 eurocent/kWh, benefici su uso acqua.", anno: "2024" },
  // Eolico
  { techId: "T006", paese: "Regno Unito", progetto: "Dogger Bank", organizzazione: "SSE / Equinor", descrizione: "Progetto offshore in tre fasi, piu grande al mondo.", perche: "Scala multi-GW, supply chain complessa, turbine grandi.", risultati: "Riferimento globale per scala e integrazione offshore.", anno: "2025" },
  { techId: "T006", paese: "Norvegia", progetto: "Hywind Tampen", organizzazione: "Equinor", descrizione: "Primo parco eolico floating per installazioni offshore.", perche: "Transizione floating da dimostrazione a operativo.", risultati: "Riferimento mondiale floating offshore.", anno: "2023" },
  { techId: "T006", paese: "Paesi Bassi", progetto: "Hollandse Kust Zuid", organizzazione: "Vattenfall / BASF", descrizione: "Grande parco offshore sviluppato senza sussidi diretti.", perche: "Competitivita e bancabilita in mercato maturo.", risultati: "Primo grande offshore subsidy-free; 139 turbine da 11 MW.", anno: "2024" },
  // Idrogeno verde
  { techId: "T011", paese: "Arabia Saudita", progetto: "NEOM Green Hydrogen", organizzazione: "NGHC / Air Products / ACWA Power", descrizione: "Mega-progetto con ~4 GW rinnovabili e ammoniaca verde.", perche: "Frontiera della scala industriale e export molecole verdi.", risultati: "Target fino a 1,2 Mt/anno di green ammonia.", anno: "2026" },
  { techId: "T011", paese: "Svezia", progetto: "HYBRIT", organizzazione: "SSAB / LKAB / Vattenfall", descrizione: "Uso di idrogeno per siderurgia fossil-free.", perche: "Ruolo del vettore nei settori hard-to-abate.", risultati: "Riduzione significativa emissioni siderurgia svedese.", anno: "2025" },
  { techId: "T011", paese: "Spagna", progetto: "Puertollano green hydrogen", organizzazione: "Iberdrola / Fertiberia", descrizione: "Impianto integrato PV+battery+electrolyzer.", perche: "Integrazione rinnovabili, accumulo ed elettrolisi.", risultati: "100 MW PV, 20 MW elettrolizzatore, 5 MW/20 MWh batteria.", anno: "2024" },
  // Carbone
  { techId: "T001", paese: "Giappone", progetto: "Isogo New Units", organizzazione: "JERA", descrizione: "Impianto ultrasupercritico con alti standard ambientali.", perche: "Benchmark efficienza e controllo emissioni.", risultati: "Efficienza netta ~45% HHV, basse emissioni locali.", anno: "2023" },
  { techId: "T001", paese: "Canada", progetto: "Boundary Dam Unit 3 CCS", organizzazione: "SaskPower", descrizione: "Primo grande CCS su unita coal.", perche: "Integrazione impianto + trasporto/stoccaggio CO2.", risultati: "Esperienza pluriennale CCS commerciale.", anno: "2020" },
  // Gas Naturale
  { techId: "T003", paese: "Regno Unito", progetto: "Keadby 2", organizzazione: "SSE Thermal", descrizione: "CCGT di nuova generazione ad alta efficienza.", perche: "Benchmark europeo efficienza e fast response.", risultati: "Capacita >800 MW e avvio flessibile.", anno: "2024" },
  { techId: "T003", paese: "USA", progetto: "NET Power La Porte", organizzazione: "NET Power", descrizione: "Ciclo innovativo a gas con cattura CO2 integrata.", perche: "Frontiera low-carbon dispatchable.", risultati: "Architettura Allam-Fetvedt con CO2 ad alta purezza.", anno: "2025" },
  // Solare Termico
  { techId: "T005", paese: "EAU", progetto: "Noor Energy 1", organizzazione: "DEWA", descrizione: "Grande CSP+PV con storage termico su scala utility.", perche: "Dispatchability e scala in area MENA.", risultati: "Tower + parabolic trough con accumulo di lunga durata.", anno: "2024" },
  { techId: "T005", paese: "Cile", progetto: "Cerro Dominador", organizzazione: "Cerro Dominador", descrizione: "Impianto tower CSP con ~17,5 ore di storage.", perche: "Generazione serale/notturna in Sud America.", risultati: "Storage di lunga durata e integrazione nel sistema cileno.", anno: "2023" },
  // Idroelettrico
  { techId: "T007", paese: "Svizzera", progetto: "Nant de Drance", organizzazione: "Nant de Drance", descrizione: "Pumped storage alpino di nuova generazione.", perche: "Flessibilita a supporto di VRE europee.", risultati: "Storage e dispatch rapido in sistema interconnesso.", anno: "2023" },
  { techId: "T007", paese: "USA", progetto: "Bath County Pumped Storage", organizzazione: "Dominion Energy", descrizione: "Grande impianto di pompaggio per bilanciamento rete.", perche: "Best practice storage idroelettrico.", risultati: "Elevata potenza e rapidita di modulazione.", anno: "2020" },
  // Biomasse
  { techId: "T008", paese: "Svezia", progetto: "Vartan bioenergy CHP", organizzazione: "Stockholm Exergi", descrizione: "Grande uso biomassa per elettricita e calore urbano.", perche: "Integrazione con district heating.", risultati: "Alta efficienza complessiva in CHP.", anno: "2023" },
  { techId: "T008", paese: "Germania", progetto: "VERBIO biomethane", organizzazione: "VERBIO", descrizione: "Integrazione avanzata feedstock agricoli e biometano.", perche: "Gas rinnovabili e uso trasporti.", risultati: "Produzione integrata biomethane e bioLNG.", anno: "2024" },
  // Geotermico
  { techId: "T009", paese: "USA", progetto: "Cape Station / Fervo", organizzazione: "Fervo Energy", descrizione: "Progetto next-gen basato su drilling orizzontale.", perche: "EGS / geothermal 2.0.", risultati: "Riduzione rischio e scalabilita tramite tecniche oilfield.", anno: "2025" },
  { techId: "T009", paese: "Islanda", progetto: "Hellisheidi", organizzazione: "ON Power", descrizione: "Impianto integrato power+heat con mineralizzazione CO2.", perche: "Integrazione energetica e sostenibilita.", risultati: "Elettricita, calore e progetti CarbFix.", anno: "2023" },
  // Nucleare
  { techId: "T010", paese: "EAU", progetto: "Barakah", organizzazione: "ENEC", descrizione: "Nuovo programma nucleare nazionale completato.", perche: "Programme execution e nuovo build.", risultati: "Quattro unita APR1400 in esercizio.", anno: "2024" },
  { techId: "T010", paese: "USA", progetto: "Vogtle 3 and 4", organizzazione: "Georgia Power", descrizione: "Primi nuovi AP1000 operativi negli USA.", perche: "Lesson learned per new build occidentale.", risultati: "Due nuove unita in esercizio 2023-2024.", anno: "2024" },
  // Olio
  { techId: "T002", paese: "Finlandia", progetto: "Porvoo transformation", organizzazione: "Neste", descrizione: "Trasformazione sito verso prodotti a minore intensita carbonica.", perche: "Riconversione industriale filiera oil.", risultati: "Roadmap trasformazione e prodotti alternativi.", anno: "2024" },
];

// ---------- POLICY E REGOLAZIONE (12) ----------
export interface PolicyRecord {
  techId: string;
  giurisdizione: string;
  tipo: string;
  titolo: string;
  stato: string;
  impatto: string;
}

export const policyRecords: PolicyRecord[] = [
  // Fotovoltaico
  { techId: "T004", giurisdizione: "UE", tipo: "Direttiva", titolo: "RED III - Renewable Energy Directive", stato: "In vigore", impatto: "Aumenta target rinnovabili al 42,5% e accelera permitting." },
  { techId: "T004", giurisdizione: "UE", tipo: "Regolamento", titolo: "Net-Zero Industry Act", stato: "In vigore", impatto: "Supporta manifattura UE di PV e componenti." },
  { techId: "T004", giurisdizione: "Italia", tipo: "Decreto / Incentivo", titolo: "Decreto CACER + Regole GSE", stato: "Attivo", impatto: "Spinge rooftop PV, CER e autoconsumo collettivo." },
  { techId: "T004", giurisdizione: "Italia", tipo: "PNRR", titolo: "Sviluppo agro-voltaico", stato: "Attivo", impatto: "Sostiene sistemi agrivoltaici innovativi." },
  // Eolico
  { techId: "T006", giurisdizione: "UE", tipo: "Direttiva", titolo: "RED III", stato: "In vigore", impatto: "Accelera deployment rinnovabili e permitting per onshore e offshore." },
  { techId: "T006", giurisdizione: "UE", tipo: "Piano", titolo: "European Wind Power Action Plan", stato: "Attivo", impatto: "Interviene su aste, supply chain, permitting e competenze." },
  { techId: "T006", giurisdizione: "Italia", tipo: "Programma", titolo: "MASE - Eolico Offshore", stato: "Attivo", impatto: "Orienta sviluppo nazionale offshore e floating." },
  // Idrogeno verde
  { techId: "T011", giurisdizione: "UE", tipo: "Atto delegato", titolo: "Renewable hydrogen rules RFNBO", stato: "Applicabile", impatto: "Criteri addizionalita, correlazione temporale, soglie GHG." },
  { techId: "T011", giurisdizione: "UE", tipo: "Incentivo", titolo: "European Hydrogen Bank", stato: "Attivo", impatto: "Aste e premi alla produzione per market creation." },
  { techId: "T011", giurisdizione: "Italia", tipo: "Strategia", titolo: "Strategia Nazionale Idrogeno", stato: "Pubblicata", impatto: "Traiettorie di sviluppo al 2030-2050." },
  { techId: "T011", giurisdizione: "Italia", tipo: "PNRR", titolo: "Hydrogen Valleys", stato: "Attivo", impatto: "Cluster territoriali e primi ecosistemi H2." },
  // Carbone
  { techId: "T001", giurisdizione: "UE", tipo: "ETS", titolo: "EU ETS e phase-out nazionali", stato: "In vigore", impatto: "Alza costo CO2 e accelera uscita dal carbone." },
  { techId: "T001", giurisdizione: "Globale", tipo: "Incentivo CCS", titolo: "CCfD/45Q e supporti CCUS", stato: "In sviluppo", impatto: "Solo con forte supporto il coal+CCS torna bancabile." },
  // Gas Naturale
  { techId: "T003", giurisdizione: "UE", tipo: "Tassonomia", titolo: "Complementary Climate Delegated Act", stato: "In vigore", impatto: "Solo alcune attivita gas classificate transitorie." },
  { techId: "T003", giurisdizione: "UE", tipo: "Regolazione", titolo: "Methane abatement", stato: "In vigore", impatto: "Monitoraggio perdite e tracciabilita filiera gas." },
  // Solare Termico
  { techId: "T005", giurisdizione: "UE", tipo: "Direttiva", titolo: "RED III", stato: "In vigore", impatto: "Supporta FER termiche e calore rinnovabile." },
  { techId: "T005", giurisdizione: "Globale", tipo: "R&D", titolo: "Programmi SolarPACES", stato: "Attivo", impatto: "Indispensabili per ridurre costi CSP." },
  // Idroelettrico
  { techId: "T007", giurisdizione: "Italia", tipo: "Concessioni", titolo: "Quadro concessorio e rinnovi", stato: "In evoluzione", impatto: "Rilevante per revamping e investimenti." },
  // Biomasse
  { techId: "T008", giurisdizione: "UE", tipo: "Direttiva", titolo: "RED III - criteri sostenibilita biomass", stato: "In vigore", impatto: "Stringe requisiti feedstock, efficienza, GHG savings." },
  { techId: "T008", giurisdizione: "Italia", tipo: "Incentivo", titolo: "GSE Biometano / PNRR", stato: "Attivo", impatto: "Traino forte su digestione anaerobica e grid injection." },
  // Geotermico
  { techId: "T009", giurisdizione: "Italia", tipo: "Incentivo", titolo: "FER2 e strumenti geotermia innovativa", stato: "Attivo", impatto: "Sostiene geotermia innovativa e a basse emissioni." },
  // Nucleare
  { techId: "T010", giurisdizione: "UE", tipo: "Tassonomia", titolo: "EU Taxonomy - condizioni specifiche", stato: "In vigore", impatto: "Condizionatamente allineata sotto criteri specifici." },
  // Olio
  { techId: "T002", giurisdizione: "UE", tipo: "Tassonomia", titolo: "EU Taxonomy", stato: "In vigore", impatto: "Nuove attivita oil non qualificate come sostenibili." },
  { techId: "T002", giurisdizione: "Globale", tipo: "Methane", titolo: "Iniziative methane abatement", stato: "In sviluppo", impatto: "Spingono sensoristica, LDAR e riduzione flaring." },
];

// ---------- BARRIERE E OPPORTUNITA (13) ----------
export interface BarrieraRecord {
  techId: string;
  categoria: string;
  tipo: "Barriera" | "Opportunita";
  titolo: string;
  descrizione: string;
  severita: string;
  mitigazione: string;
}

export const barriereRecords: BarrieraRecord[] = [
  // Fotovoltaico
  { techId: "T004", categoria: "Regolatoria", tipo: "Barriera", titolo: "Permitting e uso del suolo", descrizione: "Tempi autorizzativi e conflitti territoriali rallentano utility-scale.", severita: "Alta", mitigazione: "Aree idonee, semplificare permitting, engagement locale." },
  { techId: "T004", categoria: "Supply chain", tipo: "Barriera", titolo: "Dipendenza da supply chain estere", descrizione: "Filiera europea esposta a concentrazione geografica.", severita: "Alta", mitigazione: "Riciclo, reshoring/nearshoring, strumenti NZIA." },
  { techId: "T004", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Tandem perovskite-silicio", descrizione: "Potenziale >30% efficienza ma da validare.", severita: "Media-alta", mitigazione: "Piloti, test durabilita, horizon scanning." },
  { techId: "T004", categoria: "Sociale", tipo: "Opportunita", titolo: "Agrivoltaico", descrizione: "Riduce conflitto uso del suolo e crea valore agricolo.", severita: "Media", mitigazione: "Standard progettuali e strumenti di supporto." },
  // Eolico
  { techId: "T006", categoria: "Regolatoria", tipo: "Barriera", titolo: "Permitting e accettabilita locale", descrizione: "Iter autorizzativi lunghi e opposizioni territoriali.", severita: "Alta", mitigazione: "Semplificare permitting, aree idonee, qualita progettuale." },
  { techId: "T006", categoria: "Supply chain", tipo: "Barriera", titolo: "Materiali, logistica e componenti oversize", descrizione: "Pale lunghe, torri alte e navi specializzate.", severita: "Alta", mitigazione: "Filiere, porti, standard modulari." },
  { techId: "T006", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Floating offshore", descrizione: "Accesso a risorse in acque profonde.", severita: "Alta priorita", mitigazione: "Dimostratori, aste dedicate, industrializzazione." },
  // Idrogeno verde
  { techId: "T011", categoria: "Economica", tipo: "Barriera", titolo: "Costo ancora elevato", descrizione: "Business case fragile senza elettricita low-cost e supporti.", severita: "Alta", mitigazione: "PPA low-cost, scala, aste dedicate." },
  { techId: "T011", categoria: "Infrastrutturale", tipo: "Barriera", titolo: "Trasporto e off-take insufficienti", descrizione: "Reti, stoccaggi e domanda limitati.", severita: "Alta", mitigazione: "Cluster, hydrogen valleys, offtake contracts." },
  { techId: "T011", categoria: "Opportunita", tipo: "Opportunita", titolo: "Early market in cluster industriali", descrizione: "Raffinerie, ammoniaca, acciaio come primi segmenti.", severita: "Alta priorita", mitigazione: "Hub industriali e alta willingness-to-pay." },
  // Carbone
  { techId: "T001", categoria: "Regolatoria", tipo: "Barriera", titolo: "Carbon pricing e phase-out", descrizione: "Esposizione a ETS riduce bancabilita.", severita: "Alta", mitigazione: "Gestione transizione, CCS in cluster." },
  { techId: "T001", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Flessibilizzazione / repurposing siti", descrizione: "Siti coal possono ospitare storage, CCS o nuove tech.", severita: "Media", mitigazione: "Strategie di riconversione." },
  // Gas Naturale
  { techId: "T003", categoria: "Regolatoria", tipo: "Barriera", titolo: "Lock-in carbonico", descrizione: "Rischio lock-in limita orizzonte nuovi asset.", severita: "Alta", mitigazione: "Impianti flessibili, CCS-ready, H2-ready." },
  { techId: "T003", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Ruolo di flessibilita", descrizione: "Gas efficiente supporta penetrazione FER nel transitorio.", severita: "Alta", mitigazione: "Ottimizzare dispatch e ancillary services." },
  // Solare Termico
  { techId: "T005", categoria: "Economica", tipo: "Barriera", titolo: "CAPEX elevato", descrizione: "Costo iniziale molto superiore al FV.", severita: "Alta", mitigazione: "Target aree ad alta DNI, valorizzazione storage." },
  { techId: "T005", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Calore industriale e thermal storage", descrizione: "Puo coprire bisogni difficili da elettrificare.", severita: "Alta", mitigazione: "Cluster industriali, reti termiche." },
  // Idroelettrico
  { techId: "T007", categoria: "Regolatoria", tipo: "Barriera", titolo: "Permitting e biodiversita", descrizione: "Iter lunghi e requisiti ambientali stringenti.", severita: "Alta", mitigazione: "Priorita a repowering e PSH." },
  { techId: "T007", categoria: "Climatica", tipo: "Barriera", titolo: "Rischio idrologico", descrizione: "Siccita e variabilita climatica.", severita: "Alta", mitigazione: "Diversificazione portafoglio e digital hydrology." },
  // Biomasse
  { techId: "T008", categoria: "Ambientale", tipo: "Barriera", titolo: "Sostenibilita filiera e feedstock", descrizione: "LUC, emissioni e concorrenza con usi alimentari.", severita: "Alta", mitigazione: "Criteri stringenti, filiere corte." },
  // Geotermico
  { techId: "T009", categoria: "Tecnologica", tipo: "Barriera", titolo: "Rischio esplorativo", descrizione: "Alto costo e incertezza nella fase di esplorazione.", severita: "Alta", mitigazione: "Risk-sharing, insurance e dati geologici." },
  { techId: "T009", categoria: "Tecnologica", tipo: "Opportunita", titolo: "EGS e geotermia 2.0", descrizione: "Tecniche oilfield aprono nuovo potenziale.", severita: "Alta", mitigazione: "Finanziare piloti e dimostrativi." },
  // Nucleare
  { techId: "T010", categoria: "Economica", tipo: "Barriera", titolo: "CAPEX e tempi di costruzione", descrizione: "Forte intensita di capitale e rischi di ritardo.", severita: "Alta", mitigazione: "Standardizzazione, SMR, project management." },
  { techId: "T010", categoria: "Tecnologica", tipo: "Opportunita", titolo: "SMR come opzione modulare", descrizione: "Potenziale per deployment piu rapido.", severita: "Media-alta", mitigazione: "Licensing, first-of-a-kind projects." },
  // Olio
  { techId: "T002", categoria: "Ambientale", tipo: "Barriera", titolo: "Sversamenti, flare, methane", descrizione: "Rischi ambientali e reputazionali.", severita: "Alta", mitigazione: "LDAR, flare minimization, water management." },
  { techId: "T002", categoria: "Tecnologica", tipo: "Opportunita", titolo: "Riconversione industriale", descrizione: "Siti oil possono evolvere in bioraffinerie.", severita: "Media", mitigazione: "Piani di trasformazione e CAPEX selettivo." },
];

// ---------- ATTORI E IMPRESE (14) ----------
export interface AttoreRecord {
  techId: string;
  nome: string;
  tipo: string;
  paese: string;
  ruolo: string;
  rilevanza: string;
  url: string;
}

export const attoriRecords: AttoreRecord[] = [
  // Fotovoltaico
  { techId: "T004", nome: "LONGi", tipo: "Azienda", paese: "Cina", ruolo: "Sviluppo e produzione celle e moduli ad alta efficienza", rilevanza: "Alta", url: "https://www.longi.com/en/" },
  { techId: "T004", nome: "Trina Solar", tipo: "Azienda", paese: "Cina", ruolo: "Produzione moduli, tracker e soluzioni smart energy", rilevanza: "Alta", url: "https://www.trinasolar.com/" },
  { techId: "T004", nome: "Sungrow", tipo: "OEM", paese: "Cina", ruolo: "Inverter utility-scale e sistemi di accumulo", rilevanza: "Alta", url: "https://en.sungrowpower.com/" },
  { techId: "T004", nome: "Fraunhofer ISE", tipo: "Centro di ricerca", paese: "Germania", ruolo: "Ricerca applicata su integrated PV e agrivoltaico", rilevanza: "Alta", url: "https://www.ise.fraunhofer.de/" },
  { techId: "T004", nome: "NREL", tipo: "Centro di ricerca", paese: "USA", ruolo: "Benchmark costi, LCA, supply chain", rilevanza: "Alta", url: "https://www.nrel.gov/" },
  // Eolico
  { techId: "T006", nome: "Vestas", tipo: "OEM", paese: "Danimarca", ruolo: "Turbine onshore e componenti chiave", rilevanza: "Alta", url: "https://www.vestas.com/" },
  { techId: "T006", nome: "GE Vernova", tipo: "OEM", paese: "USA", ruolo: "Turbine offshore Haliade-X", rilevanza: "Alta", url: "https://www.gevernova.com/" },
  { techId: "T006", nome: "Orsted", tipo: "Sviluppatore", paese: "Danimarca", ruolo: "Sviluppo e gestione parchi offshore", rilevanza: "Alta", url: "https://orsted.com/" },
  { techId: "T006", nome: "Equinor", tipo: "Sviluppatore", paese: "Norvegia", ruolo: "Offshore e floating wind", rilevanza: "Alta", url: "https://www.equinor.com/" },
  // Idrogeno verde
  { techId: "T011", nome: "thyssenkrupp nucera", tipo: "OEM", paese: "Germania", ruolo: "Elettrolisi alcalina", rilevanza: "Alta", url: "https://www.thyssenkrupp-nucera.com/" },
  { techId: "T011", nome: "ITM Power", tipo: "OEM", paese: "Regno Unito", ruolo: "Tecnologia PEM", rilevanza: "Alta", url: "https://itm-power.com/" },
  { techId: "T011", nome: "Air Products", tipo: "Industria", paese: "USA", ruolo: "Sviluppo progetti large-scale", rilevanza: "Alta", url: "https://www.airproducts.com/" },
  { techId: "T011", nome: "Iberdrola", tipo: "Utility", paese: "Spagna", ruolo: "Progetti integrati rinnovabili + idrogeno", rilevanza: "Alta", url: "https://www.iberdrola.com/" },
];

// ---------- PRESTAZIONI TECNICHE (15) ----------
export interface PrestazioneRecord {
  techId: string;
  kpi: string;
  valore: string;
  unita: string;
  benchmark: string;
}

export const prestazioniRecords: PrestazioneRecord[] = [
  // Fotovoltaico
  { techId: "T004", kpi: "Efficienza modulo commerciale mono-Si", valore: "24", unita: "%", benchmark: ">24% moduli commerciali" },
  { techId: "T004", kpi: "Efficienza modulo laboratorio", valore: "26", unita: "%", benchmark: "Record lab > commerciali" },
  { techId: "T004", kpi: "Target tandem 2035", valore: "30.5", unita: "%", benchmark: "Roadmap ITRPV" },
  { techId: "T004", kpi: "Efficienza inverter utility", valore: "99", unita: "%", benchmark: "98-99%" },
  { techId: "T004", kpi: "Capacity factor utility", valore: "27.7", unita: "%", benchmark: "21-34% a seconda della risorsa" },
  { techId: "T004", kpi: "Emissioni dirette", valore: "0", unita: "gCO2e/kWh", benchmark: "~0 in fase operativa" },
  { techId: "T004", kpi: "Emissioni lifecycle", valore: "23", unita: "gCO2e/kWh", benchmark: "10-36 gCO2e/kWh" },
  // Eolico
  { techId: "T006", kpi: "Capacity factor onshore", valore: "40", unita: "%", benchmark: "Dipende da sito" },
  { techId: "T006", kpi: "Capacity factor offshore", valore: "50", unita: "%", benchmark: "Piu elevato in siti maturi" },
  { techId: "T006", kpi: "Capacity factor floating", valore: "55", unita: "%", benchmark: "In siti deep-water ottimali" },
  { techId: "T006", kpi: "Diametro rotore offshore frontiera", valore: "220", unita: "m", benchmark: "Haliade-X 14.7 MW" },
  { techId: "T006", kpi: "Disponibilita tecnica", valore: "97", unita: "%", benchmark: ">95% con O&M avanzata" },
  // Idrogeno verde
  { techId: "T011", kpi: "Efficienza alcalino", valore: "68", unita: "%", benchmark: "60-70%+ LHV" },
  { techId: "T011", kpi: "Efficienza PEM", valore: "65", unita: "%", benchmark: "60-70% LHV" },
  { techId: "T011", kpi: "Efficienza potenziale SOEC", valore: "80", unita: "%", benchmark: "Con integrazione termica" },
  { techId: "T011", kpi: "Taglia progetti riferimento", valore: "100", unita: "MW", benchmark: "Pipeline UE avanzata" },
  // Carbone
  { techId: "T001", kpi: "Efficienza netta USC", valore: "45", unita: "%", benchmark: "~45% HHV" },
  { techId: "T001", kpi: "Emissioni dirette stack", valore: "900", unita: "gCO2/kWh", benchmark: ">800 senza CCS" },
  { techId: "T001", kpi: "Fattore di capacita", valore: "70", unita: "%", benchmark: "50-85%" },
  // Olio
  { techId: "T002", kpi: "Efficienza energetica raffinazione", valore: "88", unita: "%", benchmark: "Varia per schema impianto" },
  { techId: "T002", kpi: "Emissioni dirette oil-fired", valore: "700", unita: "gCO2/kWh", benchmark: "650-900" },
  // Gas Naturale
  { techId: "T003", kpi: "Efficienza netta CCGT H-class", valore: "62", unita: "%", benchmark: "60-64%" },
  { techId: "T003", kpi: "Emissioni dirette CCGT", valore: "360", unita: "gCO2/kWh", benchmark: "330-490 senza CCS" },
  { techId: "T003", kpi: "Ramp rate", valore: "35", unita: "MW/min", benchmark: "Alto" },
  { techId: "T003", kpi: "Blend H2 compatibile", valore: "30", unita: "%", benchmark: "20-50% near-term" },
  // Solare Termico
  { techId: "T005", kpi: "Ore di storage", valore: "10-17", unita: "ore", benchmark: "Dipende da progetto" },
  // Idroelettrico
  { techId: "T007", kpi: "Efficienza turbina", valore: "90-95", unita: "%", benchmark: "Dipende da tipo" },
  { techId: "T007", kpi: "Vita utile", valore: "50-100", unita: "anni", benchmark: "Con manutenzione adeguata" },
  // Biomasse
  { techId: "T008", kpi: "Emissioni GHG lifecycle", valore: "70", unita: "gCO2e/kWh", benchmark: "Molto variabile per feedstock" },
  // Geotermico
  { techId: "T009", kpi: "Emissioni GHG lifecycle", valore: "25", unita: "gCO2e/kWh", benchmark: "Basse" },
  { techId: "T009", kpi: "Capacity factor", valore: "85-95", unita: "%", benchmark: "Molto alto, programmabile" },
  // Nucleare
  { techId: "T010", kpi: "Emissioni lifecycle", valore: "12", unita: "gCO2e/kWh", benchmark: "Molto basse" },
  { techId: "T010", kpi: "Capacity factor", valore: "90", unita: "%", benchmark: "Tra i piu alti" },
];

// ---------- SETTORI DI IMPATTO (09) ----------
export interface SettoreImpatto {
  techId: string;
  settore: string;
  casoUso: string;
  tipoImpatto: string;
  intensita: string;
}

export const settoriImpatto: SettoreImpatto[] = [
  // Fotovoltaico
  { techId: "T004", settore: "Residenziale", casoUso: "Autoconsumo individuale, CER", tipoImpatto: "Riduzione costo energia e decarbonizzazione diffusa", intensita: "Alta" },
  { techId: "T004", settore: "Industria", casoUso: "Impianti onsite, PPAs", tipoImpatto: "Competitivita industriale, riduzione Scope 2", intensita: "Alta" },
  { techId: "T004", settore: "Agricoltura", casoUso: "Agrivoltaico, pompe irrigue, serre", tipoImpatto: "Nuove entrate, resilienza idrica", intensita: "Media-alta" },
  { techId: "T004", settore: "Utility", casoUso: "Grandi impianti a terra, floating, PV+BESS", tipoImpatto: "Decarbonizzazione mix elettrico", intensita: "Alta" },
  // Eolico
  { techId: "T006", settore: "Utility", casoUso: "Parchi onshore e offshore", tipoImpatto: "Decarbonizzazione e sicurezza energetica", intensita: "Alta" },
  { techId: "T006", settore: "Industria", casoUso: "Corporate PPA per siti energy-intensive", tipoImpatto: "Riduzione Scope 2 e hedging", intensita: "Alta" },
  { techId: "T006", settore: "Porti e filiere marine", casoUso: "Sviluppo offshore", tipoImpatto: "Occupazione, investimenti, export", intensita: "Alta" },
  // Idrogeno verde
  { techId: "T011", settore: "Siderurgia", casoUso: "DRI/EAF", tipoImpatto: "Decarbonizzazione hard-to-abate", intensita: "Alta" },
  { techId: "T011", settore: "Raffinazione e chimica", casoUso: "Sostituzione H2 fossile", tipoImpatto: "Riduzione emissioni di processo", intensita: "Alta" },
  { techId: "T011", settore: "Trasporti pesanti", casoUso: "Camion, shipping, e-fuels", tipoImpatto: "Riduzione emissioni in segmenti difficili", intensita: "Media" },
  // Carbone
  { techId: "T001", settore: "Industria", casoUso: "Siderurgia, cemento, vapore industriale", tipoImpatto: "Alta intensita energetica", intensita: "Alta" },
  { techId: "T001", settore: "Utility", casoUso: "Baseload in sistemi carbon-intensive", tipoImpatto: "Generazione elettrica", intensita: "Alta" },
  // Gas Naturale
  { techId: "T003", settore: "Utility", casoUso: "Bilanciamento e capacita programmabile", tipoImpatto: "Flessibilita di sistema", intensita: "Alta" },
  { techId: "T003", settore: "Industria", casoUso: "Calore di processo e cogenerazione", tipoImpatto: "Calore industriale", intensita: "Alta" },
  // Solare Termico
  { techId: "T005", settore: "Industria", casoUso: "Solar process heat", tipoImpatto: "Decarbonizzazione calore", intensita: "Alta" },
  { techId: "T005", settore: "Edilizia", casoUso: "District heating", tipoImpatto: "Riduzione domanda fossile", intensita: "Media" },
  // Idroelettrico
  { techId: "T007", settore: "Utility", casoUso: "Generazione rinnovabile programmabile", tipoImpatto: "Backbone del sistema elettrico", intensita: "Alta" },
  { techId: "T007", settore: "PA", casoUso: "Gestione acqua e resilienza climatica", tipoImpatto: "Infrastruttura multiuso", intensita: "Alta" },
  // Biomasse
  { techId: "T008", settore: "Calore", casoUso: "CHP e district heating", tipoImpatto: "Decarbonizzazione calore", intensita: "Alta" },
  { techId: "T008", settore: "Trasporti", casoUso: "Biometano, bioLNG", tipoImpatto: "Gas rinnovabili", intensita: "Media" },
  // Geotermico
  { techId: "T009", settore: "Utility", casoUso: "Generazione baseload", tipoImpatto: "Programmabile, alta disponibilita", intensita: "Alta" },
  { techId: "T009", settore: "Edilizia", casoUso: "Reti termiche, teleriscaldamento", tipoImpatto: "Calore locale", intensita: "Media" },
  // Nucleare
  { techId: "T010", settore: "Utility", casoUso: "Generazione baseload basse emissioni", tipoImpatto: "Decarbonizzazione su larga scala", intensita: "Alta" },
  { techId: "T010", settore: "Industria", casoUso: "Calore di processo", tipoImpatto: "Potenziale per industria pesante", intensita: "Media" },
  // Olio
  { techId: "T002", settore: "Trasporti", casoUso: "Carburanti liquidi", tipoImpatto: "Mobilita terrestre, aerea, marittima", intensita: "Alta" },
  { techId: "T002", settore: "Industria", casoUso: "Feedstock petrolchimico", tipoImpatto: "Supply chain industriale", intensita: "Alta" },
];

// ---------- SOSTENIBILITA (10) ----------
export interface SostenibilitaRecord {
  techId: string;
  lcaDisponibile: string;
  emissioniGHG: string;
  unitaGHG: string;
  tassonomiaUE: string;
  altriImpatti: string;
}

export const sostenibilitaRecords: SostenibilitaRecord[] = [
  { techId: "T004", lcaDisponibile: "Si", emissioniGHG: "23", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Allineata", altriImpatti: "Materie prime critiche, fine vita moduli" },
  { techId: "T006", lcaDisponibile: "Si", emissioniGHG: "12", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Allineata", altriImpatti: "Impatto paesaggistico, riciclo pale" },
  { techId: "T011", lcaDisponibile: "Parziale", emissioniGHG: "Dipende da input", unitaGHG: "kgCO2e/kgH2", tassonomiaUE: "Allineabile", altriImpatti: "Consumo acqua, materiali critici per PEM" },
  { techId: "T001", lcaDisponibile: "Si", emissioniGHG: "1000", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Non allineata", altriImpatti: "Qualita aria, waste ceneri, uso acqua" },
  { techId: "T002", lcaDisponibile: "Si", emissioniGHG: "780", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Non allineata", altriImpatti: "Sversamenti, emissioni fuggitive" },
  { techId: "T003", lcaDisponibile: "Si", emissioniGHG: "450", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Parzialmente allineata / transitoria", altriImpatti: "Methane leakage nella filiera" },
  { techId: "T005", lcaDisponibile: "Si", emissioniGHG: "30", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Allineata", altriImpatti: "Uso acqua (dry cooling disponibile)" },
  { techId: "T007", lcaDisponibile: "Si", emissioniGHG: "15", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Allineata con DNSH", altriImpatti: "Ecosistemi, sedimenti, fish passage" },
  { techId: "T008", lcaDisponibile: "Si", emissioniGHG: "70", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Condizionata", altriImpatti: "Feedstock sustainability, LUC" },
  { techId: "T009", lcaDisponibile: "Si", emissioniGHG: "25", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Allineata", altriImpatti: "Sismicita indotta, brine" },
  { techId: "T010", lcaDisponibile: "Si", emissioniGHG: "12", unitaGHG: "gCO2e/kWh", tassonomiaUE: "Condizionata", altriImpatti: "Waste nucleare, safety, decommissioning" },
];

// ---------- HELPER: get all data for a technology ----------
export function getTech360(techId: string) {
  return {
    componenti: componenti.filter(c => c.techId === techId),
    trl: trlRecords.filter(r => r.techId === techId),
    costi: costiRecords.filter(r => r.techId === techId),
    bestPractices: bestPractices.filter(r => r.techId === techId),
    policy: policyRecords.filter(r => r.techId === techId),
    barriere: barriereRecords.filter(r => r.techId === techId),
    attori: attoriRecords.filter(r => r.techId === techId),
    prestazioni: prestazioniRecords.filter(r => r.techId === techId),
    settori: settoriImpatto.filter(r => r.techId === techId),
    sostenibilita: sostenibilitaRecords.find(r => r.techId === techId),
  };
}
