import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { Account } from '../../../../domain/model/account'
import { AccountModel } from '../../../../domain/usecase/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

// nesse caso não estou fazendo conexão com o banco de dados em produção
// vou usar o recurso do mongoClient para acessar uma colection de forma
// local para poder fazer testes...
export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AccountModel): Promise<Account> {
    // nas linhas 14, 15 estou criando a collection 'accounts' e acessando
    // o método insertOne do mongodb para inserir dados na collection
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.mapper(result.ops[0])
  }
}
