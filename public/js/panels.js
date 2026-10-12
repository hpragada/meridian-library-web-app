// Panel strip: clicking a control in [data-strip] shows its panel and hides the others.
// Works for a strip of links pointing at panel ids and for a strip of tab buttons.

document.querySelectorAll("[data-strip]").forEach(function (strip) {
  var controls = Array.prototype.slice.call(strip.querySelectorAll("a, button"));

  strip.addEventListener("click", function (event) {
    var control = event.target.closest("a, button");
    if (!control || controls.indexOf(control) === -1) return;
    event.preventDefault();

    var href = control.getAttribute("href");
    var targetId = href ? href.slice(1) : control.getAttribute("aria-controls");
    if (!targetId) return;

    controls.forEach(function (c) {
      var on = c === control;
      c.classList.toggle("is-current", on);
      if (c.hasAttribute("aria-selected")) {
        c.setAttribute("aria-selected", String(on));
        c.tabIndex = on ? 0 : -1;
      }
    });

    document.querySelectorAll(".tabpanel").forEach(function (panel) {
      panel.hidden = panel.id !== targetId;
    });
  });
});
