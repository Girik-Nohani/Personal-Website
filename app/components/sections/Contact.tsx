// app/components/sections/Contact.tsx
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'
import type { ContactSettings, SocialLink, ContactFormData } from '@/types/content'

interface ContactProps {
  contact: ContactSettings
  socialLinks: SocialLink[]
}

const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory rate limit — resets on redeploy/cold start, an accepted
// trade-off for a low-traffic single-page site (see build-plan §7).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 }

export function Contact({ contact, socialLinks }: ContactProps) {
  async function handleContactSubmit(data: ContactFormData) {
    'use server'

    // Honeypot — fail silently, don't tip off the bot
    if (data.honeypot) return

    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (isRateLimited(ip)) {
      throw new Error('Too many submissions. Please try again later.')
    }

    const name = data.name?.trim() ?? ''
    const email = data.email?.trim() ?? ''
    const subject = data.subject?.trim() ?? ''
    const message = data.message?.trim() ?? ''

    if (!name || name.length > MAX_LENGTHS.name) {
      throw new Error('Invalid name.')
    }
    if (!email || email.length > MAX_LENGTHS.email || !EMAIL_REGEX.test(email)) {
      throw new Error('Invalid email.')
    }
    if (subject.length > MAX_LENGTHS.subject) {
      throw new Error('Subject too long.')
    }
    if (!message || message.length > MAX_LENGTHS.message) {
      throw new Error('Invalid message.')
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contact.recipientEmail,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    if (error) {
      throw new Error('Failed to send message.')
    }
  }

  return (
    <div className="bg-background pt-xl">
      <div className="mx-auto max-w-6xl px-6 sm:pt-xl lg:py-xl">

        <SectionHeading number="04" title="Contact" />

        <div className='mt-xl'>
            <SubSectionHeading eyebrow={contact.eyebrow} title={contact.heading} align="left" />
        </div>

        <div className="mt-lg lg:mt-xl grid grid-cols-1 gap-lg lg:grid-cols-2">
          <ContactInfo contact={contact} socialLinks={socialLinks} />
          <ContactForm onSubmit={handleContactSubmit} />
        </div>

      </div>
    </div>
  )
}