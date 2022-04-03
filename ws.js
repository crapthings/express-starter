module.exports = function ({ httpServer, ...deps }) {
  const io = require('socket.io')(httpServer)

  io.on('connection', function (socket) {
    console.log('A user connected')
    socket.emit('test', true)

    socket.on('disconnect', function () {
      console.log('A user disconnected')
    })
  })
}
