import Card from "@/components/card.component.ts"

export default class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public reset() {
    const cards = this.querySelectorAll('x-card')
    cards.forEach((card) => {
      (card as Card).reset()
    })
  }

  connectedCallback() {
    // language=HTML
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 0.5rem;
          padding: 0.5rem;
          width: 60vw;
          height: 100vh;
        }
      </style>
      <slot></slot>
    `;
  }
}