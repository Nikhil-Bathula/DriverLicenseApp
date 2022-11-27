const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const showErrorMsg = false;
  res.render("login", { showErrorMsg });
};

const validateUser = (req, res) => {
  const { username, password } = req.body;
  PersonalInfo.findOne({ userName: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.role;
          global.loggedIn = true;
          if (user.role === "driver") {
            showAuthenticatedRoutes = true;
          } else {
            showAuthenticatedRoutes = false;
          }
          if (user.role === "admin") {
            showAdminAuthenticatedRoutes = true;
          } else {
            showAdminAuthenticatedRoutes = false;
          }

          res.render("index");
        } else {
          const showErrorMsg = true;
          global.loggedIn = false;
          res.render("login", { showErrorMsg });
        }
      });
    } else {
      res.redirect("login");
    }
  });
}

module.exports = { login, validateUser };
