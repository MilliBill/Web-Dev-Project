const express = require("express");
const { engine } = require("express-handlebars");
const port = 8080;
const app = express();

app.use(express.static("public"));

//HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home.handlebars");
});

app.get("/about", (req, res) => {
  res.render("about.handlebars");
});

app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

app.get("/members", (req, res) => {
  res.render("members.handlebars");
});

app.listen(port, () => {
  console.log(`Server is up & running. Listing on port ${port}...:)`);
});
