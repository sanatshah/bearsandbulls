import { UserGuesses } from "../oldindex.js"
import { EmptyGuess } from "./EmptyGuess.js"


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