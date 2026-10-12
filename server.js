const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4180;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Render a page view into a layout. Express has no layout support of its own and we are not
// adding a dependency for four lines: render the page to a string, then render the layout
// around it. `layout` lets a route opt into a different shell.
app.use((_req, res, next) => {
  res.page = (view, locals = {}) => {
    res.render(view, locals, (err, body) => {
      if (err) return next(err);
      res.render(locals.layout || "layout", Object.assign({}, locals, { body }));
    });
  };
  next();
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Explicit "/index" — `require("./routes")` would resolve to routes.json, not the directory.
require("./routes/index")(app);

app.use((_req, res) => {
  res.status(404);
  res.page("not-found", { title: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Meridian Library listening on http://localhost:${PORT}`);
});
