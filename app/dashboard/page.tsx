import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/services/hearing-service";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <LayoutShell>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total", metrics.total],
          ["Pendentes", metrics.pending],
          ["Concluídas", metrics.completed],
          ["Urgentes", metrics.urgent]
        ].map(([title, value]) => (
          <Card key={title as string}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{value}</p></CardContent></Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Próximas audiências</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {metrics.upcoming.map((hearing) => (
              <li key={hearing.id} className="flex items-center justify-between border-b pb-2">
                <span>{hearing.officerName} • {hearing.processNumber}</span>
                <span>{formatDate(hearing.hearingDate)} {hearing.hearingTime}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="/audiencias/nova" className="text-blue-600 underline">Nova audiência</Link>
            <Link href="/audiencias" className="text-blue-600 underline">Ver listagem</Link>
          </div>
        </CardContent>
      </Card>
    </LayoutShell>
  );
}
