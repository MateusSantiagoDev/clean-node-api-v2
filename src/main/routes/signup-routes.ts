import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoute } from '../adapters/express-route-adapter'

// depois de feita a conexão com o banco de dados agora é só fazer
// a composição do objeto... e para isso vou usar as factorys
export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
