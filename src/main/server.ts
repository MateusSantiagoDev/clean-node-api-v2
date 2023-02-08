// arquivo onde vai rodar o servdor
import express from 'express'

const app = express()
app.listen(5050, () => console.log('Servidor running at http://localhost:5050'))
