const passport = require("passport")
const LocalStrategy = require("passport-local")

const { encryptPassword, User } = require("../models/user")

const { isLength } = require("../helpers/validator")

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
            console.log(req.session)
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
}

// this route will promt u or take u to login page
const login = async (req, res, next) => {
    res.render('login')
}


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

    try {

        const validPass = isLength(req.body.password, { min: 6, max: 1000})

        if(!validPass) {
            console.log('validation for pass failed')
            throw new Error("Length of password shd be between 6 and 1000")
        } 

        const encryptedPass = encryptPassword(req.body.password)

        const profile = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: encryptedPass,
            image: "No Image yet"
        }
        
        const newProfile = new User(profile)
        await newProfile.save();
        res.json({ message: "signup successful" })

    } catch (error) {

        let errors = {}
        // check if error-name = validationError
        if (error.name === 'ValidationError') {

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
                console.log(errors)
            })

            return res.status(400).send(errors)
        }

        return res.status(500).send(error.message)
    }

}

module.exports = { login, loginPassword, logout, signup, createSignup }