import { serve } from '@hono/node-server'
import { Button, Frog, TextInput } from 'frog'
import { Actions } from '..'
import { Container } from './Container'

export const HowToPlay = () => {

  return ({
    image: (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          instructions here
        </div>
      </Container>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}