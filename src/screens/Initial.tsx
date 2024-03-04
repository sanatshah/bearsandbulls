import { Button } from "frog"
import { Actions } from ".."
import { Container } from "./Container"


export const Initial = () => {
  return {
    image: (
      <Container>
        <h2>bearsAndBulls</h2>
      </Container>
    ),
    intents: [
    <Button value={Actions.START}>Start</Button>,
    <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
  ]
  }
}