// Saved-search list. Two screens share this file, which is why neither function looks anything
// up by id.

function dropSearch(el) {
  var row = el.closest("li");
  if (row) row.remove();
}

// Enter and Space, for the screen whose controls take keyboard input directly.
function activateOnKey(event, el) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    dropSearch(el);
  }
}
