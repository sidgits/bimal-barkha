import { NextResponse } from 'next/server'

const WISHES_PATH = process.env.REPLIT_WISHES_PATH ?? '/api/wishes'

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  const baseUrl = process.env.REPLIT_API_URL
  if (!baseUrl) {
    return NextResponse.json({ error: 'The Replit API is not configured yet.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  const type = body?.type === 'rsvp' ? 'rsvp' : 'wish'
  const name = clean(body?.name, 90)
  const message = clean(body?.message, 1200)

  if (!name || !message) {
    return NextResponse.json({ error: 'Please add your name and message.' }, { status: 400 })
  }

  try {
    const upstream = await fetch(new URL(WISHES_PATH, baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.REPLIT_API_KEY ? { Authorization: `Bearer ${process.env.REPLIT_API_KEY}` } : {}),
      },
      body: JSON.stringify({ type, name, message, createdAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'The Replit project could not save this message.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'The Replit project is not responding.' }, { status: 502 })
  }
}
