// app/studio/layout.tsx
//
// Deliberately separate from app/(site)/layout.tsx: Studio ships its own
// complete UI styling, and importing the site's globals.css (Tailwind's
// preflight reset + custom @theme tokens) here would visibly break it —
// buttons, inputs, and spacing in Studio all rely on un-reset browser
// defaults plus Sanity's own CSS-in-JS. Next.js supports multiple root
// layouts like this via route groups; this one lives outside app/(site).

export const metadata = {
  title: 'Studio — Girik Nohani Portfolio',
  description: 'Content studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}