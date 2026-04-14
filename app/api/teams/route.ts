import { NextResponse } from "next/server";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get("game");
  const region = searchParams.get("region");

  let teams = [...MOCK_TEAMS];
  if (game) teams = teams.filter((t) => t.game === game);
  if (region) teams = teams.filter((t) => t.region === region);

  return NextResponse.json(teams);
}
