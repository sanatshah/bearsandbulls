import { Button } from 'frog'
import { Actions } from '../index.js'

export const HowToPlay = () => {

  return ({
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#FAE9CB"
        }}
      >
        <img src="https://i.imgur.com/YjhuBLs.png" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}