import { Button } from 'frog'
import { Actions } from '../index.js'

export const Losing = () => {

  return ({
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#FAE9CB"
        }}
      >
        <img src="https://i.imgur.com/CElU8pv.png" width="1200px" height="800px" style={{ objectFit: 'fill'}} />
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}   