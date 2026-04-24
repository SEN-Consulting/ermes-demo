import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { sourceRows } from "../../data/mockData";

interface ManagedSource {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  strategy: string;
  priority: string;
  last: string;
  status: string;
  url: string;
  focus: string[];
}

export function AppFontiManager({ onOpenSource }: { onOpenSource?: (sourceId: string) => void }) {
  const [sources, setSources] = useState<ManagedSource[]>(() => {
    return (sourceRows as unknown as ManagedSource[]).map((s) => ({
      ...s, 
      focus: Array.from(s.focus) as string[],
    }));
  });
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ManagedSource>>({});

  const handleCreate = () => {
    setMode("create");
    const initialForm: Partial<ManagedSource> = {
      type: "Media",
      priority: "Media",
      strategy: "feed",
      status: "Attiva",
      focus: [],
    };
    setFormData(initialForm);
  };

  const handleEdit = (source: ManagedSource) => {
    setMode("edit");
    setEditingId(source.id);
    setFormData({ ...source });
  };

  const handleSave = () => {
    const form = formData as any;
    if (!form.name || !form.slug) {
      alert("Nome e slug sono obbligatori");
      return;
    }

    if (mode === "create") {
      const newSource: ManagedSource = {
        id: form.slug.toLowerCase().replace(/\s+/g, "-"),
        slug: form.slug,
        name: form.name,
        type: form.type || "Media",
        description: form.description || "",
        strategy: form.strategy || "feed",
        priority: form.priority || "Media",
        last: "Ora",
        status: form.status || "Attiva",
        url: form.url || "",
        focus: form.focus || [],
      };
      setSources([...sources, newSource]);
    } else if (editingId) {
      setSources(
        sources.map((s) =>
          s.id === editingId
            ? {
                ...s,
                ...formData,
                focus: formData.focus || s.focus,
              }
            : s
        )
      );
    }

    setMode("list");
    setFormData({});
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa fonte?")) {
      setSources(sources.filter((s) => s.id !== id));
    }
  };

  if (mode === "list") {
    return (
      <div className="space-y-8">
        <SectionHeader
          eyebrow="Gestione Fonti"
          title="Monitora e gestisci le fonti di informazione per il sistema ERMES."
          text="Aggiungi nuove fonti, modifica le strategie di monitoraggio e definisci priorita e focus tematici."
        />

        <Button
          onClick={handleCreate}
          className="rounded-2xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi nuova fonte
        </Button>

        <div className="space-y-4">
          {sources.map((source) => (
            <Card key={source.id} className="rounded-[28px] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {onOpenSource ? (
                          <button className="hover:text-blue-700 hover:underline text-left" onClick={() => onOpenSource(source.id)}>{source.name}</button>
                        ) : source.name}
                      </h3>
                      <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                        {source.type}
                      </Badge>
                      <Badge
                        className={`rounded-full ${
                          source.status === "Attiva"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {source.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{source.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {source.focus.map((topic) => (
                        <Badge key={topic} variant="outline" className="rounded-full text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleEdit(source)}
                    >
                      Modifica
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(source.id)}
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
          <CardTitle>{mode === "create" ? "Crea nuova fonte" : "Modifica fonte"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Nome fonte *</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. IEA"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Slug *</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. iea"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Descrizione</label>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Descrizione dettagliata della fonte..."
              rows={4}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Tipo</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Istituzionale"
                value={formData.type || ""}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Priorita</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Alta"
                value={formData.priority || ""}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900">Strategia di monitoraggio</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. feed + search"
                value={formData.strategy || ""}
                onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Status</label>
              <Input
                className="mt-2 rounded-lg"
                placeholder="Es. Attiva"
                value={formData.status || ""}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">URL sito web</label>
            <Input
              className="mt-2 rounded-lg"
              placeholder="https://..."
              value={formData.url || ""}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Focus tematici</label>
            <p className="mt-1 text-sm text-slate-500">
              Inserisci i focus tematici separati da virgola (es: Solar, Wind, Energy)
            </p>
            <Textarea
              className="mt-2 rounded-lg"
              placeholder="Es. Solar, Wind, Energy"
              rows={3}
              value={(formData.focus || []).join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  focus: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean) as typeof formData.focus,
                })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="rounded-2xl">
              Salva fonte
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
