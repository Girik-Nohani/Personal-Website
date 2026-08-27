// lib/shiki.ts
import { createHighlighter, type Highlighter } from "shiki";

export const SUPPORTED_LANGS = [
  "bash",
  "powershell",
  "python",
  "javascript",
  "typescript",
  "json",
  "yaml",
  "text",
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return highlighterPromise;
}

export function resolveLang(language?: string): SupportedLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(language ?? "")
    ? (language as SupportedLang)
    : "text";
}