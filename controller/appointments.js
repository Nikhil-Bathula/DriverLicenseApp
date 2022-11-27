const Appointments = require("../models/Appointments");

const AppointmentsPage = (req,res) => {
    res.render("appointments");
}

const createAppointment = (req, res) => {
  console.log(req.body, "body");
  Appointments.create(req.body)
  res.redirect("/");
};

module.exports = { AppointmentsPage, createAppointment };
