import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Mateus',
        email: 'mateus@email.com',
        password: 'senhasecreta',
        passwordConfirmation: 'senhasecreta'
      })
      .expect(200)
  })
})
