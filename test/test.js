const { readFile } = require('fs/promises')

const { expect } = require('chai')

const axios = require('axios')
const FormData = require('form-data')

const API = `http://localhost:3000/api/v1`

// require('../index')

describe('test api', function () {

  describe('test dev api', function () {
    it('test /status should response with OK', async function () {
      const { data } = await axios.get(`${API}/status`)
      expect(data).to.be.equal('OK')
    })
  })

  describe('test upload api', function () {
    it('test /upload should response with metadata', async function () {
      const form = new FormData()

      form.append('file', JSON.stringify({ test: true }), 'test.json')

      const { data } = await axios.post(`${API}/upload`, form, { headers: { ...form.getHeaders() } })

      const { test } = JSON.parse(await readFile(data[0].path, 'utf-8'))

      expect(test).to.be.equal(true)
    })
  })

})
