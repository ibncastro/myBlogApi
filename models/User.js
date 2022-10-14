const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const { validateEmail, isLength } = require("../helpers/validators")

const user = new Schema({
    fullName: {
        type: String,
        required: true,
        default: ""
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Email is a required field"],
        validate(value) {
            if (!validateEmail(value)) {
                throw new Error("Email is not a valid email format")
            }
        }
    },

    email_verified: {
        type: Boolean,
        default: false
    },

    verifyToken: {
        type: String,
        default: null
    },

    provider: {
        type: String,
        default: 'email'
    },

    provider_id: {
        type: String,
        default: null
    },

    password: {
        type: String,
        required: [true, "Password is a required field"],
        validate(value) {

            if (!isLength(value, { min: 6, max: 1000 })) {
                console.log("Length of password shd be between 6 and 1000")
            }

            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not include 'password'")
            }

        }
    },

    password_reset_token: {
        type: String,
        default: null
    },

    image: {
        type: String,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }


});


const User = mongoose.model("User", user)

module.exports = User