const fs = require('fs')
const path = require('path')
const http = require('http')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pino = require('pino-http')()
const socket = require('socket.io')

const mongo = require('./db/mongodb')
const redis = require('./db/redis')
const ioServer = require('./io-server')
const mqttServer = require('./mqtt-server')
const mqttClient = require('./mqtt-client')

// constants

const PORT = process.env.PORT || 3000
const API_PATH = './api'

// init

const server = express()
const router = express.Router()
const httpServer = http.Server(server)
const io = socket(httpServer)

// middlewares

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// server.use(pino)

server.use(function (err, req, res, next) {
  next()
})

// register api

for (const api of fs.readdirSync(API_PATH)) {
  const stats = fs.statSync(path.resolve(API_PATH, api))

  if (stats.isFile()) {
    server.use(`/api/v1`, require(`${API_PATH}/${api}`)({
      router,
      mongo,
      redis,
      mqttClient,
    }))
  } else {
    server.use(`/api/v1/${api}`, require(`${API_PATH}/${api}`)({
      router,
      mongo,
      redis,
      mqttClient,
    }))
  }
}

// serve

httpServer.listen(PORT, function () {
  console.log(`server is running on port`, PORT)
})

// ws

ioServer({
  io,
  mongo,
  redis,
})

// mqtt

mqttServer({
  mongo,
  redis,
  mqttClient,
})
