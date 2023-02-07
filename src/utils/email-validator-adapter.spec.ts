import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  // se a biblioteca returnar false o teste tbm vai retornar false
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
