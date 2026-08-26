interface TagProps {
  label: string
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-flex h-(--size-tag-height) items-center rounded-md border border-accent-teal/20 px-3 font-mono text-detail font-normal text-text-muted">
      {label}
    </span>
  )
}