// Hold dialog. Whichever way it closes — Confirm, Cancel or Escape — focus goes back to the
// button that opened it, so keyboard users carry on from where they were.

(function () {
  var open = document.getElementById("open-reserve");
  var dialog = document.getElementById("reserve-dialog");
  var confirm = document.getElementById("confirm-reserve");
  var cancel = document.getElementById("cancel-reserve");
  var status = document.getElementById("reserve-status");
  var branch = document.getElementById("reserve-branch");
  if (!open || !dialog) return;

  function close() {
    dialog.hidden = true;
    open.focus();
  }

  open.addEventListener("click", function () {
    dialog.hidden = false;
    branch.focus();
  });

  confirm.addEventListener("click", function () {
    status.textContent = "Hold placed. We will let you know when it is ready to collect from " +
      branch.value + ".";
    close();
  });

  cancel.addEventListener("click", close);

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });
})();
