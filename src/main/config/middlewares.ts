import { Express } from 'express'
import { BodyParser } from '../middlewares/body_parser'

export default (app: Express): void => {
  app.use(BodyParser)
}