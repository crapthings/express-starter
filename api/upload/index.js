const upload = require('../../fs/local')
const { sts } = require('../../fs/oss')

const {
  OSS_REGION,
  OSS_BUCKET,
  OSS_RAM,
  OSS_SESSION
} = process.env

module.exports = function ({ router, ...deps }) {
  router.get('/upload', upload.any(), function (req, res) {
    res.json(req.files)
  })

  router.post('/grantOssUploadUrl', async function (req, res) {
    const resp = await sts.assumeRole(OSS_RAM, null, '3000', OSS_SESSION)

    res.json({
      ...resp.credentials,
      Region: OSS_REGION,
      Bucket: OSS_BUCKET,
    })
  })

  return router
}
