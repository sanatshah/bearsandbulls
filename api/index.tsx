import { serve } from '@hono/node-server'
import { Button, Frog, TextInput} from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'


export enum Actions {
  START = 'START',
  BACK = 'BACK',
  CLEAR = 'CLEAR',
  SUBMIT = 'SUBMIT',
  HOW_TO_PLAY = 'HOW_TO_PLAY'
}

export const validateGuess: (guess?:string) => number = (guess) => {

  if (!guess) {
    throw new Error("No answer provided")
  }

  if (guess.length !== 4) {
    throw new Error("Must be 4 characters")
  }

  return parseInt(guess)
}

const getBullsAndBearsFromGuess = (challenge: number, guess: number) => {


  const challengeArray = Array.from(challenge.toString())
  const guessArray = Array.from(guess.toString())

  let bulls = 0;
  let bears = 0;
  let challengeGuessTracker = [ false, false, false, false]
  let userGuessTracker = [ false, false, false, false]

  // find bulls
  guessArray.forEach((value, index) => {
    if (challengeArray[index] === value) {
      bulls++
      challengeGuessTracker[index] = true
      userGuessTracker[index] = true
    }   
  })

  // find bears
  guessArray.forEach((value, guessIndex) => {

    if (userGuessTracker[guessIndex]) {
      return
    }


    // See if there is someone in the challenge that has the number
    const challengeIndex = challengeArray.findIndex((challengeValue, index) => {  
      return (challengeValue === value && (!challengeGuessTracker[index] && !userGuessTracker[guessIndex]))
    } )

    if (challengeIndex !== -1) {
      bears++;
      userGuessTracker[guessIndex] = true
      challengeGuessTracker[challengeIndex] = true
    }
  })

  return {
    bulls,
    bears
  }
}


export const recordUserGuess = (fid: number, guess: number): {
  isWinningGuess: boolean,
  updatedUserGuesses: UserGuesses[]
} => {
  if (!dataStore.userGuesses) {
    throw new Error("Error")
  }

  const { bulls, bears } = getBullsAndBearsFromGuess(guess, dataStore.challenge)

  const newGuessObj = {
    guess,
    bulls,
    bears
  }

  if (dataStore.userGuesses[fid]) {
    dataStore.userGuesses[fid].push(newGuessObj)
  } else {
    dataStore.userGuesses[fid] = [newGuessObj]
  }

  return {
    isWinningGuess: checkIfWon(dataStore.userGuesses[fid]),
    updatedUserGuesses: dataStore.userGuesses[fid]
  }
}

export const getUserGuesses = (fid: number) => {
  if (!dataStore.userGuesses) {
    return
  }

  return dataStore.userGuesses[fid]
}

export const checkIfWon = (guesses: UserGuesses[]): boolean => {
  if (guesses.length === 0) {
    return false
  }

  return guesses[guesses.length - 1].bulls === 4
}
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
        <img src="https://i.imgur.com/mEpUg5E.png" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
      <Button value={Actions.BACK}>Back</Button>,
    ]
  })


}
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

export const Initial = () => {
  return {
    image: (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: "#FAE9CB"
        }}
      >
        <img src="https://i.imgur.com/7AgPXcd.png" width="1200px" height="800px" style={{ objectFit: 'contain'}} />
      </div>
    ),
    intents: [
    <Button value={Actions.START}>Start</Button>,
    <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
  ]
  }
}
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

