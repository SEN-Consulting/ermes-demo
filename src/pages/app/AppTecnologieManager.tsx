import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { techs } from "../../data/mockData";


interface ManagedTech {
  id: string;
  slug: string;
  name: string;
  family: string;
  maturity: number;
  readiness: number;
  competitiveness: number;
  sustainability: number;
  coverage: number;
  score: number;
  rank: number;
  semaforo: string;
  posizionamento: string;
  raccomandazione: string;
  summary: string;
  description: string;
  sectors: string[];
}

export function AppTecnologieManager({ onOpenTech360 }: { onOpenTech360?: (techId: string) => void }) {
  const [technologies, setTechnologies] = useState<ManagedTech[]>(() => {
    return (techs as unknown as ManagedTech[]).map((t) => ({
      ...t,
      sectors: Array.from(t.sectors) as string[],
    }));
  });
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ManagedTech>>({});

  const handleCreate = () => {
    setMode("create");
    const initialForm: Partial<ManagedTech> = {
      family: "Rinnovabili",
      maturity: 80,
      readiness: 50,
      competitiveness: 50,
      sustainability: 50,
      coverage: 91.7,
      score: 60,
      rank: 12,
      semaforo: "GIALLO",
      posizionamento: "Selettiva",
      raccomandazione: "SELEZIONARE-PILOTARE",
      sectors: [],
    };
    setFormData(initialForm);
  };

  const handleEdit = (tech: ManagedTech) => {
    setMode("edit");
    setEditingId(tech.id);
    setFormData({ ...tech });
  };

  const handleSave = () => {
    const form = formData as any;
    if (!form.name || !form.slug) {
      alert("Nome e slug sono obbligatori");
      return;
    }

    if (mode === "create") {
      const newTech: ManagedTech = {
        id: form.slug.toLowerCase().replace(/\s+/g, "-"),
        slug: form.slug,
        name: form.name,
        family: form.family || "Rinnovabili",
        maturity: form.maturity || 80,
        readiness: form.readiness || 50,
        competitiveness: form.competitiveness || 50,
        sustainability: form.sustainability || 50,
        coverage: form.coverage || 91.7,
        score: form.score || 60,
        rank: form.rank || 12,
        semaforo: form.semaforo || "GIALLO",
        posizionamento: form.posizionamento || "Selettiva",
        raccomandazione: form.raccomandazione || "SELEZIONARE-PILOTARE",
        summary: form.summary || "",
        description: form.description || "",
        sectors: form.sectors || [],
      };
      setTechnologies([...technologies, newTech]);
    } else if (editingId) {
      setTechnologies(
        technologies.map((t) =>
          t.id === editingId
            ? {
                ...t,
                ...formData,
                sectors: formData.sectors || t.sectors,
              }
            : t
        )
      );
    }

    setMode("list");
    setFormData({});
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa tecnologia?")) {
      setTechnologies(technologies.filter((t) => t.id !== id));
    }
  };

  if (mode === "list") {
    return (
      <div className="space-y-8">
        <SectionHeader
          eyebrow="Gestione Tecnologie"
          title="Monitora e gestisci le tecnologie energetiche nel database ERMES."
          text="Aggiungi nuove tecnologie, modifica metriche di valutazione, e definisci settori di applicazione e sfide."
        />

        <Button
          onClick={handleCreate}
          className="rounded-2xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi nuova tecnologia
        </Button>

        <div className="grid gap-4">
          {technologies.map((tech) => (
            <Card key={tech.id} className="rounded-[28px] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-950">{tech.name}</h3>
                      <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                        {tech.family}
                      </Badge>
                      <Badge className={`rounded-full ${tech.semaforo === "VERDE" ? "bg-green-100 text-green-800" : tech.semaforo === "ROSSO" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{tech.score}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{tech.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tech.sectors.map((sector) => (
                        <Badge key={sector} variant="outline" className="rounded-full text-xs">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    {onOpenTech360 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => onOpenTech360(tech.id)}
                      >
                        360°
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleEdit(tech)}
                    >
                      Modifica
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(tech.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="px-0 text-slate-700 hover:bg-transparent"
          onClick={() => setMode("list")}
        >
          Torna alla lista
        </Button>
      </div>

      <Card className="rounded-[28px] shadow-sm">
        <CardHeader>
          <CardTitle>{mode === "create" ? "Crea nuova tecnologia" : "Modifica tecnologia"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Nome tecnologia *</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Fotovoltaico"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Slug *</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. fotovoltaico"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Sommario</label>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Breve sommario della tecnologia..."
              rows={2}
              value={formData.summary || ""}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Descrizione completa</label>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Descrizione dettagliata della tecnologia..."
              rows={4}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Famiglia</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Rinnovabili"
                value={formData.family || ""}
                onChange={(e) => setFormData({ ...formData, family: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Maturita (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.maturity || 80}
                onChange={(e) => setFormData({ ...formData, maturity: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-900">Readiness (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.readiness || 50}
                onChange={(e) => setFormData({ ...formData, readiness: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Competitivita (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.competitiveness || 50}
                onChange={(e) => setFormData({ ...formData, competitiveness: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Sostenibilita (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.sustainability || 50}
                onChange={(e) => setFormData({ ...formData, sustainability: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-900">Score complessivo (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.score || 60}
                onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Coverage (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="0" max="100"
                value={formData.coverage || 91.7}
                onChange={(e) => setFormData({ ...formData, coverage: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Rank</label>
              <Input
                className="mt-2 rounded-lg"
                type="number" min="1"
                value={formData.rank || 12}
                onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-900">Semaforo</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={formData.semaforo || "GIALLO"}
                onChange={(e) => setFormData({ ...formData, semaforo: e.target.value })}
              >
                <option value="VERDE">VERDE</option>
                <option value="GIALLO">GIALLO</option>
                <option value="ROSSO">ROSSO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Posizionamento</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={formData.posizionamento || "Selettiva"}
                onChange={(e) => setFormData({ ...formData, posizionamento: e.target.value })}
              >
                <option value="Leader">Leader</option>
                <option value="Core">Core</option>
                <option value="Selettiva">Selettiva</option>
                <option value="Presidio">Presidio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Raccomandazione</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={formData.raccomandazione || "SELEZIONARE-PILOTARE"}
                onChange={(e) => setFormData({ ...formData, raccomandazione: e.target.value })}
              >
                <option value="ACCELERARE">ACCELERARE</option>
                <option value="SELEZIONARE-PILOTARE">SELEZIONARE-PILOTARE</option>
                <option value="PRESIDIARE-PHASE-OUT">PRESIDIARE-PHASE-OUT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Settori di applicazione</label>
            <p className="mt-1 text-sm text-slate-500">Inserisci i settori separati da virgola</p>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Es. Elettricita, Industria, Trasporti"
              rows={2}
              value={(formData.sectors || []).join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sectors: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean) as typeof formData.sectors,
                })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="rounded-2xl">
              Salva tecnologia
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => {
                setMode("list");
                setFormData({});
                setEditingId(null);
              }}
            >
              Annulla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
