import {CardImage, mapToImage} from "#lib/characters.ts"
import Clickable from "@/interfaces/clickable.ts"

export default class Card extends HTMLElement implements Clickable{
  protected cardImage: CardImage
  protected _open: boolean = false

  get open() {
    return this._open
  }

  set open(value: boolean) {
    this._open = value
    this.render()
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cardImage = CardImage.AYANO2
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.click.bind(this))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click.bind(this))
  }

  public click() {
    if (this._open) {
      this._open = !this._open
      this.animateCard(true)
    } else {
      this._open = !this._open
      this.animateCard(false)
      this.render()
    }
  }

  protected animateCard(reverse: boolean) {
    const card = this.shadowRoot!.querySelector('.card') as HTMLElement
    card.style.animation = `${reverse ? 'reverseRotate' : 'rotate'} 4s ease forwards`
  }

  protected render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          border-radius: 16px;
          width: 20vh;
          height: 20vh;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 16px;
          background: white url("${mapToImage(CardImage.REVERSE)}") no-repeat center center;
          background-size: cover;
          animation: rotate 4s ease forwards;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .card::before {
          content:'';
          background: url("${mapToImage(this._open ? this.cardImage : CardImage.REVERSE)}") no-repeat center center;
          background-size: cover;
          border-radius: 16px;
          position: absolute;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          transform: translate3d(0, 0, -1px) rotateY(180deg);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        @keyframes rotate {
          50%, to {
            transform: rotateY(180deg);
          }
        }   
        
        @keyframes reverseRotate {
          from {
            transform: rotateY(180deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}