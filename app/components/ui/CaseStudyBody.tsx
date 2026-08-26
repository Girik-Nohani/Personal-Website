// app/components/ui/CaseStudyBody.tsx
import Image from "next/image";
import type { PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";

interface CaseStudyBodyProps {
  value: PortableTextBlock[];
}

const IMAGE_SIZE_CLASSES: Record<string, string> = {
  small: "max-w-sm mx-auto",
  medium: "max-w-lg mx-auto",
  full: "w-full",
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-display text-body text-text-tertiary">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="mt-lg font-display text-title-sm font-semibold uppercase text-accent-teal">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-md font-display text-body font-semibold text-accent-teal">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-teal pl-md font-display text-body italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-xs pl-md font-display text-body text-text-tertiary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-xs pl-md font-display text-body text-text-tertiary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary">{children}</strong>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-teal underline underline-offset-2 hover:text-accent-teal/80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure
        className={cn(
          "flex flex-col gap-xs",
          IMAGE_SIZE_CLASSES[value.size ?? "full"],
        )}
      >
        <Image
          src={value.imageUrl}
          alt={value.alt}
          width={value.imageWidth}
          height={value.imageHeight}
          className="w-full rounded-lg object-cover"
        />
        {value.caption && (
          <figcaption className="font-mono text-detail text-text-muted">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }) => (
      <div className="overflow-hidden rounded-lg bg-surface">
        {value.filename && (
          <div className="border-b border-white/10 px-md py-xs font-mono text-detail text-text-quaternary">
            {value.filename}
          </div>
        )}
        <pre className="overflow-x-auto p-md">
          <code className="font-mono text-detail text-text-secondary">
            {value.code}
          </code>
        </pre>
      </div>
    ),
    divider: () => <hr className="my-lg border-t border-white/10" />,
  },
};

export function CaseStudyBody({ value }: CaseStudyBodyProps) {
  return (
    <div className="flex flex-col gap-md">
      <PortableText value={value} components={components} />
    </div>
  );
}
