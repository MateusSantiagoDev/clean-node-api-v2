// basicamente essa class já vai receber os dados formatados
// corretamente pelo controller e ira criar uma conta para
// o usuário com as informações recebidas
// porem antes a senha precisa ser cyptografada...

import { Encrypter, AccountModel, Account, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AccountModel): Promise<Account> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
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

  // teste para garantir que se houver uma excessão no encrypterStub, não será
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

  // nessa etapa ja estou com a senha cyptografada então ja posso
  // criar uma conta para o usuário

  // teste para adicionar uma conta de usuário no banco de dados
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  // teste para garantir que se houver uma excessão no addAccountRepositoryStub,
  // não será tratada aqui dentro, a excessão será repassada
  test('Should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    // linha 51 e 52 forço o teste a retornar uma excessão
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  // senha cyptografada, conta nova adicionada no banco de dados...
  // teste para retornar a resposta do addAccountRepository
  test('Should return an account on sucess', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })
})
