import { type NextFunction, type Request, type Response, Router } from 'express'

const router = Router()

// Send Message
router.post('/', function (req: Request, res: Response, next: NextFunction) {
  // Check if message param exists
  const { message } = req.body
  if (message === undefined || message === '') {
    return res.status(400).send({
      message: 'The message param is required'
    })
  }

  res.send({
    message: 'Message Sent Successfully!'
  })
})

module.exports = router
