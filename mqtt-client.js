const mqtt = require('mqtt')

const MQTT_PORT = process.env.MQTT_PORT || 1883

const client = mqtt.connect(`ws://localhost:${MQTT_PORT}`)

client.on('connect', () => {
  console.log(`mqtt client is connected`)
})

client.on('message', (topic, message) => {
  console.log(message.toString())
})
