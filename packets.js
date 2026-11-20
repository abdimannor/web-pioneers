// Packet-switching explainer for vint.html.
// A message is split into numbered packets that travel independently through
// a small router network, arrive out of order and are put back in sequence.
// Progressive enhancement: the section is hidden until this module runs.
// Reduced motion (or the step toggle) replaces the animation with steps.

const NS = "http://www.w3.org/2000/svg";
const NODES = {
  A: [60, 180], R1: [230, 70], R2: [230, 290], R3: [400, 180],
  R4: [570, 70], R5: [570, 290], B: [740, 180],
};
const EDGES = [
  ["A", "R1"], ["A", "R2"], ["R1", "R3"], ["R2", "R3"], ["R1", "R4"],
  ["R3", "R4"], ["R3", "R5"], ["R2", "R5"], ["R4", "B"], ["R5", "B"],
];
// Each route is a different path from A to B. Each link has its own delay
// (as if queues differed), so packets overtake each other.
const ROUTES = [
  ["A", "R1", "R3", "R5", "B"],
  ["A", "R2", "R5", "B"],
  ["A", "R1", "R4", "B"],
  ["A", "R2", "R3", "R4", "B"],
  ["A", "R1", "R3", "R4", "B"],
  ["A", "R2", "R3", "R5", "B"],
];
const DELAY = {
  "A-R1": 1.4, "A-R2": 0.8, "R1-R3": 1.6, "R2-R3": 1.2, "R1-R4": 1,
  "R3-R4": 0.9, "R3-R5": 1.5, "R2-R5": 1.1, "R4-B": 0.8, "R5-B": 1,
};
const CHUNK = 4;
const GAP = 0.45; // time between departures
const STEP = 0.5; // time per step in step mode

const delay = (a, b) => DELAY[`${a}-${b}`] ?? DELAY[`${b}-${a}`];
const el = (name, attrs = {}) => {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};

