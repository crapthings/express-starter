const fs = require('fs')
const path = require('path')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pino = require('pino-http')()
// constants

const PORT = process.env.PORT || 3000

// init

const server = express()
const router = express.Router()

// middlewares

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// server.use(pino)

// register api

for (const api of fs.readdirSync('./api')) {
  server.use('/api/v1', require(`./api/${api}`)({ router }))
}

// serve

server.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`)
})
