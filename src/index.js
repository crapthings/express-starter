import express from 'express'
import cors from 'cors'
import compression from 'compression'
import pino from 'express-pino-logger'
import bodyParser from 'body-parser'

import attachRoutes from './api'

const server = express()
const router = express.Router()

const PORT = process.env.PORT || 4000

server.use(cors())
server.use(compression())
server.use(pino())

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

attachRoutes({ router })

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`)
})
