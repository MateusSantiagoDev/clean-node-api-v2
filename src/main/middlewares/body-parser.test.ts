// o supertest vai emular uma requisição http

import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  // teste para validar a conversão do body da requisição para json
  test('Should parser body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'mateus' })
      .expect({ name: 'mateus' })
  })
})
