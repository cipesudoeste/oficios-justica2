"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { HearingModality, HearingStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { hearingSchema } from "@/lib/validators/hearing";

const statuses = Object.values(HearingStatus);

export function HearingForm({ prefill }: { prefill?: Record<string, string> }) {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      action={(formData) => {
        const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
        const parsed = hearingSchema.safeParse(payload);
        if (!parsed.success) {
          setError("Validação inválida. Confira os campos obrigatórios.");
          return;
        }

        startTransition(async () => {
          const res = await fetch("/api/audiencias", { method: "POST", body: JSON.stringify(payload) });
          if (!res.ok) {
            setError("Não foi possível salvar a audiência.");
            return;
          }
          const json = await res.json();
          router.push(`/audiencias/${json.id}`);
        });
      }}
    >
      <Input name="processNumber" placeholder="Processo judicial" defaultValue={prefill?.processNumber} required />
      <Input name="seiProcessNumber" placeholder="Processo SEI" defaultValue={prefill?.seiProcessNumber} />
      <Input name="officerName" placeholder="Nome do policial" defaultValue={prefill?.officerName} required />
      <Input name="officerRegistration" placeholder="Matrícula" required />
      <Input name="officerRank" placeholder="Posto/Graduação" required />
      <Input name="unit" placeholder="Unidade" defaultValue={prefill?.unit} required />
      <Input name="district" placeholder="Comarca" defaultValue={prefill?.district} required />
      <Input name="court" placeholder="Vara" defaultValue={prefill?.court} required />
      <Input name="hearingType" placeholder="Tipo de audiência" required />
      <Input name="hearingDate" type="date" defaultValue={prefill?.hearingDate} required />
      <Input name="hearingTime" type="time" defaultValue={prefill?.hearingTime} required />
      <Select name="modality" defaultValue={HearingModality.PRESENCIAL}>
        <option value={HearingModality.PRESENCIAL}>Presencial</option>
        <option value={HearingModality.VIRTUAL}>Virtual</option>
      </Select>
      <Input name="location" placeholder="Local" />
      <Input name="meetingLink" placeholder="Link da audiência" />
      <Input name="internalDeadline" type="date" placeholder="Prazo interno" />
      <Select name="status" defaultValue={HearingStatus.RECEBIDA}>
        {statuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
      <div className="md:col-span-2">
        <Textarea name="notes" placeholder="Observações" />
      </div>
      {error ? <p className="text-sm text-red-600 md:col-span-2">{error}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>{isPending ? "Salvando..." : "Salvar audiência"}</Button>
      </div>
    </form>
  );
}
