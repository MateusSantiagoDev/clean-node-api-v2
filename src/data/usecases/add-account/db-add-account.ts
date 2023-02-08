import { AddAccount, AccountModel, Account, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AccountModel): Promise<Account> {
    // na linha 13 e 14 vou trocar a senha pela hash
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword })) // pego o obj original e substituo a senha pela hash. o obj vazio na frente garante q não vou modificar o obj original
    return account
  }
}
