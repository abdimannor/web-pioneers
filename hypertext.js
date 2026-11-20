// Hypertext mini-demo for tim.html.
// Each document is text already on this page (glossary, timeline, concepts).
// Following a link moves you through a small graph of linked documents.
// Progressive enhancement: the section is hidden until this module runs.

const NS = "http://www.w3.org/2000/svg";

// Where each document's text lives on the page, and its place in the graph.
const DOCS = {
  www: { title: "WWW-förslaget", from: ["h2", "WWW-förslaget"], at: [300, 170] },
  hypertext: { title: "Hypertext", from: ["#ord-hypertext"], at: [120, 80] },
  enquire: { title: "Enquire", from: ["h2", "Enquire på CERN"], at: [90, 270] },
  html: { title: "HTML", from: ["#ord-html"], at: [300, 40] },
  http: { title: "HTTP", from: ["#ord-http"], at: [480, 80] },
  url: { title: "URL", from: ["#ord-url"], at: [500, 260] },
  standarder: { title: "Öppna standarder", from: ["h3", "Öppna standarder"], at: [300, 305] },
};
const LINKS = {
  www: ["hypertext", "html", "http", "url", "standarder"],
  hypertext: ["enquire", "html", "www"],
  enquire: ["hypertext"],
  html: ["hypertext", "url"],
  http: ["url", "html"],
  url: ["http", "www"],
  standarder: ["www", "html", "http"],
};

function textFor({ from: [sel, heading] }) {
  if (sel.startsWith("#")) return document.querySelector(`${sel} dd`)?.textContent.trim() ?? "";
  const h = [...document.querySelectorAll(sel)].find((n) => n.textContent.trim() === heading);
  return h?.parentElement.querySelector("p")?.textContent.trim() ?? "";
}

const el = (name, attrs = {}) => {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};

function init() {
  const root = document.getElementById("hypertext");
  if (!root) return;
  for (const doc of Object.values(DOCS)) doc.text = textFor(doc);
  if (Object.values(DOCS).some((d) => !d.text)) return; // page text changed: stay hidden
  root.hidden = false;

  const svg = root.querySelector(".ht-graph");
  const article = root.querySelector(".ht-doc");
  const trailEl = root.querySelector(".ht-trail");
  const back = root.querySelector("[data-ht-back]");

  const edges = el("g", { class: "ht-edges" });
  const nodes = el("g", { class: "ht-nodes" });
  const edgeEls = {};
  for (const [a, targets] of Object.entries(LINKS)) {
    for (const b of targets) {
      const key = [a, b].sort().join("|");
      if (edgeEls[key]) continue;
      const [x1, y1] = DOCS[a].at, [x2, y2] = DOCS[b].at;
      edgeEls[key] = el("line", { x1, y1, x2, y2 });
      edges.append(edgeEls[key]);
    }
  }
  const nodeEls = {};
  for (const [id, doc] of Object.entries(DOCS)) {
    const g = el("g", { class: "ht-node", transform: `translate(${doc.at[0]} ${doc.at[1]})` });
    const w = doc.title.length * 8.4 + 28;
    g.append(el("rect", { x: -w / 2, y: -17, width: w, height: 34, rx: 4 }));
    const t = el("text", { "text-anchor": "middle", dy: "0.35em" });
    t.textContent = doc.title;
    g.append(t);
    g.addEventListener("click", () => go(id));
    nodeEls[id] = g;
    nodes.append(g);
  }
  svg.append(edges, nodes);

  const trail = [];

  function go(id, { push = true, focus = true } = {}) {
    const prev = trail.at(-1);
    if (push) trail.push(id);
    if (prev && push) edgeEls[[prev, id].sort().join("|")]?.classList.add("is-walked");
    for (const [k, g] of Object.entries(nodeEls)) {
      g.classList.toggle("is-here", k === id);
      g.classList.toggle("is-seen", trail.includes(k));
      g.classList.toggle("is-next", LINKS[id].includes(k));
    }
    const doc = DOCS[id];
    const h = document.createElement("h3");
    h.tabIndex = -1;
    h.textContent = doc.title;
    const p = document.createElement("p");
    p.textContent = doc.text;
    const label = document.createElement("p");
    label.className = "ht-label";
    label.textContent = "Länkar vidare:";
    const ul = document.createElement("ul");
    for (const target of LINKS[id]) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#ht-${target}`;
      a.textContent = DOCS[target].title;
      a.addEventListener("click", (e) => { e.preventDefault(); go(target); });
      li.append(a);
      ul.append(li);
    }
    article.replaceChildren(h, p, label, ul);
    trailEl.textContent = trail.map((k) => DOCS[k].title).join(" → ");
    back.disabled = trail.length < 2;
    if (focus) h.focus();
  }

  back.addEventListener("click", () => {
    if (trail.length < 2) return;
    trail.pop();
    go(trail.at(-1), { push: false });
  });

  go("www", { focus: false });
}

init();
