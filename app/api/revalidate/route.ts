// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: { current?: string }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request — missing _type' }, { status: 400 })
    }

    // Every content type currently fetched by page.tsx lives on the
    // homepage, so any accepted webhook revalidates it.
    revalidatePath('/')

    // A project update/delete also revalidates its own dedicated case 
    // study route so deletions 404 cleanly and edits show up immediately.
    if (body._type === 'project' && body.slug?.current) {
      revalidatePath(`/projects/${body.slug.current}`)
    }

    if (body._type === 'writeup' && body.slug?.current) {
      revalidatePath(`/writeups/${body.slug.current}`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 })
  }
}