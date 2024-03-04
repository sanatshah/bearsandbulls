import { dataStore } from ".."

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

export const recordUserGuess = (fid: number, guess: number) => {
  if (!dataStore.userGuesses) {
    return
  }

  const newGuessObj = {
    guess
  }

  if (dataStore.userGuesses[fid]) {
    dataStore.userGuesses[fid].push(newGuessObj)
  } else {
    dataStore.userGuesses[fid] = [newGuessObj]
  }
}

export const getUserGuesses = (fid: number) => {
  if (!dataStore.userGuesses) {
    return
  }

  return dataStore.userGuesses[fid]
}