const express = require('express')
const cors = require('cors')
const pino = require('express-pino-logger')
const bodyParser = require('body-parser')


const useRoutes = require('./api')

const server = express()
const router = express.Router()

const PORT = process.env.PORT || 4000

server.use(cors())
server.use(pino())

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

useRoutes({ router })

server.use('/api', router)

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`)
})
