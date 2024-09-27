//Importing the express module and creating an express applicaton
const express = require("express");
const { engine } = require("express-handlebars");
const port = 8080;
const app = express();

//Serve static files from the "public" folder
app.use(express.static("public"));

//Adding the SQLite3 package to this server
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("members.sqlite3.db");

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//---------------------
//ROUTES for different pages
//---------------------
app.get("/", (req, res) => {
  res.render("home.handlebars");
});

app.get("/about", (req, res) => {
  res.render("about.handlebars");
});

app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

//------------------------
// USER FUNCTIONS
//------------------------

function initTableEvents(mydb) {
  //MODEL for events
  const events = [
    {
      event_number: "1",
      event: "Kirby Launch",
      date: "2020-08-24",
      time: "16:00",
      dress_code: "Pink clothing",
    },
    {
      event_number: "2",
      event: "Where is Harr- Kirby",
      date: "2020-08-29",
      time: "20:00",
      dress_code: "Harry Potter",
    },
    {
      event_number: "3",
      event: "Help me Kirby",
      date: "2020-08-30",
      time: "17:00",
      dress_code: "Kirby Merch",
    },
    {
      event_number: "4",
      event: "Kirby is God",
      date: "2020-09-08",
      time: "15:00",
      dress_code: "Mario",
    },
    {
      event_number: "5",
      event: "Kirby Funding",
      date: "2020-09-16",
      time: "16:00",
      dress_code: "Casual",
    },
  ];

  mydb.run(
    `CREATE TABLE IF NOT EXISTS events(
      event_number INTEGER PRIMARY KEY, 
      event TEXT, 
      date TEXT, 
      time TEXT, 
      dress_code TEXT,
    )`,
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table events created");

        events.forEach((oneEvent) => {
          db.run(
            "INSERT OR REPLACE INTO events (event_number, event, date, time, dress_code) VALUES (?, ?, ?, ?, ?, )",
            [
              oneEvent.event_number,
              oneEvent.event,
              oneEvent.date,
              oneEvent.time,
              oneEvent.dress_code,
            ],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("Line added into the events table");
              }
            }
          );
        });
      }
    }
  );
}

function initTableMembers(mydb) {
  //MODEL for members
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
      phone_number: "0708908990",
    },
    {
      username: "Voldemort666",
      fname: "Tom",
      lname: "Riddle",
      email: "imafteryouharry23@outlook.com",
      joined_date: "2020-08-27",
      phone_number: "0706666666",
    },
    {
      username: "ThewizardHarry09",
      fname: "Harry",
      lname: "Potter",
      email: "Imintrouble67@gmail.com",
      joined_date: "2020-08-26",
      phone_number: "0703333333",
    },
    {
      username: "Maaario07",
      fname: "Super",
      lname: "Mario",
      email: "maaario07@gmail.com",
      joined_date: "2020-08-25",
      phone_number: "0712345678",
    },
  ];

  mydb.run(
    "CREATE TABLE IF NOT EXISTS members (username TEXT PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT, joined_date TEXT, phone_number TEXT)",
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table projects created!");

        members.forEach((oneMember) => {
          db.run(
            `INSERT OR REPLACE INTO members (username, fname, lname, email, joined_date, phone_number) VALUES (?, ?, ?, ?, ?, ?) `,
            [
              oneMember.username,
              oneMember.fname,
              oneMember.lname,
              oneMember.email,
              oneMember.joined_date,
              oneMember.phone_number,
            ],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log(`Line added into the member table`);
              }
            }
          );
        });
      }
    }
  );
}

app.get("/members", (req, res) => {
  db.all("SELECT * FROM members", (error, listofMembers) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      const model = { members: listofMembers };
      res.render("members.handlebars", model);
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login.handlebars");
});

app.listen(port, () => {
  initTableMembers(db);
  //initTableEvents(db);
  console.log(`Server is up & running. Listing on port ${port}...:)`);
});

//////////////////////////////*
