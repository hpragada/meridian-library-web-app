// Write routes.json from the server's own route table, so the published route list can never
// drift from what is actually served. A route on disk but missing from routes.json is invisible
// to anything that consumes the list, and nothing would report it.
//
//   node tools/gen-routes.js
//
// routes.json carries paths and titles only. It ships in this repository and is read by
// anything that needs to enumerate the site.

const fs = require("fs");
const path = require("path");
// Explicit "/index" — `require("../routes")` resolves to routes.json, which this script writes.
const { ROUTES } = require("../routes/index");

const out = {
  version: require("../package.json").version,
  base_url: "http://localhost:4180",
  routes: ROUTES
    .map((r) => ({ path: r.path, title: r.title, in_scope: true }))
    .concat([{ path: "/health", title: "Health", in_scope: false }])
    .sort((a, b) => a.path.localeCompare(b.path)),
};

fs.writeFileSync(
  path.join(__dirname, "..", "routes.json"),
  JSON.stringify(out, null, 2) + "\n",
  "utf8"
);

console.log(`routes.json written — ${out.routes.length} routes (${out.routes.filter((r) => r.in_scope).length} in scope)`);
