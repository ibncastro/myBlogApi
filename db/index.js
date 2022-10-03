const mongoose = require('mongoose');

// mongoose connection to database
// const conn = await mongoose.createConnection(process.env.MONGO_URL).
//   asPromise();

//   conn.on("error", () => {
//     throw new Error(`Unable to connect to database: ${MONGO_URL}`)
//   })
//   conn.on("connected", () => {
//     console.log('Connection to database successful')
//   })

// module.exports = conn;


// Connection URL
const conn = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

module.exports = conn;