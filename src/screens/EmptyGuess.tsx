

export const EmptyGuess = () => {

  return (
    <>
      {[1,2,3,4].map(() => (
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
    ))}
  </>
  )
}