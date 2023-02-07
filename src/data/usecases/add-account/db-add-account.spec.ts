// basicamente essa class já vai receber os dados formatados
// corretamente pelo controller e ira criar uma conta para
// o usuário com as informações recebidas
// porem antes a senha precisa ser cyptografada...

import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  // teste para validar se a senha fio cyptografada corretamente
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptStub = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptStub).toHaveBeenCalledWith('valid_password')
  })
})
