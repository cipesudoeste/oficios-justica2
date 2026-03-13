import { NextRequest, NextResponse } from "next/server";
import { createHearing, listHearings } from "@/lib/services/hearing-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hearings = await listHearings(Object.fromEntries(searchParams.entries()));
  return NextResponse.json(hearings);
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const hearing = await createHearing(payload);
    return NextResponse.json({ id: hearing.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar audiência", error }, { status: 400 });
  }
}
