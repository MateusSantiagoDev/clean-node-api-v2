// arquivo onde vai rodar o servidor

import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

// antes de rodar a aplicação é necessário fazer a conexão com o banco de dados

MongoHelper.connect(env.mongoUrl) // nesse caso o parâmetro é uma url válida
// usando p .then pq o MongoHelper.connect não esta dentro de uma função
  .then(async () => {
    // importando o app aqui para garantir q só vai executar depois da conexão
    const app = (await import('./config/app')).default
    // o app.listen só será executado depois q o mongo connectar
    app.listen(env.port, () => console.log(`Servidor running at http://localhost:${env.port}`))
  })
  .catch(err => console.error(err))
