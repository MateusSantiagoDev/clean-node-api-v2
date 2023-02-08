import { Request, Response, NextFunction } from 'express'

export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  // setando o header do content type como json
  res.type('json')
  next()
}
