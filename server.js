const http = require('http')
const normalizePort = require("normalize-port")


const app = require('./app.js')
const port = normalizePort(process.env.PORT || 8080)

app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Listening on ${port}`)
})