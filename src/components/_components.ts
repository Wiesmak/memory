import registerComponent from "#lib/register_component.ts"
import Card from "@/components/card.component.ts"
import Board from "@/components/board.component.ts"

const registerComponents = () => {
  registerComponent('x-card', Card)
  registerComponent('x-board', Board)
}

export default registerComponents
