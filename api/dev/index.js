module.exports = function ({ router, mongo, redis, ...deps }) {
  router.get('/status', function (req, res) {
    res.sendStatus(200)
  })

  router.get('/mongo/health', async function (req, res) {
    console.log(await mongo.db('admin').command({ ping: 1 }))
    res.json({
      result: await mongo.db('admin').command({ ping: 1 })
    })
  })

  router.get('/redis/get', async function (req, res) {
    res.json({
      result: { message: await redis.get('message') }
    })
  })

  router.post('/redis/set', async function (req, res) {
    const result = await redis.set('message', req.body.message)

    res.sendStatus(200)
  })

  return router
}
