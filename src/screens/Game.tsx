import { Button, Frog, TextInput } from 'frog'
import { Actions } from '..'

export const Home = (guesses: number[]) => {
  return ({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
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
          {guesses.length === 0 ? [1, 2, 3, 4].map(() => (
            <div
              style={{
                display: 'flex',
                height: '100px',
                width: '100px',
                paddingRight: '4px',
                borderRadius: '50%',
                border: '3px solid white'
              }}
            />
          )) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {guesses.map((guess) => {
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
          )}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your guess..." />,
      <Button value={Actions.CLEAR}>Clear</Button>,
      <Button value={Actions.SUBMIT}>Submit</Button>,
      <Button value={Actions.HOW_TO_PLAY}>How to play</Button>,
    ]
  })
}
