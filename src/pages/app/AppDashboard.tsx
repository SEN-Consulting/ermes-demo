import { Bell, Database, Globe2, Newspaper } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricCard } from "../../components/shared/MetricCard";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { workflowData } from "../../data/mockData";

export function AppDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Webapp analista"
        title="Una dashboard leggera ma credibile per gestire la piattaforma."
        text="Qui non serve backend reale: serve far vedere bene il cockpit di monitoraggio, aggiornamento e produzione contenuti."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Aggiornamenti da validare" value="18" hint="priorita di oggi" icon={Bell} />
        <MetricCard label="Fonti attive" value="27" hint="strategie differenziate" icon={Globe2} />
        <MetricCard label="Schede complete" value="11/11" hint="copertura portafoglio" icon={Database} />
        <MetricCard label="Contenuti in workflow" value="31" hint="blog, brief, newsletter" icon={Newspaper} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Pipeline editoriale</CardTitle>
            <CardDescription>Molto utile per mostrare che la piattaforma non e solo archivio ma motore di disseminazione.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...workflowData]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Cose da fare oggi</CardTitle>
            <CardDescription>Una colonna operativa molto efficace in presentazione.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Validare gli aggiornamenti su nucleare avanzato e idrogeno verde.",
              "Rivedere la strategia di 3 fonti istituzionali poco produttive.",
              "Trasformare 2 evidenze in articolo pubblico e 1 in policy brief.",
              "Chiudere la bozza newsletter del mese.",
            ].map((todo) => (
              <div key={todo} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{todo}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