export const Guesses = ({
  userGuesses
}: {
  userGuesses: UserGuesses[] | undefined
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        width: '100vw',
        marginBottom: '0px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {userGuesses?.map(({ guess, bears, bulls }) => {
          return (<div
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderBottom: '1px dashed black',
              paddingBottom: '20px',
              marginBottom: '10px',
              paddingTop: '20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  marginRight: '30px',
                  width: '500px',
                  height: '100px',
                  marginTop: '-60px',
                  paddingTop: '0'
                }}
              >
                <p style={{fontSize: '40px', color: 'black'}}>{bulls?.toString()} 🐂 &nbsp;&nbsp; {bears?.toString()} 🐻</p>
              </div>
              <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '10px'
              }}
              >
              {Array.from(guess.toString()).map((guess) => (
                <div
                  style={{
                    display: 'flex',
                    height: '50px',
                    width: '50px',
                    paddingRight: '4px',
                    borderRadius: '20%',
                    border: '3px solid black',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '27px',
                    color: 'black',
                    marginRight: '10px'
                  }}
                >
                    {guess}
                </div>
              ))}
              </div>
            </div>
          </div>
          )
        }).flat()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px'
        }}
        >
          <div
            style={{
              display: 'flex',
              width: '500px',
              marginRight: '35px'
            }}
           />
        {userGuesses && userGuesses?.length <6? <EmptyGuess /> : <></>}
</div>
      </div>
    </div>
  )
}
export const Game = (userGuesses: UserGuesses[] | undefined) => {

  let screenToRender = undefined

  if (!userGuesses || userGuesses.length === 0) {
    screenToRender = <EmptyGuess />
  } else if (userGuesses?.length! <= 6) {
    screenToRender = <Guesses userGuesses={userGuesses} />
  }

  return ({
    image: (
      <Container>
        {screenToRender ?? <h2>Game Error</h2>}
      </Container>
    ),
    intents: [
      <TextInput placeholder={userGuesses && userGuesses?.length === 6 ? "Enter your last guess" : "Enter your guess..." } />,
      <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
      <Button value={Actions.SUBMIT}>Submit</Button>,
    ]
  })
}



export const EmptyGuess = () => {

  return (
    <>
      {[1,2,3,4].map(() => (
      <div
        style={{
          display: 'flex',
          height: '50px',
          width: '50px',
          paddingRight: '4px',
          borderRadius: '20%',
          border: '3px dashed black',
          marginRight: '10px'
        }}
      />
    ))}
  </>
  )
}
export const Container = ({
  children
}: {
  children: any
}) => {
  return (
    <div style={{ color: 'white', display: 'flex', fontSize: 60, backgroundColor: '#f7eac7' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        {children}
      </div>
    </div>
  )
}
export const app = new Frog({
  //hubApiUrl: 'https://api.hub.wevm.dev',
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

const MAX_GUESS_COUNT = 6

const checkIfWonOrLost = (c: any, userGuesses: UserGuesses[], currentUserGuessCount: number) => {
  const wonTheGame = userGuesses ? checkIfWon(userGuesses) : false

  if (wonTheGame) {
    return c.res(Winning())
  }

  if (currentUserGuessCount >= MAX_GUESS_COUNT) {
    return c.res(Losing())
  }
}

app.frame('/', (c) => {
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

      const userGuesses = getUserGuesses(fid) ?? []
      let currentUserGuessCount = userGuesses?.length ?? 0

      switch (buttonValue) {
        case Actions.START:
          const endScreen = checkIfWonOrLost(c, userGuesses, currentUserGuessCount)
          if (endScreen) {
            return checkIfWonOrLost(c, userGuesses, currentUserGuessCount)
          }
          return c.res(Game(userGuesses))

        case Actions.SUBMIT:
          try {
            const endScreen = checkIfWonOrLost(c, userGuesses, currentUserGuessCount)
            if (endScreen) {
              return checkIfWonOrLost(c, userGuesses, currentUserGuessCount)
            }

            const parsedGuess = validateGuess(inputText)
            const { isWinningGuess, updatedUserGuesses } = recordUserGuess(fid, parsedGuess)

            currentUserGuessCount++

            if (isWinningGuess) {
              return c.res(Winning())
            } else {
              if (currentUserGuessCount === MAX_GUESS_COUNT) {
                return c.res(Losing())
              } else {
                return c.res(Game(updatedUserGuesses))
              }
            }

          } catch (e) {
            return c.res(Initial())
          }
          
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
devtools(app, { serveStatic })