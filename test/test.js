const { expect } = require('chai')

const axios = require('axios')

const API = `http://localhost:3000/api/v1`

describe('test api', function () {

  describe('test dev api', function () {

    it('test /status should response with OK', async function () {
      const { data } = await axios.get(`${API}/status`)
      expect(data).to.be.equal('OK')
    })

  })

})
