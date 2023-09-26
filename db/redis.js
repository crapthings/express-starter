// https://github.com/luin/ioredis

const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_PORT || 6379)

module.exports = redis
