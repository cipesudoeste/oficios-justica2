import { DocumentType, CommunicationType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  generateAdministrativeSummary,
  generateEmailText,
  generateJustificationLetter,
  generatePresentationLetter,
  generateWhatsappText
} from "@/lib/services/document-generator";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const hearing = await prisma.hearing.findUnique({ where: { id: params.id } });
  if (!hearing) return NextResponse.json({ message: "Audiência não encontrada" }, { status: 404 });

  const presentation = generatePresentationLetter(hearing);
  const justification = generateJustificationLetter(hearing);
  const summary = generateAdministrativeSummary(hearing);
  const email = generateEmailText(hearing);
  const whatsapp = generateWhatsappText(hearing);

  await prisma.$transaction([
    prisma.generatedDocument.createMany({
      data: [
        { hearingId: hearing.id, type: DocumentType.OFICIO_APRESENTACAO, title: "Ofício de apresentação", content: presentation },
        { hearingId: hearing.id, type: DocumentType.OFICIO_JUSTIFICATIVA, title: "Ofício de justificativa", content: justification },
        { hearingId: hearing.id, type: DocumentType.RESUMO_ADMINISTRATIVO, title: "Resumo administrativo", content: summary }
      ]
    }),
    prisma.communication.createMany({
      data: [
        { hearingId: hearing.id, type: CommunicationType.EMAIL, recipient: "setor@exemplo.gov.br", content: email },
        { hearingId: hearing.id, type: CommunicationType.WHATSAPP, recipient: hearing.officerName, content: whatsapp },
        { hearingId: hearing.id, type: CommunicationType.RESUMO, recipient: "interno", content: summary }
      ]
    }),
    prisma.auditLog.create({
      data: {
        hearingId: hearing.id,
        action: "DOCUMENTOS_E_COMUNICACOES_GERADOS",
        details: "Geração inicial de documentos e mensagens da Fase 1."
      }
    })
  ]);

  return NextResponse.redirect(new URL(`/audiencias/${hearing.id}`, process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}
