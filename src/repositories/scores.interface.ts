export interface ScoreEntry {
  score: number;
  nick: string;
}

export default interface ScoresRepositoryInterface {
  scores: Map<string, ScoreEntry[]>;
  addScore(score: number, mode: string, nick: string): void;
}