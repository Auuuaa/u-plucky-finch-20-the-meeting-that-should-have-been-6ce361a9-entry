// The Meeting That Should Have Been an Email.
// Forty minutes in, the meeting gives up and becomes the email itself.
// The line goes to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The setup: a meeting that has run long enough to lose hope.
const SETUP = "Forty minutes in, the meeting gave up, forwarded itself to everyone,";
// The turn lands on the last word: the meeting becomes the email.
const PUNCH = "and became the email it should have been.";

function buildLine(): string {
  return `${SETUP} ${PUNCH}`;
}

function checkLength(text: string): void {
  const n = text.length;
  if (n < 1 || n > 200) {
    throw new Error(`entry is ${n} chars; the gate is 1-200`);
  }
}

function main(): void {
  const line = buildLine();
  checkLength(line);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
