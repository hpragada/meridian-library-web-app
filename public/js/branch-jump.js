// Branch jump menu. Two branch screens share this file: the listener that is attached
// depends on whether a Go button sits next to the select.

var branchSelect = document.getElementById("branch-jump");
var branchGo = document.getElementById("branch-go");

function goToBranch(value) {
  if (!value) return;
  window.location.href = value;
}

if (branchSelect) {
  if (branchGo) {
    branchGo.addEventListener("click", function () {
      goToBranch(branchSelect.value);
    });
  } else {
    branchSelect.addEventListener("focus", function () {
      goToBranch(branchSelect.value);
    });
  }
}
