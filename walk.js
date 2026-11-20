// "Vad händer när du öppnar en webbsida?": the steps are a plain list
// without JavaScript. Here they become a stepped diagram: one row of
// stations, one step shown at a time, previous/next and arrow keys.
function initWalk() {
  const root = document.getElementById("sidvisning");
  if (!root) return;
  const list = root.querySelector(".wk-list");
  const steps = [...list.querySelectorAll(".wk-step")];

  const rail = document.createElement("div");
  rail.className = "wk-rail";
  rail.setAttribute("role", "group");
  rail.setAttribute("aria-label", "Välj steg");
  const track = document.createElement("span");
  track.className = "wk-track";
  track.setAttribute("aria-hidden", "true");
  const fill = document.createElement("span");
  fill.className = "wk-fill";
  track.append(fill);
  rail.append(track);

  const dots = steps.map((step, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "wk-dot";
    b.dataset.tone = step.dataset.tone;
    const n = document.createElement("span");
    n.className = "wk-num";
    n.textContent = String(i + 1);
    const label = document.createElement("span");
    label.className = "wk-name";
    label.textContent = step.querySelector("h3").textContent;
    b.append(n, label);
    b.addEventListener("click", () => go(i, true));
    rail.append(b);
    return b;
  });

  const nav = document.createElement("div");
  nav.className = "wk-nav";
  const prev = document.createElement("button");
  prev.type = "button";
  prev.textContent = "Föregående";
  const status = document.createElement("p");
  status.className = "wk-status";
  status.setAttribute("aria-live", "polite");
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "Nästa";
  nav.append(prev, status, next);

  let at = 0;
  function go(i, focus) {
    at = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, j) => { s.hidden = j !== at; });
    dots.forEach((d, j) => {
      d.setAttribute("aria-current", j === at ? "step" : "false");
      d.classList.toggle("is-done", j < at);
    });
    fill.style.setProperty("--p", at / (steps.length - 1));
    prev.disabled = at === 0;
    next.disabled = at === steps.length - 1;
    status.textContent = `Steg ${at + 1} av ${steps.length}: ${steps[at].querySelector("h3").textContent}`;
    if (focus) dots[at].focus();
  }
  prev.addEventListener("click", () => go(at - 1));
  next.addEventListener("click", () => go(at + 1));
  rail.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(at + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(at - 1, true); }
  });

  list.before(rail);
  list.after(nav);
  root.classList.add("is-stepped");
  go(0);
}

initWalk();
