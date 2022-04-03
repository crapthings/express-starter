module.exports = function ({ ws, ...deps }) {
  ws.on('connection', function (socket) {
    console.log('A user connected')
    socket.emit('test', true)

    socket.on('disconnect', function () {
      console.log('A user disconnected')
    })
  })
}
