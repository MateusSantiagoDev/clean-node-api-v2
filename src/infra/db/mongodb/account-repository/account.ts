import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { Account } from '../../../../domain/model/account'
import { AccountModel } from '../../../../domain/usecase/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

// nesse caso não estou fazendo conexão com o banco de dados em produção
// vou usar o recurso do mongoClient para acessar uma colection de forma
// local para poder fazer testes...
export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AccountModel): Promise<Account> {
    // nas linhas 12, 13 estou criando a collection 'accounts' e acessando
    // o método insertOne do mongodb para inserir dados na collection
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...dataAccount } = account
    return Object.assign({}, dataAccount, { id: _id })
  }
}
