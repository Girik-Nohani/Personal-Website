// app/components/sections/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactFormData } from '@/types/content'

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void | Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 }

const COMMON_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'live.com',
  'msn.com',
  'rediffmail.com',
  'zoho.com',
]

function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const dp: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0))

  for (let i = 0; i < rows; i++) dp[i][0] = i
  for (let j = 0; j < cols; j++) dp[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[rows - 1][cols - 1]
}

function getEmailSuggestion(email: string): string | null {
  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) return null

  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1).toLowerCase()
  if (domain.length < 4 || COMMON_EMAIL_DOMAINS.includes(domain)) return null

  let closest: string | null = null
  let closestDistance = Infinity

  for (const candidate of COMMON_EMAIL_DOMAINS) {
    const distance = levenshteinDistance(domain, candidate)
    if (distance < closestDistance) {
      closestDistance = distance
      closest = candidate
    }
  }

  if (closest && closestDistance > 0 && closestDistance <= 2) {
    return `${local}@${closest}`
  }
  return null
}

function getInputClass(hasError: boolean) {
  return cn(
    'w-full rounded-lg border bg-transparent px-md py-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:border-accent-teal transition-colors motion-reduce:transition-none',
    hasError ? 'border-error' : 'border-text-quaternary/20'
  )
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function handleChange(field: keyof ContactFormData, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (field === 'email') setEmailSuggestion(null)
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  function handleEmailBlur() {
    const email = values.email.trim()
    if (!email) return

    if (!EMAIL_REGEX.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address.' }))
      setEmailSuggestion(null)
      return
    }

    setEmailSuggestion(getEmailSuggestion(email))
  }

  function acceptEmailSuggestion() {
    if (!emailSuggestion) return
    handleChange('email', emailSuggestion)
    setEmailSuggestion(null)
  }

  function validate(): boolean {
    const next: Partial<Record<keyof ContactFormData, string>> = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!EMAIL_REGEX.test(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setStatus('idle')
  if (values.honeypot) return
  if (!validate()) return

  setStatus('submitting')
  try {
    await onSubmit(values)
    setStatus('success')
    setValues({ name: '', email: '', subject: '', message: '', honeypot: '' })
    setEmailSuggestion(null)
  } catch {
    setStatus('error')
  }
}

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-sm">
      {/* Honeypot — offscreen, never display:none (some bots detect that) */}
      <input
        type="text"
        name="honeypot"
        value={values.honeypot}
        onChange={(e) => handleChange('honeypot', e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="Your Full Name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength={MAX_LENGTHS.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={getInputClass(!!errors.name)}
          />
          {errors.name && (
            <p id="name-error" className="mt-xs pl-1 text-detail text-error">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email Address"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={handleEmailBlur}
            maxLength={MAX_LENGTHS.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={getInputClass(!!errors.email)}
          />
          {errors.email && (
            <p id="email-error" className="mt-xs pl-1 text-detail text-error">
              {errors.email}
            </p>
          )}
          {!errors.email && emailSuggestion && (
            <p className="mt-xs text-detail text-text-tertiary">
              Did you mean{' '}
              <button
                type="button"
                onClick={acceptEmailSuggestion}
                className="text-accent-teal underline underline-offset-2 hover:text-accent-teal/80"
              >
                {emailSuggestion}
              </button>
              ?
            </p>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Subject"
        value={values.subject}
        onChange={(e) => handleChange('subject', e.target.value)}
        maxLength={MAX_LENGTHS.subject}
        className={getInputClass(false)}
      />

      <div>
        <textarea
          placeholder="Your Message..."
          rows={6}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          maxLength={MAX_LENGTHS.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={getInputClass(!!errors.message)}
        />
        {errors.message && (
          <p id="message-error" className="mt-xs pl-1 text-detail text-error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-xs flex w-full items-center justify-center gap-xs rounded-lg border border-accent-yellow px-md py-sm font-semibold text-accent-yellow transition-colors hover:bg-accent-yellow/10 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        <Send className="h-4 w-4" />
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      <div aria-live="polite" className="min-h-(--size-contact-form-status-min-h) text-detail">
        {status === 'success' && (
          <p className="text-accent-teal">Message sent — thanks for reaching out!</p>
        )}
        {status === 'error' && (
          <p className="text-error">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  )
}