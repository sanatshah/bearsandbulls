import { UserGuesses, dataStore } from "../oldindex.js"

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