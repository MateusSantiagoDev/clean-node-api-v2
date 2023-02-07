import { Account } from '../model/account'

export interface AccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (account: AccountModel): Promise<Account>
}
