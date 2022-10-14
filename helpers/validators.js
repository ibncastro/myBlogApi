const bcrypt = require("bcrypt")

const validateEmail = function(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

const isLength = function(password, arg){
    return password.length >= arg.min && password.length <= arg.max ? true : false
}

const encryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash)
}

// console.log(isLength("password", {min: 6, max: 1000}))
// console.log(validateEmail('kofi@gmail.com'))
// console.log()

module.exports = { validateEmail, isLength, encryptPassword, validatePassword }