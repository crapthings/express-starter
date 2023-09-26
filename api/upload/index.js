const upload = require('../../fs/local')

module.exports = function ({ router, ...deps }) {
  router.get('/upload', upload.any(), function (req, res) {
    res.json(req.files)
  })

  return router
}
