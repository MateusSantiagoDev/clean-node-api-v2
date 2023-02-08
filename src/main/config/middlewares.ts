// neste arquivo estou estanciando todos os methodos que seram usados

import { Express } from 'express'
import { BodyParser, cors, contentType } from '../middlewares'

export default (app: Express): void => {
  app.use(BodyParser)
  app.use(cors)
  app.use(contentType)
}
