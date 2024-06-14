import ScoresRepositoryInterface from "@/repositories/scores.interface.ts"
import ScoresRepository from "@/repositories/scores.repository.ts"
import millisFormat from "#lib/millisFormat.ts"

export default class ScoresContainer extends HTMLElement {
  protected repository: ScoresRepositoryInterface

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.repository = ScoresRepository.instance
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // language=HTML
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 20vw;
          height: 100vh;
          font-family: "Comic Sans MS", cursive, sans-serif;
          font-weight: bold;
        }
          
        .score {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 100%;
        }
      </style>
      <div>
        <h2>Wyniki:</h2>
      </div>
      <div class="score">
          <h2>30s</h2>
          ${
            (this.repository.scores.get('30s') ?? []).map((score) => {
              return `<p>${score.nick} - ${millisFormat(3000 - score.score).slice(2, -2)}</p>`
            }).join('')
          }
      </div>
      <div class="score">
          <h2>60s</h2>
          ${
            (this.repository.scores.get('60s') ?? []).map((score) => {
              return `<p>${score.nick} - ${millisFormat(6000 - score.score).slice(2, -2)}</p>`
            }).join('')
          }
      </div>
      <div class="score">
          <h2>90s</h2>
          ${
            (this.repository.scores.get('90s') ?? []).map((score) => {
              return `<p>${score.nick} - ${millisFormat(9000 - score.score).slice(2, -2)}</p>`
            }).join('')
          }
      </div>
      <slot></slot>
    `;
  }
}