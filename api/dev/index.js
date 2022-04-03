module.exports = function ({ router, ...deps }) {

  router.get('/status', function (req, res) {
    res.sendStatus(200)
  })

  return router
}
