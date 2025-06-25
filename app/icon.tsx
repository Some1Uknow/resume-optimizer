import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: '800',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          R
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
