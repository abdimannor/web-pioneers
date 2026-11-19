// Web Pioneers: progressive enhancement only.
// Without JavaScript every timeline entry is visible and glossary terms
// are plain links to the glossary at the end of the page.

const STATUS = (shown, total) => `${shown} av ${total} händelser visas.`;

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
    if (status) status.textContent = STATUS(shown, items.length);
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
  close.textContent = "Stäng";
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

initTimelineFilter();
initGlossary();
