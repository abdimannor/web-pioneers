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

  initTimelineFilter();
})();
