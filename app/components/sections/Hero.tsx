// app/components/sections/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  name: string;
  roles: string[];
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroVideo?: string;
  heroVideoPoster?: string;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_-<>/\\?";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Hero({
  name,
  roles,
  tagline,
  primaryCta,
  secondaryCta,
  heroVideo,
  heroVideoPoster,
}: HeroProps) {
  const [displayText, setDisplayText] = useState("");
  const cancelledRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    cancelledRef.current = false;

    const SCRAMBLE_FRAMES = 4;
    const SCRAMBLE_FRAME_MS = 35;
    const SETTLE_PAUSE_MS = 15;
    const HOLD_MS = 5000;
    const DELETE_CHAR_MS = 25;

    async function runLoop() {
      let roleIndex = 0;

      while (!cancelledRef.current) {
        const target = roles[roleIndex];
        let settled = "";

        for (let i = 0; i < target.length; i++) {
          if (cancelledRef.current) return;

          for (let frame = 0; frame < SCRAMBLE_FRAMES; frame++) {
            if (cancelledRef.current) return;
            setDisplayText(settled + randomChar());
            await delay(SCRAMBLE_FRAME_MS);
          }

          settled += target[i];
          setDisplayText(settled);
          await delay(SETTLE_PAUSE_MS);
        }

        await delay(HOLD_MS);
        if (cancelledRef.current) return;

        while (settled.length > 0) {
          if (cancelledRef.current) return;
          settled = settled.slice(0, -1);
          setDisplayText(settled);
          await delay(DELETE_CHAR_MS);
        }

        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    runLoop();

    return () => {
      cancelledRef.current = true;
    };
  }, [roles]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;

    const applyPreference = () => {
      if (mediaQuery.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    applyPreference();
    mediaQuery.addEventListener("change", applyPreference);
    return () => mediaQuery.removeEventListener("change", applyPreference);
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center px-sm">
      {heroVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{
            opacity: "var(--hero-video-opacity)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 8%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 8%, black 85%, transparent)",
          }}
          autoPlay
          loop
          muted
          playsInline
          poster={heroVideoPoster}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono font-semibold text-hero-eyebrow tracking-hero-eyebrow uppercase text-text-tertiary">
          Hello
        </p>

        <h1 className="mt-xs font-display font-semibold text-hero-name leading-tight text-text-primary">
          I am <span className="text-accent-teal">{name}</span>
        </h1>

        <div className="mt-2 font-mono font-semibold text-hero-eyebrow tracking-hero-role uppercase text-accent-yellow">
          <span aria-hidden="true">
            {displayText}
            <span className="ml-1 inline-block h-[.8em] w-(--size-hero-cursor-width) align-baseline bg-accent-teal animate-[blink_1s_step-end_infinite] motion-reduce:animate-none" />
          </span>
          <span className="sr-only">{roles.join(", ")}</span>
        </div>

        <p className="mt-hero-tagline-gap max-w-2xl font-mono text-hero-eyebrow text-text-quaternary">
          {tagline}
        </p>

        <div className="mt-hero-buttons-gap flex flex-col gap-sm w-full max-w-(--size-hero-cta-group-max-w) sm:flex-row sm:gap-md sm:w-auto">
          <Button
            variant="primary"
            className="w-full sm:w-cta-btn h-cta-btn font-mono font-bold text-base"
            onClick={() =>
              document
                .getElementById(primaryCta.href.replace("#", ""))
                ?.scrollIntoView()
            }
          >
            {primaryCta.label}
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-cta-btn h-cta-btn font-mono font-bold text-base"
            onClick={() =>
              document
                .getElementById(secondaryCta.href.replace("#", ""))
                ?.scrollIntoView()
            }
          >
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
