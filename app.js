const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require('cors')
require("./db/index")

const postRoutes = require('./routes/post')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
// app.use(cookieParser)
// app.use(helmet)
// app.use(cors)


// registering routes
app.use('/', postRoutes)




module.exports = app