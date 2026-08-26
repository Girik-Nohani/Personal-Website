// app/components/ui/SectionHeading.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface SectionHeadingProps {
  number: string; // e.g. "01"
  title: string; // e.g. "About Me"
}

interface ScrambleChar {
  char: string;
  resolved: boolean;
}

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";
const NUMBER_GLYPHS = "0123456789";
const SCRAMBLE_DURATION_MS = 650;
const SCRAMBLE_FRAME_MS = 50;
const REPLAY_INTERVAL_MS = 7000;

function resolvedArray(str: string): ScrambleChar[] {
  return str.split("").map((char) => ({ char, resolved: true }));
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  const titleChars = title.split("");
  const numberChars = number.split("");

  const [displayTitle, setDisplayTitle] = useState<ScrambleChar[]>(() =>
    resolvedArray(title),
  );
  const [displayNumber, setDisplayNumber] = useState<ScrambleChar[]>(() =>
    resolvedArray(number),
  );
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const replayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runScramble = () => {
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

    const totalFrames = Math.round(SCRAMBLE_DURATION_MS / SCRAMBLE_FRAME_MS);
    let frame = 0;

    scrambleIntervalRef.current = setInterval(() => {
      frame++;
      const titleRevealCount = Math.floor(
        (frame / totalFrames) * titleChars.length,
      );
      const numberRevealCount = Math.floor(
        (frame / totalFrames) * numberChars.length,
      );

      setDisplayTitle(
        titleChars.map((char, i) => {
          if (char === " ") return { char: " ", resolved: true };
          if (i < titleRevealCount) return { char, resolved: true };
          return {
            char: SCRAMBLE_GLYPHS[
              Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)
            ],
            resolved: false,
          };
        }),
      );

      setDisplayNumber(
        numberChars.map((char, i) => {
          if (i < numberRevealCount) return { char, resolved: true };
          return {
            char: NUMBER_GLYPHS[
              Math.floor(Math.random() * NUMBER_GLYPHS.length)
            ],
            resolved: false,
          };
        }),
      );

      if (frame >= totalFrames) {
        if (scrambleIntervalRef.current)
          clearInterval(scrambleIntervalRef.current);
        setDisplayTitle(resolvedArray(title));
        setDisplayNumber(resolvedArray(number));
      }
    }, SCRAMBLE_FRAME_MS);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    replayIntervalRef.current = setInterval(runScramble, REPLAY_INTERVAL_MS);

    return () => {
      if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
      if (scrambleIntervalRef.current)
        clearInterval(scrambleIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-stretch gap-md lg:pb-lg">
      {/* Number box — header bg, yellow corner brackets */}
      <div className="relative shrink-0 min-h-(--size-section-number-box) w-(--size-section-number-box) rounded-lg bg-header">
        <span
          aria-hidden="true"
          className="absolute -left-px -top-px h-md w-md rounded-tl-md border-l-2 border-t-2 border-accent-yellow"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-px -right-px h-md w-md rounded-br-md border-b-2 border-r-2 border-accent-yellow"
        />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-section-number font-bold">
          {displayNumber.map(({ char, resolved }, i) => (
            <span
              key={i}
              className={
                resolved ? "text-text-secondary" : "text-accent-yellow"
              }
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* Vertical divider */}
      <span
        className="w-0.5 shrink-0 self-stretch bg-text-quaternary"
        aria-hidden="true"
      />

      {/* Title + underline */}
      <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-header p-md">
        <h2 className="font-display text-section-title font-bold">
          {displayTitle.map(({ char, resolved }, i) => (
            <span
              key={i}
              className={resolved ? "text-accent-yellow" : "text-accent-teal"}
            >
              {char}
            </span>
          ))}
        </h2>
        <div className="flex items-center gap-slash-gap">
          <span className="h-0.5 flex-1 bg-text-muted" aria-hidden="true" />
          <span className="text-text-muted" aria-hidden="true">
            /
          </span>
          <span className="text-text-muted" aria-hidden="true">
            /
          </span>
          <span className="text-text-muted" aria-hidden="true">
            /
          </span>
        </div>
      </div>
    </div>
  );
}
