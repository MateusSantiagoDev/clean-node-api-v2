// como o MongoHelper não é uma class e não precisa ser instanciado
// posso chamar ele duretamente com esse apelido para facilitar...
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  // antes dos testes sempre conectar e depois desconectar
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })
  // se a connexão cair por algum motivo vai ser reconectada
  test('Should reconnect if mongodb is down', async () => {
    // estou conectando a collection e validando se ela existe
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
