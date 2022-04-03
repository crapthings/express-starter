const upload = require('../../fs/local')

module.exports = function ({ router, ...deps }) {

  router.post('/upload', upload.any(), function (req, res) {
    res.json(req.files)
  })

  return router
}
