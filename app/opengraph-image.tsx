import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'ResumeMax - AI Resume Builder'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 24,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          ResumeMax
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Create Perfect Resumes with AI
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}