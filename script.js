// Web Pioneers: progressive enhancement only.
// Without JavaScript every timeline entry is visible and glossary terms
// are plain links to the glossary at the end of the page.

// UI strings: Swedish defaults, overridden per language by window.WP_I18N.script.
const T = Object.assign({
  status: (shown, total) => `${shown} av ${total} händelser visas.`,
  close: "Stäng",
  search: "Sök i ordlistan",
  terms: (shown, total) => `${shown} av ${total} begrepp visas.`,
  locale: "sv",
}, (window.WP_I18N || {}).script);

function initTimelineFilter(root = document) {
  const filter = root.querySelector("[data-timeline-filter]");
  const list = root.querySelector("[data-timeline]");
  if (!filter || !list) return;

  const buttons = [...filter.querySelectorAll("button[data-filter]")];
  const items = [...list.querySelectorAll("li[data-theme]")];
  const status = filter.querySelector("[data-timeline-status]");

  const apply = (value) => {
    let shown = 0;
    for (const item of items) {
      const match = value === "all" || item.dataset.theme === value;
      item.classList.toggle("is-entering", match && item.hidden);
      item.hidden = !match;
      if (match) shown += 1;
    }
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === value));
    }
    if (status) status.textContent = T.status(shown, items.length);
  };

  filter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (button) apply(button.dataset.filter);
  });
  list.addEventListener("animationend", (event) => {
    event.target.classList.remove("is-entering");
  });

  filter.hidden = false;
}

function buildPopover(entry, id) {
  const pop = document.createElement("div");
  pop.id = id;
  pop.className = "term-popover";
  pop.popover = "auto";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-labelledby", `${id}-title`);

  const heading = document.createElement("h3");
  heading.id = `${id}-title`;
  heading.textContent = entry.querySelector("dt").textContent;

  const text = document.createElement("p");
  text.textContent = entry.querySelector("dd").textContent;

  const close = document.createElement("button");
  close.type = "button";
  close.textContent = T.close;
  close.setAttribute("popovertarget", id);
  close.setAttribute("popovertargetaction", "hide");

  pop.append(heading, text, close);
  return pop;
}

// Where the Popover API exists, glossary links become buttons that open the
// definition in place. Elsewhere the links keep jumping to the glossary.
function initGlossary(root = document) {
  if (!Object.hasOwn(HTMLElement.prototype, "popover")) return;

  for (const link of root.querySelectorAll("a.term[data-term]")) {
    const entry = document.getElementById(link.dataset.term);
    if (!entry) continue;

    const id = `pop-${link.dataset.term}`;
    if (!document.getElementById(id)) document.body.append(buildPopover(entry, id));

    const button = document.createElement("button");
    button.type = "button";
    button.className = "term";
    button.setAttribute("popovertarget", id);
    button.setAttribute("aria-haspopup", "dialog");
    button.append(...link.childNodes);
    link.replaceWith(button);
  }
}

// Glossary search: the field is added by script, so without JavaScript the
// glossary stays a plain list with nothing that does not work.
function initGlossarySearch(root = document) {
  const section = root.querySelector(".glossary");
  const list = section?.querySelector("dl");
  if (!list) return;
  const entries = [...list.querySelectorAll(":scope > div")];
  const label = document.createElement("label");
  label.className = "glossary-search";
  const text = document.createElement("span");
  text.textContent = T.search;
  const input = document.createElement("input");
  input.type = "search";
  input.autocomplete = "off";
  const status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  label.append(text, input);
  list.before(label, status);
  const norm = (s) => s.toLocaleLowerCase(T.locale).normalize("NFC");
  input.addEventListener("input", () => {
    const q = norm(input.value.trim());
    let shown = 0;
    for (const entry of entries) {
      const match = !q || norm(entry.textContent).includes(q);
      entry.hidden = !match;
      if (match) shown += 1;
    }
    status.textContent = T.terms(shown, entries.length);
  });
}

initTimelineFilter();
initGlossary();
initGlossarySearch();
