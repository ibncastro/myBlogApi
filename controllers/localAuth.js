const passport = require("passport")
const LocalStrategy = require("passport-local")

const { encryptPassword } = require("../models/user")
const User = require("../models/user")

// this route will promt u or take u to login page
const login = async (req, res, next) => {
    res.render('login')
}

const loginPassword = function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
}

// this will log u in
// const loginPassword = passport.authenticate('local', {
//     successReturnToOrRedirect: "/",
//     failureRedirect: "login",
//     failureMessage: true
// })
// }, function (req, res) {
//     console.log('login is ongoing')
//     res.send({ message: "Login is successful" })
// })

const logout = function (req, res, next) {
    req.logout(function (err) {
        // res.redirect('/')
        res.send({ message: "logout is successful" })
    })
}

// take u to signup
const signup = function (req, res, next) {
    res.render('signup')
}

// actually sign u up 
const createSignup = async function (req, res, next) {

    const encryptedPass = encryptPassword(req.body.password)

    const profile = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: encryptedPass,
        image: "No Image yet"
    }
    // console.log(type User)
    const newProfile = new User(profile)
    await newProfile.save();
    res.json({ message: "signup successful" })

}

module.exports = { login, loginPassword, logout, signup, createSignup }