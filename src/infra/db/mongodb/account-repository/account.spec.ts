import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  // importante: sempre antes dos testes tem q conectar com o banco
  // sempre desconectar depois dos testes unitarios
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // teste para verificar se houve sucesso no retorno do banco de dados
  test('Should retorn an account on sucess', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    // a abordagem é diferente pq não tem dados mocados
    // pois é teste de integração
    expect(account).toBeTruthy() // verificando se o accaount não é null...
    expect(account.id).toBeTruthy()// verificando se o id não é null, vazio
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
