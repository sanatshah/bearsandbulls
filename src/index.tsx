import { serve } from '@hono/node-server'
import { Button, Frog, TextInput } from 'frog'
import { HowToPlay } from './screens/HowToPlay'
import { Game } from './screens/Game'
import { Actions, getUserGuesses, recordUserGuess, validateGuess } from './data'
import { Container } from './screens/Container'
import { Initial } from './screens/Initial'

export const app = new Frog({
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})

export interface UserGuesses {
  guess: number
  bulls?: number
  bears?: number
}

interface DataStore {
  userGuesses: { [ fid: string] : UserGuesses[] }  | undefined
  challenge: number
}

export const dataStore: DataStore = {
  userGuesses: undefined,
  challenge: Math.ceil(Math.random() * 10000)
}

export const initFrameServer = () => {
  dataStore.userGuesses = {}
}

app.frame('/', (c) => {
  console.log("challenge: ", dataStore.challenge)
  const { buttonValue, inputText, status } = c
  const { frameData, verified } = c 
  const fid = frameData?.fid

  try {
    if (status === 'response') {

      if (!fid) {
        return c.res({
          image: (
            <Container>
              <h2>Error</h2> 
            </Container>
          ),
          intents: []
        })
      }

      const userGuesses = getUserGuesses(fid)

      switch (buttonValue) {
        case Actions.START:
          return c.res(Game([]))

        case Actions.SUBMIT:
          const parsedGuess = validateGuess(inputText)
          recordUserGuess(fid, parsedGuess)
          return c.res(Game(userGuesses))

        case Actions.HOW_TO_PLAY:
          return c.res(HowToPlay())

        case Actions.BACK:
          return c.res(Initial())

        case Actions.CLEAR:
          return c.res(Game(userGuesses))
      }

      return c.res({
        image: <h2>Error</h2>, 
        intents: []
      })

    } else if (status === 'initial') {
      return c.res(Initial())
    }

  } catch (e) {}

  return c.res({
    image: <h2>Error</h2>,
    intents: []
  })
})

const port = 3000
console.log(`Server is running on port ${port}`)

initFrameServer()
serve({
  fetch: app.fetch,
  port,
})
export { Actions }

