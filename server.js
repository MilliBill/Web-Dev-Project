//---------------------
// GLOBAL DEFINITIONS
//---------------------
const adminname = "Melina";
const adminPassword =
  "$2b$12$n0Uw5LlR/4OaSeTKsBFb0OIJZ5QaGoQyo6koa6MJMYYsueqS.8duu";

//---------
// PACKAGES
//----------
const express = require("express");
const { engine } = require("express-handlebars");
const sqlite3 = require("sqlite3");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");
const bcrypt = require("bcrypt");
//----------
// PORT
//----------
const port = 8090;

//----------
// APPLICATION
//----------
const app = express();

//----------
// DATABASES
//----------
const db = new sqlite3.Database("members.sqlite3.db");

//----------
// SESSIONS
//----------
const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: "members.sqlite.db" }),
    saveUninitialized: false,
    resave: false,
    secret: "ILIKETODRINKCOFFEEEVERDYASORRY¤343",
  })
);
app.use(function (req, res, next) {
  console.log("Session passed to respone locals...");
  res.locals.session = req.session;
  next();
});

//-------------
// MIDDLEWARES
//-------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//------------
// VIEW ENGINE
//------------
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//---------
// ROUTES
//---------
app.get("/", (req, res) => {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  console.log("---> Home model: ", JSON.stringify(model));
  res.render("home.handlebars", model);
});

app.get("/about", (req, res) => {
  res.render("about.handlebars");
});

app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

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

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Verification steps
  if (!username || !password) {
    const model = { error: "Username and password are required", message: "" };
    return res.status(400).render("login.handlebars", model);
  }

  if (username == adminname) {
    console.log("The username is the admin one!");

    // Compare hashed adminPassword with the entered password
    bcrypt.compare(password, adminPassword, (err, result) => {
      if (err) {
        const model = {
          error: "Error while comparing passwords: " + err,
          message: "",
        };
        return res.render("login.handlebars", model);
      }

      if (result) {
        console.log("The password is the admin one");
        req.session.isAdmin = true;
        req.session.isLoggedIn = true;
        req.session.name = username;
        console.log("Session information: " + JSON.stringify(req.session));
        res.redirect("/");
        const model = {
          error: "",
          message: "You are the admin, Welcome home!",
        };
      } else {
        const model = {
          error: "Sorry, the password is not correct...",
          message: "",
        };
        return res.status(400).render("login.handlebars", model);
      }
    });
  } else {
    const model = {
      error: `Sorry, the username ${username} is not correct...`,
      message: "",
    };
    return res.status(400).render("login.handlebars", model);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying the session: ", err);
    } else {
      console.log("Logged out");
      res.redirect("/");
    }
  });
});

//------------------------
// BCRYPT
//------------------------

const saltRounds = 12;

//------------------------
//FUNCTIONS
//------------------------

function initTableEvents(mydb) {
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
      dress_code TEXT
    )`,
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table events created");

        events.forEach((oneEvent) => {
          db.run(
            "INSERT OR REPLACE INTO events (event_number, event, date, time, dress_code) VALUES (?, ?, ?, ?, ?)",
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
      email: "deatheaters22@outlook.com",
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
        console.log("---> Table members created!");

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

// The app.listen call should be outside the post route
app.listen(port, () => {
  initTableMembers(db);
  //initTableEvents(db);
  console.log(`Server is up & running. Listening on port ${port}...:)`);
});
