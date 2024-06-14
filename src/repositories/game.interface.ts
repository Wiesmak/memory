export default interface GameRepositoryInterface {
  started: boolean
  timeLeft: number
  timeTotal: number
  register(start: (picture: number) => void): void
  start(time: number): void
  move(
    picture: number,
    accept: () => void,
    reject: () => void
  ): void
}