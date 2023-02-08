import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

// mocando o retorno do bcrypt e setando um valor
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  // teste para garantir q o bcrypterAdapter chame a biblioteca
  // bcrypt passando os parâmetros corretor
  test('Should call Bcrypt with correct value', async () => {
    const sut = makeSut()
    // observa o método hash do bcrypt
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    // esperamos que ele seja chamado com 'any_value' e estou setando o salt
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  // se o bcrypt funcionar será retornanda a hashed gerada por ele
  test('Should return a hash on sucess', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
