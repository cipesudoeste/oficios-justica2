import { Hearing } from "@prisma/client";
import { formatDate } from "@/lib/utils";

export function generatePresentationLetter(hearing: Hearing) {
  return `OFÍCIO DE APRESENTAÇÃO\n\nProcesso Judicial: ${hearing.processNumber}\nPolicial Militar: ${hearing.officerName} (${hearing.officerRank})\nUnidade: ${hearing.unit}\nComarca/Vara: ${hearing.district} / ${hearing.court}\nData/Hora da Audiência: ${formatDate(hearing.hearingDate)} às ${hearing.hearingTime}\n\nEncaminha-se o presente para apresentação formal do policial militar acima identificado, para comparecimento à audiência designada, com orientação para cumprimento integral da determinação judicial.`;
}

export function generateJustificationLetter(hearing: Hearing) {
  return `OFÍCIO DE JUSTIFICATIVA\n\nProcesso Judicial: ${hearing.processNumber}\nPolicial Militar: ${hearing.officerName}\nData da Audiência: ${formatDate(hearing.hearingDate)}\n\nInformamos impossibilidade excepcional de comparecimento do policial militar na data designada, pelos motivos administrativos devidamente documentados. Solicita-se, respeitosamente, redesignação do ato, permanecendo esta Administração à disposição para os esclarecimentos necessários.`;
}

export function generateEmailText(hearing: Hearing) {
  return `Assunto: Encaminhamento de audiência - ${hearing.processNumber}\n\nPrezados(as),\n\nEncaminhamos as informações da audiência referente ao processo ${hearing.processNumber}, envolvendo ${hearing.officerName}, ${hearing.officerRank}, matrícula ${hearing.officerRegistration}.\n\nData/Hora: ${formatDate(hearing.hearingDate)} às ${hearing.hearingTime}.\nModalidade: ${hearing.modality}.\n\nAtenciosamente,\nSetor Administrativo`;
}

export function generateWhatsappText(hearing: Hearing) {
  return `Prezado(a) ${hearing.officerName}, informamos audiência do processo ${hearing.processNumber} em ${formatDate(hearing.hearingDate)} às ${hearing.hearingTime}. Favor confirmar ciência e manter contato com o setor administrativo.`;
}

export function generateAdministrativeSummary(hearing: Hearing) {
  return `RESUMO ADMINISTRATIVO\n- Processo Judicial: ${hearing.processNumber}\n- Processo SEI: ${hearing.seiProcessNumber ?? "Não informado"}\n- Policial: ${hearing.officerName}\n- Unidade: ${hearing.unit}\n- Situação atual: ${hearing.status}\n- Providências: acompanhar prazo interno e registrar comunicações oficiais.`;
}
