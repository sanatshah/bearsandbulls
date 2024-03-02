import { serve } from '@hono/node-server'
import { Button, Frog, TextInput } from 'frog'
import { Actions } from '..'

export const HowToPlay = () => {

  return ({
    image: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        instructions here
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}