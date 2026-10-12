// Staff console controls. Two settings screens share this file, which is why the toggle handler
// takes its element rather than looking one up by id.

function saveEntry() {
  var form = document.querySelector("form");
  if (form) form.submit();
}

function toggleSwitch(el) {
  if (el.hasAttribute("aria-checked")) {
    el.setAttribute("aria-checked", el.getAttribute("aria-checked") === "true" ? "false" : "true");
  } else {
    el.classList.toggle("is-on");
  }
}
