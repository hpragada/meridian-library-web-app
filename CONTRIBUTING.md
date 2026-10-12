# Contributing

This repository is maintained by the Edvensoft QA team. **Talk to them before changing any
rendered page.**

Pages here are referenced by records held outside this repository, keyed on the route and on the
`id` of individual elements. A change to the markup, the styles or the copy can invalidate those
records, and nothing in this repository will tell you that it happened — the site will look fine
and the records will quietly be describing a page that no longer exists.

## The rules

1. **Keep element `id`s stable.** They are how those external records point at things. Renaming
   one is not a refactor, it is a deletion.
2. **Any change to a rendered view bumps the version in `package.json`.** The records are pinned
   to it.
3. **Adding a page is cheap; changing an existing one is not.** Prefer adding.
4. **The header and footer are shared by every page**, so what goes in them is a decision rather
   than a detail. Keep them free of images and form controls, and keep the header unpinned — not
   `position: sticky`.
5. **No external origins.** No CDN fonts, no hosted scripts, no remote images. Everything is
   served from this repository or inlined.
6. **Nothing may vary between two requests for the same URL.** No timestamps in the page, no
   random ordering, no counters, no dates computed from today.
7. **Run `npm run routes` after adding or removing a route**, and commit the regenerated
   `routes.json`.
8. **Comments say what the code does, not why it was chosen.** The stylesheet and the scripts are
   downloaded by every visitor; the reasoning belongs in the team's own documentation.
