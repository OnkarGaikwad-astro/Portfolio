import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Onkar Gaikwad Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #181119)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 40,
          padding: '80px 120px',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <div style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}>
            Onkar Gaikwad
          </div>
          <div style={{
            fontSize: 42,
            color: '#ef4444',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            AI & Software Engineer
          </div>
          <div style={{
            fontSize: 28,
            color: '#a1a1aa',
            marginTop: 40,
            fontWeight: 400,
          }}>
            IIT Gandhinagar
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
