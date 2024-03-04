import { Button } from "frog"
import { Actions } from ".."
import { Container } from "./Container"


export const Initial = () => {
  return {
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#f7eac7"
        }}
      >
        <img src="https://i.imgur.com/seVVRMB.jpeg" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
        <p style={{ position: 'absolute', color: 'black', top: '30px', left: '100px', fontSize: '60px', fontWeight: '700'}}>
          <strong>Bears & Bulls</strong>
        </p>
      </div>
    ),
    intents: [
    <Button value={Actions.START}>Start</Button>,
    <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
  ]
  }
}