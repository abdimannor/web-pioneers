// Web Pioneers: small progressive enhancements.
// Without JavaScript every timeline entry is visible.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initTimelineFilter() {
    var filter = document.querySelector("[data-timeline-filter]");
    var list = document.querySelector("[data-timeline]");
    if (!filter || !list) return;

    var buttons = filter.querySelectorAll("button[data-filter]");
    var items = list.querySelectorAll("li[data-theme]");
    var status = filter.querySelector("[data-timeline-status]");

    function apply(value) {
      var shown = 0;
      items.forEach(function (item) {
        var match = value === "all" || item.getAttribute("data-theme") === value;
        var wasHidden = item.hidden;
        item.hidden = !match;
        if (match) {
          shown += 1;
          if (wasHidden && !reduceMotion) {
            item.classList.remove("is-entering");
            void item.offsetWidth;
            item.classList.add("is-entering");
          }
        }
      });
      buttons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.getAttribute("data-filter") === value));
      });
      if (status) {
        status.textContent = shown + " av " + items.length + " händelser visas.";
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        apply(button.getAttribute("data-filter"));
      });
    });

    filter.hidden = false;
  }

  // Glossary popovers. The links point to the glossary list at the end of
  // the page; where the Popover API exists they become buttons instead.
  function initGlossary() {
    if (!HTMLElement.prototype.hasOwnProperty("popover")) return;
    var links = document.querySelectorAll("a.term[data-term]");
    var made = {};

    links.forEach(function (link, index) {
      var entryId = link.getAttribute("data-term");
      var entry = document.getElementById(entryId);
      if (!entry) return;
      var popId = "pop-" + entryId;

      if (!made[popId]) {
        var term = entry.querySelector("dt").textContent;
        var pop = document.createElement("div");
        pop.id = popId;
        pop.className = "term-popover";
        pop.setAttribute("popover", "");
        pop.setAttribute("role", "dialog");
        pop.setAttribute("aria-labelledby", popId + "-title");

        var heading = document.createElement("h3");
        heading.id = popId + "-title";
        heading.textContent = term;
        var text = document.createElement("p");
        text.textContent = entry.querySelector("dd").textContent;
        var close = document.createElement("button");
        close.type = "button";
        close.textContent = "Stäng";
        close.setAttribute("popovertarget", popId);
        close.setAttribute("popovertargetaction", "hide");

        pop.append(heading, text, close);
        document.body.appendChild(pop);
        made[popId] = true;
      }

      var button = document.createElement("button");
      button.type = "button";
      button.className = "term";
      button.setAttribute("popovertarget", popId);
      button.setAttribute("aria-haspopup", "dialog");
      button.innerHTML = link.innerHTML;
      link.replaceWith(button);
    });
  }

  initTimelineFilter();
  initGlossary();
})();
