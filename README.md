# Web Pioneers

A small Swedish-language site about three layers of the internet we use every day, told through the people and the company behind them.

Live: [abdimannor.github.io/web-pioneers](https://abdimannor.github.io/web-pioneers/)

## Why these three

The site's own framing is "Tre steg mot den webben vi använder varje dag": three steps toward the web we use every day. Each subject stands for one layer, and each layer depends on the one before it.

- **Protocols.** Vint Cerf and Bob Kahn's TCP/IP let separate networks talk to each other without one central owner.
- **Documents.** Tim Berners-Lee's World Wide Web gave information addresses and links through HTML, HTTP and URLs.
- **Navigation.** Google made a fast-growing web findable by treating links as signals of relevance.

## The pages

- `index.html`: the overview. A timeline from 1974 to 1998, one card per profile, the four layers side by side (protocols, documents, navigation, standards) and a suggested reading order.
- `tim.html`: Tim Berners-Lee. Why he matters, key dates from 1955 to the founding of W3C in 1994, and the building blocks HTML, HTTP, URL and open standards.
- `vint.html`: Vint Cerf. The problem of connecting unlike networks, the move to TCP/IP, and the building blocks TCP, IP, packet switching and open interconnection.
- `google.html`: Google. Search as the web's navigation layer, PageRank, crawling, indexing and ranking, and the question of who gets to be visible.

Each profile ends with a list of primary and authoritative sources. Every page ends with a short glossary of the technical terms it uses.

## Interactive parts

Both work without JavaScript; the script only adds to what is already in the HTML.

- **Timeline filter** (overview page). Buttons filter the timeline by layer and person: protocols and Vint Cerf, the web and Tim Berners-Lee, search and Google. Buttons report their state with `aria-pressed`, a screen-reader message announces how many entries are shown, and the small entry animation is switched off when the visitor prefers reduced motion. Without JavaScript the buttons are not shown and every entry is visible.
- **Glossary popovers** (all pages). Terms such as TCP/IP, HTTP, HTML, URL, hypertext, packet switching and PageRank are marked with a dotted underline. In browsers with the native Popover API they open a short definition in place. Elsewhere, or without JavaScript, they are ordinary links to the glossary at the end of the page.

## How it is built

Plain HTML, one stylesheet (`main.css`) and one small script (`script.js`, no dependencies, no build step). Images are local JPEGs. The site deploys to GitHub Pages from `master` through `.github/workflows/deploy.yml`.

To run it locally, open `index.html` in a browser, or serve the folder so paths behave as on Pages:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Sources

Dates and claims should be traceable to a primary or authoritative source: CERN, W3C, the RFC Editor, the Internet Society, the original papers, or the company's own history page. The Wikipedia links on the profiles remain as an easy first step, but they are not the source for anything new. Every external link was checked to resolve when it was added. If you spot an error, open an issue with the source that corrects it.

## License

Released under the MIT License. See [LICENSE](LICENSE).
