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