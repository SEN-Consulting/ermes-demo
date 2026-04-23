import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { techs } from "../../data/mockData";
import { scoreColor } from "../../lib/scoreColor";

type PublicTecnologieDetailProps = {
  techSlug?: string | null;
  onBack?: () => void;
};

export function PublicTecnologieDetail({ techSlug, onBack }: PublicTecnologieDetailProps) {
  const tech = useMemo(() => {
    if (!techSlug) return null;
    return techs.find((t) => t.slug === techSlug);
  }, [techSlug]);

  if (!tech) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="px-0 text-slate-700 hover:bg-transparent"
          onClick={onBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Torna alle tecnologie
        </Button>
        <Card className="rounded-[28px] shadow-sm">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600">Tecnologia non trovata</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="px-0 text-slate-700 hover:bg-transparent"
        onClick={onBack}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Torna alle tecnologie
      </Button>

      <div className="space-y-6">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
              {tech.family}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {tech.maturity}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {tech.market}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">{tech.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{tech.summary}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Descrizione tecnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-7 text-slate-700">{tech.description}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Metriche di valutazione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Policy fit</span>
                <Badge className={`rounded-full ${scoreColor(tech.policy)}`}>{tech.policy}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Competitivita</span>
                <Badge className={`rounded-full ${scoreColor(tech.competitiveness)}`}>
                  {tech.competitiveness}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Sostenibilita</span>
                <Badge className={`rounded-full ${scoreColor(tech.sustainability)}`}>
                  {tech.sustainability}
                </Badge>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">Score complessivo</span>
                  <Badge className={`rounded-full ${scoreColor(tech.score)}`}>{tech.score}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Settori di applicazione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tech.sectors.map((sector) => (
                  <Badge key={sector} variant="outline" className="rounded-full">
                    {sector}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Status di deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-slate-700">{tech.deployment}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Sfide principali</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tech.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-400 flex-shrink-0" />
                  <span className="text-slate-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
