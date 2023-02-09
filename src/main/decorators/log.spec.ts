import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  // primeiro teste para garantir que o método correto vai ser repassado
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            name: 'Mateus'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    // espera que o handle do controlador seja chamado
    // com o mesmo valor do handle do decorator
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
