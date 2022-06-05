// SPDX: 0BSD

import { subs } from "./utils.ts";

export function parseSRT(input: string): subs[] {
  const parsed: subs[] = [];
  // SRT files have content seperated by 2 newlines.
  const r: string[] = input.split("\n\n");
  for (let i = 0; i < r.length; i++) {
    const d: number = parseInt(r[i].split("\n")[0]); // Index of
    const b: string = r[i].split("\n")[1].split(" --> ")[0];
    const e: string = r[i].split("\n")[1].split(" --> ")[1];
    const c: string = r[i].split("\n").slice(2).join("\n");

    const p: subs = {
      index: d,
      // Replace comma with period.
      start: b.replace(",", "."),
      end: e.replace(",", "."),
      content: c,
    };
    parsed.push(p);
  }

  return parsed;
}

export function toSRT(inp: subs[]): string {
  let p = "";

  for (let i = 0; i < inp.length; i++) {
    p += `${inp[i].index}\n${inp[i].start.replace(".", ",")} --> ${
      inp[i].end.replace(".", ",")
    }\n${inp[i].content}\n\n`;
  }

  // Clean up last couple of unneeded newlines.
  return p.slice(0, -2);
}
