const Appointments = require("../models/Appointments");
const User = require("../models/PersonalInfo");

const AppointmentsPage = async (req, res) => {
  if (req.session.userType === "driver") {
    res.redirect("/");
  } else {
    const appointments = [];
    const allAppointmentstime = [];
    const allAppointments = await Appointments.find({});
    const stringData = JSON.stringify(allAppointments);
    res.render("appointments", {
      allAppointmentstime,
      stringData,
      appointments,
    });
  }
};

const createAppointment = (req, res) => {
  Appointments.create(req.body);
  res.redirect("/");
};

const getDataByTestResult = async (req, res) => {
  const appointments = await User.find({
    testStatus: { $eq: req.body.testStatus },
  }).populate("appointmentID");
  const allAppointmentstime = [];
  const allAppointments = await Appointments.find({});
  const stringData = JSON.stringify(allAppointments);
  res.render("appointments", { appointments, stringData, allAppointmentstime });
};

module.exports = { AppointmentsPage, createAppointment, getDataByTestResult };
