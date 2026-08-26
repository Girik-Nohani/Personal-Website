// app/components/layout/Footer.tsx
import { Triangle } from "lucide-react";

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-text-quaternary/10 bg-background">
      <div className="relative mx-auto max-w-6xl px-6 py-lg">
        <div className="mx-auto flex items-center justify-center gap-sm sm:max-w-2xl">
          <div className="flex w-6 shrink-0 flex-col items-start gap-footer-divider-gap sm:w-auto sm:min-w-(--width-footer-divider-min) sm:flex-1">
            <span className="h-px w-full bg-text-quaternary/60" />
            <span className="h-px w-(--width-footer-divider-inner) bg-text-muted/60" />
          </div>

          <div className="flex shrink-0 items-center gap-footer-divider-gap">
            <span className="h-4 w-px bg-text-quaternary/60" />
            <span className="h-4 w-px bg-text-muted/60" />
          </div>

          <p className="shrink-0 whitespace-nowrap text-center font-mono text-detail text-text-muted">
            © {year}{" "}
            <span className="font-medium text-accent-teal">{name}</span>. All
            Rights Reserved
          </p>

          <div className="flex shrink-0 items-center gap-footer-divider-gap">
            <span className="h-4 w-px bg-text-quaternary/60" />
            <span className="h-4 w-px bg-text-muted/60" />
          </div>

          <div className="flex w-6 shrink-0 flex-col items-start gap-footer-divider-gap sm:w-auto sm:min-w-(--width-footer-divider-min) sm:flex-1">
            <span className="h-px w-full bg-text-quaternary/60" />
            <span className="h-px w-(--width-footer-divider-inner) bg-text-muted/60" />
          </div>
        </div>
        <a
          href="#home"
          aria-label="Back to top"
          className="absolute right-6 top-8 hidden size-11 items-center justify-center rounded-(--radius-footer-btn) border-2 border-text-quaternary/40 bg-surface/80 text-text-primary shadow-lg backdrop-blur transition-colors motion-reduce:transition-none sm:flex md:right-24 hover:border-accent-teal hover:text-accent-teal"
        >
          <Triangle className="size-[--size-footer-btn-icon] fill-current stroke-none" />
        </a>
      </div>
    </footer>
  );
}