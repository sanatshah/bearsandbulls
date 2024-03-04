import { UserGuesses } from ".."


export const Guesses = ({
  userGuesses
}: {
  userGuesses: UserGuesses[] | undefined
}) => {
  console.log("userGuesses: ", userGuesses)
  return (
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {userGuesses?.map(({guess}) => {
            return (<div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {Array.from(guess.toString()).map((guess) => (
                <div
                  style={{
                    display: 'flex',
                    height: '100px',
                    width: '100px',
                    paddingRight: '4px',
                    borderRadius: '50%',
                    border: '3px solid white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{ marginRight: '5px' }}>
                    {guess}
                  </div>
                </div>
              ))}
            </div>
            )
          }).flat()}
        </div>
    </div>
  )
}