const PersonalInfo = require("../models/PersonalInfo");

const signUp = (req, res) => {
    let obj = {
        showErrorMsg: false,
        showUserNameError: false
    }
    res.render("signup", { obj });
};

const createUser = async(req, res) => {
    try {
        let obj = {
            showErrorMsg: false,
            showUserNameError: false
        }
        req.flash('passwordError', 'Passwords did not Match')
        req.flash('userNameError', 'Username is already taken')
        const userName = await PersonalInfo.findOne({ userName: req.body.firstName });
        const errorMessages = {
            passwordError: req.flash('passwordError'),
            userNameError: req.flash('userNameError')
        }
        console.log(errorMessages, 'errorMessages')
        if (userName) {
            obj.showUserNameError = true;
            res.render("signup", { obj, errorMessages });
        } else if (req.body.password === req.body.repeatPassword) {
            const obj = {
                userName: req.body.firstName,
                password: req.body.password,
                role: req.body.type,
            };
            PersonalInfo.create(obj);
            res.redirect("/login");
        } else {
            obj.showErrorMsg = true;
            res.render("signup", { obj, errorMessages });
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { signUp, createUser };