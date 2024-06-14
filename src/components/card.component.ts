import {CardImage, mapToImage} from "#lib/characters.ts"
import Clickable from "@/interfaces/clickable.ts"
import GameRepositoryInterface from "@/repositories/game.interface.ts"
import GameRepository from "@/repositories/game.repository.ts"

export default class Card extends HTMLElement implements Clickable{
  protected cardImage: CardImage = CardImage.REVERSE
  protected _open: boolean = false
  protected _repository: GameRepositoryInterface

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
    this._repository = GameRepository.instance
    this._repository.register(this.start.bind(this))
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.click.bind(this))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click.bind(this))
  }

  public reset() {
    this._open = false
    this.render()
  }

  public click() {
    if (!this._repository.started) return
    console.log('[Card] Card clicked')
    if (this._open) {
      console.log('[Card] Card already open')
      return
    } else {
      console.log('[Card] Card opening')
      this._repository.move(this.cardImage, () => {
        console.log('[Card] Card accepted')
        this._open = true
        this.animateCard(false)
        this.render()
      }, () => {
        console.log('[Card] Card rejected')
        setTimeout(() => {
          console.log('[Card] Card closing')
          this._open = false
          this.animateCard(true)
        }, 2000)
      })
    }
  }

  public start(picture: number) {
    this.cardImage = picture
    this.render()
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