import { NextFunction, Request, Response, Router } from "express";

var router = Router();

// Send Message
router.post('/', function(req: Request, res: Response, next: NextFunction) {
  // Check if message param exists
  const message = req.body.message
  if (!message) {
    return res.status(400).send({
      message: 'The message param is required'
    });
  }

  res.send({
    message: 'Message Sent Successfully!'
  });
});

module.exports = router;
