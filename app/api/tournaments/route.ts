import { NextResponse } from "next/server";
import { MOCK_TOURNAMENTS } from "@/lib/mock-data/tournaments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const t = MOCK_TOURNAMENTS.find((t) => t.id === id);
    if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(t);
  }

  return NextResponse.json(MOCK_TOURNAMENTS);
}