function init() {
  const root = document.getElementById("paket");
  if (!root) return;
  root.hidden = false;

  const form = root.querySelector(".pk-form");
  const input = root.querySelector("#pk-msg");
  const svg = root.querySelector(".pk-net");
  const tray = root.querySelector(".pk-tray");
  const out = root.querySelector(".pk-out");
  const status = root.querySelector(".pk-status");
  const stepBtn = root.querySelector("[data-pk-step]");
  const modeBox = root.querySelector("#pk-steps");
  // Step mode follows the site's motion setting (motion.js) until changed here.
  const still = () => document.documentElement.dataset.motion === "off";
  modeBox.checked = still();
  document.addEventListener("motionchange", () => {
    modeBox.checked = still();
    modeBox.dispatchEvent(new Event("change"));
  });

  // Draw the network once.
  const links = el("g", { class: "pk-links" });
  for (const [a, b] of EDGES) {
    const [x1, y1] = NODES[a], [x2, y2] = NODES[b];
    links.append(el("line", { x1, y1, x2, y2, "data-edge": `${a}-${b}` }));
  }
  const nodes = el("g", { class: "pk-nodes" });
  for (const [id, [x, y]] of Object.entries(NODES)) {
    const end = id === "A" || id === "B";
    const g = el("g", { class: end ? "pk-host" : "pk-router", transform: `translate(${x} ${y})` });
    g.append(end ? el("rect", { x: -34, y: -24, width: 68, height: 48, rx: 6 }) : el("circle", { r: 22 }));
    const t = el("text", { "text-anchor": "middle", dy: "0.35em" });
    t.textContent = id === "A" ? "Avsändare" : id === "B" ? "Mottagare" : id;
    if (end) t.setAttribute("class", "pk-host-label");
    g.append(t);
    nodes.append(g);
  }
  const layer = el("g", { class: "pk-packets" });
  svg.append(links, nodes, layer);

  let packets = [];
  let t = 0;
  let raf = 0;
  let last = 0;
  let total = 0;

  function plan(text) {
    const chunks = [];
    for (let i = 0; i < text.length; i += CHUNK) chunks.push(text.slice(i, i + CHUNK));
    return chunks.map((chunk, i) => {
      const route = ROUTES[(i * 5) % ROUTES.length];
      const legs = [];
      let start = i * GAP;
      for (let h = 0; h < route.length - 1; h++) {
        const d = delay(route[h], route[h + 1]);
        legs.push({ from: route[h], to: route[h + 1], start, end: start + d });
        start += d;
      }
      const g = el("g", { class: "pk-packet", style: `--hue:${(i * 47) % 360}` });
      g.append(el("circle", { r: 13 }));
      const label = el("text", { "text-anchor": "middle", dy: "0.35em" });
      label.textContent = i + 1;
      g.append(label);
      layer.append(g);
      return { n: i + 1, chunk, legs, depart: i * GAP, arrive: start, node: g, arrived: false };
    });
  }

  function position(p) {
    if (t <= p.depart) return NODES.A;
    if (t >= p.arrive) return NODES.B;
    const leg = p.legs.find((l) => t < l.end);
    const k = (t - leg.start) / (leg.end - leg.start);
    const [x1, y1] = NODES[leg.from], [x2, y2] = NODES[leg.to];
    return [x1 + (x2 - x1) * k, y1 + (y2 - y1) * k];
  }

  function render() {
    for (const p of packets) {
      const [x, y] = position(p);
      p.node.setAttribute("transform", `translate(${x} ${y})`);
      p.node.classList.toggle("is-waiting", t <= p.depart);
      if (!p.arrived && t >= p.arrive) {
        p.arrived = true;
        p.node.classList.add("is-done");
        const li = document.createElement("li");
        li.style.setProperty("--hue", (p.n - 1) * 47 % 360);
        li.append(document.createElement("span"), document.createElement("span"));
        li.firstChild.className = "pk-n";
        li.lastChild.className = "pk-c";
        li.firstChild.textContent = p.n;
        li.lastChild.textContent = p.chunk.replaceAll(" ", "\u2423");
        tray.append(li);
        status.textContent = `Paket ${p.n} av ${packets.length} har kommit fram.`;
      }
    }
    if (packets.length && packets.every((p) => p.arrived) && !out.dataset.done) {
      const order = [...tray.children].map((li) => li.firstChild.textContent).join(", ");
      out.dataset.done = "1";
      out.textContent = packets.map((p) => p.chunk).join("");
      root.querySelector(".pk-order").textContent = `Ankomstordning: ${order}. TCP sorterar efter nummer.`;
      status.textContent = "Alla paket har kommit fram och meddelandet är ihopsatt.";
      [...tray.children]
        .sort((a, b) => Number(a.firstChild.textContent) - Number(b.firstChild.textContent))
        .forEach((li, i) => { li.style.setProperty("--slot", i); tray.append(li); });
      tray.classList.add("is-sorted");
      stepBtn.disabled = true;
    }
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt * 1.1;
    render();
    if (t < total + 0.05) raf = requestAnimationFrame(frame);
  }

  function start(e) {
    e?.preventDefault();
    cancelAnimationFrame(raf);
    const text = input.value.trim() || input.placeholder;
    layer.replaceChildren();
    tray.replaceChildren();
    tray.classList.remove("is-sorted");
    out.textContent = "";
    delete out.dataset.done;
    root.querySelector(".pk-order").textContent = "";
    packets = plan(text);
    total = Math.max(...packets.map((p) => p.arrive));
    t = 0;
    status.textContent = `Meddelandet delas i ${packets.length} paket med ${CHUNK} tecken var.`;
    stepBtn.disabled = !modeBox.checked;
    render();
    if (!modeBox.checked) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  stepBtn.addEventListener("click", () => {
    if (!packets.length) return start();
    t = Math.min(total, t + STEP);
    render();
  });
  modeBox.addEventListener("change", () => {
    stepBtn.disabled = !modeBox.checked || !packets.length || !!out.dataset.done;
    if (modeBox.checked) cancelAnimationFrame(raf);
    else if (packets.length && t < total) { last = performance.now(); raf = requestAnimationFrame(frame); }
  });
  form.addEventListener("submit", start);
}

init();
