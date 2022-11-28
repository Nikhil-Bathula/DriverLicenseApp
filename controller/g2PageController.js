const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");
const Appointments = require("../models/Appointments");

const g2Page = async (req, res) => {
  if (req.session.userType === "admin") {
    res.redirect("/");
  } else {
    const allAppointments = await Appointments.find({isTimeSlotAvailable: { $in: true }});
    const stringData = JSON.stringify(allAppointments);
    req.body.stringData = stringData;
    fetchPersonalInfo(req, res);
  }
};

const fetchPersonalInfo = async (req, res) => {
  try {
    let personalInfo = await PersonalInfo.findById(req.session.userId).lean();
    // if (personalInfo && personalInfo.firstName) {
      console.log(personalInfo, "personalInfo");
      bcrypt.compare("Default", personalInfo.licenseNumber, (err, same) => {
        console.log(same, "same");
        if (same) {
          personalInfo = {
            _id: personalInfo._id,
            firstName: null,
            lastName: null,
            licenseNumber: null,
            age: null,
            carDetails: {
              make: null,
              model: null,
              year: null,
              plateNo: null,
            },
            disablePersonalInfoFields: false,
          };
          global.disablePersonalInfoFields = false;
        } else {
          personalInfo.disablePersonalInfoFields = true;
          global.disablePersonalInfoFields = true;
        }
        const stringData = req.body.stringData;
        if (req.url === "/g") {
          res.render("g", { personalInfo });
        } else {
          res.render("g2", { personalInfo, stringData });
        }
      });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { g2Page, fetchPersonalInfo };
