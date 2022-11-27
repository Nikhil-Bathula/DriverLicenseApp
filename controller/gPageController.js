const PersonalInfo = require("../models/PersonalInfo");
const { fetchPersonalInfo } = require("./g2PageController");
const bcrypt = require('bcrypt');

const gPage = (req, res) => {
  if(req.session.userType === 'admin') {
    res.redirect('/')
  } else {
    fetchPersonalInfo(req, res);
  }
};

const updatePersonalInfo = async (req, res) => {
  console.log(disablePersonalInfoFields, req.body, 'disablePersonalInfoFields');
  let licenseNumber = req.body.licenseNumber;
  let obj = {
    carDetails: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateNo: req.body.platNo,
    },
  };
  if(!disablePersonalInfoFields) {
    licenseNumber = await bcrypt.hash(req.body.licenseNumber, 10);
    obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      licenseNumber: licenseNumber,
      age: req.body.age,
      carDetails: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plateNo: req.body.platNo,
      },
    };
  }
  const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.body.id, obj);
  if (req.url === "/g") {
    res.redirect("/g");
  } else {
    res.redirect("/g");
  }
};

module.exports = { gPage, updatePersonalInfo };
