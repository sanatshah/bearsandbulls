import { serve } from '@hono/node-server'
import { Button, Frog, TextInput } from 'frog'
import { HowToPlay } from './screens/HowToPlay'
import { Home } from './screens/Game'

export const app = new Frog({
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})

const generatedNumber = Math.ceil(Math.random() * 10000)

export enum Actions {
  BACK = 'BACK',
  CLEAR = 'CLEAR',
  SUBMIT = 'SUBMIT',
  HOW_TO_PLAY = 'HOW_TO_PLAY'
}

const userGuesses: { [ fid: string] : number[] } = {}

const validateGuess: (guess?:string) => number = (guess) => {

  if (!guess) {
    throw new Error("No answer provided")
  }

  if (guess.length !== 4) {
    throw new Error("Must be 4 characters")
  }

  return parseInt(guess)
}

const recordUserGuess = (fid: number, guess: number) => {
  if (userGuesses[fid]) {
    userGuesses[fid].push(guess)
  } else {
    userGuesses[fid] = [guess]
  }
}

const getUserGuesses = (fid: number) => {
  return userGuesses[fid]
}

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const { frameData, verified } = c 
  const fid = frameData?.fid

  try {
    if (status === 'response') {

      switch (buttonValue) {
        case Actions.SUBMIT:
          const parsedGuess = validateGuess(inputText)
          console.log("parsedGuess: ", parsedGuess)
          if (fid) {
            recordUserGuess(fid, parsedGuess)
            return c.res(Home(getUserGuesses(fid)))
          }
          break;

        case Actions.HOW_TO_PLAY:
          return c.res(HowToPlay())

        case Actions.BACK:
          if (fid) {
            return c.res(Home(getUserGuesses(fid)))
          }

        case Actions.CLEAR:
          if (fid) {
            return c.res(Home(getUserGuesses(fid)))
          }

      }

    }
  } catch (e) {}

  if (status === 'initial') {
    return c.res(Home([]))
  } 

  return c.res(Home([]))
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
