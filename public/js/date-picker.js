// Date picker for the seat booking form.
//
// The picker is a popover, not a modal: Tab moves on through the rest of the form, and Escape
// closes it and puts focus back on the button that opened it.

(function () {
  var trigger = document.getElementById("room-date-open");
  var picker = document.getElementById("room-date-picker");
  var done = document.getElementById("room-date-done");
  var grid = document.getElementById("room-daygrid");
  var field = document.getElementById("room-date");
  if (!trigger || !picker || !grid) return;

  for (var d = 1; d <= 30; d++) {
    var day = document.createElement("button");
    day.type = "button";
    day.textContent = String(d);
    day.setAttribute("aria-label", d + " September 2026");
    grid.appendChild(day);
  }

  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "room-date-picker");

  function close(returnFocus) {
    picker.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (returnFocus) trigger.focus();
  }

  trigger.addEventListener("click", function () {
    picker.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    picker.querySelector("button").focus();
  });

  grid.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;
    field.value = event.target.textContent + " September 2026";
  });

  done.addEventListener("click", function () {
    close(true);
  });

  picker.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      close(true);
    }
  });
})();
