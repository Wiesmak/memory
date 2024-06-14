export default class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 0.5rem;
          padding: 0.5rem;
          width: 60vw;
          height: 80vh;
        }
      </style>
      <slot></slot>
    `;
  }
}