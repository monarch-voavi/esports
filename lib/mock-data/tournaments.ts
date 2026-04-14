import type { Tournament, BracketMatch, BracketTeam } from "@/types";

const mkTeam = (id: string, name: string, short: string, seed: number, color: string): BracketTeam => ({
  id, name, shortName: short, seed, color,
});

const mkMatch = (
  id: string, roundId: string, position: number,
  teamA: BracketTeam | null, teamB: BracketTeam | null,
  winner: string | null, status: BracketMatch["status"],
  score?: [number, number]
): BracketMatch => ({ id, roundId, position, teamA, teamB, winner, status, score });

// VCT Champions 2025 — Single Elimination
const nsp = mkTeam("t1", "Neon Serpents", "NSP", 1, "#00FFA3");
const pwv = mkTeam("t2", "Phantom Wave", "PWV", 2, "#8B6FFF");
const stc = mkTeam("t10", "Stellar Collapse", "STC", 3, "#EC4899");
const vdw = mkTeam("t7", "Void Walkers", "VDW", 4, "#9333EA");
const gpr = mkTeam("t9", "Ghost Protocol", "GPR", 5, "#F59E0B");
const dkm = mkTeam("t4", "Dark Matter", "DKM", 6, "#FF006E");
const tgf = mkTeam("t11", "Tungsten Force", "TGF", 7, "#10B981");
const nxr = mkTeam("t12", "Nexus Rising", "NXR", 8, "#3B82F6");

// IEM Katowice 2025 — Double Elimination (winners bracket)
const azb = mkTeam("t3", "Azure Blaze", "AZB", 1, "#00D4FF");
const cre = mkTeam("t6", "Crimson Eclipse", "CRE", 2, "#FF4444");
const ict = mkTeam("t5", "Iron Citadel", "ICT", 3, "#FFB800");
const stp = mkTeam("t8", "Storm Protocol", "STP", 4, "#06B6D4");

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "trn1",
    name: "VCT Champions 2025",
    game: "Valorant",
    region: "NA",
    prizePool: 500000,
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    status: "ongoing",
    bracketType: "single",
    teams: ["t1", "t2", "t10", "t7", "t9", "t4", "t11", "t12"],
    rounds: [
      {
        id: "r1",
        name: "Quarter-Finals",
        order: 1,
        matches: [
          mkMatch("qf1", "r1", 1, nsp, stc, "t1", "completed", [13, 7]),
          mkMatch("qf2", "r1", 2, pwv, nxr, "t2", "completed", [13, 5]),
          mkMatch("qf3", "r1", 3, vdw, tgf, "t7", "completed", [13, 10]),
          mkMatch("qf4", "r1", 4, gpr, dkm, null, "live"),
        ],
      },
      {
        id: "r2",
        name: "Semi-Finals",
        order: 2,
        matches: [
          mkMatch("sf1", "r2", 1, nsp, pwv, null, "live"),
          mkMatch("sf2", "r2", 2, vdw, null, null, "upcoming"),
        ],
      },
      {
        id: "r3",
        name: "Grand Final",
        order: 3,
        matches: [
          mkMatch("gf1", "r3", 1, null, null, null, "upcoming"),
        ],
      },
    ],
  },
  {
    id: "trn2",
    name: "IEM Katowice 2025",
    game: "CS2",
    region: "EU",
    prizePool: 1000000,
    startDate: "2025-08-01",
    endDate: "2025-08-12",
    status: "ongoing",
    bracketType: "double",
    teams: ["t3", "t6", "t5", "t8", "t4", "t11", "t12", "t9"],
    rounds: [
      {
        id: "wb-r1",
        name: "Winners — Round 1",
        order: 1,
        matches: [
          mkMatch("wb1", "wb-r1", 1, azb, ict, "t3", "completed", [16, 12]),
          mkMatch("wb2", "wb-r1", 2, cre, stp, "t6", "completed", [16, 8]),
        ],
      },
      {
        id: "wb-r2",
        name: "Winners — Final",
        order: 2,
        matches: [
          mkMatch("wbf", "wb-r2", 1, azb, cre, null, "live"),
        ],
      },
      {
        id: "lb-r1",
        name: "Losers — Round 1",
        order: 3,
        matches: [
          mkMatch("lb1", "lb-r1", 1, ict, stp, null, "upcoming"),
        ],
      },
      {
        id: "lb-r2",
        name: "Grand Final",
        order: 4,
        matches: [
          mkMatch("lgf", "lb-r2", 1, null, null, null, "upcoming"),
        ],
      },
    ],
  },
  {
    id: "trn3",
    name: "LoL World Championship 2025",
    game: "League of Legends",
    region: "APAC",
    prizePool: 2000000,
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    status: "ongoing",
    bracketType: "single",
    teams: ["t5", "t6", "t12"],
    rounds: [
      {
        id: "lol-sf",
        name: "Semi-Finals",
        order: 1,
        matches: [
          mkMatch("lol-sf1", "lol-sf", 1, ict, nxr, "t5", "completed", [3, 0]),
          mkMatch("lol-sf2", "lol-sf", 2, cre, mkTeam("t10", "Stellar Collapse", "STC", 4, "#EC4899"), "t6", "completed", [3, 1]),
        ],
      },
      {
        id: "lol-gf",
        name: "Grand Final",
        order: 2,
        matches: [
          mkMatch("lol-gf1", "lol-gf", 1, ict, cre, null, "live", [1, 2]),
        ],
      },
    ],
  },
];
