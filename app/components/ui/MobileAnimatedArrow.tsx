interface MobileAnimatedArrowProps {
  id: string
}

export function MobileAnimatedArrow({ id }: MobileAnimatedArrowProps) {
  const tipId = `arrow-tip-mobile-${id}`
  const maskId = `arrow-reveal-mask-mobile-${id}`

  return (
    <svg
      viewBox="0 0 50 60"
      className="h-(--size-about-arrow-mobile) w-(--size-about-arrow-mobile) text-accent-teal"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={tipId}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="12"
          markerHeight="12"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
          overflow="visible"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" className="arrow-draw-head" />
        </marker>

        <mask id={maskId}>
          <path
            d="M8 6 C 30 6, 34 20, 20 24 C 8 28, 10 40, 26 46"
            pathLength="1"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            className="arrow-mask-path"
          />
        </mask>
      </defs>

      <path
        d="M8 6 C 30 6, 34 20, 20 24 C 8 28, 10 40, 26 46"
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