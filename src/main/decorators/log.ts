import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

// decorrator defoult que implementa o protocolo do controller
// e esta adicionando uma camada a mais ao meu controllador
// possibilitando que eu posso implementar mais métodos ao controlador
// sem modificar o controlador
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }
  // como as rotas na 'makeSignUpController' implementam um 'Controller'
  // e o controller tem uma assinatura 'handle (httpRequest: HttpRequest):
  // Promise <HttpResponse>' posso retornat o 'LogControllerDecorator'
  // no lugar do 'makeSignUpController' pois tem a mesma assinatura

  // dessa forma estou criando uma camanad a mais e tornando o meu
  // método mais generico
  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    // adicionando um método a mais no decorator e consequentemente
    // ao 'SignUpController' pois esta sendo instanciado
    return httpResponse
  }
}
