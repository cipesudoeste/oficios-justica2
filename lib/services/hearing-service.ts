import { HearingStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { hearingSchema, type HearingInput } from "@/lib/validators/hearing";

export async function getDashboardMetrics() {
  const [total, pending, completed, urgent, upcoming] = await Promise.all([
    prisma.hearing.count(),
    prisma.hearing.count({ where: { status: { in: [HearingStatus.RECEBIDA, HearingStatus.TRIAGEM, HearingStatus.AGUARDANDO_PROVIDENCIA] } } }),
    prisma.hearing.count({ where: { status: HearingStatus.CONCLUIDA } }),
    prisma.hearing.count({ where: { internalDeadline: { lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) } } }),
    prisma.hearing.findMany({ orderBy: { hearingDate: "asc" }, take: 5 })
  ]);

  return { total, pending, completed, urgent, upcoming };
}

export async function listHearings(filters: Record<string, string | undefined>) {
  const where: Prisma.HearingWhereInput = {
    officerName: filters.search ? { contains: filters.search, mode: "insensitive" } : undefined,
    status: filters.status as HearingStatus | undefined,
    unit: filters.unit ? { contains: filters.unit, mode: "insensitive" } : undefined,
    district: filters.district ? { contains: filters.district, mode: "insensitive" } : undefined,
    seiProcessNumber: filters.sei ? { contains: filters.sei, mode: "insensitive" } : undefined,
    processNumber: filters.process ? { contains: filters.process, mode: "insensitive" } : undefined,
    hearingDate: filters.date ? { gte: new Date(filters.date), lte: new Date(`${filters.date}T23:59:59`) } : undefined
  };

  return prisma.hearing.findMany({ where, orderBy: [{ hearingDate: "asc" }, { hearingTime: "asc" }] });
}

export async function getHearingById(id: string) {
  return prisma.hearing.findUnique({
    where: { id },
    include: {
      generatedDocuments: { orderBy: { createdAt: "desc" } },
      communications: { orderBy: { createdAt: "desc" } },
      auditLogs: { orderBy: { createdAt: "desc" } }
    }
  });
}

export async function createHearing(data: HearingInput) {
  const parsed = hearingSchema.parse(data);
  const hearing = await prisma.hearing.create({
    data: {
      ...parsed,
      hearingDate: new Date(parsed.hearingDate),
      internalDeadline: parsed.internalDeadline ? new Date(parsed.internalDeadline) : undefined,
      meetingLink: parsed.meetingLink || undefined
    }
  });

  await prisma.auditLog.create({
    data: {
      hearingId: hearing.id,
      action: "AUDIENCIA_CRIADA",
      details: "Cadastro manual da audiência."
    }
  });

  return hearing;
}
