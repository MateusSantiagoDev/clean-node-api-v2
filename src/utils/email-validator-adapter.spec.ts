// basicamente essa class esta implementando a biblioteca do validator

import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  // se a biblioteca returnar false o teste tbm vai retornar false
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    // mocando o return do isEmail para false pra satisfazer o teste
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  // se a biblioteca returnar true o teste tbm vai retornar true
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  // teste para garantir que o validator vai ser chamado como email correto
  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@mail.com')
    // toHaveBeenCalledWith verificando se o test vai receber o email valido
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
