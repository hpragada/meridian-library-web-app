// Catalogue search results, filled in without reloading the page. The same three titles come
// back whatever is typed, so the page reads the same on every visit.

(function () {
  var search = document.getElementById("results-search");
  var count = document.getElementById("results-count");
  var list = document.getElementById("results-list");
  if (!search) return;

  var TITLES = [
    "Tidewater — Ursula Vane",
    "The Salt Path Home — Idris Okonkwo",
    "Nightjar — Marta Lindqvist",
  ];

  search.addEventListener("click", function () {
    list.innerHTML = "";
    TITLES.forEach(function (t) {
      var item = document.createElement("li");
      item.textContent = t;
      list.appendChild(item);
    });
    count.textContent = TITLES.length + " results found";
  });
})();
