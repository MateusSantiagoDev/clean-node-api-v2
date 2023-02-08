// basicamente essa class já vai receber os dados formatados
// corretamente pelo controller e ira criar uma conta para
// o usuário com as informações recebidas
// porem antes a senha precisa ser cyptografada...

import { resolve } from 'path'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  // teste para validar se a senha fio cyptografada corretamente
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptStub = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptStub).toHaveBeenCalledWith('valid_password')
  })

  // teste para garantir que se houver uma excessão não será
  // tratada aqui dentro, a excessão será repassada
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    // linha 51 e 52 forço o teste a retornar uma excessão
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
