interface DoubleDividerProps {
  orientation: 'horizontal' | 'vertical'
}

export function DoubleDivider({ orientation }: DoubleDividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className="hidden lg:mx-lg lg:flex lg:items-stretch lg:gap-(--spacing-divider-gap)"
        aria-hidden="true"
      >
        <span className="w-0.5 bg-accent-teal" />
        <span className="w-0.5 h-divider-vertical-inner bg-text-muted" />
      </div>
    )
  }

  return (
    <div className="relative mt-xl h-3" aria-hidden="true">
      <div className="absolute left-0 top-0 h-0.5 w-full bg-accent-teal" />
       <div className="absolute right-0 top-(--spacing-divider-offset-top) h-0.5 w-divider-horizontal-mobile bg-text-muted lg:w-(--width-divider-horizontal-desktop)" />
    </div>
  )
}