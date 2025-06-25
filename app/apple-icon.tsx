import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
export default function AppleIcon() {
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
          borderRadius: '20px',
        }}
      >
        <div
          style={{
            fontSize: '84px',
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
