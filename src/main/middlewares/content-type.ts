import { Request, Response, NextFunction } from 'express'

export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  // setando o content type default do header como json
  res.type('json')
  next()
}
