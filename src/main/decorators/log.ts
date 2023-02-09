import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

// decorrator defoult que implementa o protocolo do controller
// e esta adicionando uma camada a mais ao meu controllador
// possibilitando que eu posso implementar mais métodos ao controlador
// sem modificar o controlador
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository
  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }
  // como as rotas na 'makeSignUpController' implementam um 'Controller'
  // e o controller tem uma assinatura 'handle (httpRequest: HttpRequest):
  // Promise <HttpResponse>' posso retornat o 'LogControllerDecorator'
  // no lugar do 'makeSignUpController' pois tem a mesma assinatura

  // dessa forma estou criando uma camanad a mais e tornando o meu
  // método mais generico
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
