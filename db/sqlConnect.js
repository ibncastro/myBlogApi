const Sequelize = require("sequelize")

const sequelize = new Sequelize("mysql", "root", "", {
    host: "localhost",
    dialect: "mysql",
    // port: 3306,
    dialectOptions: {
        connectTimeout:100000
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate()
    .then(() => {
        console.log("Connected to MySQL Database")
    })
    .catch((err) => {
        console.log('Unable to connect to database ', err)
    })

module.exports = sequelize