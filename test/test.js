const { readFile } = require('fs/promises')

const { expect } = require('chai')

const { io } = require('socket.io-client')

const axios = require('axios')
const FormData = require('form-data')

const API = `http://localhost:3000/api/v1`
const WS = `http://localhost:3000`

describe('test api', function () {
  const TEST_MESSAGE = 'test redis'

  const socket = io(WS)

  describe('test websocket', function () {
    socket.once('test', function (msg) {
      expect(msg).to.be.true
    })
  })

  describe('test dev api', function () {
    it('test /status should response with OK', async function () {
      const { data } = await axios.get(`${API}/dev/status`)
      expect(data).to.be.equal('OK')
    })

    it('test /mongo/health should response with message', async function () {
      const { data } = await axios.get(`${API}/dev/mongo/health`)
      expect(data?.result?.ok).to.be.equal(1)
    })

    it('test /redis/set should response with OK', async function () {
      const { data } = await axios.post(`${API}/dev/redis/set`, { message: TEST_MESSAGE })
      expect(data).to.be.equal('OK')
    })

    it('test /redis/get should response with message "test redis"', async function () {
      const { data } = await axios.get(`${API}/dev/redis/get`)
      expect(data?.result?.message).to.be.equal(TEST_MESSAGE)
    })
  })

  describe('test upload api', function () {
    it('test /upload should response with metadata', async function () {
      const form = new FormData()

      form.append('file', JSON.stringify({ test: true }), 'test.json')

      const { data } = await axios.post(`${API}/upload/upload`, form, { headers: { ...form.getHeaders() } })

      const { test } = JSON.parse(await readFile(data[0].path, 'utf-8'))

      expect(test).to.be.equal(true)
    })
  })
})
