import { Button } from 'frog'
import { Actions } from '../index.js'

export const Winning = () => {

  return ({
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#FAE9CB"
        }}
      >
        <img src="https://i.imgur.com/It7sK9R.png" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}