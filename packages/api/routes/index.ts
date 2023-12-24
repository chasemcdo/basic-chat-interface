import { type NextFunction, type Request, type Response, Router } from 'express'

const router = Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})

module.exports = router