const seed = require("../data/seed.json");

// Rows joined once at start-up rather than per request. Nothing here reads the clock, so the
// same URL returns byte-identical HTML every time.
const bookById = {};
seed.books.concat(seed.moreBooks).forEach((b) => { bookById[b.id] = b; });
const loanRows = seed.loans.map((l) => Object.assign({}, l, {
  title: bookById[l.bookId].title,
  author: bookById[l.bookId].author,
}));

// One row per copy: every title at every branch. Ninety-six rows is what the county holding
// actually looks like, and it is also what the two pages that use this list need — a row has to
// be able to sit several screens from the top for the headings to matter as you scroll.
const shelfList = [];
seed.books.concat(seed.moreBooks).forEach((b) => {
  seed.branches.forEach((branch, i) => {
    shelfList.push({
      id: b.id + "-" + (i + 1),
      title: b.title,
      author: b.author,
      genre: b.genre,
      branch: branch.name,
      shelf: b.shelf + " c." + (i + 1),
    });
  });
});

// One declarative table for every route in the application. `tools/gen-routes.js` writes
// routes.json from this list, so the published route list can never drift from what the
// server actually serves.
//
// `view`   — the EJS file under views/
// `layout` — an alternative shell; only /about/membership needs one
// `data`   — extra locals for the view
const ROUTES = [
  { path: "/", view: "home", title: "Welcome to Meridian Library" },

  // ── catalogue ────────────────────────────────────────────────────
  { path: "/catalogue", view: "catalogue/index", title: "Browse the catalogue",
    data: { books: seed.books } },
  { path: "/catalogue/recommended", view: "catalogue/recommended", title: "Recommended this month" },
  { path: "/catalogue/reserve", view: "catalogue/reserve", title: "Reserve a copy" },
  { path: "/catalogue/new-arrivals", view: "catalogue/new-arrivals", title: "New arrivals",
    data: { books: seed.books } },
  { path: "/catalogue/staff-picks", view: "catalogue/staff-picks", title: "Staff picks",
    data: { books: seed.books } },
  { path: "/catalogue/award-winners", view: "catalogue/award-winners", title: "Award winners" },
  { path: "/catalogue/browse-all", view: "catalogue/browse-all", title: "All titles on the shelves",
    data: { books: seed.books, moreBooks: seed.moreBooks } },
  { path: "/catalogue/genres", view: "catalogue/genres", title: "Subjects",
    data: { genreCounts: seed.genreCounts } },
  { path: "/catalogue/search", view: "catalogue/search", title: "Search the catalogue" },
  { path: "/catalogue/advanced-search", view: "catalogue/advanced-search", title: "Advanced search" },
  { path: "/catalogue/all-titles", view: "catalogue/all-titles", title: "All titles by branch",
    data: { shelfList } },
  { path: "/catalogue/by-subject", view: "catalogue/by-subject", title: "All titles by subject",
    data: { shelfList } },
  { path: "/catalogue/filter", view: "catalogue/filter", title: "Filter by subject",
    data: { books: seed.books, genreCounts: seed.genreCounts } },
  { path: "/catalogue/refine", view: "catalogue/refine", title: "Refine by subject",
    data: { books: seed.books, genreCounts: seed.genreCounts } },
  { path: "/catalogue/results", view: "catalogue/results", title: "Search results" },
  { path: "/catalogue/quick-find", view: "catalogue/quick-find", title: "Quick find" },
  { path: "/catalogue/reserve-copy", view: "catalogue/reserve-copy", title: "Reserve this copy" },
  { path: "/catalogue/place-hold", view: "catalogue/place-hold", title: "Place a hold" },
  { path: "/catalogue/subject-index", view: "catalogue/subject-index", title: "Subject index",
    data: { genreCounts: seed.genreCounts } },
  { path: "/catalogue/subject-list", view: "catalogue/subject-list", title: "Subjects A to Z",
    data: { genreCounts: seed.genreCounts } },
  { path: "/catalogue/saved-searches", view: "catalogue/saved-searches", title: "Saved searches" },
  { path: "/catalogue/my-searches", view: "catalogue/my-searches", title: "My searches" },

  // ── about ────────────────────────────────────────────────────────
  { path: "/about/opening-hours", view: "about/opening-hours", title: "Opening hours" },
  { path: "/about/membership", view: "about/membership", title: "Membership",
    layout: "layout-nolang" },
  { path: "/about/history", view: "about/history", title: "A short history" },
  { path: "/about/team", view: "about/team", title: "Our team" },
  { path: "/about/visit-us", view: "about/visit-us", title: "Visit us" },
  { path: "/about/terms", view: "about/terms", title: "Terms of membership" },
  { path: "/about/find-a-branch", view: "about/find-a-branch", title: "Find a branch",
    data: { branches: seed.branches } },
  { path: "/about/choose-a-branch", view: "about/choose-a-branch", title: "Choose a branch",
    data: { branches: seed.branches } },
  { path: "/about/reading-rooms", view: "about/reading-rooms", title: "Reading rooms" },
  { path: "/about/our-buildings", view: "about/our-buildings", title: "Our buildings" },

  // ── branches ─────────────────────────────────────────────────────
  { path: "/branches", view: "branches", title: "Our branches",
    data: { branches: seed.branches } },

  // ── authors ──────────────────────────────────────────────────────
  { path: "/authors/featured", view: "authors/featured", title: "Featured author" },
  { path: "/authors/spotlight", view: "authors/spotlight", title: "Author spotlight" },

  // ── events ───────────────────────────────────────────────────────
  { path: "/events/calendar", view: "events/calendar", title: "What's on" },
  { path: "/events/tickets", view: "events/tickets", title: "Tickets" },
  { path: "/events/summer-reading", view: "events/summer-reading", title: "Summer reading challenge" },
  { path: "/events/book-club", view: "events/book-club", title: "Book club" },
  { path: "/events/book-a-room", view: "events/book-a-room", title: "Book a meeting room" },
  { path: "/events/book-a-seat", view: "events/book-a-seat", title: "Book a seat" },
  { path: "/events/workshops", view: "events/workshops", title: "Workshops" },
  { path: "/events/classes", view: "events/classes", title: "Classes and courses" },

  // ── reports ──────────────────────────────────────────────────────
  { path: "/reports/lending-summary", view: "reports/lending-summary", title: "Lending summary" },
  { path: "/reports/borrowing-trends", view: "reports/borrowing-trends", title: "Borrowing trends" },
  { path: "/reports/annual-review", view: "reports/annual-review", title: "Annual review",
    data: { monthlyLoans: seed.monthlyLoans } },
  { path: "/reports/branch-comparison", view: "reports/branch-comparison", title: "Branch comparison",
    data: { monthlyLoans: seed.monthlyLoans, branchComparison: seed.branchComparison } },
  { path: "/reports/monthly-issues", view: "reports/monthly-issues", title: "Monthly issues",
    data: { monthlyLoans: seed.monthlyLoans, branchComparison: seed.branchComparison } },
  { path: "/reports/stock-levels", view: "reports/stock-levels", title: "Stock levels" },
  { path: "/reports/holdings-by-branch", view: "reports/holdings-by-branch", title: "Holdings by branch" },
  { path: "/reports/issue-figures", view: "reports/issue-figures", title: "Issue figures" },
  { path: "/reports/loan-figures", view: "reports/loan-figures", title: "Loan figures" },

  // ── loans ────────────────────────────────────────────────────────
  { path: "/loans/current", view: "loans/current", title: "Current loans", data: { loanRows } },
  { path: "/loans/history", view: "loans/history", title: "Loan history", data: { loanRows } },
  { path: "/loans/renewals", view: "loans/renewals", title: "Renewals", data: { loanRows } },

  // ── account ──────────────────────────────────────────────────────
  { path: "/account/full-profile", view: "account/full-profile", title: "Your profile",
    data: { profileFields: seed.profileFields } },
  { path: "/account/loan-history", view: "account/loan-history", title: "Your borrowing",
    data: { loanHistory: seed.loanHistory } },
  { path: "/account/statements", view: "account/statements", title: "Borrowing statement",
    data: { loanHistory: seed.loanHistory } },
  { path: "/account/notifications", view: "account/notifications", title: "Notifications" },
  { path: "/account/preferences", view: "account/preferences", title: "Contact preferences" },
  { path: "/account/join", view: "account/join", title: "Join the library" },
  { path: "/account/update-details", view: "account/update-details", title: "Update your details" },
  { path: "/account/apply", view: "account/apply", title: "Apply for a card" },
  { path: "/account/register", view: "account/register", title: "Register for a card" },
  { path: "/account/my-loans", view: "account/my-loans", title: "My loans", data: { loanRows } },
  { path: "/account/settings", view: "account/settings", title: "Account settings" },
  { path: "/account/security", view: "account/security", title: "Sign-in and security" },
  { path: "/account/card-services", view: "account/card-services", title: "Card services" },
  { path: "/account/card-options", view: "account/card-options", title: "Card options" },
  { path: "/account/charges", view: "account/charges", title: "Charges on your membership" },
  { path: "/account/statement-of-fees", view: "account/statement-of-fees", title: "Statement of fees" },
  { path: "/account/membership-tools", view: "account/membership-tools", title: "Membership tools" },

  // ── staff console ────────────────────────────────────────────────
  { path: "/staff/bulk-actions", view: "staff/bulk-actions", title: "Bulk actions",
    data: { bulkActions: seed.bulkActions } },
  { path: "/staff/catalogue-entry", view: "staff/catalogue-entry", title: "Catalogue entry" },
  { path: "/staff/quick-edit", view: "staff/quick-edit", title: "Quick edit" },
  { path: "/staff/branch-settings", view: "staff/branch-settings", title: "Branch settings" },
  { path: "/staff/display-options", view: "staff/display-options", title: "Display options" },
  { path: "/staff/reports", view: "staff/reports", title: "Staff reports" },
  { path: "/staff/overview", view: "staff/overview", title: "Staff overview" },
  { path: "/staff/exports", view: "staff/exports", title: "Exports" },
  { path: "/staff/shelf-audit", view: "staff/shelf-audit", title: "Shelf audit",
    data: { branches: seed.branches } },
  { path: "/staff/shelf-settings", view: "staff/shelf-settings", title: "Shelf settings",
    data: { branches: seed.branches } },
  { path: "/staff/rota", view: "staff/rota", title: "Staff rota" },
  { path: "/staff/staffing-plan", view: "staff/staffing-plan", title: "Staffing plan" },

  // ── help and contact ─────────────────────────────────────────────
  { path: "/help/borrowing-guide", view: "help/borrowing-guide", title: "Borrowing guide" },
  { path: "/help/getting-started", view: "help/getting-started", title: "Getting started" },
  { path: "/help/faq", view: "help/faq", title: "Common questions" },
  { path: "/help/contact-us", view: "help/contact-us", title: "Ways to reach us" },
  { path: "/help/report-a-problem", view: "help/report-a-problem", title: "Report a problem" },
  { path: "/help/problem-report", view: "help/problem-report", title: "Report a problem with an item" },
  { path: "/help/membership-actions", view: "help/membership-actions", title: "Membership actions" },
  { path: "/contact", view: "contact", title: "Contact us" },
  { path: "/newsletter", view: "newsletter", title: "Newsletter" },
];

module.exports = (app) => {
  for (const route of ROUTES) {
    app.get(route.path, (_req, res) => {
      res.page(route.view, Object.assign({ title: route.title, layout: route.layout }, route.data));
    });
  }
};

module.exports.ROUTES = ROUTES;
