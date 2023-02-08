import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  // teste para garantir q o bcrypterAdapter chame a biblioteca
  // bcrypt passando os parâmetros corretor
  test('Should call Bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    // observa o método hash do bcrypt
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    // esperamos que ele seja chamado com 'any_value' e estou setando o salt
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
