// Reservation dialog.

(function () {
  var open = document.getElementById("open-reserve");
  var dialog = document.getElementById("reserve-dialog");
  var confirm = document.getElementById("confirm-reserve");
  var cancel = document.getElementById("cancel-reserve");
  var status = document.getElementById("reserve-status");
  var branch = document.getElementById("reserve-branch");
  if (!open || !dialog) return;

  open.addEventListener("click", function () {
    dialog.hidden = false;
    branch.focus();
  });

  confirm.addEventListener("click", function () {
    dialog.hidden = true;
    status.textContent = "Reserved. We will let you know when it is ready to collect from " +
      branch.value + ".";
  });

  cancel.addEventListener("click", function () {
    dialog.hidden = true;
  });
})();
