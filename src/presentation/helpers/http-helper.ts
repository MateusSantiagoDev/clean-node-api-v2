import { httpResponse } from '../protocols/http'

export const badRequest = (err: Error): httpResponse => ({
  statusCode: 400,
  body: err
})
