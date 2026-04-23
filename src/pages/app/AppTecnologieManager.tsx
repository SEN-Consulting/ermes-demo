import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { techs } from "../../data/mockData";
import { scoreColor } from "../../lib/scoreColor";

interface ManagedTech {
  id: string;
  slug: string;
  name: string;
  family: string;
  maturity: string;
  market: string;
  pvs: string;
  policy: number;
  competitiveness: number;
  sustainability: number;
  score: number;
  summary: string;
  description: string;
  sectors: string[];
  deployment: string;
  challenges: string[];
}

export function AppTecnologieManager() {
  const [technologies, setTechnologies] = useState<ManagedTech[]>(() => {
    return (techs as unknown as ManagedTech[]).map((t) => ({
      ...t,
      sectors: Array.from(t.sectors) as string[],
      challenges: Array.from(t.challenges) as string[],
    }));
  });
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ManagedTech>>({});

  const handleCreate = () => {
    setMode("create");
    const initialForm: Partial<ManagedTech> = {
      family: "Rinnovabili",
      maturity: "Alta",
      market: "Globale",
      pvs: "Alto",
      policy: 80,
      competitiveness: 80,
      sustainability: 80,
      score: 80,
      sectors: [],
      challenges: [],
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
        maturity: form.maturity || "Alta",
        market: form.market || "Globale",
        pvs: form.pvs || "Alto",
        policy: form.policy || 80,
        competitiveness: form.competitiveness || 80,
        sustainability: form.sustainability || 80,
        score: form.score || 80,
        summary: form.summary || "",
        description: form.description || "",
        sectors: form.sectors || [],
        deployment: form.deployment || "",
        challenges: form.challenges || [],
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
                challenges: formData.challenges || t.challenges,
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
                      <Badge className={`rounded-full ${scoreColor(tech.score)}`}>{tech.score}</Badge>
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
              <label className="block text-sm font-medium text-slate-900">Maturita</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Media-Alta"
                value={formData.maturity || ""}
                onChange={(e) => setFormData({ ...formData, maturity: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Mercato</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Globale"
                value={formData.market || ""}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">PVS fit</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Alto"
                value={formData.pvs || ""}
                onChange={(e) => setFormData({ ...formData, pvs: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-900">Policy (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number"
                min="0"
                max="100"
                value={formData.policy || 80}
                onChange={(e) => setFormData({ ...formData, policy: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Competitivita (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number"
                min="0"
                max="100"
                value={formData.competitiveness || 80}
                onChange={(e) => setFormData({ ...formData, competitiveness: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Sostenibilita (0-100)</label>
              <Input
                className="mt-2 rounded-lg"
                type="number"
                min="0"
                max="100"
                value={formData.sustainability || 80}
                onChange={(e) => setFormData({ ...formData, sustainability: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Score complessivo (0-100)</label>
            <Input
              className="mt-2 rounded-lg"
              type="number"
              min="0"
              max="100"
              value={formData.score || 80}
              onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Status di deployment</label>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Es. 65 GW installati globalmente nel 2025"
              rows={2}
              value={formData.deployment || ""}
              onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
            />
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

          <div>
            <label className="block text-sm font-medium text-slate-900">Sfide principali</label>
            <p className="mt-1 text-sm text-slate-500">Inserisci le sfide separate da virgola</p>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Es. Supply chain, Grid integration, Land use"
              rows={2}
              value={(formData.challenges || []).join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  challenges: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean) as typeof formData.challenges,
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
