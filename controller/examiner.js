const User = require("../models/PersonalInfo");

const redirectToEmployer = async (req, res) => {
  const showPopup = false;
  const appointments = await User.find({
    appointmentID: { $ne: null },
  }).populate("appointmentID");
  // console.log(appointments, 'appointments');
  res.render("examiner", { appointments, showPopup });
};

const getUserDetails = async (req, res) => {
  const showPopup = true;
  const appointments = await User.find({
    appointmentID: { $ne: null },
  }).populate("appointmentID");
  const userDetails = await User.findOne({
    _id: req.query.id,
  });
  console.log(appointments, userDetails, 'params')
  res.render('examiner', { appointments, userDetails, showPopup });
}

const closePopup = async (req, res) => {
  const showPopup = false;
  console.log(showPopup, 'showPopup');
  const appointments = await User.find({
    appointmentID: { $ne: null },
  }).populate("appointmentID");
  res.render('examiner', { appointments, showPopup });
}

module.exports = { redirectToEmployer, getUserDetails, closePopup };
