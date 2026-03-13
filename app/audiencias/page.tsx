import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";
import { StatusBadge } from "@/components/status-badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { HearingStatus } from "@prisma/client";
import { listHearings } from "@/lib/services/hearing-service";

export default async function HearingsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const hearings = await listHearings(searchParams);

  return (
    <LayoutShell>
      <h1 className="mb-4 text-2xl font-semibold">Audiências</h1>
      <form className="mb-4 grid grid-cols-1 gap-3 rounded-lg border bg-white p-4 md:grid-cols-4">
        <Input name="search" placeholder="Nome do policial" defaultValue={searchParams.search} />
        <Select name="status" defaultValue={searchParams.status ?? ""}>
          <option value="">Todos os status</option>
          {Object.values(HearingStatus).map((status) => (<option key={status} value={status}>{status}</option>))}
        </Select>
        <Input name="unit" placeholder="Unidade" defaultValue={searchParams.unit} />
        <Input name="district" placeholder="Comarca" defaultValue={searchParams.district} />
        <Input name="date" type="date" defaultValue={searchParams.date} />
        <Input name="sei" placeholder="Processo SEI" defaultValue={searchParams.sei} />
        <Input name="process" placeholder="Processo judicial" defaultValue={searchParams.process} />
        <button className="rounded-md bg-primary px-4 text-primary-foreground">Filtrar</button>
      </form>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Policial</th><th>Processo</th><th>Data</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {hearings.map((hearing) => (
              <tr key={hearing.id} className="border-t">
                <td className="p-3">{hearing.officerName}</td>
                <td>{hearing.processNumber}</td>
                <td>{new Date(hearing.hearingDate).toLocaleDateString("pt-BR")} {hearing.hearingTime}</td>
                <td><StatusBadge status={hearing.status} /></td>
                <td><Link className="text-blue-600 underline" href={`/audiencias/${hearing.id}`}>Detalhes</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutShell>
  );
}
