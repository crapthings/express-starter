const fs = require('fs')
const path = require('path')
const http = require('http')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pino = require('pino-http')()
const io = require('socket.io')

const wsServer = require('./wsServer')
const mongo = require('./db/mongodb')
const redis = require('./db/redis')

// constants

const PORT = process.env.PORT || 3000

// init

const server = express()
const router = express.Router()
const httpServer = http.Server(server)
const ws = io(httpServer)

// middlewares

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// server.use(pino)

app.use(function (err, req, res, next) {
  next()
})

// register api

for (const api of fs.readdirSync('./api')) {
  server.use('/api/v1', require(`./api/${api}`)({
    router,
    mongo,
    redis,
  }))
}

// serve

httpServer.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`)
})

// ws

wsServer({
  ws,
  mongo,
  redis,
})
