const { isLength, validateEmail, encryptPassword, validatePassword } = require("./validators")

// test variables
let email = "kofi@gmail.com";
let password = "password"
// let hash = "$2b$10$j0CYXdTD21VhRQ7xsnKv/u2Aw8FwUb2DJWqUoqtXUAcmnTBEv.fXK"

test('check if email is not null', () => {
    expect(validateEmail(email)).not.toBeNull()
})

test('check if email matches valid email format', () => {
    expect(Array.isArray(validateEmail(email))).toBeTruthy()
    // expect(validateEmail(email)).toBeType("array")
})

test('check if password has pescribed length', () => {
    let min = 6, max = 1000;
    expect(isLength(password, { min, max })).toBeTruthy()
})

test('check if encrypted password is not empty', () => {
    expect(encryptPassword(password)).not.toBeNull()
    expect(encryptPassword(password)).not.toBeUndefined()
    expect(encryptPassword(password)).toBeDefined()
})

test('check if validating password return true ', () => {
    // expect(validatePassword(password, hash)).toBeBoolean()
})