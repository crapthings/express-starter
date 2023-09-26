const aedes = require('aedes')()
const factory = require('aedes-server-factory')

const PORT = process.env.MQTT_PORT || 1883

const mqttServer = factory.createServer(aedes, {
  ws: true
})

module.exports = function ({ ...deps }) {
  mqttServer.listen(PORT, function () {
    console.log(`mqtt server is running on port`, PORT)
  })
}
