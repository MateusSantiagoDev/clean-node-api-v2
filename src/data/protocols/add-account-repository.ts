import { AccountModel } from '../../domain/usecase/add-account'
import { Account } from '../../domain/model/account'

export interface AddAccountRepository {
  add (account: AccountModel): Promise<Account>
}
