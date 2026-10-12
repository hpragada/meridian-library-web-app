// Date picker for the room booking form.
//
// Tab is kept inside the picker while it is open, so the calendar cannot be tabbed past by
// accident. Done closes it.

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

  function focusable() {
    return Array.prototype.slice.call(picker.querySelectorAll("button"));
  }

  trigger.addEventListener("click", function () {
    picker.hidden = false;
    focusable()[0].focus();
  });

  grid.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;
    field.value = event.target.textContent + " September 2026";
  });

  done.addEventListener("click", function () {
    picker.hidden = true;
  });

  picker.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") return;
    var items = focusable();
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
