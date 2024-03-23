import { serve } from '@hono/node-server'
import { Frog} from 'frog'
import { HowToPlay } from './screens/HowToPlay.js'
import { Game } from './screens/Game.js'
import { Actions, getUserGuesses, recordUserGuess, validateGuess } from './data/index.js'
import { Initial } from './screens/Initial.js'
import { handle } from 'frog/vercel'

/*
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
*/

export const app = new Frog({
  hubApiUrl: 'https://api.hub.wevm.dev',
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
  const { frameData } = c 
  const fid = frameData?.fid

  try {
    if (status === 'response') {

      if (!fid) {
        return c.res({
          image: '',
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
        image: '', 
        intents: []
      })

    } else if (status === 'initial') {
      return c.res(Initial())
    }

  } catch (e) {}

  return c.res({
    image: '',
    intents: []
  })
})

/*
if (((import.meta as any).env as any)?.MODE === 'development') devtools(app, { serveStatic } as any)
else devtools(app, { assetsPath: '/.frog' })
*/

export const GET = handle(app)
export const POST = handle(app)

const port = 3000
console.log(`Server is running on port ${port}`)

initFrameServer()
serve({
  fetch: app.fetch,
  port,
})
export { Actions }

