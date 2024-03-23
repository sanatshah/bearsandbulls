import { serve } from '@hono/node-server'
import { Button, Frog, TextInput } from 'frog'
import { Actions } from '..'
import { Container } from './Container'

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
        <img src="https://imgur.com/wurZpjT" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}   