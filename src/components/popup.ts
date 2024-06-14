import ScoresRepositoryInterface from "@/repositories/scores.interface.ts"
import ScoresRepository from "@/repositories/scores.repository.ts"

export default class Popup extends HTMLElement {
  private _visible: boolean = false;
  protected scoresRepository: ScoresRepositoryInterface
  protected popupTitle: string = 'Popup popupTitle';
  protected popupContent: string = 'Popup popupContent';
  protected showForm: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.scoresRepository = ScoresRepository.instance
  }

  connectedCallback() {
    this.render();
  }

  show(popupTitle: string, popupContent: string) {
    this.popupTitle = popupTitle;
    this.popupContent = popupContent;
    this._visible = true;
    this.render();
  }

  win(timeLeft: number, mode: string) {
    this.showForm = true;
    this.show('Wygrana!', `Udało Ci się wygrać w trybie ${mode} z czasem ${timeLeft}ms`)
    this.shadowRoot!.querySelector('#form')!.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (this.shadowRoot!.querySelector('#name') as HTMLInputElement).value;
      this.scoresRepository.addScore(timeLeft, mode, name);
      this.hide();
    })
  }

  hide() {
    this._visible = false;
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          border: 1px solid #000;
          background-color: #fff;
          z-index: 1000;
          display: ${this._visible ? 'block' : 'none'};
        }
        #form {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
      </style>
      <h2>${this.popupTitle}</h2>
      <p>${this.popupContent}</p>
      ${this.showForm ? `
        <form id="form">
          <input type="text" id="name" placeholder="Nick" required>
          <input type="submit" value="Zapisz">
        </form>
      ` : ''}
      <button id="close-popup">Zamknij</button>
    `;

    this.shadowRoot!.querySelector('#close-popup')!.addEventListener('click', () => this.hide());
  }
}
