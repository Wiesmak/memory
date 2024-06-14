import Clickable from "@/interfaces/clickable.ts"
import GameRepositoryInterface from "@/repositories/game.interface.ts"
import GameRepository from "@/repositories/game.repository.ts"

export default class StartButton extends HTMLElement implements Clickable {
  protected repository: GameRepositoryInterface

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.repository = GameRepository.instance
  }

  public click() {
    console.log('[StartButton] Start button clicked')
    const time = parseInt(this.getAttribute('time') || '30')
    this.repository.start(time)
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.click.bind(this))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click.bind(this))
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1.5rem;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background-color: #f27ab0;
          color: #fbef02;
          font-size: 3rem;
          font-weight: bold;
          font-family: "Comic Sans MS", cursive, sans-serif;
          cursor: pointer;
          transition: transform 0.5s ease-in-out, background-color 0.5s ease-in-out;
        }
        
        :host(:hover) {
          background-color: #f2a7b0;
          transform: scale(1.1);
          transition: transform 0.5s ease-in-out, background-color 0.5s ease-in-out;
        }
      </style>
      <slot></slot>
    `;
  }
}