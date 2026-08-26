// app/components/ui/ContactArrow.tsx
interface ContactArrowProps {
  id: string 
}

export function ContactArrow({ id }: ContactArrowProps) {
  const tipId = `contact-arrow-tip-${id}`
  const maskId = `contact-arrow-reveal-mask-${id}`

  const d = 'M20,75 C 50,25 80,25 95,50 C 105,65 75,80 70,60 C 65,40 95,20 125,25 C 155,30 165,35 190,40'

  return (
    <svg
      viewBox="0 0 220 100"
      className="h-(--size-contact-arrow) w-(--size-contact-arrow) text-text-primary"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={tipId}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="32"
          markerHeight="32"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
          overflow="visible"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" className="arrow-draw-head" />
        </marker>

        <mask id={maskId}>
          <path
            d={d}
            pathLength="1"
            stroke="white"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
            className="arrow-mask-path"
          />
        </mask>
      </defs>

      <path
        d={d}
        pathLength="1"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="0.035 0.05"
        strokeLinecap="round"
        markerEnd={`url(#${tipId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}