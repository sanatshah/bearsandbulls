import { Button } from "frog"
import { Actions } from "../index.js"


export const Initial = () => {
  return {
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#FAE9CB"
        }}
      >
        <img src="https://i.imgur.com/7AgPXcd.png" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
    <Button value={Actions.START}>Start</Button>,
    <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
  ]
  }
}