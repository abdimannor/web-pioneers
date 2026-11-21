# Web Pioneers

Live: [abdimannor.github.io/web-pioneers](https://abdimannor.github.io/web-pioneers/)

A small site, written in Swedish with an English edition under [`/en/`](https://abdimannor.github.io/web-pioneers/en/), about three layers of the internet we use every day, told through the people and the company behind them. Every date on it points to a source.

## Why these three

The site's own framing is "Tre steg mot den webben vi använder varje dag": three steps toward the web we use every day. Each subject stands for one layer, and each layer depends on the one before it.

- **Protocols.** Vint Cerf and Bob Kahn's TCP/IP let separate networks talk to each other without one central owner.
- **Documents.** Tim Berners-Lee's World Wide Web gave information addresses and links through HTML, HTTP and URLs.
- **Navigation.** Google made a fast-growing web findable by treating links as signals of relevance.

## The pages

- `index.html`: the overview. A timeline from 1974 to 1998, one card per profile, the four layers side by side (protocols, documents, navigation, standards), "Vad händer när du öppnar en webbsida?" and a suggested reading order.
- `vint.html`: Vint Cerf. The problem of connecting unlike networks, the move to TCP/IP, and TCP, IP, packet switching and open interconnection.
- `tim.html`: Tim Berners-Lee. Key dates from 1955 to the founding of W3C in 1994, and HTML, HTTP, URL and open standards.
- `google.html`: Google. Search as the web's navigation layer, PageRank, crawling, indexing and ranking, and the question of who gets to be visible.

Each profile ends with primary and authoritative sources, and every page ends with a glossary of the terms it uses.

## Things to try

Each of these is added by script on top of content that is already in the HTML, so nothing is lost without JavaScript.

- **Watch a message travel** (`vint.html`, `packets.js`). A message is split into numbered packets that take different routes through a small router network, arrive out of order and are put back in sequence. With motion off, or the step toggle, the animation becomes a series of steps.
- **Follow links through documents** (`tim.html`, `hypertext.js`). A small graph of linked documents, made from text already on the page, shows what hypertext meant in practice.
- **Open a web page step by step** (overview, `walk.js`). The plain list of what happens when you load a page becomes a row of stations with one step shown at a time, previous/next buttons and arrow keys.
- **Filter the timeline** (overview, `script.js`) by layer and person. Buttons report their state with `aria-pressed` and a screen-reader message says how many entries are shown.
- **Look up a term in place.** Dotted terms such as TCP/IP, HTTP, URL, packet switching and PageRank open a short definition with the native Popover API, and fall back to links into the glossary. The glossary itself gets a live search field.

## How it is built

Plain HTML, one stylesheet (`main.css`) and a handful of small dependency-free scripts. No build step. Images are local JPEGs. `motion.js` adds a pause button: motion is on by default, and turning it off is remembered; `tests/motion.mjs` checks it. The site deploys to GitHub Pages from `master` through `.github/workflows/deploy.yml`.

To run it locally:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Sources

Dates and claims should be traceable to a primary or authoritative source: CERN, W3C, the RFC Editor, the Internet Society, the original papers, or the company's own history page. The Wikipedia links on the profiles remain as an easy first step, but they are not the source for anything new. Every external link was checked to resolve when it was added. If you spot an error, open an issue with the source that corrects it.

## What it does not cover

It is three profiles, not a history of the internet. Many people who shaped these layers are mentioned briefly or not at all.

## License

Released under the MIT License. See [LICENSE](LICENSE).
