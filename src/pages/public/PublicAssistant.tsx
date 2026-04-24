import { Bot, Send, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "../../components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "Spiegami il nucleare di IV generazione",
  "Confronta eolico e fotovoltaico",
  "Quali novita sull'idrogeno verde negli ultimi 6 mesi?",
  "Quali tecnologie sono piu adatte ai Paesi in via di sviluppo?",
  "Fammi una sintesi executive per decisori",
  "Qual e lo stato dell'arte delle batterie a stato solido?",
];

const simulatedResponses: Record<string, string> = {
  "spiegami il nucleare di iv generazione":
    "Il nucleare di IV generazione comprende sei famiglie di reattori avanzati — tra cui i reattori a sali fusi (MSR), a gas ad alta temperatura (VHTR) e veloci raffreddati a sodio (SFR) — progettati per superare i limiti dei reattori attuali in termini di sicurezza, efficienza e gestione dei rifiuti.\n\n**Stato attuale nel portafoglio ERMES:**\n- Score composito: 72.3/100 — posizionamento \"Consolidamento\"\n- Maturita tecnologica: medio-alta per SFR e VHTR, ancora in fase dimostrativa per MSR\n- TRL medio dei componenti chiave: 5-7\n\n**Punti di forza:**\n- Sicurezza intrinseca (sistemi passivi di raffreddamento)\n- Efficienza termica superiore al 40% (vs 33% degli LWR)\n- Possibilita di chiudere il ciclo del combustibile riducendo i rifiuti a lunga vita\n\n**Barriere principali:**\n- Tempi e costi di licensing ancora elevati\n- Gap industriale nella supply chain dei componenti avanzati\n- Accettabilita sociale e framework regolatorio incompleto in molte giurisdizioni\n\nLa raccomandazione ERMES e di monitorare attivamente gli sviluppi SMR/MSR, con particolare attenzione ai progetti pilota in corso in Canada, USA e Francia.",

  "confronta eolico e fotovoltaico":
    "Ecco un confronto tra le due tecnologie rinnovabili principali nel portafoglio ERMES:\n\n| Parametro | Eolico | Fotovoltaico |\n|---|---|---|\n| Score ERMES | 88.1 | 90.1 |\n| Ranking | #2 | #1 |\n| Semaforo | VERDE | VERDE |\n| LCOE medio | 30-50 €/MWh | 25-45 €/MWh |\n| Capacity factor | 25-45% | 15-25% |\n| Maturita | Alta | Molto alta |\n\n**Fotovoltaico** eccelle per modularita, velocita di deployment e curva di costo in continua discesa. E la tecnologia piu accessibile per mercati emergenti e applicazioni distribuite.\n\n**Eolico** (soprattutto offshore) offre capacity factor superiori e migliore complementarieta stagionale. Il trend verso turbine da 15+ MW riduce ulteriormente il LCOE offshore.\n\n**Sinergie:** L'abbinamento eolico+fotovoltaico+storage rappresenta la configurazione ottimale per la maggior parte dei sistemi elettrici, massimizzando la copertura temporale della generazione rinnovabile.\n\nEntrambe le tecnologie hanno semaforo VERDE con raccomandazione \"Priorita massima\" nel ranking ERMES.",

  "quali novita sull'idrogeno verde negli ultimi 6 mesi?":
    "Negli ultimi 6 mesi il monitoraggio ERMES ha registrato sviluppi significativi sull'idrogeno verde:\n\n**Policy e regolamentazione:**\n- La Commissione Europea ha approvato le regole delegate sulla definizione di idrogeno rinnovabile (RFNBO), chiarendo i requisiti di addizionalita\n- L'Hydrogen Bank europea ha aggiudicato i primi 800 M€ di sussidi tramite asta competitiva\n\n**Tecnologia e costi:**\n- I costi degli elettrolizzatori PEM sono scesi a ~500-700 €/kW (-15% YoY)\n- Nuovi catalizzatori a base di materiali non-nobili mostrano efficienze >80% in laboratorio\n- Primi test su larga scala di elettrolizzatori AEM (>1 MW)\n\n**Progetti rilevanti:**\n- NEOM Green Hydrogen (Arabia Saudita): in costruzione, 2.2 GW di elettrolisi\n- HyDeal Ambition (Spagna/Francia): raggiunto FID per la prima fase da 200 MW\n- Porto di Rotterdam: avvio del corridoio H2 verso la Germania\n\n**Posizionamento ERMES:**\nScore 74.5/100 — semaforo VERDE, posizionamento \"Scale-up\". La raccomandazione e monitorare intensivamente la traiettoria dei costi e le decisioni di investimento dei grandi progetti europei.",

  "quali tecnologie sono piu adatte ai paesi in via di sviluppo?":
    "Dall'analisi del portafoglio ERMES, le tecnologie con il miglior fit per i Paesi in via di sviluppo sono:\n\n**Tier 1 — Deployment immediato:**\n1. **Fotovoltaico distribuito** (Score 90.1) — Modularita estrema, costi in calo, nessuna dipendenza da grandi infrastrutture. Ideale per elettrificazione rurale e mini-grid.\n2. **Mini-grid ibride** (solare + storage + diesel backup) — Soluzione pratica per comunita off-grid, con payback period in calo sotto i 5 anni.\n\n**Tier 2 — Medio termine:**\n3. **Eolico onshore** (Score 88.1) — Competitivo dove le risorse eoliche sono buone, ma richiede capacita di manutenzione e grid piu robusta.\n4. **Biomassa sostenibile** — Rilevante dove esiste una filiera agricola/forestale, richiede governance attenta per evitare impatti ambientali.\n\n**Tier 3 — Selettivo:**\n5. **Idrogeno verde** — Solo in contesti con abbondante risorsa rinnovabile e domanda industriale (es. ammoniaca per fertilizzanti, export energy).\n\n**Criteri chiave per la selezione:**\n- Modularita e scalabilita\n- Bassa dipendenza da infrastrutture preesistenti\n- Costi di O&M contenuti\n- Disponibilita di competenze locali\n- Accesso a finanziamento internazionale (climate finance)\n\nLa piattaforma ERMES permette di filtrare le tecnologie per questi criteri nella sezione \"Confronta\".",

  "fammi una sintesi executive per decisori":
    "**ERMES — Sintesi Executive del Portafoglio Tecnologico**\n\n**Score medio portafoglio:** 71.3/100\n**Tecnologie monitorate:** 11 | **Componenti chiave:** 49 | **Fonti attive:** 25\n\n---\n\n**Top performer (semaforo VERDE):**\n- Fotovoltaico (90.1) — Leader assoluto, maturita massima, costi in discesa continua\n- Eolico (88.1) — Forte crescita offshore, complementare al PV\n- Idroelettrico (83.2) — Maturo e affidabile, opportunita nel pompaggio\n\n**Tecnologie in crescita (semaforo GIALLO):**\n- Idrogeno verde (74.5) — In fase di scale-up, costi ancora elevati ma traiettoria promettente\n- Storage elettrochimico (77.8) — Mercato in espansione rapida, criticita su supply chain minerali\n\n**Aree critiche (semaforo ROSSO):**\n- Olio (46.1) e Carbone (52.8) — In declino strutturale, stranded asset risk elevato\n\n**Raccomandazioni strategiche:**\n1. **Accelerare** su fotovoltaico + storage + eolico offshore (portafoglio core)\n2. **Monitorare intensivamente** idrogeno verde e nucleare SMR (potenziale disruptive)\n3. **Pianificare phase-out** delle fonti fossili con timeline allineata a NDC e Net Zero\n4. **Investire in competenze** su batterie e supply chain dei minerali critici\n\nPer approfondimenti su ciascuna tecnologia, accedere alla webapp ERMES.",

  "qual e lo stato dell'arte delle batterie a stato solido?":
    "Le batterie a stato solido (SSB) rappresentano una delle frontiere piu promettenti dello storage elettrochimico.\n\n**Stato tecnologico:**\n- TRL attuale: 5-6 (prototipazione avanzata, primi pilot)\n- Densita energetica: 400-500 Wh/kg (vs 250-300 Wh/kg Li-ion convenzionale)\n- Cicli di vita attesi: >1000 a densita di corrente commerciale\n- Elettroliti piu promettenti: solfuri (LGPS), ossidi (LLZO), polimeri compositi\n\n**Attori principali:**\n- **Toyota**: annunciata produzione pilota 2027-2028 per applicazioni automotive\n- **QuantumScape**: celle multi-layer in test con Volkswagen, risultati incoraggianti su fast-charge\n- **Samsung SDI**: prototipo 900 Wh/L, target produzione 2027\n- **Solid Power**: partnership con BMW e Ford, celle da 22 Ah in validazione\n\n**Barriere residue:**\n- Interfaccia elettrolita-elettrodo: instabilita e crescita di dendriti a correnti elevate\n- Scalabilita produttiva: processi di manifattura non ancora ottimizzati\n- Costi: stimati 2-3x rispetto a Li-ion convenzionale nella prima fase\n\n**Outlook ERMES:**\nLe SSB potrebbero raggiungere la commercializzazione automotive entro il 2028-2030. Per applicazioni stazionarie (grid storage), il Li-ion LFP rimane piu competitivo nel medio termine. Raccomandiamo monitoraggio trimestrale dei risultati dei pilot industriali.",
};

function getSimulatedResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();
  for (const [key, value] of Object.entries(simulatedResponses)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  // Generic fallback
  if (lower.includes("nuclear") || lower.includes("nucleare")) return simulatedResponses["spiegami il nucleare di iv generazione"];
  if (lower.includes("eolico") || lower.includes("fotovoltaic") || lower.includes("solar") || lower.includes("wind")) return simulatedResponses["confronta eolico e fotovoltaico"];
  if (lower.includes("idrogeno") || lower.includes("hydrogen")) return simulatedResponses["quali novita sull'idrogeno verde negli ultimi 6 mesi?"];
  if (lower.includes("sviluppo") || lower.includes("developing") || lower.includes("africa")) return simulatedResponses["quali tecnologie sono piu adatte ai paesi in via di sviluppo?"];
  if (lower.includes("executive") || lower.includes("sintesi") || lower.includes("decisor")) return simulatedResponses["fammi una sintesi executive per decisori"];
  if (lower.includes("batterie") || lower.includes("battery") || lower.includes("solid") || lower.includes("storage")) return simulatedResponses["qual e lo stato dell'arte delle batterie a stato solido?"];

  return "Grazie per la domanda. In base all'analisi del portafoglio ERMES, posso confermare che il tema e attualmente monitorato dal nostro osservatorio.\n\nPer una risposta dettagliata, ti consiglio di:\n1. Consultare la sezione **Tecnologie** per le schede complete\n2. Utilizzare il **Confronta** per analisi comparative\n3. Accedere alla **Webapp** per l'analisi a 360° con dati su componenti, costi, TRL e policy\n\nIn questa versione demo le risposte sono simulate. Nella piattaforma definitiva, l'assistente ERMES sara alimentato da un modello AI addestrato sui contenuti dell'osservatorio.";
}

