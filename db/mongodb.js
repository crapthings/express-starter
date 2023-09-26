const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URL

const mongo = new MongoClient(uri)

mongo.connect()

module.exports = mongo
