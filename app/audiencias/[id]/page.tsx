import { notFound } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHearingById } from "@/lib/services/hearing-service";

export default async function HearingDetailPage({ params }: { params: { id: string } }) {
  const hearing = await getHearingById(params.id);
  if (!hearing) return notFound();

  return (
    <LayoutShell>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detalhes da audiência</h1>
        <StatusBadge status={hearing.status} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Dados principais</CardTitle></CardHeader><CardContent className="space-y-1 text-sm">
          <p><strong>Processo:</strong> {hearing.processNumber}</p>
          <p><strong>SEI:</strong> {hearing.seiProcessNumber ?? "-"}</p>
          <p><strong>Policial:</strong> {hearing.officerName}</p>
          <p><strong>Unidade:</strong> {hearing.unit}</p>
          <p><strong>Audiência:</strong> {new Date(hearing.hearingDate).toLocaleDateString("pt-BR")} {hearing.hearingTime}</p>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Ações rápidas</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">
          <form action={`/api/audiencias/${hearing.id}/generate`} method="post"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Gerar documentos e comunicações</button></form>
        </CardContent></Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Documentos gerados</CardTitle></CardHeader><CardContent className="space-y-2 text-xs">{hearing.generatedDocuments.map((doc) => <pre key={doc.id} className="whitespace-pre-wrap rounded border p-2">{doc.title}\n{doc.content}</pre>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Comunicações</CardTitle></CardHeader><CardContent className="space-y-2 text-xs">{hearing.communications.map((comm) => <pre key={comm.id} className="whitespace-pre-wrap rounded border p-2">{comm.type}\n{comm.content}</pre>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Histórico</CardTitle></CardHeader><CardContent className="space-y-2 text-xs">{hearing.auditLogs.map((log) => <p key={log.id} className="rounded border p-2">{new Date(log.createdAt).toLocaleString("pt-BR")} • {log.action} • {log.details}</p>)}</CardContent></Card>
      </div>
    </LayoutShell>
  );
}
