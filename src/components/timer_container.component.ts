import GameRepositoryInterface from "@/repositories/game.interface.ts"
import GameRepository from "@/repositories/game.repository.ts"
import millisFormat from "#lib/millisFormat.ts"

export default class TimerContainer extends HTMLElement {
  protected repository: GameRepositoryInterface;
  private interval: number | null = null;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.repository = GameRepository.instance;
  }

  connectedCallback() {
    this.render();
    this.interval = window.setInterval(
      () => this.render(), 1
    );
  }

  disconnectedCallback() {
    window.clearInterval(this.interval!);
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
        }
        
        .timer {
          width: 18vw;
          height: 80vh;
          border: 2px solid #000;
        }
          
        .timer-top {
          width: 100%
          background-color: #f27ab0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: ${100 - this.repository.timeLeft / this.repository.timeTotal * 100}%;
        }
          
        .timer-bottom {
          width: 100%;
          background-color: #f2a7b0;
          height: ${this.repository.timeLeft / this.repository.timeTotal * 100}%;
        }
          
        #time {
          font-size: 2rem;
          font-weight: bold;
          font-family: "Comic Sans MS", cursive, sans-serif;
          text-align: center;
        }   
    </style>
      ${ this.repository.started ? `
        <div class="timer">
          <div class="timer-top">
            <div class="time">
                <span id="time">${millisFormat(this.repository.timeLeft)}</span>
            </div>
          </div>
          <div class="timer-bottom"></div>
        </div>
      ` : '<slot class="starter"></slot>'}
    `;
  }
}