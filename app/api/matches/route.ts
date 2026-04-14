import { NextResponse } from "next/server";
import { MOCK_MATCHES } from "@/lib/mock-data/matches";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const game = searchParams.get("game");

  let matches = [...MOCK_MATCHES];

  // Simulate live score drift
  matches = matches.map((m) => {
    if (m.status === "live") {
      const drift = Math.floor(Math.random() * 2);
      return {
        ...m,
        teamA: { ...m.teamA, score: m.teamA.score + (Math.random() > 0.7 ? drift : 0) },
        teamB: { ...m.teamB, score: m.teamB.score + (Math.random() > 0.8 ? drift : 0) },
        viewers: m.viewers ? m.viewers + Math.floor((Math.random() - 0.3) * 1000) : 0,
      };
    }
    return m;
  });

  if (status) matches = matches.filter((m) => m.status === status);
  if (game) matches = matches.filter((m) => m.game === game);

  return NextResponse.json(matches);
}
