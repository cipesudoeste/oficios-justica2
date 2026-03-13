import pdf from "pdf-parse";

export type ParsedHearingData = Partial<{
  processNumber: string;
  seiProcessNumber: string;
  officerName: string;
  unit: string;
  district: string;
  court: string;
  hearingDate: string;
  hearingTime: string;
}>;

export async function extractTextFromPdf(buffer: Buffer) {
  const parsed = await pdf(buffer);
  return parsed.text;
}

export function parseHearingDataFromText(text: string): ParsedHearingData {
  const processNumber = text.match(/\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/)?.[0];
  const seiProcessNumber = text.match(/SEI[-\s:]?\d+[\/\-]\d{4}/i)?.[0];
  const hearingTime = text.match(/\b([01]?\d|2[0-3]):[0-5]\d\b/)?.[0];
  const hearingDate = text.match(/\b\d{2}\/\d{2}\/\d{4}\b/)?.[0];

  return {
    processNumber,
    seiProcessNumber,
    hearingTime,
    hearingDate
  };
}
