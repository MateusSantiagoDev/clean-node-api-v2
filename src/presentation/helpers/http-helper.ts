import { HttpResponse } from '../protocols/http'
import { ServerError } from '../error/server.error'

export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (err: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(err.stack) // só estou passando o stack do erro
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
