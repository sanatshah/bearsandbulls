import { jsx } from "hono/jsx"

export const Container = ({
  children
}: {
  children: any
}) => {
  return (
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
        {children}
      </div>
    </div>
  )
}