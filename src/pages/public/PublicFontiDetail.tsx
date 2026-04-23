import { ChevronLeft, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { sourceRows } from "../../data/mockData";

type PublicFontiDetailProps = {
  sourceSlug?: string | null;
  onBack?: () => void;
};

export function PublicFontiDetail({ sourceSlug, onBack }: PublicFontiDetailProps) {
  const source = useMemo(() => {
    if (!sourceSlug) return null;
    return sourceRows.find((s) => s.slug === sourceSlug);
  }, [sourceSlug]);

  if (!source) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="px-0 text-slate-700 hover:bg-transparent"
          onClick={onBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Torna alle fonti
        </Button>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600">Fonte non trovata</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusBgColor =
    source.status === "Attiva"
      ? "bg-emerald-100 text-emerald-700"
      : source.status === "In pausa"
        ? "bg-amber-100 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="px-0 text-slate-700 hover:bg-transparent"
        onClick={onBack}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Torna alle fonti
      </Button>

      <div className="space-y-6">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
              {source.type}
            </Badge>
            <Badge className={`rounded-full ${statusBgColor}`}>{source.status}</Badge>
            <Badge variant="outline" className="rounded-full">
              {source.priority === "Alta" ? "Priorita Alta" : "Priorita Media"}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">{source.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{source.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Informazioni principali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Tipo di fonte</div>
                <div className="mt-1 text-slate-900">{source.type}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Strategia di monitoraggio</div>
                <div className="mt-1 text-slate-900">{source.strategy}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Ultimo aggiornamento</div>
                <div className="mt-1 text-slate-900">{source.last}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Sito web</div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Visita il sito <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Status di monitoraggio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Status attuale</div>
                <Badge className={`mt-2 rounded-full ${statusBgColor}`}>{source.status}</Badge>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Priorita di monitoraggio</div>
                <Badge variant="outline" className="mt-2 rounded-full">
                  {source.priority}
                </Badge>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase">Frequenza di aggiornamento</div>
                <div className="mt-1 text-slate-900">{source.strategy}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Focus tematici monitorati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {source.focus.map((topic) => (
                <Badge key={topic} variant="outline" className="rounded-full">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
