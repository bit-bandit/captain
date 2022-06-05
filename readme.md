# Captain

Captain is a library of parsers/encoders for muliple subtitle formats.

## Currently supported formats

- SubRip
- WebVTT

## Usage

```ts
// The following example will convert a WebVTT formatted string to the SRT format
import { parseWebVTT } from "https://raw.githubusercontent.com/bit-bandit/captain/main/webvtt.ts";
import { toSRT } from "https://raw.githubusercontent.com/bit-bandit/captain/main/srt.ts";

const wvt = `
WEBVTT

00:00:22.000 --> 00:00:27.000
I'll teach thee Bugology, Ignatzes

00:00:40.000 --> 00:00:43.000 
Something tells me

00:00:58.000 --> 00:01:59.000 
Look, Ignatz, a sleeping bee
`;

let w = parseWebVTT(wvt);
// [{
//  "index": 1,
//  "start": "00:00:22.000",
//  "end": "00:00:27.000",
//  "content": "I'll teach thee Bugology, Ignatzes"
// }, {
//  "index": 2,
//  "start": "00:00:40.000",
//  "end": "00:00:43.000 ",
//  "content": "Something tells me"
// }, {
//  "index": 3,
//  "start": "00:00:58.000",
//  "end": "00:01:59.000 ",
//  "content": "Look, Ignatz, a sleeping bee\n"
// }]

let s = toSRT(w);
// 1
// 00:00:22,000 --> 00:00:27,000
// I'll teach thee Bugology, Ignatzes
//
// 2
// 00:00:40,000 --> 00:00:43,000
// Something tells me
//
// 3
// 00:00:58,000 --> 00:01:59,000
// Look, Ignatz, a sleeping bee
```

## Contributing

When adding a new subtitle format, abide by the following format:

```ts
// Add { subs } type. It's the heart of the program, so it's pretty darn important.
// Put other dependancies you might want here, as well.
import { subs } from "./utils.ts";

// Parser for subtitle format. Must always return subs[], and only accept strings.
export function parseSubFormat(inp: string): subs[] {
  // Do stuff.
}

// Parser for converting subs[] format to a format. Must only accept subs[], and always return string.
export function toSubFormat(inp: subs[]): string {
  // Do stuff.
}
```

Try to limit the number of other functions as much as you can.

Before committing, run `deno fmt` and `deno lint`, to fix/see if you've messed
anything up.

## Notes

Currently, only a subsect of the features in the formats we've added have been
included. Only the bare essentials have been implimented, at the moment. If you
want to add something, open an issue/pull request.

## TODO

- Add checks to see if subtitle is formatted properly, and do stuff if it isn't.
- Figure out what the hell to do with subtitle metadata/comments in general.
- Figure out what the hell to do with formats that use an XML-ish syntax (I.E.
  W3C TTML).
- Add other formats.

## License

0BSD
