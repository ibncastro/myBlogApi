const mongoose = require('mongoose')

const userSchema = new mongoo.Schema({
    fullName: {
        type: String,
        required: true,
        default: ""
    },

    email: {
        type: String,
        unique: true,
        required: true
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
        type: String
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


}, { collection: "user" })

module.exports = mongoose.model("User", userSchema )

