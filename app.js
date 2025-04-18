const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

// init express app
const app = express();

// connect to MongoDB
const dbURI =
  "mongodb+srv://bossalin:7goBLXaMLz7x0tLE@cluster0.ylvlmen.mongodb.net/node-tuts?retryWrites=true&w=majority";
// second argument here is to stop a deprecation warning, but it does not work for me now
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
// middleware so that res.body has the form data that the user typed in the form
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "ABOUT" }); // by default ejs looks into views dir.
});

// blog routes
app.use("/blogs", blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
