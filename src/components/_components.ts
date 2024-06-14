import registerComponent from "#lib/register_component.ts"
import Card from "@/components/card.component.ts"
import Board from "@/components/board.component.ts"
import StartButton from "@/components/start_button.component.ts"
import TimerContainer from "@/components/timer_container.component.ts"
import ScoresContainer from "@/components/scores_container.component.ts"
import Popup from "@/components/popup.ts"

const registerComponents = () => {
  registerComponent('x-card', Card)
  registerComponent('x-board', Board)
  registerComponent('x-start-button', StartButton)
  registerComponent('x-timer-container', TimerContainer)
  registerComponent('x-scores-container', ScoresContainer)
  registerComponent('x-popup', Popup)
}

export default registerComponents
