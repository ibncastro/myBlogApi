const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const user = new Schema({
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


});

const User = mongoose.model("User", user)
// console.log(typeof User)
module.exports = User;


module.exports.encryptPassword = function (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports.validatePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}
