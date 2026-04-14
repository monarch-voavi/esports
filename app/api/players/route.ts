import { NextResponse } from "next/server";
import { MOCK_PLAYERS } from "@/lib/mock-data/players";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const limit = searchParams.get("limit");

  let players = [...MOCK_PLAYERS];
  if (teamId) players = players.filter((p) => p.teamId === teamId);
  if (limit) players = players.slice(0, parseInt(limit));

  return NextResponse.json(players);
}
