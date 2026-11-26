// The Funniest Office Joke, Judged Head to Head
// Writes one single-line office joke to /output/entry.txt.
// Deterministic: the same joke, byte for byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "The office printer only jams on deadline day, which makes it the only coworker who actually reads the brief.";

const OUT_PATH = "/output/entry.txt";

function guardIsString(text: unknown): asserts text is string {
  if (typeof text !== "string") {
    throw new Error("entry must be a string");
  }
}

function guardLength(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
}

function guardNotBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function guardSingleLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function guardValidUtf8(text: string): void {
  const encoded = new TextEncoder().encode(text);
  if (new TextDecoder("utf-8", { fatal: true }).decode(encoded) !== text) {
    throw new Error("entry must be valid UTF-8");
  }
}

function validate(text: unknown): asserts text is string {
  guardIsString(text);
  guardLength(text);
  guardNotBlank(text);
  guardSingleLine(text);
  guardValidUtf8(text);
}

function main(): void {
  validate(JOKE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, JOKE, "utf8");
}

main();
