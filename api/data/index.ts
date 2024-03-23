import { dataStore } from "../index.js"

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

const getBullsAndBearsFromGuess = (guess: number, challenge: number) => {
  /**
   * 
   * challenge = 2935
   * guess = 1221
   * 
   * bulls = 0
   * bears = 1
   * 
   * 
   * 
   */

  const guessArray = Array.from(guess.toString())
  const challengeArray = Array.from(challenge.toString())

  let bulls = 0;
  let bears = 0;
  let guessTrack = [ false, false, false, false]

  guessArray.forEach((value, index) => {
    if (!guessTrack[index]) {
      return
    }

    if (challengeArray[index] === value) {
      bulls++
      guessTrack[index] = true
    }   
  })

  guessArray.forEach((value, index) => {
    if (!guessTrack[index]) {
      return
    }

    const challengeIndex = challengeArray.findIndex(challengeValue => challengeValue === value)

    if (challengeIndex) {
      bears++;
      guessTrack[challengeIndex] = true

    }
  })

  return {
    bulls,
    bears
  }
}


export const recordUserGuess = (fid: number, guess: number) => {
  if (!dataStore.userGuesses) {
    return
  }

  const { bulls, bears } = getBullsAndBearsFromGuess(guess, dataStore.challenge)

  const newGuessObj = {
    guess,
    bulls,
    bears
  }

  console.log("new GUess obj: ", newGuessObj)

  if (dataStore.userGuesses[fid]) {
    if (dataStore.userGuesses[fid].find((previousGuess) => previousGuess.guess === guess)) {
      return
    }
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