export function PublicAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ciao! Sono l'assistente ERMES, specializzato nell'analisi delle tecnologie energetiche. Posso aiutarti a comprendere lo stato dell'arte, confrontare tecnologie, sintetizzare evidenze e orientarti nel portafoglio dell'osservatorio.\n\nCosa vuoi sapere?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message || isTyping) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = getSimulatedResponse(message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col" style={{ height: "calc(100vh - 220px)" }}>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-1 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 px-4 py-4 ${msg.role === "assistant" ? "" : ""}`}>
              <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-slate-900 text-white" : "bg-blue-600 text-white"}`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {msg.role === "assistant" ? "ERMES" : "Tu"}
                </div>
                <div className="text-sm leading-7 text-slate-700 whitespace-pre-line">{msg.content}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 px-4 py-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-500 mb-1">ERMES</div>
                <div className="flex gap-1 py-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm leading-6 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-slate-200 px-4 py-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Chiedi qualcosa sulle tecnologie energetiche..."
              className="flex-1 border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              disabled={isTyping}
            />
            <Button
              size="sm"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 h-9 w-9 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-center text-xs text-slate-400">
            ERMES puo commettere errori. Le risposte sono generate dall'osservatorio tecnologico FEEM.
          </div>
        </div>
      </div>
    </div>
  );
}
