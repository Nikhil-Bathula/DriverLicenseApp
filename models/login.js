const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const LoginSchema = new Schema({
    password: String,
    role: String,
    userName: String,
    createdDate: {type: Date, default: new Date()}
});

LoginSchema.pre("save", function (next) {
  const personalInfo = this;
  bcrypt.hash(personalInfo.password, 10, (error, hash) => {
    personalInfo.password = hash;
    next();
  });
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;