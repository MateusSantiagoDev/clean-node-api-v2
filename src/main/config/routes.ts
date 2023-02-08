import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  // em outras palavras: app, usa esse router aqui com esse prefixo /api...
  app.use('/api', router)
  // vou mapear todos os arquivos usando o 'fast-glob' e dentro de src
  // todos que terminarem com 'routes.ts' vão ser importados aqui e para eles
  // vai ser atribuido um router
  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    // a função route recebe o path na linha 12 e executa o router na linha 13
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
