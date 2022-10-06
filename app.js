const express = require("express")
require("dotenv").config()
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require('cors')

// Importing databases
require("./db/mongoDB")
require("./db/sqlConnect")

const postRoutes = require('./routes/post')

const app = express()

// serve static folder public express?
  app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
// app.use(helmet)
// app.use(cors)


// registering routes
app.use('/', postRoutes)




module.exports = app