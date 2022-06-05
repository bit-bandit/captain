// SPDX: 0BSD

import { subs } from "./utils.ts";

export function parseWebVTT(input: string): subs[] {
  let parsed: subs[] = [];
  // WebVTT files have content seperated by 2 newlines.
  const r: string[] = input.split("\n\n");

  r.shift();

  for (let i = 0; i < r.length; i++) {
    const d: number = i + 1;
    const b: string = r[i].split("\n")[0].split(" --> ")[0];
    const e: string = r[i].split("\n")[0].split(" --> ")[1];
    const c: string = r[i].split("\n").slice(1).join("\n");

    const p: subs = {
      index: d,
      start: b,
      end: e,
      content: c,
    };
    parsed.push(p);
  }

  return parsed;
}

export function toWebVTT(inp: subs[]) {
  let p = "WEBVTT\n\n";

  for (let i = 0; i < inp.length; i++) {
    p += `${inp[i].start} --> ${inp[i].end}\n${inp[i].content}\n\n`;
  }

  return p.slice(0, -2);
}
