const express = require("express");
const { engine } = require("express-handlebars");
const port = 3000;
const app = express();

app.use(express.static("public"));

//Adding the SQLite3 package to this server
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("members.sqlite3.db");

//HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//Rendering routes for different links
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
/*
db.serialize(() => {
  db.run(
    "CREATE TABLE members (username TEXT PRIMARY KEY, fname TEXT, lname TEXT, email TEXT, joined_date TEXT, phone_number TEXT)"
  );
  const members = [
    {
      username: "Millybilly",
      fname: "Melina",
      lname: "Demir",
      email: "melinademir040@gmail.com",
      joined_date: "2020-08-24",
      phone_number: "0703002909",
    },
    {
      username: "Timinator00",
      fname: "Tim",
      lname: "Andersson",
      email: "timinator@gmail.com",
      joined_date: "2020-08-29",
      phone_number: "0703012345",
    },
    {
      username: "Voldemort666",
      fname: "Tom",
      lname: "Riddle",
      email: "melinademir040@gmail.com",
      joined_date: "2020-08-24",
      phone_number: "0703002909",
    },
    {
      username: "ThewizardHarry09",
      fname: "Melina",
      lname: "Demir",
      email: "melinademir040@gmail.com",
      joined_date: "2020-08-24",
      phone_number: "0703002909",
    },
    {
      username: "Maaario07",
      fname: "Melina",
      lname: "Demir",
      email: "melinademir040@gmail.com",
      joined_date: "2020-08-24",
      phone_number: "0703002909",
    },
  ];
  const model = db.prepare("INSERT INTO members VALUES (?, ?, ?, ?, ?, ?)");
  members.forEach((member) => {
    model.run(
      member.username,
      member.fname,
      member.lname,
      member.email,
      member.joined_date,
      member.phone_number
    );
  });
  model.finalize();
});

app.get("/members", (req, res) => {
  db.all("SELECT * FROM Members", (error, listofMembers) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      const model = { members: listofMembers };
      res.render("members.handlebars", model);
    }
  });
});
*/

app.get("/login", (req, res) => {
  res.render("login.handlebars");
});

app.listen(port, () => {
  console.log(`Server is up & running. Listing on port ${port}...:)`);
});

//////////////////////////////*
