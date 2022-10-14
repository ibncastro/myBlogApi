const express = require('express')
const router = express.Router();
const LocalStrategy = require("passport-local");
const passport = require('passport');

const User = require("../models/user")

const { login, loginPassword, logout, signup, createSignup } = require("../controllers/localAuth")
const { validatePassword } = require("../helpers/validators") 

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    User.findOne({
        email: username
    }, function (err, user) {
        if (err) return cb(err)
        if (!user) return cb(null, false)
        if (!validatePassword(password, user.password)) cb(null, false)
        return cb(null, user)
    })
}))

passport.serializeUser(function (user, cb) {
    cb(null, user)
})

passport.deserializeUser(function (user, cb) {
    cb(null, user)
})


router.route('/login')
    .get(login)

router.route('/login/password')
    .post(loginPassword)

router.route('/logout')
    .post(logout)

router.route('/signup')
    .get(signup)
    .post(createSignup)


module.exports = router