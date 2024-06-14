import GameRepositoryInterface from "@/repositories/game.interface.ts"
import Board from "@/components/board.component.ts"
import ScoresRepositoryInterface from "@/repositories/scores.interface.ts"
import ScoresRepository from "@/repositories/scores.repository.ts"
import Popup from "@/components/popup.ts"

export default class GameRepository implements GameRepositoryInterface {
  public static instance: GameRepositoryInterface = new GameRepository()
  protected scoresRepository: ScoresRepositoryInterface
  private startCallbacks: ((picture: number) => void)[] = []
  protected currentPicture: number = 0
  protected currentHook: (() => void) | null = null
  private winCounter: number = 0
  private lock: boolean = true
  protected _started: boolean = false
  protected _timeLeft: number = 0
  protected _timeTotal: number = 0
  private _interval: number | null = null

  public get started(): boolean {
    return this._started
  }

  public get timeLeft(): number {
    return this._timeLeft
  }

  public get timeTotal(): number {
    return this._timeTotal
  }

  protected set started(value: boolean) {
    this._started = value
    console.log(this.started ? 'Game started' : 'Game stopped')
  }

  private constructor() {
    console.log('Game created')
    this.scoresRepository = ScoresRepository.instance
  }

  protected isConsecutivePair(n1: number, n2: number): boolean {
    const sm = Math.min(n1, n2)
    const lg = Math.max(n1, n2)
    // noinspection BadExpressionStatementJS
    return new Map<number, number>([
      [1, 2], [3, 4], [5, 6],
      [7, 8], [9, 10], [11, 12],
      [13, 14], [15, 16]
    ]).get(sm) === lg
  }

  register(start: (picture: number) => void) {
    console.log('Game registered')
    this.startCallbacks.push(start)
  }

  start(time: number): void {
    console.log('Game started')
    this.started = true
    this._timeLeft = time * 100
    this._timeTotal = time * 100
    const pictures = Array.from({length: 16}, (_, i) => i + 1)
    pictures.sort(() => Math.random() - 0.5)
    this.startCallbacks.forEach(callback => callback(pictures.pop()!))
    this.lock = false
    this._interval = window.setInterval(() => {
      if (this.timeLeft === 0) {
        const popup = document.querySelector('x-popup')! as Popup
        popup.show('Przegrałeś!', 'Spróbuj jeszcze raz.')
        this.reset()
      } else {
        this._timeLeft--
      }
    }, 1)
  }

  protected reset(): void {
    window.clearInterval(this._interval!)
    this.started = false
    this.lock = false
    this._timeLeft = 0
    this._timeTotal = 0
    this.currentPicture = 0
    this.currentHook = null
    this.winCounter = 0
    ;(document.querySelector('x-board')! as Board).reset()
  }

  move(
    picture: number,
    accept: () => void,
    reject: () => void
  ): void {
    console.log('Game moved')
    if (this.lock) {
      console.log('Game locked')
      return
    } else {
      this.lock = true
    }
    accept()
    console.log('Game accepted')
    if (this.currentPicture === 0) {
      this.currentPicture = picture
      this.currentHook = reject
      this.lock = false
      console.log('Game first picture')
    } else {
      console.log('Game second picture')
      console.log(this.currentPicture, picture)
      if (this.isConsecutivePair(this.currentPicture, picture)) {
        this.winCounter++
        if (this.winCounter === 1) {
          setTimeout(() => {
            const popup = document.querySelector('x-popup')! as Popup
            popup.win(
              this.timeLeft,
              `${this._timeTotal / 100}s`,
            )
            this.reset()
          }, 2000)
        }
        this.currentPicture = 0
        this.currentHook = null
        this.lock = false
        console.log('Game consecutive pair')
      } else {
        reject()
        this.currentHook?.()
        this.currentPicture = 0
        console.log('Game not consecutive pair')
        setTimeout(() => this.lock = false, 5000)
      }
    }
  }
}