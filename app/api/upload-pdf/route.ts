import { NextResponse } from "next/server";
import { extractTextFromPdf, parseHearingDataFromText } from "@/lib/services/pdf-parser";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("pdf");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Arquivo inválido" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const text = await extractTextFromPdf(buffer);
  const fields = parseHearingDataFromText(text);

  return NextResponse.json({ text, fields });
}
