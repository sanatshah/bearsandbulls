

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