// https://ruby-worrisome-sea-lion.cyclic.app/

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const PersonalInfo = require("./models/PersonalInfo");
const bcrypt = require("bcrypt");
const { signUp, createUser } = require("./controller/signupController");
const { g2Page, fetchPersonalInfo} = require("./controller/g2PageController");
const { gPage, updatePersonalInfo } = require("./controller/gPageController");
const { login, validateUser } = require("./controller/loginController");
const {AppointmentsPage, createAppointment} = require("./controller/appointments");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "bathu123", resave: false, saveUninitialized: true }))
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  // "mongodb+srv://nbathula8123:Bathmay2022@nikhiklmongodb.hvjp42q.mongodb.net/fall22?retryWrites=true&w=majority",
  "mongodb+srv://nikhiklmongodb.hvjp42q.mongodb.net/licenseApp?retryWrites=true&w=majority",
  { user: "nbathula8123", pass: "Bathmay2022" },
  { useNewUrlParser: true }
);

const port = 4005;

global.showAuthenticatedRoutes = false;
global.showAdminAuthenticatedRoutes = false;
global.loggedIn = false;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/g", gPage);

app.get("/g2", g2Page);

app.get("/login", login);

app.post("/fetchpersonalInfo", fetchPersonalInfo);

app.post("/updatePersonalInfo", updatePersonalInfo);

app.get("/signup", signUp);

app.post("/createData", createUser);

app.post("/checkUser", validateUser);

app.get("/appointments", AppointmentsPage);

app.post("/createAppointment", createAppointment);

app.get("/signout", (req, res) => {
  global.loggedIn = false;
  const showErrorMsg = false;
  req.session.userId = '';
  req.session.userType = '';
  res.render("login", { showErrorMsg });
})

app.listen(port, () => {
  console.log("App Listening on Port " + port);
});
