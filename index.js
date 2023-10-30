// https://ruby-worrisome-sea-lion.cyclic.app/
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");
const flash = require("connect-flash");
const PersonalInfo = require("./models/PersonalInfo");
const bcrypt = require("bcrypt");
const { signUp, createUser } = require("./controller/signupController");
const { g2Page, fetchPersonalInfo, getResult, closeStatusPopup } = require("./controller/g2PageController");
const { gPage, updatePersonalInfo } = require("./controller/gPageController");
const { login, validateUser } = require("./controller/loginController");
const {
    AppointmentsPage,
    createAppointment,
    getDataByTestResult
} = require("./controller/appointments");
const { redirectToEmployer, getUserDetails, closePopup, getDataByTestType } = require("./controller/examiner");
const auth = require("./middlewares/authentication");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    expressSession({
        secret: "bathu123",
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    })
);
app.use(flash());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
);

const port = 4005;

global.showAuthenticatedRoutes = false;
global.showAdminAuthenticatedRoutes = false;
global.showExaminerAuthenticatedRoutes = false;
global.loggedIn = false;

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/g", auth, gPage);

app.get("/g2", auth, g2Page);

app.get("/login", login);

app.post("/fetchpersonalInfo", fetchPersonalInfo);

app.post("/updatePersonalInfo", updatePersonalInfo);

app.get("/signup", signUp);

app.post("/createData", createUser);

app.post("/checkUser", validateUser);

app.get("/appointments", auth, AppointmentsPage);

app.post("/createAppointment", createAppointment);

app.get("/employer", auth, redirectToEmployer);

app.get("/getUserDetails", getUserDetails);

app.get("/signout", (req, res) => {
    global.loggedIn = false;
    const showErrorMsg = false;
    showAuthenticatedRoutes = false;
    showAdminAuthenticatedRoutes = false;
    showExaminerAuthenticatedRoutes = false;
    req.session.userId = "";
    req.session.userType = "";
    res.render("login", { showErrorMsg });
});

app.post("/closePopup", closePopup);

app.post("/searchByTestype", getDataByTestType);

app.post("/searchByTestResult", getDataByTestResult);

app.get("/getResult", getResult);

app.get("/getResultg2", getResult);

app.post("/closeStatusPopup", closeStatusPopup);

app.listen(port, () => {
    console.log("App Listening on Port " + port);
});