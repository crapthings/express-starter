const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority'

const mongo = new MongoClient(uri)

mongo.connect()

module.exports = mongo
