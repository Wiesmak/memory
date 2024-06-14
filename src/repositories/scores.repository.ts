import ScoresRepositoryInterface, {ScoreEntry} from "@/repositories/scores.interface.ts"

export default class ScoresRepository implements ScoresRepositoryInterface {
  public static instance: ScoresRepositoryInterface = new ScoresRepository()

  scores: Map<string, ScoreEntry[]>

  constructor() {
    this.scores = this.getScoresFromCookies()
  }

  private getScoresFromCookies(): Map<string, ScoreEntry[]> {
    const scores = new Map<string, ScoreEntry[]>()
    const cookies = document.cookie.split(' ')

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=')
      if (name.startsWith('score_')) {
        const mode = name.slice(6)
        scores.set(mode, JSON.parse(decodeURIComponent(value)))
      }
    }

    return new Map([...scores.entries()].map(([mode, scores]) => [mode, scores.sort((a, b) => a.score - b.score).slice(0, 10)]))
  }

  addScore(score: number, mode: string, nick: string): void {
    const scores = this.scores.get(mode) || []
    scores.push({ score, nick })
    this.scores.set(mode, scores)

    document.cookie = `score_${mode}=${encodeURIComponent(JSON.stringify(scores))} path=/`
  }
}