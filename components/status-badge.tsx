import { HearingStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const label: Record<HearingStatus, string> = {
  RECEBIDA: "Recebida",
  TRIAGEM: "Triagem",
  AGUARDANDO_PROVIDENCIA: "Aguardando providência",
  OFICIO_GERADO: "Ofício gerado",
  ENCAMINHADA: "Encaminhada",
  POLICIAL_NOTIFICADO: "Policial notificado",
  CONCLUIDA: "Concluída",
  ARQUIVADA: "Arquivada"
};

export function StatusBadge({ status }: { status: HearingStatus }) {
  return <Badge>{label[status]}</Badge>;
}
