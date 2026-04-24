import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { componenti } from "../../data/analyticalData";

type PublicComponentiProps = {
  onOpenComponente?: (compId: string) => void;
};

export function PublicComponenti({ onOpenComponente }: PublicComponentiProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState<string>("Tutti");

  const technologies = useMemo(() => {
    const unique = Array.from(new Set(componenti.map((c) => c.tecnologia)));
    return ["Tutti", ...unique.sort()];
  }, []);

  const filtered = useMemo(() => {
    let result = [...componenti];

    if (techFilter !== "Tutti") {
      result = result.filter((c) => c.tecnologia === techFilter);
    }

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter((c) =>
        [c.nome, c.tecnologia, c.macrocomponente, c.descrizione, c.funzione]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return result;
  }, [searchTerm, techFilter]);

  const statoBg = (stato: string) => {
    if (stato.includes("diffusa")) return "bg-emerald-100 text-emerald-700";
    if (stato.includes("iniziale")) return "bg-blue-100 text-blue-700";
    if (stato.includes("Pilota") || stato.includes("dimostratore")) return "bg-amber-100 text-amber-700";
    if (stato.includes("pre-commerciale") || stato.includes("FOAK") || stato.includes("Pre-commerciale")) return "bg-orange-100 text-orange-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Componenti e sottosistemi"
        title="Anagrafica completa dei componenti tecnologici monitorati."
        text="Ogni componente e classificato per macrocomponente, stato di maturita e funzione nel sistema tecnologico. Clicca su un componente per il dettaglio completo."
      />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Cerca componente</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-2xl pl-9"
                placeholder="Nome, funzione, tecnologia..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Filtra per tecnologia</label>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 6).map((tech) => (
                <Button
                  key={tech}
                  variant={techFilter === tech ? "default" : "outline"}
                  size="sm"
                  className="rounded-2xl"
                  onClick={() => setTechFilter(tech)}
                >
                  {tech}
                </Button>
              ))}
              {technologies.length > 6 && (
                <select
                  className="rounded-2xl border border-slate-200 px-3 py-1 text-sm"
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                >
                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          {filtered.length} componenti {techFilter !== "Tutti" ? `per ${techFilter}` : "totali"}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((c) => (
          <Card key={c.compId} className="rounded-[28px] shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-950">
                      <button
                        className="hover:text-blue-700 hover:underline text-left"
                        onClick={() => {
                          if (onOpenComponente) {
                            onOpenComponente(c.compId);
                            window.location.hash = `componenti/${encodeURIComponent(c.compId)}`;
                          }
                        }}
                      >
                        {c.nome}
                      </button>
                    </h3>
                    <Badge className={`rounded-full ${statoBg(c.stato)}`}>{c.stato}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{c.descrizione}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-full text-xs">{c.tecnologia}</Badge>
                    <Badge variant="outline" className="rounded-full text-xs">{c.macrocomponente}</Badge>
                    <Badge variant="outline" className="rounded-full text-xs">{c.compId}</Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    <strong>Funzione:</strong> {c.funzione}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {onOpenComponente && (
                    <Button
                      onClick={() => {
                        onOpenComponente(c.compId);
                        window.location.hash = `componenti/${encodeURIComponent(c.compId)}`;
                      }}
                      className="rounded-2xl"
                    >
                      Dettagli
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
