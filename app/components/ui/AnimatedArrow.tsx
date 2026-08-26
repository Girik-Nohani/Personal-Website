// app/components/ui/AnimatedArrow.tsx
interface AnimatedArrowProps {
  id: string
}

export function AnimatedArrow({ id }: AnimatedArrowProps) {
  const tipId = `arrow-tip-${id}`
  const maskId = `arrow-reveal-mask-${id}`

  return (
    <svg
      viewBox="0 0 90 90"
      className="h-(--size-about-arrow) w-(--size-about-arrow) text-accent-teal"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={tipId}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="16"
          markerHeight="16"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
          overflow="visible"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" className="arrow-draw-head" />
        </marker>

        <mask id={maskId}>
          <path
            d="M80 8 C 94 42, 54 74, 16 80"
            pathLength="1"
            stroke="white"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            className="arrow-mask-path"
          />
        </mask>
      </defs>

      <path
        d="M80 8 C 94 42, 54 74, 16 80"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="0.02 0.05"
        strokeLinecap="round"
        markerEnd={`url(#${tipId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}