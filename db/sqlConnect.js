const Sequelize = require("sequelize")

const sequelize = new Sequelize("blogApiDB", "root", "", {
    host: "92.168.64.2",
    dialect: "mysql",
    port: 3306,

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