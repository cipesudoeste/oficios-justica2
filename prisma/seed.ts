import { PrismaClient, HearingStatus, HearingModality } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.hearing.count();
  if (count > 0) return;

  await prisma.hearing.createMany({
    data: [
      {
        processNumber: "0801234-11.2026.8.26.0001",
        seiProcessNumber: "SEI-12345/2026",
        officerName: "Capitão João da Silva",
        officerRegistration: "PM123456",
        officerRank: "Capitão",
        unit: "12º BPM/M",
        district: "São Paulo",
        court: "2ª Vara Criminal",
        hearingType: "Instrução",
        hearingDate: new Date("2026-04-11"),
        hearingTime: "14:30",
        modality: HearingModality.PRESENCIAL,
        location: "Fórum Criminal Barra Funda",
        status: HearingStatus.RECEBIDA
      },
      {
        processNumber: "0806789-22.2026.8.26.0002",
        seiProcessNumber: "SEI-67890/2026",
        officerName: "Sargento Maria Oliveira",
        officerRegistration: "PM654321",
        officerRank: "3º Sargento",
        unit: "3º BAEP",
        district: "Campinas",
        court: "1ª Vara Cível",
        hearingType: "Conciliação",
        hearingDate: new Date("2026-04-15"),
        hearingTime: "09:00",
        modality: HearingModality.VIRTUAL,
        meetingLink: "https://meet.example.com/audiencia",
        status: HearingStatus.TRIAGEM
      }
    ]
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
