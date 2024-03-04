import { Button, Frog, TextInput } from 'frog'
import { Actions } from '../data'
import { UserGuesses } from '..'
import { EmptyGuess } from './EmptyGuess'
import { Guesses } from './Guesses'
import { Container } from './Container'


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
