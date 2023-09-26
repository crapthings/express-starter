module.exports = function ({ router, ...deps }) {
  router.post('/status', function (req, res) {
    res.sendStatus(200)
  })

  return router
}
