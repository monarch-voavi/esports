export type Game = "CS2" | "Valorant" | "League of Legends" | "Dota 2" | "Apex Legends";
export type Region = "NA" | "EU" | "APAC" | "SA" | "CIS" | "OCE";
export type MatchStatus = "live" | "upcoming" | "completed";
export type BracketType = "single" | "double";

export interface Player {
  id: string;
  name: string;
  realName: string;
  teamId: string;
  role: string;
  nationality: string;
  age: number;
  avatarUrl: string;
  stats: PlayerStats;
  history: PerformanceHistory[];
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  winRate: number;
  headshots: number;
  rating: number;
  gamesPlayed: number;
  topAgent?: string;
  topChampion?: string;
}

export interface PerformanceHistory {
  date: string;
  kda: number;
  rating: number;
  win: boolean;
  opponent: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  game: Game;
  region: Region;
  rank: number;
  winRate: number;
  wins: number;
  losses: number;
  prize: number;
  players: string[];
  color: string;
  founded: number;
  coach: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  game: Game;
  status: MatchStatus;
  scheduledAt: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  map?: string;
  round?: string;
  viewers?: number;
  streamUrl?: string;
}

export interface MatchTeam {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  score: number;
  color: string;
}

export interface Tournament {
  id: string;
  name: string;
  game: Game;
  region: Region;
  prizePool: number;
  startDate: string;
  endDate: string;
  status: "ongoing" | "upcoming" | "completed";
  bracketType: BracketType;
  teams: string[];
  rounds: BracketRound[];
}

export interface BracketRound {
  id: string;
  name: string;
  order: number;
  matches: BracketMatch[];
}

export interface BracketMatch {
  id: string;
  roundId: string;
  position: number;
  teamA: BracketTeam | null;
  teamB: BracketTeam | null;
  winner: string | null;
  status: MatchStatus;
  score?: [number, number];
}

export interface BracketTeam {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  color: string;
}

export interface DashboardStats {
  activeTournaments: number;
  liveMatches: number;
  totalTeams: number;
  totalPlayers: number;
  prizeDistributed: number;
}
