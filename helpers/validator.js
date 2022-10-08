const validateEmail = function(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

const isLength = function(password, arg){
    return password.length >= arg.min && password.length <= arg.max ? true : false
    // return password.length >= arg.min < arg.max ;
}

console.log(isLength("password", {min: 6, max: 1000}))
// console.log(validateEmail('kofigmail.com'))

module.exports = { validateEmail, isLength }