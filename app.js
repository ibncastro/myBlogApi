const express = require("express")
require("dotenv").config()
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require('cors')
const redis = require("redis")
const connectRedis = require("connect-redis")
const session = require("express-session")
const passport = require("passport")
require("./db/mongoDB")

const postRoutes = require('./routes/post')
const localAuth = require('./routes/localAuth')


// configure redis client 
  const redisClient = redis.createClient({ legacyMode: true })

  redisClient.connect()
  .then(() => {
    console.log("Redis server connected")
  })
  .catch(err => {
    console.log("Redis client connection failed", err)
  })

  // create redis store
const RedisStore = connectRedis(session)

const app = express()

// serve static folder public express?
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
// app.use(helmet)
// app.use(cors)

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "this is a secret oo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 10
  }
}))



// app.use(passport.authenticate('session'))
// app.use(function(req, res, next) {
//   var msgs = req.session.messages || [];
//   res.locals.messages = msgs;
//   res.locals.hasMessages = !! msgs.length;
//   req.session.messages = [];
//   next();
// });

app.use(passport.initialize())
app.use(passport.session())


// registering routes
app.use('/', postRoutes)
app.use('/', localAuth)



module.exports = app