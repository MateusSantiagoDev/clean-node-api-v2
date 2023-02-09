import { Router } from 'express'

// depois de feita a conexão com o banco de dados agora é só fazer
// a composição do objeto... e para isso vou usar as factorys
export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
